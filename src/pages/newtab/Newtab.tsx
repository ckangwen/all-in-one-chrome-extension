import logo from "@/assets/img/logo.svg";
import { useStorage } from "@/hooks";
import "@/pages/newtab/Newtab.css";
import "@/pages/newtab/Newtab.scss";
import exampleThemeStorage from "@/store/theme";
import withSuspense from "@/components/withSuspense";

const Newtab = () => {
  const theme = useStorage(exampleThemeStorage);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/pages/newtab/Newtab.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React!
        </a>
        <h6>The color of this paragraph is defined using SASS.</h6>
        <span className="text-lime-400">
          The color of this paragraph is defined using Tailwind CSS.
        </span>
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

export default withSuspense(Newtab);
