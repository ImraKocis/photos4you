"use server";

import { Post, PostExtended } from "@/lib/types/post";
import { getSession } from "@/app/lib-server-only/auth/session";
import {
  CreatePostData,
  FilterPostsQueryData,
  UpdatePostData,
} from "@/app/actions/post/interface/post-actions-interfaces";

export async function getAllPosts(): Promise<PostExtended[] | null> {
  const response = await fetch(`${process.env.API_BASE_URL}/post/all`, {
    next: { revalidate: 10, tags: ["posts"] },
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

export async function getFilterPosts(
  data: FilterPostsQueryData,
): Promise<PostExtended[] | null> {
  const queryData = handleQueryData(data);
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

  if (!response.ok) return null;
  return await response.json();
}

export async function deletePost(id: string): Promise<boolean | null> {
  const session = await getSession();
  const response = await fetch(`${process.env.API_BASE_URL}/post/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${session.jwt}`,
    },
  });

  if (!response.ok) return null;
  return await response.json();
}

export async function getHashtags(): Promise<string[] | null> {
  const response = await fetch(`${process.env.API_BASE_URL}/post/hashtags`);
  if (!response.ok) return null;
  return await response.json();
}

function handleQueryData({
  fullName,
  hashtag,
  createdAt,
  size,
}: FilterPostsQueryData): URLSearchParams {
  const queryData = new URLSearchParams();

  if (fullName) queryData.append("fullName", fullName);
  if (hashtag) queryData.append("hashtag", hashtag);
  if (size) queryData.append("size", size.toString());
  if (createdAt) queryData.append("createdAt", createdAt.toISOString());

  return queryData;
}
