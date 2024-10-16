import Image from "next/image";
import React, { Suspense } from "react";
import Comments from "./Comments";
import {Post as PostType, User } from "@prisma/client";
import PostInteraction from "./PostInteraction";
import PostInfo from "./PostInfo";
import { auth } from "@clerk/nextjs/server";
import ImagePreview from "./ImagePreview";

type FeedPostType = PostType & {user:User} & {likes: [{userId:string}]} & {_count: {comments:number}}

const Post = ({post}:{post:FeedPostType}) => {
  const {userId} = auth();
  return (
    <div className="flex flex-col gap-4">
      {/* User */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image
            src={post.user.avatar || "/noAvatar.png"}
            width={40}
            height={40}
            alt=""
            className="w-10 h-10 rounded-full"
          ></Image>
          <span className="font-medium">{post.user.name && post.user.surname ? post.user.name + " " + post.user.surname : post.user.username}</span>
        </div>
        {userId === post.user.id && <PostInfo postId={post.id} />}
      </div>

      {/* desc */}
      <div className="flex flex-col gap-4">
      {post.img &&  <div className="w-full min-h-96 relative bg-gray-200">
          {/* <Image
            src={post.img}
            fill
            alt=""
            className="object-contain rounded-md"
          ></Image> */}
          <ImagePreview src={post.img}/>
        </div>}
        <p className="px-1">
          {post.desc}
        </p>
      </div>

      {/* interaction */}
      <Suspense fallback="Loading ...">
      <PostInteraction postId = {post.id} likes={post.likes.map(like => like.userId)} commentNumber={post._count.comments} />
      </Suspense>

      <Suspense fallback="Loading ...">
      
      <Comments postId={post.id} />

      </Suspense>
      
    </div>
  );
};

export default Post;
