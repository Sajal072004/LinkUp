import React from "react";
import Link from "next/link";
import Image from "next/image";

const UserInfoCard = ({ userId }: { userId: string }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4">
      {/* top */}
      <div className="flex justify-between items-center font-medium">
        <span className="text-gray-500">User Information</span>
        <Link href="/" className="text-blue-500 text-xs">
          See all
        </Link>
      </div>

      {/* bottom */}
      <div className="flex flex-col gap-4 text-gray-500">
        <div className="flex items-center gap-2">
          <span className="text-xl text-black">Sajal Namdeo</span>
          <span className="text-sm">@Sajal0701</span>
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam at
          pariatur aliquam accusamus beatae, voluptatum quae veritatis eaque
          asperiores alias eveniet facere architecto quas natus eum suscipit ab
          error laborum?
        </p>
        <div className="flex items-center gap-2">
          <Image src="/map.png" alt="" width={16} height={16} />
          <span>
            Living in <b>Jabalpur</b>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Image src="/school.png" alt="" width={16} height={16} />
          <span>
            Went to <b>IIIT Ranchi</b>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Image src="/work.png" alt="" width={16} height={16} />
          <span>
            Works at <b>Extroworks</b>
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex gap-1 items-center">
            <Image src="/link.png" alt="" width={16} height={16} />
            <Link
              href="https://sajalnamdeo.vercel.app"
              className="text-blue-500 font-medium"
            >
              Sajal Namdeo
            </Link>
          </div>

          <div className="flex gap-1 items-center">
            <Image src="/date.png" alt="" width={16} height={16} />
            <span>Joined November 2023</span>
          </div>
        </div>

        <button className="bg-blue-500 text-white text-sm rounded-md p-2 ">Follow</button>
        <span className="text-red-400 self-end test-xs  cursor-pointer">Block User</span>
      </div>
    </div>
  );
};

export default UserInfoCard;
