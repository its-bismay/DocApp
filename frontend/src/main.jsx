import React, { createContext, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

export const MyContext = createContext({});

const AppWrapper = () => {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState({});

  return (
    <MyContext.Provider
      value={{
        auth,
        setAuth,
        user,
        setUser,
      }}
    >
      <App />
    </MyContext.Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);