import Image from "next/image";
import React from "react";

const ProfileCard = () => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm">
      <div className="h-20 relative">
        <Image
          src="https://images.pexels.com/photos/27015905/pexels-photo-27015905/free-photo-of-sandstone-rocky-bay-with-narrow-beach.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load"
          alt=""
          fill
          className="rounded-md object-cover"
        />
        <Image
          src="https://images.pexels.com/photos/19184509/pexels-photo-19184509/free-photo-of-dry-brown-autumn-maple-leaves-on-kraft-paper.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load"
          alt=""
          width={48}
          height={48}
          className="rounded-full w-12 h-12 absolute left-0 right-0 m-auto -bottom-6 ring-1 ring-white z-10 object-cover"
        />
      </div>

      <div className="h-20 flex flex-col gap-2 items-center mt-8 mb-2">
        <span className="font-semibold text-[18px] mb-1">Sajal Namdeo</span>
        <div className="flex items-center gap-4">
          <div className="flex">
            <Image
              src="https://images.pexels.com/photos/19184509/pexels-photo-19184509/free-photo-of-dry-brown-autumn-maple-leaves-on-kraft-paper.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load"
              alt=""
              width={12}
              height={12}
              className="rounded-full w-3 h-3 "
            />
            <Image
              src="https://images.pexels.com/photos/19184509/pexels-photo-19184509/free-photo-of-dry-brown-autumn-maple-leaves-on-kraft-paper.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load"
              alt=""
              width={12}
              height={12}
              className="rounded-full w-3 h-3 "
            />
            <Image
              src="https://images.pexels.com/photos/19184509/pexels-photo-19184509/free-photo-of-dry-brown-autumn-maple-leaves-on-kraft-paper.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load"
              alt=""
              width={12}
              height={12}
              className="rounded-full w-3 h-3"
            />
          </div>
          <span className="text-xs text-gray-500 ">500 Followers</span>
        </div>
        <button className="bg-blue-500 text-white text-xs p-2 rounded-md mt-1">My Profile</button>
      </div>
    </div>
  );
};

export default ProfileCard;
