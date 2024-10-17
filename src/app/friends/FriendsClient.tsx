"use client"; // Enable client-side rendering

import React, { useState } from "react";
import Link from "next/link";
import { User } from "@prisma/client"; // Import the Prisma User model type
import { useUser } from "@clerk/nextjs"; // Import the useUser hook

// Define the props to include both followers and followings
const FriendsClient = ({ followers, followings }: { followers: User[]; followings: User[] }) => {
  const { user } = useUser(); // Get the current user
  const [newFriendUsername, setNewFriendUsername] = useState("");
  const [searchError, setSearchError] = useState<string | null>(null);

  const handleAddFriend = async () => {
    setSearchError(null); // Reset error before search
    if (!newFriendUsername) return;

    try {
      // You can handle the search and adding friend logic via an API route or another method
      
      // Redirect to the friend's profile if found
      window.location.href = `/profile/${newFriendUsername}`;
    } catch (error) {
      setSearchError("Error searching for the user");
    }
  };

  const copyLink = () => {
    if (user) {
      const link = `https://link-up-silk.vercel.app/profile/${user.username}`;
      navigator.clipboard.writeText(link)
        .then(() => alert("Profile link copied to clipboard!"))
        .catch(() => alert("Failed to copy link"));
    }
  };

  return (
    <div>
      {/* Share Profile Section */}
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <h2 className="text-lg font-semibold mb-2">Invite Friends</h2>
        <p className="text-gray-600 mb-4">Share your profile link with your friends!</p>
        <button
          onClick={copyLink}
          className="bg-blue-500 text-white rounded px-4 py-2"
        >
          Copy Profile Link
        </button>
      </div>

      {/* Add Friend Input */}
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Enter a username"
          value={newFriendUsername}
          onChange={(e) => setNewFriendUsername(e.target.value)}
          className="border rounded p-2 flex-grow"
        />
        <button
          onClick={handleAddFriend}
          className="bg-blue-500 text-white rounded px-4 ml-2"
        >
          Find User
        </button>
      </div>

      {/* Error Message */}
      {searchError && <p className="text-red-500">{searchError}</p>}

      {/* Followers List */}
      <h2 className="text-xl font-semibold mb-6">Followers</h2>
      <ul className="flex flex-col gap-6">
        {followers.map((follower) => (
          <li key={follower.id}>
            <Link href={`/profile/${follower.username}`}>
              <div className="flex items-center cursor-pointer">
                <img
                  src={follower.avatar || "/noAvatar.png"}
                  alt="avatar"
                  className="w-8 h-8 rounded-full mr-2"
                />
                <span className="text-lg">{follower.username}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {/* Followings List */}
      <h2 className="text-xl font-semibold mt-6 mb-6">Following</h2>
      <ul className="flex flex-col gap-6">
        {followings.map((following) => (
          <li key={following.id}>
            <Link href={`/profile/${following.username}`}>
              <div className="flex items-center cursor-pointer">
                <img
                  src={following.avatar || "/noAvatar.png"}
                  alt="avatar"
                  className="w-8 h-8 rounded-full mr-2"
                />
                <span className="text-lg">{following.username}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FriendsClient;
