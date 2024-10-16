import prisma from '@/lib/client';
import { auth } from '@clerk/nextjs/server';
import React from 'react';
import StoryList from './StoryList';

const Stories = async () => {
  const { userId: currentUserId } = auth();
  if (!currentUserId) return null;

  // Fetch the IDs of users that the current user is following
  const following = await prisma.follower.findMany({
    where: {
      followerId: currentUserId,
    },
    select: {
      followingId: true, // Get the ID of users that current user is following
    },
  });

  // Extract the following user IDs
  const followingIds = following.map(f => f.followingId);

  // Fetch stories from the current user and all users they are following
  const stories = await prisma.story.findMany({
    where: {
      expiresAt: {
        gt: new Date(), // Only fetch stories that have not expired
      },
      OR: [
        { userId: currentUserId }, // Current user's stories
        { userId: { in: followingIds } }, // Stories from users being followed
      ],
    },
    include: {
      user: true, // Include user details
    },
  });

  return (
    <div className='p-4 bg-white rounded-lg shadow-md overflow-scroll text-xs'>
      <div className='flex gap-8 w-max'>
        <StoryList stories={stories} userId={currentUserId} />
      </div>
    </div>
  );
};

export default Stories;
