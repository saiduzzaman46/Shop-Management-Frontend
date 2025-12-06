"use client";
import { useState } from "react";
import Link from "next/link";
<<<<<<< HEAD
import { useRouter } from "next/navigation";
import { ChevronDown, ChevronRight } from "lucide-react";
import axios from "axios";
=======
import { ChevronDown, ChevronRight } from "lucide-react";
>>>>>>> be1a481e05294fec44cd313f2ee5b44461af1abc

export default function ProfileDropdown({
  profile,
}: {
  profile: { fullName: string } | null;
}) {
  const [isOpen, setIsOpen] = useState(false);
<<<<<<< HEAD
  const router = useRouter();

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleLogout = async () => {
    try {
      const res = await axios.post("/api/seller/logout");
      if (res.status === 200) {
        router.push("/customer");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
=======

  const toggleDropdown = () => setIsOpen(!isOpen);

>>>>>>> be1a481e05294fec44cd313f2ee5b44461af1abc
  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors duration-300 focus:outline-none"
      >
        <span role="img" aria-label="user icon" className="text-xl">
          👤
        </span>
<<<<<<< HEAD
        <span className="font-medium hidden sm:inline" id="user-fullname">
          {profile?.fullName || "User"}
=======
        <span className="font-medium hidden sm:inline">
          {getMiddleName(profile?.fullName ?? "") || "User"}
>>>>>>> be1a481e05294fec44cd313f2ee5b44461af1abc
        </span>
        {isOpen ? (
          <ChevronDown className="w-4 h-4" />
        ) : (
          <ChevronRight className="w-4 h-4" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
          <Link
            href="/seller/profile"
            className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
            onClick={toggleDropdown}
          >
            Profile
          </Link>
          <div className="border-t border-gray-200 my-1"></div>
          <button
<<<<<<< HEAD
            onClick={handleLogout}
=======
            // onClick={handleLogout}
>>>>>>> be1a481e05294fec44cd313f2ee5b44461af1abc
            className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

<<<<<<< HEAD
// function getMiddleName(fullName: string) {
//   const parts = fullName.trim().split(/\s+/);

//   if (parts[0].toLowerCase() === "md") {
//     parts.shift();
//   }

//   if (parts.length > 2) {
//     return parts.slice(1, -1).join(" ");
//   } else if (parts.length > 1) {
//     return parts[0];
//   } else {
//     return parts[0];
//   }
// }
=======
function getMiddleName(fullName: string) {
  const parts = fullName.trim().split(/\s+/);

  if (parts[0].toLowerCase() === "md") {
    parts.shift();
  }

  if (parts.length > 2) {
    return parts.slice(1, -1).join(" ");
  } else if (parts.length > 1) {
    return parts[0];
  } else {
    return parts[0];
  }
}
>>>>>>> be1a481e05294fec44cd313f2ee5b44461af1abc
