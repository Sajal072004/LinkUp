"use client";

import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import React, { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import AddPostButton from "./AddPostButton";
import { addPost } from "@/lib/actions";

const AddPost = () => {
  const { user, isLoaded } = useUser();
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState<any>(null);

  if (!isLoaded) return "Loading...";

  const handleSubmit = async (formData: FormData) => {
    // Call the addPost function with formData and image URL
    await addPost(formData, img?.secure_url || "");

    // Reset the image and description after successful submission
    setImg(null);
    setDesc(""); // Clear the input box
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg flex gap-4 justify-between text-sm">
      {/* avatar */}
      <Image
        src={user?.imageUrl || "/noAvatar.png"}
        alt=""
        className="w-12 h-12 object-fit rounded-full"
        width={48}
        height={48}
      />

      {/* post */}
      <div className="flex-1">
        {/* text input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            handleSubmit(formData);
          }}
          className="flex gap-4"
        >
          <textarea
            placeholder="What's on your mind?"
            name="desc"
            value={desc} // Bind value to the state
            onChange={(e) => setDesc(e.target.value)}
            className="bg-slate-100 rounded-lg flex-1 p-2"
          ></textarea>
          <div>
            <Image
              src="/emoji.png"
              alt=""
              className="w-5 h-5 cursor-pointer self-end"
              width={20}
              height={20}
            />
            <AddPostButton />
          </div>
        </form>

        {/* Image preview */}
        {img && (
          <div className="mt-4">
            <Image
              src={img.secure_url}
              alt="Image preview"
              className="rounded-lg"
              width={200}
              height={200}
            />
            <button
              onClick={() => setImg(null)}
              className="text-red-500 hover:underline mt-2"
            >
              Remove
            </button>
          </div>
        )}

        {/* post options */}
        <div className="flex items-center gap-4 text-gray-400 mt-2 justify-start flex-wrap">
          <CldUploadWidget
            uploadPreset="linkup"
            onSuccess={(result, { widget }) => {
              setImg(result.info); // Set the selected image
              widget.close(); // Close the widget
            }}
          >
            {({ open }) => (
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => open()}
              >
                <Image src="/addimage.png" alt="" width={20} height={20} />
                Photo
              </div>
            )}
          </CldUploadWidget>

          <div className="flex items-center gap-2 cursor-pointer">
            <Image src="/addVideo.png" alt="" width={20} height={20} />
            Video
          </div>

          <div className="flex items-center gap-2 cursor-pointer">
            <Image src="/poll.png" alt="" width={20} height={20} />
            Poll
          </div>

          <div className="flex items-center gap-2 cursor-pointer">
            <Image src="/addevent.png" alt="" width={20} height={20} />
            Event
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
