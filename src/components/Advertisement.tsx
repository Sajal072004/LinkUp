import Image from "next/image";
import React from "react";

const Advertisement = ({ size }: { size: "sm" | "md" | "lg" }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm">
      {/* top */}
      <div className="flex items-center justify-between text-gray-500 font-medium">
        <span>Sponsored Ads</span>
        <Image src="/more.png" alt="" width={16} height={16} />
      </div>

      {/* bottom */}
      <div
        className={`flex flex-col mt-4 ${size === "sm" ? "gap-2" : "gap-4"}`}
      >
        <div className={`relative w-full ${ size === "sm" ? "h-24" : size=== "md" ? "h-36" : "h-48"}`}>
          <Image
            src="https://images.pexels.com/photos/28717994/pexels-photo-28717994/free-photo-of-aerial-view-of-lone-boat-on-amasra-s-blue-waters.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load"
            alt=""
            fill
            className="rounded-lg object-cover"
          />
        </div>

        <div className="flex items-center gap-4">
        <Image
            src="https://images.pexels.com/photos/28717994/pexels-photo-28717994/free-photo-of-aerial-view-of-lone-boat-on-amasra-s-blue-waters.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load"
            alt=""
            width={24}
            height={24}
            className="rounded-full w-6 h-6 object-cover"
          />
          <span className="text-blue-500 font-medium">BigChef Lounge</span>
        </div>
        <p className={`${size ==="sm" ? "text-xs" : "text-sm"}`}>
          {
            size=== "sm" ? "Lorem, ipsum dolor sit amet consectetur adipisicing elit." : size === "md" ? "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic impedit magni aliquam, velit provident, adipisci soluta esse obcaecati eveniet dicta " : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur numquam amet voluptas sunt ducimus, voluptates quas reiciendis ut tempore architecto, doloribus ab eum non cupiditate totam commodi fuga dicta nihil."

          }
        </p>
        <button  className="bg-gray-200 text-gray-500 p-2 text-xs rounded-lg">Learn More</button>
      </div>
    </div>
  );
};

export default Advertisement;
