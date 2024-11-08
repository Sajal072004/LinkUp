'use client';

import { addComment, deleteComment } from "@/lib/actions"; // Import your functions
import { useUser } from "@clerk/nextjs";
import { Comment, User } from "@prisma/client";
import Image from "next/image";
import { useOptimistic, useState } from "react";

type CommentWithUser = Comment & { user: User };

const CommentList = ({
  comments,
  postId,
  postOwnerId, // Added postOwnerId prop
}: {
  comments: CommentWithUser[];
  postId: number;
  postOwnerId: string; // Include the post owner ID
}) => {
  const { user } = useUser();
  const [commentState, setCommentState] = useState(comments);
  const [desc, setDesc] = useState("");
  const [showComments, setShowComments] = useState(false);

  const add = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !desc) return;

    // Optimistically add the comment
    addOptimisticComment({
      id: Math.random(),
      desc,
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
      userId: user.id,
      postId: postId,
      user: {
        id: user.id,
        username: "Sending Please Wait...",
        avatar: user.imageUrl || "/noAvatar.png",
        cover: "",
        description: "",
        name: "",
        surname: "",
        city: "",
        work: "",
        school: "",
        website: "",
        createdAt: new Date(Date.now()),
      },
    });

    try {
      const createdComment = await addComment(postId, desc);
      setCommentState((prev) => [createdComment, ...prev]);
      setDesc(""); // Clear input after submission
    } catch (err) {
      // Handle error
    }
  };

  const handleDeleteComment = async (commentId: number, commentOwnerId: string) => {
    try {
      if (!user) return;

      // Always pass the comment owner's user ID to the deleteComment function
      await deleteComment(commentId, commentOwnerId);

      // Update UI
      setCommentState((prev) => prev.filter((comment) => comment.id !== commentId)); 
    } catch (err) {
      // Handle delete error
      console.error("Error deleting comment:", err);
    }
  };

  const [optimisticComments, addOptimisticComment] = useOptimistic(
    commentState,
    (state, value: CommentWithUser) => [value, ...state]
  );

  const toggleCommentsVisibility = () => {
    setShowComments(!showComments);
  };

  return (
    <>
      {user && (
        <div className="flex items-center gap-4">
          <Image
            src={user.imageUrl || "noAvatar.png"}
            alt=""
            width={32}
            height={32}
            className="w-8 h-8 rounded-full"
          />
          <form
            onSubmit={add}
            className="flex-1 flex items-center justify-between bg-slate-100 rounded-xl text-sm px-6 py-2 w-full"
          >
            <input
              type="text"
              placeholder="Write a comment..."
              className="bg-transparent outline-none flex-1"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 px-4 rounded-lg hover:bg-blue-600"
            >
              Send
            </button>
          </form>
        </div>
      )}

      <div className="mt-4">
        <button
          onClick={toggleCommentsVisibility}
          className="text-blue-500 hover:underline"
        >
          {showComments ? "Hide Comments" : "Show All Comments"}
        </button>

        {showComments && (
          <div className="">
            {optimisticComments.map((comment) => (
              <div className="flex gap-4 justify-between mt-6" key={comment.id}>
                {/* AVATAR */}
                <Image
                  src={comment.user.avatar || "noAvatar.png"}
                  alt=""
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full"
                />
                {/* COMMENT CONTENT */}
                <div className="flex flex-col gap-2 flex-1">
                  <span className="font-medium">
                    {comment.user.name && comment.user.surname
                      ? comment.user.name + " " + comment.user.surname
                      : comment.user.username}
                  </span>
                  <p>{comment.desc}</p>
                  <div className="flex items-center gap-8 text-xs text-gray-500 mt-2">
                    <div className="flex items-center gap-4">
                      <Image
                        src="/like.png"
                        alt=""
                        width={12}
                        height={12}
                        className="cursor-pointer w-4 h-4"
                      />
                      <span className="text-gray-300">|</span>
                      <span className="text-gray-500">0 Likes</span>
                    </div>
                    <div className="">Reply</div>
                  </div>
                </div>
                {/* DELETE BUTTON */}
                {user && (comment.userId === user.id || postOwnerId === user.id) && (
                  <button
                    onClick={() => handleDeleteComment(comment.id, comment.userId)} // Pass comment owner's ID
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                )}
                {/* MORE ICON */}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default CommentList;
