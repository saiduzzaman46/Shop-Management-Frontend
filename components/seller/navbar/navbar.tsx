<<<<<<< HEAD
"use client";

=======
>>>>>>> be1a481e05294fec44cd313f2ee5b44461af1abc
import NotificationBell from "./NotificationBell";
import ProfileDropdown from "./profileDropdown";

type ProfileType = {
<<<<<<< HEAD
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
=======
  fullName: string;
};

export default function Navbar({ profile }: { profile: ProfileType | null }) {
>>>>>>> be1a481e05294fec44cd313f2ee5b44461af1abc
  return (
    <nav className="bg-white h-16 flex items-center shadow-md px-5 justify-between sticky top-0 z-50">
      <div>{/* Logo or title */}</div>

      <div className="flex justify-end items-center">
<<<<<<< HEAD
        {userData && <NotificationBell />}
=======
        <NotificationBell />
>>>>>>> be1a481e05294fec44cd313f2ee5b44461af1abc
        <div className="relative ml-4">
          <ProfileDropdown profile={profile} />
        </div>
      </div>
    </nav>
  );
}
