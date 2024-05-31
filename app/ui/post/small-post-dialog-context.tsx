import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface SmallPostAlertDialogContextProps {
  isSmallPostDialogOpen: boolean;
  setIsSmallPostDialogOpen: Dispatch<SetStateAction<boolean>>;
}

const SmallPostAlertDialogContext = createContext<
  SmallPostAlertDialogContextProps | undefined
>(undefined);

export const SmallPostAlertDialogProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isSmallPostDialogOpen, setIsSmallPostDialogOpen] =
    useState<boolean>(false);

  return (
    <SmallPostAlertDialogContext.Provider
      value={{
        isSmallPostDialogOpen,
        setIsSmallPostDialogOpen,
      }}
    >
      {children}
    </SmallPostAlertDialogContext.Provider>
  );
};

export const useSmallPostAlertDialogContext = () => {
  const context = useContext(SmallPostAlertDialogContext);
  if (!context) {
    throw new Error(
      "useSmallPostAlertDialogContext must be used within a SmallPostAlertDialogProvider",
    );
  }
  return context;
};
