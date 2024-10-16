
import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";

import React from "react";

import Link from "next/link";

const ProfileCard = async () => {

  const {userId} = auth();
  if(!userId) return null;
  console.log("this is left component" , userId);

  const user = await prisma.user.findFirst({
    
    where:{
      id:userId
    },
    include : {
      _count:{
        select:{
          followers:true
        }
       
      }
    }
  });
  console.log(user);

  if(!user) return null;

  const coverSrc = user?.cover || "/noCover.jpg";
const avatarSrc = user?.avatar || "/noAvatar.png";



const handleMyProfileClick = () => {
  console.log("button clicked");
}
  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm">
      <div className="h-20 relative">
  <Image
    src={coverSrc}
    alt="Cover Image"
    fill
    className="rounded-md object-cover"
  />
  <Image
    src={avatarSrc}
    alt="Avatar Image"
    width={48}
    height={48}
    className="rounded-full w-12 h-12 absolute left-0 right-0 m-auto -bottom-6 ring-1 ring-white z-10 object-cover"
  />
</div>


      <div className="h-20 flex flex-col gap-2 items-center mt-8 mb-2">
        <span className="font-semibold text-[18px] mb-1">{(user.name && user.surname) ? user.name + " " + user.surname : user.username}</span>
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
          <span className="text-xs text-gray-500 ">{user._count.followers} Followers</span>
        </div>
        <Link href={`/profile/${user.username}`}>
        <button className="bg-blue-500 text-white text-xs p-2 rounded-md mt-1">My Profile</button>
        </Link>
      </div>
    </div>
  );
};

export default ProfileCard;
