"use server";

import { redirect } from "next/navigation";

export async function navigate(slug: string) {
  redirect(`/post/${slug}`);
}
