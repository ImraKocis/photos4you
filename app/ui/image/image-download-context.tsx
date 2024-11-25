import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useMemo,
} from "react";

interface ImageDownloadContextProps {
  imageType: string;
  setImageType: Dispatch<SetStateAction<string>>;
  imageFormat: string;
  setImageFormat: Dispatch<SetStateAction<string>>;
}

const ImageDownloadContext = createContext<
  ImageDownloadContextProps | undefined
>(undefined);

export const ImageDownloadProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [imageType, setImageType] = useState<string>("original");
  const [imageFormat, setImageFormat] = useState<string>("jpg");

  const contextValue = useMemo(
    () => ({
      imageType,
      setImageType,
      imageFormat,
      setImageFormat,
    }),
    [imageType, setImageType, imageFormat, setImageFormat],
  );
  return (
    <ImageDownloadContext.Provider value={contextValue}>
      {children}
    </ImageDownloadContext.Provider>
  );
};

export const useImageDownloadContext = () => {
  const context = useContext(ImageDownloadContext);
  if (!context) {
    throw new Error(
      "useImageDownloadContext must be used within a ImageDownloadProvider",
    );
  }
  return context;
};
