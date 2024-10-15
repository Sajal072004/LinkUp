"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "./client";
import { z } from "zod";
import { OneTimeTokenIn } from "svix";
import { revalidatePath } from "next/cache";

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

export const switchBlock = async (userId: string) => {
  const { userId: currentUserId } = auth();
  if (!currentUserId) throw new Error("user not authenticated");

  try {
    const existingBlock = await prisma.block.findFirst({
      where: {
        blockerId: currentUserId,
        blockedId: userId,
      },
    });

    if (existingBlock) {
      await prisma.block.delete({
        where: {
          id: existingBlock.id,
        },
      });
    } else {
      await prisma.block.create({
        data: {
          blockerId: currentUserId,
          blockedId: userId,
        },
      });
    }
  } catch (error) {
    console.log(error);
    throw new Error("something went wrong");
  }
};

export const acceptFollowRequest = async (userId: string) => {
  const { userId: currentUserId } = auth();

  if (!currentUserId) throw new Error("User is not authenticated");

  try {
    const existingFollowRequest = await prisma.followRequest.findFirst({
      where: {
        senderId: userId,
        receiverId: currentUserId,
      },
    });

    if (existingFollowRequest) {
      await prisma.followRequest.delete({
        where: {
          id: existingFollowRequest.id,
        },
      });

      await prisma.follower.create({
        data: {
          followerId: userId,
          followingId: currentUserId,
        },
      });
    }
  } catch (error) {
    console.log(error);
    throw new Error("something went wrong");
  }
};


export const declineFollowRequest = async (userId: string) => {
  const { userId: currentUserId } = auth();

  if (!currentUserId) throw new Error("User is not authenticated");

  try {
    const existingFollowRequest = await prisma.followRequest.findFirst({
      where: {
        senderId: userId,
        receiverId: currentUserId,
      },
    });

    if (existingFollowRequest) {
      await prisma.followRequest.delete({
        where: {
          id: existingFollowRequest.id,
        },
      });

      
    }
  } catch (error) {
    console.log(error);
    throw new Error("something went wrong");
  }
};

export const updateProfile = async (prevState: {success:boolean , error:boolean} , payload: {formData : FormData, cover:string}) => {

  const {formData , cover} = payload;

  const fields = Object.fromEntries(formData);
  const filteredFields = Object.fromEntries(
    Object.entries(fields).filter(([_,value])=> value !== "")
  )

  console.log(fields);

  const Profile = z.object({
    cover:z.string().optional(),
    name:z.string().max(60).optional(),
    surname:z.string().max(60).optional(),
    description:z.string().max(255).optional(),
    city:z.string().max(60).optional(),
    school:z.string().max(60).optional(),
    work:z.string().max(60).optional(),
    website:z.string().max(60).optional()
  })

  const validatedFields = Profile.safeParse({cover, ...filteredFields});

  if(!validatedFields.success){
    console.log(validatedFields.error.flatten().fieldErrors)
    return {success:false , error: true}
  }

  const {userId} = auth();

  if(!userId) return {success:false , error: true};

  try {

    await prisma.user.update({
      where:{
        id:userId
      },
      data: validatedFields.data
    });

    return {success:true , error: false}
    
  } catch (error) {
    console.log(error);
    return {success:false , error: true}

  }


}

export const switchLike = async (postId:number) => {
  const {userId} = auth();
  if(!userId) throw new Error("User not authenticated")

  try {

    const existingLike = await prisma.like.findFirst({
      where:{
        postId,
        userId
      }
    });

    if(existingLike){
      await prisma.like.delete({
        where:{
          id:existingLike.id
        }
      })
    }
    else {
      await prisma.like.create({
        data:{
          postId,
          userId
        }
      })
    }
    
  } catch (error) {
    console.log(error);
  }
}

export const addComment = async(postId:number , desc:string) => {

  const {userId} = auth();
  if(!userId) throw new Error("User is not authenticated");

  try {

    const createdComment = prisma.comment.create({
      data:{
        desc,
        userId,
        postId
      }, include:{
        user:true,
      }
    });
    return createdComment;
    
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong")
  }

};


export const addPost = async (formData:FormData , img:string) => {
    const desc = formData.get("desc") as string;
   

    const Desc = z.string().min(1).max(255);

    const validatedDesc = Desc.safeParse(desc);

    if(!validatedDesc.success){
      return;
    }

    const {userId} = auth();
    if(!userId) throw new Error("User is not authenticated");

    try {
      
      await prisma.post.create({
        data:{
          desc:validatedDesc.data,
          userId,
          img
        }
      });
      revalidatePath("/")
    } catch (error) {
      console.log(error);
    }
   
}



export const addStory = async ( img:string) => {
  

  const {userId} = auth();
  if(!userId) throw new Error("User is not authenticated");

  try {
    const existingStory = await prisma.story.findFirst({
      where:{
        userId
      }
    });

    if(existingStory){
      await prisma.story.delete({
        where:{
          id:existingStory.id
        }
      })
    }
    const createdStory = await prisma.story.create({
      data: {
        userId,
        img,
        expiresAt: new Date(Date.now() + 24*60*60 *1000)
      },
      include:{
        user:true
      }
    })
    
    return createdStory;
  } catch (error) {
    console.log(error);
  }
 
}

export const deletePost = async ( postId:number) => {
  const {userId} = auth();
  if(!userId) throw new Error("User is not authenticated");

  try {
    await prisma.post.delete({
      where:{
        id:postId,
        userId:userId
      }
    });
    revalidatePath("/");
  } catch (error) {
    console.log(error)
  }
}
