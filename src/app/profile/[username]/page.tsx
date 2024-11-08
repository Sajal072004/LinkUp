import React from "react";
import LeftMenu from "@/components/feed/LeftMenu";
import RightMenu from "@/components/rightMenu/RightMenu";
import prisma from "@/lib/client";
import Feed from "@/components/feed/Feed";
import Image from "next/image";
import { auth } from "@clerk/nextjs/server";
import UserInfoCard from "@/components/rightMenu/UserInfoCard";
import FriendRequests from "@/components/rightMenu/FriendRequests";
import { notFound } from "next/navigation";

const ProfilePage = async ({ params }: { params: { username: string } }) => {
  const username = params.username;

  // Fetch profile user details
  const user = await prisma.user.findFirst({
    where: {
      username: username,
    },
    include: {
      _count: {
        select: {
          followers: true,
          followings: true,
          posts: true,
        },
      },
    },
  });

  if (!user) return notFound();

  // Get current user ID
  const { userId: currentUserId } = auth();
  let isBlocked = false;
  let isFriendOrFollowing = false;
  let isCurrentUser = false;

  if (currentUserId) {
    // Check if the current user is the same as the profile user
    isCurrentUser = currentUserId === user.id;

    // Check if the current user is blocked
    const blockRes = await prisma.block.findFirst({
      where: {
        blockerId: user.id,
        blockedId: currentUserId,
      },
    });

    if (blockRes) isBlocked = true;

    // Check if the current user is following the profile user
    const followRes = await prisma.follower.findFirst({
      where: {
        followerId: currentUserId,
        followingId: user.id,
      },
    });

    // Treat followers as friends
    if (followRes || isCurrentUser) isFriendOrFollowing = true;
  }

  if (isBlocked) return notFound();

  return (
    <div className="flex gap-6 pt-6">
      <div className="hidden xl:block w-[20%]">
        <LeftMenu type="profile" />
      </div>

      <div className="w-full lg:w-[70%] xl:w-[50%]">
        <div className="md:hidden lg:hidden xl:hidden mb-12">
          <UserInfoCard user={user} />
        </div>
        <div className="md:hidden lg:hidden xl:hidden mb-12">
          <FriendRequests />
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center justify-center">
            <div className="w-full h-64 relative bg-gray-300">
              <Image
                src={user.cover || "/noCover.png"}
                alt=""
                fill
                className="sm:object-stretch object-contain rounded-md"
              />
              <Image
                src={user.avatar || "/noAvatar.png"}
                alt=""
                height={128}
                width={128}
                className="object-cover w-32 h-32 rounded-full absolute left-0 right-0 m-auto -bottom-16 ring-4 ring-white"
              />
            </div>
            <h1 className="mt-20 mb-4 text-2xl font-medium">
              {user.name && user.surname
                ? user.name + " " + user.surname
                : user.username}
            </h1>
            <div className="flex items-center justify-center gap-12 mb-4">
              <div className="flex flex-col items-center">
                <span className="font-medium">{user._count.posts}</span>
                <span className="text-sm">Posts</span>
              </div>

              <div className="flex flex-col items-center">
                <span className="font-medium">{user._count.followings}</span>
                <span className="text-sm">Followers</span>
              </div>

              <div className="flex flex-col items-center">
                <span className="font-medium">{user._count.followers}</span>
                <span className="text-sm">Following</span>
              </div>
            </div>
          </div>

          {/* Render Feed only if the current user is a friend, following, or the same user */}
          {isFriendOrFollowing ? (
            <Feed username={user.username} />
          ) : (
            <div className="text-center pb-12">
              Follow this user to see their posts
            </div>
          )}
        </div>
      </div>

      <div className="hidden lg:block w-[30%]">
        <RightMenu user={user} />
      </div>
    </div>
  );
};

export default ProfilePage;
