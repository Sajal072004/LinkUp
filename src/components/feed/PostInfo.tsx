"use client"
import React, { useState } from 'react'
import Image from 'next/image';
import { deletePost } from '@/lib/actions';

const PostInfo = ({postId} : {postId:number}) => {
  const [open ,setOpen ] = useState(false);

  const deletePostWithId = deletePost.bind(null , postId)


  return (
    <div className='relative cursor-pointer'>
      <Image src="/more.png" width={16} height={16} alt="" onClick={()=>setOpen((prev)=>!prev)}></Image>

      {
        open && 
        <div className='absolute top-4 right-0 bg-white p-4 rounded-lg flex flex-col gap-2 text-xs shadow-lg z-30 w-32'>
          {/* <span className='cursor-pointer'>View </span>
          <span className='cursor-pointer'>Repost </span> */}
         { <form action={deletePostWithId}>
            <button className='text-red-500'>Delete</button>
          </form>}
        </div>
      }
    </div>
  )
}

export default PostInfo