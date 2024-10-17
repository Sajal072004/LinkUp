import prisma from '@/lib/client';
import Image from 'next/image';
import React from 'react';
import CommentList from './CommentList';

const Comments = async ({ postId }: { postId: number }) => {
  // Fetch the post along with its owner
  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
    include: {
      user: true, // Include the user who owns the post
    },
  });

  // Fetch comments associated with the post
  const comments = await prisma.comment.findMany({
    where: {
      postId,
    },
    include: {
      user: true, // Include user information for comments
    },
  });

  // Check if the post exists
  if (!post) {
    return <p>Post not found.</p>; // Handle post not found case
  }

  return (
    <div>
      {/* Pass the post owner's ID to CommentList */}
      <CommentList comments={comments} postId={postId} postOwnerId={post.user.id} />
    </div>
  );
};

export default Comments;
