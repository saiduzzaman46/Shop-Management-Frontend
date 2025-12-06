"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const route = useRouter();
  const [customer, setCustomer] = useState<{ fullName: string } | null>(null);

  // fetch logged-in profile
  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const res = await axios.get("/api/customer/profile");
        setCustomer(res.data.customer);
      } catch {
        setCustomer(null);
      }
    };
    fetchCustomer();
  }, []);

  // logout handler
  const handleLogout = async () => {
    try {
      await axios.post("/api/customer/logout");
      setCustomer(null);
      route.push("/customer");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <Link href="/customer" className="text-xl font-bold text-blue-600">
        MyApp
      </Link>

      {!customer ? (
        <div className="space-x-4">
          <Link
            href="/signin"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="px-4 py-2 bg-green-500 text-white rounded-lg"
          >
            Register
          </Link>
        </div>
      ) : (
        <div className="flex items-center space-x-4">
          <Link
            href="/customer/profile"
            className="font-medium text-gray-700 hover:text-blue-600 transition"
          >
            👤 {customer.fullName}
          </Link>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
