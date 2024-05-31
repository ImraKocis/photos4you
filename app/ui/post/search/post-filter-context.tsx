import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { PostExtended } from "@/lib/types/post";

interface PostFilterContextProps {
  imageSize: number | null;
  setImageSize: Dispatch<SetStateAction<number | null>>;
  postDate?: Date;
  setPostDate: Dispatch<SetStateAction<Date | undefined>>;
  postHashtag?: string;
  setPostHashtag: Dispatch<SetStateAction<string | undefined>>;
  postAuthor: string | null;
  setPostAuthor: Dispatch<SetStateAction<string | null>>;
  posts: PostExtended[] | null;
  setPosts: Dispatch<SetStateAction<PostExtended[] | null>>;
  allHashtags: string[] | null;
  setAllHashtags: Dispatch<SetStateAction<string[] | null>>;
}

const PostFilterContext = createContext<PostFilterContextProps | undefined>(
  undefined,
);

export const ImageFilterProvider = ({
  children,
  initialPosts,
  initialHashtags,
}: {
  children: ReactNode;
  initialPosts: PostExtended[] | null;
  initialHashtags: string[] | null;
}) => {
  const [imageSize, setImageSize] = useState<number | null>(null);
  const [postDate, setPostDate] = useState<Date | undefined>(new Date());
  const [postHashtag, setPostHashtag] = useState<string | undefined>();
  const [postAuthor, setPostAuthor] = useState<string | null>(null);
  const [posts, setPosts] = useState<PostExtended[] | null>(initialPosts);
  const [allHashtags, setAllHashtags] = useState<string[] | null>(
    initialHashtags,
  );

  return (
    <PostFilterContext.Provider
      value={{
        imageSize,
        setImageSize,
        postDate,
        setPostDate,
        postHashtag,
        setPostHashtag,
        postAuthor,
        setPostAuthor,
        posts,
        setPosts,
        allHashtags,
        setAllHashtags,
      }}
    >
      {children}
    </PostFilterContext.Provider>
  );
};

export const usePostFilterContext = () => {
  const context = useContext(PostFilterContext);
  if (!context) {
    throw new Error(
      "useImageFilterContext must be used within a ImageDownloadProvider",
    );
  }
  return context;
};
