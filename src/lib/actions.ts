"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "./client";

export const switchFollow = async (userId: string) => {
  const { userId: currentUserId } = auth();

  // Log currentUserId and userId to debug if they are correct
  console.log("Current User ID:", currentUserId);
  console.log("Target User ID:", userId);

  if (!currentUserId) {
    throw new Error("User is not authenticated");
  }

  try {
    // Check if the current user is already following the target user
    const existingFollow = await prisma.follower.findFirst({
      where: {
        followerId: currentUserId,
        followingId: userId,
      },
    });

    // Log if a follow relation exists or not
    console.log("Existing follow relation:", existingFollow);

    if (existingFollow) {
      // If already following, unfollow the user
      await prisma.follower.delete({
        where: {
          id: existingFollow.id,
        },
      });
      console.log("Unfollowed the user");
    } else {
      // Check if there's already a pending follow request
      const existingFollowRequest = await prisma.followRequest.findFirst({
        where: {
          senderId: currentUserId,
          receiverId: userId,
        },
      });

      // Log if a follow request exists
      console.log("Existing follow request:", existingFollowRequest);

      if (existingFollowRequest) {
        // If a follow request exists, cancel it
        await prisma.followRequest.delete({
          where: {
            id: existingFollowRequest.id,
          },
        });
        console.log("Follow request canceled");
      } else {
        // Otherwise, send a new follow request
        await prisma.followRequest.create({
          data: {
            senderId: currentUserId,
            receiverId: userId,
          },
        });
        console.log("Follow request sent");
      }
    }
  } catch (error) {
    console.error("Error in switchFollow:", error);
    
  }
};


export const switchBlock = async (userId:string) => {
  const {userId:currentUserId} = auth();
  if(!currentUserId) throw new Error("user not authenticated")
  
  try {
    const existingBlock =  await prisma.block.findFirst({
      where:{
        blockerId:currentUserId,
        blockedId:userId
      }
    });

    if(existingBlock){
      await prisma.block.delete({
        where:{
          id:existingBlock.id
        }
      })
    }
    else {
      await prisma.block.create({
        data:{
          blockerId:currentUserId,
          blockedId:userId
        }
      })
    }
    
  } catch (error) {
    console.log(error);
    throw new Error("something went wrong");
  }
}