"use client"

import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import React, { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import AddPostButton from "./AddPostButton";
import { addPost } from "@/lib/actions";

const AddPost = () => {
  
  const {user , isLoaded} = useUser();
  const [desc , setDesc] = useState("");
  const [img , setImg] = useState<any>();

  if(!isLoaded) return "Loading..."

  return (
    <div className="p-4 bg-white shadow-md rounded-lg flex gap-4 justify-between text-sm">
      {/* avatar */}
      <Image
        src={user?.imageUrl || "/noAvatar.png"}
        alt=""
        className="w-12 h-12 object-fit rounded-full"
        width={48}
        height={48}
      ></Image>
      {/* post */}
      <div className="flex-1">
        {/* text input */}
        <form action={(formData)=> addPost(formData , img?.secure_url || "")} className="flex gap-4">
          <textarea
            placeholder="whats on your mind?"
            name="desc"
            onChange={(e)=>setDesc(e.target.value)}
            id=""
            className="bg-slate-100 rounded-lg flex-1 p-2"
          ></textarea>
          <div>
          <Image
            src="/emoji.png"
            alt=""
            className="w-5 h-5 cursor-pointer self-end"
            width={20}
            height={20}
          ></Image>
          <AddPostButton/>
          </div>
        </form>

        {/* post options */}
        <div className="flex items-center gap-4 text-gray-400 mt-2 justify-start flex-wrap">

        <CldUploadWidget
              uploadPreset="linkup"
              onSuccess={(result , {widget}) => {setImg(result.info); widget.close()}}
            >
              {({ open }) => {
                return (
                  <div className="flex items-center gap-2 cursor-pointer" onClick={()=> open()}>
                  <Image src="/addimage.png" alt="" width={20} height={20}></Image>
                  Photo
                </div>
               
                );
              }}
            </CldUploadWidget>
         

          <div className="flex items-center gap-2 cursor-pointer">
            <Image src="/addVideo.png" alt="" width={20} height={20}></Image>
            Video
          </div>

          <div className="flex items-center gap-2 cursor-pointer">
            <Image src="/poll.png" alt="" width={20} height={20}></Image>
            Poll
          </div>

          <div className="flex items-center gap-2 cursor-pointer">
            <Image src="/addEvent.png" alt="" width={20} height={20}></Image>
            Event
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
