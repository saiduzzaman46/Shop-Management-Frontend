"use client";
import { useEffect, useState } from "react";
import { Bell, X } from "lucide-react";
import Pusher from "pusher-js";

export default function NotificationBell() {
  const [count, setCount] = useState(0);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const sellerId = "a0022773-f1f5-4aed-8df9-b43cec8b9cd8";

  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    });

    const channel = pusher.subscribe(`seller-${sellerId}`);
    channel.bind("product-updated", (data: any) => {
      console.log("Notification received:", data);
      setNotifications((prev) => [data, ...prev]);
      setCount((prev) => prev + 1);

      // Show dropdown automatically
      setShowDropdown(true);

      // Auto-hide after 10s
      setTimeout(() => setShowDropdown(false), 10000);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [sellerId]);

  const clearNotifications = () => {
    setNotifications([]);
    setCount(0);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown((prev) => !prev)}
        className="relative pt-1 text-gray-600 hover:text-purple-600"
      >
        <Bell className="w-6 h-6" />
        {count > 0 && (
          <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5">
            {count}
          </span>
        )}
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg border border-gray-200 z-50">
          <div className="flex justify-between items-center p-2 border-b border-gray-200">
            <span className="font-bold">Notifications</span>
            <button
              onClick={clearNotifications}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={16} />
            </button>
          </div>
          {notifications.length === 0 ? (
            <div className="p-2 text-gray-500">No notifications</div>
          ) : (
            notifications.map((n, idx) => (
              <div
                key={idx}
                className="p-2 hover:bg-gray-100 border-b border-gray-100"
              >
                <p className="text-sm font-medium">
                  {n.message || "Product updated"}
                </p>
                <p className="text-xs text-gray-500">Product: {n.title}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
