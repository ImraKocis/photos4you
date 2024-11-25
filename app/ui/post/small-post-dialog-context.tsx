import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useMemo,
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

  const contextValue = useMemo(
    () => ({
      isSmallPostDialogOpen,
      setIsSmallPostDialogOpen,
    }),
    [isSmallPostDialogOpen, setIsSmallPostDialogOpen],
  );

  return (
    <SmallPostAlertDialogContext.Provider value={contextValue}>
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
