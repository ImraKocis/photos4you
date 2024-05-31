import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
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

  return (
    <ImageDownloadContext.Provider
      value={{
        imageType,
        setImageType,
        imageFormat,
        setImageFormat,
      }}
    >
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
