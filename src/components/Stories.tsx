import Image from 'next/image'
import React from 'react'

const Stories = () => {
  return (
    <div className='p-4 bg-white rounded-lg shadow-md overflow-scroll text-xs'>
      <div className='flex gap-8 w-max'>
        {/* story */}
            <div className='flex flex-col items-center gap-2 cursor-pointer'>
                <Image src='https://images.pexels.com/photos/16465970/pexels-photo-16465970/free-photo-of-a-woman-posing-in-a-vast-yellow-flower-field.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt='' width={80} height={80} className='w-20 h-20 rounded-full ring-2' />
                <span className='font-medium'>Sajal</span>
            </div>

            <div className='flex flex-col items-center gap-2 cursor-pointer'>
                <Image src='https://images.pexels.com/photos/16465970/pexels-photo-16465970/free-photo-of-a-woman-posing-in-a-vast-yellow-flower-field.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt='' width={80} height={80} className='w-20 h-20 rounded-full ring-2' />
                <span className='font-medium'>Sajal</span>
            </div>

            <div className='flex flex-col items-center gap-2 cursor-pointer'>
                <Image src='https://images.pexels.com/photos/16465970/pexels-photo-16465970/free-photo-of-a-woman-posing-in-a-vast-yellow-flower-field.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt='' width={80} height={80} className='w-20 h-20 rounded-full ring-2' />
                <span className='font-medium'>Sajal</span>
            </div>

            <div className='flex flex-col items-center gap-2 cursor-pointer'>
                <Image src='https://images.pexels.com/photos/16465970/pexels-photo-16465970/free-photo-of-a-woman-posing-in-a-vast-yellow-flower-field.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt='' width={80} height={80} className='w-20 h-20 rounded-full ring-2' />
                <span className='font-medium'>Sajal</span>
            </div>

            <div className='flex flex-col items-center gap-2 cursor-pointer'>
                <Image src='https://images.pexels.com/photos/16465970/pexels-photo-16465970/free-photo-of-a-woman-posing-in-a-vast-yellow-flower-field.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt='' width={80} height={80} className='w-20 h-20 rounded-full ring-2' />
                <span className='font-medium'>Sajal</span>
            </div>

            <div className='flex flex-col items-center gap-2 cursor-pointer'>
                <Image src='https://images.pexels.com/photos/16465970/pexels-photo-16465970/free-photo-of-a-woman-posing-in-a-vast-yellow-flower-field.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt='' width={80} height={80} className='w-20 h-20 rounded-full ring-2' />
                <span className='font-medium'>Sajal</span>
            </div>
      </div>
    </div>
  )
}

export default Stories