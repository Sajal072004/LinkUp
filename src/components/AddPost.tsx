import Image from "next/image";
import React from "react";

const AddPost = () => {
  return (
    <div className="p-4 bg-white shadow-md rounded-lg flex gap-4 justify-between text-sm">
      {/* avatar */}
      <Image
        src="https://images.pexels.com/photos/16465970/pexels-photo-16465970/free-photo-of-a-woman-posing-in-a-vast-yellow-flower-field.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt=""
        className="w-12 h-12 object-cover rounded-full"
        width={48}
        height={48}
      ></Image>
      {/* post */}
      <div className="flex-1">
        {/* text input */}
        <div className="flex gap-4">
          <textarea placeholder="whats on your mind?" name="" id="" className="bg-slate-100 rounded-lg flex-1 p-2"></textarea>
          <Image
            src="/emoji.png"
            alt=""
            className="w-5 h-5 cursor-pointer self-end"
            width={20}
            height={20}
          ></Image>
        </div>

        {/* post options */}
        <div className="flex items-center gap-4 text-gray-400 mt-2 justify-start flex-wrap">
          <div className="flex items-center gap-2 cursor-pointer">
          <Image
            src="/addImage.png"
            alt=""
            width={20}
            height={20}
          ></Image>
          Photo

          </div>

          <div className="flex items-center gap-2 cursor-pointer">
          <Image
            src="/addVideo.png"
            alt=""
            width={20}
            height={20}
          ></Image>
          Video

          </div>

          <div className="flex items-center gap-2 cursor-pointer">
          <Image
            src="/poll.png"
            alt=""
            width={20}
            height={20}
          ></Image>
          Poll

          </div>

          <div className="flex items-center gap-2 cursor-pointer">
          <Image
            src="/addEvent.png"
            alt=""
            width={20}
            height={20}
          ></Image>
          Event

          </div>

          

        </div>
      </div>
    </div>
  );
};

export default AddPost;
