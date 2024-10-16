"use client"; // Indicate that this is a client component

import Image from "next/image";
import React, { useState } from "react";

const ImagePreview = ({ src }: { src: string }) => {
  const [open, setOpen] = useState(false);

  const handleImageClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="w-full min-h-96 relative bg-gray-200 cursor-pointer overflow-auto" onClick={handleImageClick}>
        <Image
          src={src}
          fill
          alt=""
          className="object-contain rounded-md"
        />
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative max-h-full overflow-y-auto p-4">
            <button onClick={handleClose} className="absolute top-2 right-2 text-white text-2xl">
              &times;
            </button>
            <div className="max-h-[90vh] overflow-y-auto">
              <Image
                src={src}
                width={500} 
                height={800}
                alt=""
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ImagePreview;
