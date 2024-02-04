"use client";
import { createContext, useState, useContext } from "react";

type GlobalContxtType = {
  isWriteModalOpen: boolean;
  setIsWriteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const GlobalContext = createContext<GlobalContxtType | null>(null);

export const GlobalContextProvider = ({
  children,
}: React.PropsWithChildren) => {
  const [isWriteModalOpen, setIsWriteModalOpen] = useState<boolean>(false);
  return (
    <GlobalContext.Provider value={{ isWriteModalOpen, setIsWriteModalOpen }}>
      {children}
    </GlobalContext.Provider>
  );
};

export function useGlobalContext() {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error(
      "useGlobalContext must be used within a GlobalContextProvider",
    );
  }
  return context;
}
