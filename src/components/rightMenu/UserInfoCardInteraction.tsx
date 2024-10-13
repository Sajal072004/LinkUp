"use client";

import React, { useState, useEffect } from "react";
import { switchFollow } from "@/lib/actions";

import {useOptimistic} from 'react'
const UserInfoCardInteraction = ({
  currentUserId,
  userId,
  isUserBlocked,
  isFollowing,
  isFollowingSent,
}: {
  currentUserId: string | null;
  userId: string;
  isUserBlocked: boolean;
  isFollowing: boolean;
  isFollowingSent: boolean;
}) => {
  const [userState, setUserState] = useState({
    following: isFollowing,
    blocked: isUserBlocked,
    followingRequestSent: isFollowingSent,
  });

  useEffect(()=>  {
     switchOptimisticFollow("follow");
      setUserState((prev) => ({
        ...prev,
        following: prev.following && false,
        followingRequestSent: !prev.following && !prev.followingRequestSent ? true : false,
      }));

      switchOptimisticFollow("block");
    try {
      switchFollow(userId);
      setUserState((prev) => ({
        ...prev,
        blocked: !prev.blocked,
      }))
      
    } catch (error) {
      console.log(error);
    }
      
  },[])

  const follow = async () => {
    switchOptimisticFollow("follow");
    try {
      await switchFollow(userId);
      setUserState((prev) => ({
        ...prev,
        following: prev.following && false,
        followingRequestSent: !prev.following && !prev.followingRequestSent ? true : false,
      }));
    } 
    catch (error) {
      console.log("error posting the data",error);
    }
  };

  const block = async () => {
    switchOptimisticFollow("block");
    try {
      await switchFollow(userId);
      setUserState((prev) => ({
        ...prev,
        blocked: !prev.blocked,
      }))
      
    } catch (error) {
      console.log(error);
    }
  }

  const [optimisticFollow , switchOptimisticFollow] = useOptimistic(
    userState,
    (state,value:"follow" | "block")=> value === "follow" ? ({
      ...state,
      following:state.following && false,
      followingRequestSent: !state.following && !state.followingRequestSent ? true : false
    }) : {
      ...state, blocked:!state.blocked
    }

  )

  return (
    <>
      <form action={follow}>
        <button type='submit' className="w-full bg-blue-500 text-white text-sm rounded-md p-2">
          {optimisticFollow.following
            ? "Following"
            : optimisticFollow.followingRequestSent
            ? "Friend Request Sent"
            : "Follow"}
        </button>
      </form>
      <form action={block} className="self-end">
        <button type="submit">
        <span className="text-red-400 text-xs cursor-pointer">
          {optimisticFollow.blocked ? "Unblock User" : "Block User"}
        </span>
        </button>
      </form>
    </>
  );
};

export default UserInfoCardInteraction;
