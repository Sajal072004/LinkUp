"use client";

import React, { useEffect, useState } from "react";
import { User } from "@prisma/client";
import Image from "next/image";
import { updateProfile } from "@/lib/actions";

const UpdateUser = ({ user }: { user: User }) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (open) {
      // Disable scroll
      document.body.style.overflow = "hidden";
    } else {
      // Enable scroll
      document.body.style.overflow = "auto";
    }

    // Cleanup function to reset the overflow when the component unmounts or modal is closed
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  return (
    <div>
      <span
        className="text-blue-500 text-xs cursor-pointer"
        onClick={() => setOpen(true)}
      >
        Update
      </span>
      {open && (
        <div className="absolute h-screen top-0 left-0 bg-black bg-opacity-65 flex items-center justify-center z-50  ">
          <form
            action={updateProfile}
            className="p-12 bg-white rounded-lg flex flex-col gap-2 w-full md:w-1/3 xl:w-1/3 relative "
          >
            <h1>Update Profile</h1>
            <div className="mt-4 text-xs text-gray-500">
              Use the navbar profile to change the avatar or username
            </div>
            <div className="flex flex-col gap-4 my-4">
              <label>Cover Picture</label>
              <div className="flex items-center gap-2 cursor-pointer">
                <Image
                  src={user.cover || "noCover.png"}
                  alt=""
                  width={96}
                  height={64}
                  className="w-24 h-16 rounded-md object-cover"
                />
                <span className="text-xs underline text-gray-600">Change</span>
              </div>
            </div>

            {/* wrapper */}

            <div className="flex flex-wrap justify-between gap-2 xl:gap-4">
              {/* First Name */}
              <div className="flex flex-col w-full md:w-[45%] gap-2">
                <label className="text-xs text-gray-500">First Name</label>
                <input
                  type="text"
                  placeholder={user.name || "John"}
                  className="ring-1 ring-gray-300 p-[9px] rounded-md text-sm" name="name"

                />
              </div>

              {/* Surname */}
              <div className="flex flex-col w-full md:w-[45%] gap-2">
                <label className="text-xs text-gray-500">Surname</label>
                <input
                  type="text"
                  placeholder={user.surname || "Doe"}
                  className="ring-1 ring-gray-300 p-[9px] rounded-md text-sm" name="surname"
                />
              </div>

              {/* Description */}
              <div className="flex flex-col w-full gap-2">
                <label className="text-xs text-gray-500">Description</label>
                <input
                  type="text"
                  placeholder={user.description || "Life is beautiful"}
                  className="ring-1 ring-gray-300 p-[9px] rounded-md text-sm" name="description"
                />
              </div>

              {/* City */}
              <div className="flex flex-col w-full md:w-[45%] gap-2">
                <label className="text-xs text-gray-500">City</label>
                <input
                  type="text"
                  placeholder={user.city || "Bangalore"}
                  className="ring-1 ring-gray-300 p-[9px] rounded-md text-sm" name="city"
                />
              </div>

              {/* School */}
              <div className="flex flex-col w-full md:w-[45%] gap-2">
                <label className="text-xs text-gray-500">School</label>
                <input
                  type="text"
                  placeholder={user.school || "IIIT Ranchi"}
                  className="ring-1 ring-gray-300 p-[9px] rounded-md text-sm" name="school"
                />
              </div>

              {/* Work */}
              <div className="flex flex-col w-full md:w-[45%] gap-2">
                <label className="text-xs text-gray-500">Work</label>
                <input
                  type="text"
                  placeholder={user.work || "Apple"}
                  className="ring-1 ring-gray-300 p-[9px] rounded-md text-sm" name="work"
                />
              </div>

              {/* Website */}
              <div className="flex flex-col w-full md:w-[45%] gap-2">
                <label className="text-xs text-gray-500">Website</label>
                <input
                  type="text"
                  placeholder={user.website || "xyz.com"}
                  className="ring-1 ring-gray-300 p-[9px] rounded-md text-sm" name="website"
                />
              </div>
            </div>

            <button className="bg-blue-500 p-2 mt-2 rouded-md text-white ">
              Update
            </button>

            <div
              className="absolute text-xl right-4 top-3 cursor-pointer"
              onClick={handleClose}
            >
              X
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default UpdateUser;
