import { useState } from "react";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./components/UI/GlobalStyles";
import { lightTheme, darkTheme } from "./components/UI/Themes";
import Toggler from "./components/UI/Toggler";
import router from "./router";

type Theme = "light" | "dark";

function App() {
  const [theme, setTheme] = useState<Theme>("light");
  const themeToggler = () =>
    setTheme((current) => (current === "light" ? "dark" : "light"));

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <>
        <GlobalStyles />
        <div className="App">
          <Toggler theme={theme} toggleTheme={themeToggler} />
          <RouterProvider router={router} />
        </div>
      </>
    </ThemeProvider>
  );
}

export default App;
