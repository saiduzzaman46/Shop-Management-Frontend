"use client";

import NotificationBell from "./NotificationBell";
import ProfileDropdown from "./profileDropdown";

type ProfileType = {
  id: string;
  fullName: string;
  // Add other profile fields as needed
};

type UserDataType = {
  id: string;
  type: "customer" | "seller";
};

export default function Navbar({
  profile,
  userData,
}: {
  profile: ProfileType | null;
  userData: UserDataType | null;
}) {
  return (
    <nav className="bg-white h-16 flex items-center shadow-md px-5 justify-between sticky top-0 z-50">
      <div>{/* Logo or title */}</div>

      <div className="flex justify-end items-center">
        {userData && <NotificationBell />}
        <div className="relative ml-4">
          <ProfileDropdown profile={profile} />
        </div>
      </div>
    </nav>
  );
}
