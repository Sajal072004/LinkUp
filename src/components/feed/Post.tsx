import Image from "next/image";
import React from "react";
import Comments from "./Comments";

const Post = () => {
  return (
    <div className="flex flex-col gap-4">
      {/* User */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image
            src="https://images.pexels.com/photos/27357696/pexels-photo-27357696/free-photo-of-facade-of-the-wyndham-batumi-hotel-in-batumi-georgia.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            width={40}
            height={40}
            alt=""
            className="w-10 h-10 rounded-full"
          ></Image>
          <span className="font-medium">Sajal Namdeo</span>
        </div>
        <Image src="/more.png" width={16} height={16} alt=""></Image>
      </div>

      {/* desc */}
      <div className="flex flex-col gap-4">
        <div className="w-full min-h-96 relative">
          <Image
            src="https://images.pexels.com/photos/27357696/pexels-photo-27357696/free-photo-of-facade-of-the-wyndham-batumi-hotel-in-batumi-georgia.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            fill
            alt=""
            className="object-cover rounded-md"
          ></Image>
        </div>
        <p className="px-1">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
          maxime possimus temporibus quas non! Perspiciatis atque, eum, quo,
          quaerat amet necessitatibus a voluptatibus laboriosam expedita aut
          iste magnam totam eaque.
        </p>
      </div>

      {/* interaction */}
      <div className="flex items-center justify-between text-sm my-4">
        <div className="flex gap-8">
          <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl">
            <Image
              src="/like.png"
              width={16}
              height={16}
              alt=""
              className="cursor-pointer"
            ></Image>
            <span className="text-gray-300">|</span>
            <span className="text-gray-500">
              123<span className="hidden md:inline"> Likes</span>
            </span>
          </div>

          <div className="flex items-center gap-4 bg-slate-100 p-2 rounded-xl">
            <Image
              src="/comment.png"
              width={16}
              height={16}
              alt=""
              className="cursor-pointer"
            ></Image>
            <span className="text-gray-300">|</span>
            <span className="text-gray-500">
              123<span className="hidden md:inline"> Comments</span>
            </span>
          </div>
        </div>

        <div className="">
          <div className="flex items-center gap-4 bg-slate-100 p-2 rounded-xl">
            <Image
              src="/share.png"
              width={16}
              height={16}
              alt=""
              className="cursor-pointer"
            ></Image>
            <span className="text-gray-300">|</span>
            <span className="text-gray-500">
              123<span className="hidden md:inline"> Shares</span>
            </span>
          </div>
        </div>
      </div>
      <Comments />
    </div>
  );
};

export default Post;
