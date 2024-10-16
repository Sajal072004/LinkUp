"use client";

import { Story, User } from "@prisma/client";
import React, { useOptimistic, useState } from "react";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { CldUploadWidget } from "next-cloudinary";
import { addStory } from "@/lib/actions";

type StoryWithUser = Story & { user: User };

const StoryList = ({ stories, userId }: { stories: StoryWithUser[], userId: string }) => {
  const [storyList, setStoryList] = useState(stories);
  const [img, setImg] = useState<any>();
  const [previewImg, setPreviewImg] = useState<string | null>(null); // State for image preview
  const { user, isLoaded } = useUser();

  const add = async () => {
    if (!img?.secure_url) return;
    
    addOptimisticStories({
      id: Math.random(),
      img: img.secure_url,
      createdAt: new Date(Date.now()),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      userId: userId,
      user: {
        id: userId,
        username: "Sending ...",
        avatar: user?.imageUrl || "/noAvatar.png",
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
      const createdStory = await addStory(img.secure_url);
      setStoryList((prev) => [createdStory!, ...prev]);
      setImg(null);
    } catch (error) {
      // Handle error
    }
  };

  const [optimisticStories, addOptimisticStories] = useOptimistic(
    storyList,
    (state, value: StoryWithUser) => [value, ...state]
  );

  const handleImageClick = (url: string) => {
    setPreviewImg(url);
  };

  const handleClosePreview = () => {
    setPreviewImg(null);
  };

  return (
    <>
      <CldUploadWidget
        uploadPreset="linkup"
        onSuccess={(result, { widget }) => {
          setImg(result.info);
          widget.close();
        }}
      >
        {({ open }) => {
          return (
            <div className="flex flex-col items-center gap-2 cursor-pointer relative">
              <Image
                src={img?.secure_url || user?.imageUrl || "/noAvatar.png"}
                alt=""
                width={80}
                height={80}
                className="w-20 h-20 rounded-full ring-2 object-cover"
                onClick={() => open()}
              />
              {img ? (
                <form action={add}>
                  <button className="text-xs bg-blue-500 p-1 rounded-md text-white">Add</button>
                </form>
              ) : (
                <span className="font-medium">Add a Story</span>
              )}
            </div>
          );
        }}
      </CldUploadWidget>
      {/* Stories */}
      {optimisticStories.map((story) => (
        <div className="flex flex-col items-center gap-2 cursor-pointer" key={story.id} onClick={() => handleImageClick(story.img)}>
          <Image
            src={story.user.avatar || "/noAvatar.png"}
            alt=""
            width={80}
            height={80}
            className="w-20 h-20 rounded-full ring-2"
          />
          <span className="font-medium">{story.user.name || story.user.username}</span>
        </div>
      ))}

      {/* Image Preview Modal */}
      {previewImg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75" onClick={handleClosePreview}>
          <div className="relative max-h-full overflow-y-auto p-4">
            <button onClick={handleClosePreview} className="absolute top-2 right-2 text-white text-2xl">
              &times;
            </button>
            <Image
              src={previewImg}
              width={400} // Set desired width
              height={400} // Set desired height
              alt=""
              className="object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default StoryList;
