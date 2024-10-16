import React from 'react';
import { User } from '@prisma/client';

const MyProfileButton = ({ user }: { user: User }) => {
  return (
    <a
      href={`/profile/${user.username}`}
      className="bg-blue-500 text-white text-xs p-2 rounded-md mt-1"
    >
      My Profile
    </a>
  );
};

export default MyProfileButton;
