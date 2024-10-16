"use client";

import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import { useUser } from '@clerk/nextjs';

const MobileMenu = () => {
  const { user, isLoaded } = useUser();

  // Loading state
  if (!isLoaded) return <div>Loading...</div>;
  
  // If user is not signed in, return null
  if (!user) return null;

  return (
    <div className='h-24 flex items-center justify-between px-4 gap-4'>
      {/* Center: Mobile Links */}
      <div className='flex flex-col items-center w-[100%] gap-4'>
        <SignedIn>
          <div className='flex items-center gap-4'>
            <Link href='/' className='py-2'>Home</Link>
            <Link href={`/profile/${user.username}`} className='py-2'>Profile</Link>
            <Link href='/friends' className='py-2'>Friends</Link>
          </div>
        </SignedIn>
      </div>

      {/* Right Side: User Actions */}
      <div className="w-[30%] flex items-center justify-end gap-4">
        <SignedIn>
          <div className='flex items-center'>
            {/* User Button to display user image */}
            <UserButton />
          </div>
        </SignedIn>

        <SignedOut>
          <div className='flex items-center gap-2 text-sm'>
            <Image src='/login.png' alt='Login' width={20} height={20} />
            <Link href='/sign-in'>Login/Register</Link>
          </div>
        </SignedOut>
      </div>
    </div>
  );
};

export default MobileMenu;
