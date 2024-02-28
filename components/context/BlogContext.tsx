import React, { createContext, useContext, useState } from "react";

// Define the type for your context data
interface AppContextType {
  link: string;
  setLink: any;
  hey: string;
}

// Create the context with initial values
const AppContext = createContext<AppContextType>({
  link: "",
  setLink: () => {},
  hey: "12",
});

// Create a provider component to wrap your application
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [link, setLink] = useState("Homepage");
  const [hey, setHey] = useState("1qwq");
  const contextValue: AppContextType = {
    link,
    setLink,
    hey,
  };

  // Render the provider with the provided children
  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

// Custom hook to consume the context
export const useAppContext = () => useContext(AppContext);
