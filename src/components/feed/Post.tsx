import Image from "next/image";
import React from "react";
import Comments from "./Comments";
import {Post as PostType, User } from "@prisma/client";
import PostInteraction from "./PostInteraction";

type FeedPostType = PostType & {user:User} & {likes: [{userId:string}]} & {_count: {comments:number}}

const Post = ({post}:{post:FeedPostType}) => {
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
        <Image src="/more.png" width={16} height={16} alt=""></Image>
      </div>

      {/* desc */}
      <div className="flex flex-col gap-4">
      {post.img &&  <div className="w-full min-h-96 relative">
          <Image
            src={post.img}
            fill
            alt=""
            className="object-cover rounded-md"
          ></Image>
        </div>}
        <p className="px-1">
          {post.desc}
        </p>
      </div>

      {/* interaction */}
      <PostInteraction postId = {post.id} likes={post.likes.map(like => like.userId)} commentNumber={post._count.comments} />
      
      <Comments postId={post.id} />
    </div>
  );
};

export default Post;
