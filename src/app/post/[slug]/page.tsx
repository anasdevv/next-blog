import Modal from "@/components/ui/Modal";
import CommentSection from "@/components/ui/Post/Comment/CommentSection";
import LikeAndComment from "@/components/ui/Post/LikeAndComment";
import { PostDetails } from "@/components/ui/Post/PostDetails";
import { ScrollArea } from "@/components/ui/scroll-area";
import { api } from "@/trpc/server";
import type { Post } from "@prisma/client";
import { BiImageAdd } from "react-icons/bi";

interface PageProps {
  params: {
    slug: string;
  };
}
const page = async ({ params: { slug } }: PageProps) => {
  const post = await api.post.findBySlug.query({ slug });

  // await helpers.post.getCommentsByPostId.prefetch({
  //   postId: post.id,
  // });

  return (
    <>
      {!!post && <CommentSection postId={post.id} />}
      {!!post && <PostDetails post={post} />}{" "}
    </>
  );
};
// export const dynamic = "force-dynamic";

export default page;
