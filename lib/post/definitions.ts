import { z } from "zod";

export const createPostFormSchema = z
  .object({
    description: z.string().max(300, "Description can be 300 characters long"),
    hashtags: z.string().min(2, "It has to be a hashtag"),
  })
  .refine(
    (val) =>
      val.hashtags.split(" ").filter((str) => str.trim() !== "").length > 0,
    {
      message: "Please use only one space between hashtags",
      path: ["hashtags"],
    },
  )
  .refine(
    (val) => val.hashtags.split(" ").every((str) => str.trim().startsWith("#")),
    {
      message: "Each hashtag must start with #",
      path: ["hashtags"],
    },
  );
