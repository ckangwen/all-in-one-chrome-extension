import config from "@root/twind.config";
import { cssom, observe, twind } from "@twind/core";
import "construct-style-sheets-polyfill";

export function attachTwindStyle<T extends { adoptedStyleSheets: any }>(
  observedElement: Element,
  documentOrShadowRoot: T,
) {
  const sheet = cssom(new CSSStyleSheet());
  const tw = twind(config, sheet);
  observe(tw, observedElement);
  documentOrShadowRoot.adoptedStyleSheets = [sheet.target];
}