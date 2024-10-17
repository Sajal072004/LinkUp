"use client"; // Enable client-side rendering

import React, { useState } from "react";
import Link from "next/link";
import { User } from "@prisma/client"; // Import the Prisma User model type

// Define the props to include both followers and followings
const FriendsClient = ({ followers, followings }: { followers: User[]; followings: User[] }) => {
  const [newFriendUsername, setNewFriendUsername] = useState("");
  const [searchError, setSearchError] = useState<string | null>(null);

  const handleAddFriend = async () => {
    setSearchError(null); // Reset error before search
    if (!newFriendUsername) return;

    try {
      // You can handle the search and adding friend logic via an API route or another method
      

      
        // Redirect to the friend's profile if found
        window.location.href = `/profile/${newFriendUsername}`;
      } 
      
     catch (error) {
      setSearchError("Error searching for the user");
    }
  };

  return (
    <div>
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
          <li key={follower.id}
          >
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
          <li key={following.id} >
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
