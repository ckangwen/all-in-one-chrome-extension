import { BaseStorage } from "@/libs/chrome";
import { useSyncExternalStore } from "react";

type WrappedPromise = ReturnType<typeof wrapPromise>;
const storageMap: Map<BaseStorage<unknown>, WrappedPromise> = new Map();

export function useStorage<
  Storage extends BaseStorage<Data>,
  Data = Storage extends BaseStorage<infer D> ? D : unknown,
>(storage: Storage) {
  const data = useSyncExternalStore<Data | null>(storage.subscribe, storage.getSnapshot);

  if (!storageMap.has(storage)) {
    storageMap.set(storage, wrapPromise(storage.get()));
  }
  if (data !== null) {
    storageMap.set(storage, { read: () => data });
  }

  return data ?? (storageMap.get(storage)!.read() as Data);
}

function wrapPromise<R>(promise: Promise<R>) {
  let status = "pending";
  let result: R;
  const suspender = promise.then(
    (r) => {
      status = "success";
      result = r;
    },
    (e) => {
      status = "error";
      result = e;
    },
  );

  return {
    read() {
      if (status === "pending") {
        throw suspender;
      } else if (status === "error") {
        throw result;
      } else if (status === "success") {
        return result;
      }
    },
  };
}
