import LeftMenu from "@/components/feed/LeftMenu";
import RightMenu from "@/components/rightMenu/RightMenu";
import prisma from "@/lib/client";
import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import FriendsClient from "./FriendsClient"; // Import the client-side component

const FriendsPage = async () => {
  const { userId: currentUserId } = auth(); // Get current user ID

  if (!currentUserId) return notFound(); // Return 404 if no user is found

  // Fetch followers (people who follow you)
  const followers = await prisma.follower.findMany({
    where: {
      followingId: currentUserId, // You are the one being followed
    },
    include: {
      follower: true, // Include follower user info
    },
  });

  // Fetch followings (people you follow)
  const followings = await prisma.follower.findMany({
    where: {
      followerId: currentUserId, // You are following them
    },
    include: {
      following: true, // Include following user info
    },
  });

  // Fetch all users
  const allUsers = await prisma.user.findMany();

  return (
    <div className="flex gap-6 pt-6">
      <div className="hidden xl:block w-[20%]">
        <LeftMenu type="profile" />
      </div>

      <div className="w-full lg:w-[70%] xl:w-[50%]">
        <h1 className="text-2xl font-medium mb-4">Friends List</h1>

        {/* Pass followers, followings, and allUsers as props to FriendsClient */}
        <FriendsClient
          followers={followers.map((f) => f.follower)} // People who follow you
          followings={followings.map((f) => f.following)} // People you follow
          allUsers={allUsers} // Pass all users
        />
      </div>

      <div className="hidden lg:block w-[30%]">
        <RightMenu />
      </div>
    </div>
  );
};

export default FriendsPage;
