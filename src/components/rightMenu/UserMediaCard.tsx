import React from "react";
import Link from "next/link";
import Image from "next/image";
import { User } from "@prisma/client";
import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";

const UserMediaCard = async ({ user }: { user: User }) => {
  const { userId: currentUserId } = auth(); // Get current user's ID

  if (!currentUserId) return null; // If not authenticated, return null

  // Check if the current user is following the profile user
  const isFollowing = await prisma.follower.findFirst({
    where: {
      followerId: currentUserId,
      followingId: user.id,
    },
  });

  if (!isFollowing) return null; // If not following, return null

  // Fetch posts with media (images)
  const postWithMedia = await prisma.post.findMany({
    where: {
      userId: user.id,
      img: {
        not: null,
      },
    },
    take: 8,
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4">
      {/* top */}
      <div className="flex justify-between items-center font-medium">
        <span className="text-gray-500">User Media</span>
        <Link href="/" className="text-blue-500 text-xs">
          See all
        </Link>
      </div>

      {/* bottom */}
      <div className="flex gap-4 justify-start flex-wrap">
        {postWithMedia.length ? (
          postWithMedia.map((post) => (
            <div className="relative w-1/5 h-20" key={post.id}>
              <Image
                src={post.img!}
                alt=""
                fill
                className="object-cover rounded-md"
              />
            </div>
          ))
        ) : (
          "No media found"
        )}
      </div>
    </div>
  );
};

export default UserMediaCard;
