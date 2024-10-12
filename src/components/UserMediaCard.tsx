import React from "react";
import Link from "next/link";
import Image from "next/image";

const UserMediaCard = ({ userId }: { userId: string }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4">
      {/* top */}
      <div className="flex justify-between items-center font-medium">
        <span className="text-gray-500">User Media</span>
        <Link href="/" className="text-blue-500 text-xs">
          See all
        </Link>
      </div>

      {/* bottom */}

      <div className="flex gap-4 justify-between flex-wrap">
        <div className="relative w-1/5 h-20">
          <Image
            src="https://images.pexels.com/photos/28868268/pexels-photo-28868268/free-photo-of-vibrant-night-cityscape-with-illuminated-skyline.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load"
            alt=""
            fill
            className="object-cover rounded-md"
          />
        </div>
        <div className="relative w-1/5 h-20">
          <Image
            src="https://images.pexels.com/photos/28868268/pexels-photo-28868268/free-photo-of-vibrant-night-cityscape-with-illuminated-skyline.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load"
            alt=""
            fill
            className="object-cover rounded-md"
          />
        </div>
        <div className="relative w-1/5 h-20">
          <Image
            src="https://images.pexels.com/photos/28868268/pexels-photo-28868268/free-photo-of-vibrant-night-cityscape-with-illuminated-skyline.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load"
            alt=""
            fill
            className="object-cover rounded-md"
          />
        </div>
        <div className="relative w-1/5 h-20">
          <Image
            src="https://images.pexels.com/photos/28868268/pexels-photo-28868268/free-photo-of-vibrant-night-cityscape-with-illuminated-skyline.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load"
            alt=""
            fill
            className="object-cover rounded-md"
          />
        </div>

        <div className='relative w-1/5 h-20'>
            <Image src='https://images.pexels.com/photos/28868268/pexels-photo-28868268/free-photo-of-vibrant-night-cityscape-with-illuminated-skyline.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load' alt='' fill className='object-cover rounded-md' />
          </div>

          <div className='relative w-1/5 h-20'>
            <Image src='https://images.pexels.com/photos/28868268/pexels-photo-28868268/free-photo-of-vibrant-night-cityscape-with-illuminated-skyline.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load' alt='' fill className='object-cover rounded-md' />
          </div>

          <div className='relative w-1/5 h-20'>
            <Image src='https://images.pexels.com/photos/28868268/pexels-photo-28868268/free-photo-of-vibrant-night-cityscape-with-illuminated-skyline.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load' alt='' fill className='object-cover rounded-md' />
          </div>

          <div className='relative w-1/5 h-20'>
            <Image src='https://images.pexels.com/photos/28868268/pexels-photo-28868268/free-photo-of-vibrant-night-cityscape-with-illuminated-skyline.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load' alt='' fill className='object-cover rounded-md' />
          </div>
      </div>
    </div>
  );
};

export default UserMediaCard;
