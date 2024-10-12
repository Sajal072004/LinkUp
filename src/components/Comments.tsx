import Image from 'next/image'
import React from 'react'

const Comments = () => {
  return (
    <div>
      {/* write */}
      <div className='flex items-center gap-4'>
        <Image src='https://images.pexels.com/photos/28826546/pexels-photo-28826546/free-photo-of-ancient-mountain-fortress-ruins-in-desert-landscape.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt='' width={32} height={32} className='w-8 h-8 rounded-full'  ></Image>
        <div className='flex items-center justify-between bg-slate-100 rounded-xl text-sm px-6 py-2 w-full flex-1'>
          <input type='text' placeholder='Write a comment...' className='bg-transparent outline-none flex-1'   />
          <Image src='/emoji.png' alt='' width={16} height={16} className='cursor-pointer'  ></Image>
        </div>
      </div>

      {/* comments */}
      <div>
        {/* comment */}
        <div className='flex gap-4 justify-between mt-6'>

          {/* avatar */}
          <Image src='https://images.pexels.com/photos/28826546/pexels-photo-28826546/free-photo-of-ancient-mountain-fortress-ruins-in-desert-landscape.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt='' width={40} height={40} className='w-10 h-10 rounded-full'  ></Image>

          {/* desc */}
          <div className='flex flex-col gap-2 flex-1'>
            <span className='font-medium'>Sajal Namdeo</span>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt dolorum quas fugit non ullam voluptatum fugiat odit molestias adipisci iure, dolorem aut ratione itaque cupiditate voluptate obcaecati. Excepturi, perferendis ea.</p>

            <div className='flex items-center gap-8 text-xs text=gray-500 mt-2'>
                <div className='flex items-center gap-4'>
                  <Image src='/like.png' alt='' width={16} height={16} className='cursor-pointer w-4 h-4'/> 
                  <span className='text-gray-300'>|</span>
                  <span className='text-gray-500'>123 Likes</span>
                </div>
                <div>Reply</div>
            </div>

          </div>

          {/* icon */}
          <Image src='/more.png' alt='' width={16} height={16} className='cursor-pointer w-4 h-4'></Image>

        </div>
      </div>
    </div>
  )
}

export default Comments