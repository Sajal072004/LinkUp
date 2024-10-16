"use client"

import Link from 'next/link';
import React from 'react';
import MobileMenu from './MobileMenu';
import Image from 'next/image';
import { ClerkLoaded, ClerkLoading } from '@clerk/nextjs';
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';




const Navbar = async() => {

  

  return (
    <div className='h-24 flex items-center justify-between'>
      {/* left */}
      <div className="md:hidden lg:block w-[20%]">
        <Link href='/' className='font-bold text-xl text-blue-600'>LinkUp</Link>
      </div>

      {/* center */}
      <div className='hidden md:flex w-[50%] text-sm items-center justify-between'>
        {/* Links */}
        <div className='flex gap-4 text-gray-600  '>

          <Link href='/' className='flex gap-2 items-center'>
            <Image src='/home.png' alt='' width={16} height={16} className='w-4 h-4' />
            <span>Homepage</span>
          </Link>

          <Link href='/friends' className='flex gap-2 items-center'>
            <Image src='/friends.png' alt='' width={16} height={16} className='w-4 h-4' />
            <span>Friends</span>
          </Link>

        

        </div>

        <div className='hidden xl:flex p-2 bg-slate-100 items-center rounded-xl'>
          <input type='text' placeholder='search...' className='bg-transparent outline-none' />
          <Image src='/search.png' alt='' width={14} height={14} />
        </div>

      </div>

      {/* right */}
      <div className="w-[30%] flex items-center gap-4 xl:gap-8 justify-end" >

        <div className='items-center justify-end gap-4 hidden md:flex'>

        
        <ClerkLoading>
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
            role="status" >
            </div>
        </ClerkLoading>

        <ClerkLoaded/>

        <SignedIn>
          <div className='hidden md:block cursor-pointer'>
            <Image src='/people.png' alt='' width={24} height={24} />
          </div>
          <div className='cursor-pointer'>
            <Image src='/messages.png' alt='' width={20} height={20} />
          </div>
          <div className='cursor-pointer'>
            <Image src='/notifications.png' alt='' width={20} height={20} />
          </div>
         <UserButton/>
        </SignedIn>
        <SignedOut>
          <div className='flex items-center gap-2 text-sm'>
            <Image src='/login.png' alt='' width={20} height={20} />
            <Link href='/sign-in'>Login/Register</Link>
          </div>
        </SignedOut>

        </div>
        <div className='md:hidden'>
        <MobileMenu />
        </div>



      </div>

    </div>
  )
}

export default Navbar;