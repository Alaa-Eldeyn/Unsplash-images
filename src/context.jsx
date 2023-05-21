import React, { useContext, createContext, useState, useEffect } from "react";

const AppContext = createContext();

const getInitialDarkTheme = () => {
  let prefersDarkMode = window.matchMedia("prefers-color-scheme: dark").matches;
  const darkMode = localStorage.getItem("DarkMode") === "true"
  return darkMode || prefersDarkMode;
};

export const AppProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkMood] = useState(getInitialDarkTheme());
  const [searchTerm, setSearchTerm] = useState("cat");
  const toggleDarkMood = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkMood(newDarkTheme);
    localStorage.setItem("DarkMode", newDarkTheme);
  };
  useEffect(() => {
    document.body.classList.toggle("dark-theme", !isDarkTheme);
  }, [isDarkTheme]);
  return (
    <AppContext.Provider
      value={{ isDarkTheme, toggleDarkMood, searchTerm, setSearchTerm }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);
