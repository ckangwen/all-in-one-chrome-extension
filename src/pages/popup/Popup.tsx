import logo from "@/assets/img/logo.svg";
import withSuspense from "@/components/withSuspense";
import { useStorage } from "@/hooks";

import "@/pages/popup/Popup.css";

import exampleThemeStorage from "@/store/theme";
import { Button } from "@root/src/components/ui/button";

const Popup = () => {
  const theme = useStorage(exampleThemeStorage);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p className="text-lime-400">
          Edit <code>src/pages/popup/Popup.tsx</code> and save to reload.
        </p>
        <Button>Hello</Button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React!
        </a>
        <button
          style={{
            color: theme === "light" ? "#fff" : "#000",
          }}
          onClick={exampleThemeStorage.toggle}
        >
          Toggle theme: [{theme}]
        </button>
      </header>
    </div>
  );
};

export default withSuspense(Popup);
