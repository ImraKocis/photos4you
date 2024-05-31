"use server";

import { Post, PostExtended } from "@/lib/types/post";
import { getSession } from "@/app/lib/auth/session";

interface FilterPostsQueryData {
  size?: number;
  createdAt?: Date;
  hashtag?: string;
  fullName?: string;
}

interface CreatePostData {
  userId: string;
  description: string;
  hashtags: string[];
  image: {
    url: string;
    size: string;
  };
}

interface UpdatePostData {
  description?: string;
  hashtags?: string[];
}

export async function getAllPosts(): Promise<PostExtended[] | null> {
  const response = await fetch(`${process.env.API_BASE_URL}/post/all`, {
    next: { revalidate: 10 },
  });
  if (!response.ok) return null;
  return await response.json();
}

export async function createPost(data: CreatePostData): Promise<Post | null> {
  const tokens = await getSession();
  if (!tokens.jwt) return null;
  const response = await fetch(`${process.env.API_BASE_URL}/post/create`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${tokens.jwt}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) return null;
  return await response.json();
}

export async function getLatestPosts(): Promise<PostExtended[] | null> {
  const response = await fetch(`${process.env.API_BASE_URL}/post/latest`, {
    next: { revalidate: 5 },
  });
  if (!response.ok) return null;
  return await response.json();
}

export async function getFilterPosts({
  size,
  fullName,
  hashtag,
  createdAt,
}: FilterPostsQueryData): Promise<PostExtended[] | null> {
  const queryData = new URLSearchParams();
  if (fullName) queryData.append("fullName", fullName);

  if (hashtag) queryData.append("hashtag", hashtag);

  if (size) queryData.append("size", size.toString());

  if (createdAt) queryData.append("createdAt", createdAt.toISOString());

  const response = await fetch(
    `${process.env.API_BASE_URL}/post/find?` + queryData,
  );

  if (!response.ok) return null;
  return await response.json();
}

export async function getUserPosts(): Promise<PostExtended[] | null> {
  const tokens = await getSession();
  const response = await fetch(`${process.env.API_BASE_URL}/post/user`, {
    headers: {
      Authorization: `Bearer ${tokens.jwt}`,
    },
  });
  if (!response.ok) return null;
  return await response.json();
}

export async function updatePost(
  id: string,
  data: UpdatePostData,
): Promise<Post | null> {
  const tokens = await getSession();
  const response = await fetch(`${process.env.API_BASE_URL}/post/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokens.jwt}`,
    },
  });
  console.log(response);
  if (!response.ok) return null;
  const res = await response.json();
  console.log(res);
  return res;
}

export async function getHashtags(): Promise<string[] | null> {
  const response = await fetch(`${process.env.API_BASE_URL}/post/hashtags`);
  if (!response.ok) return null;
  return await response.json();
}
