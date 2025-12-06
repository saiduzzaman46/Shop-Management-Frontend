"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import axios from "axios";

type Product = {
  productId: string;
  title: string;
  description: string;
  price: string;
  costPrice: string;
  quantity: number;
  images: string[];
  brandName: string;
  categoryName: string;
  tags: string;
  sellerId: string;
};

// type Message = {
//   id: string;
//   content: string;
//   senderId: string;
//   receiverId: string;
//   timestamp: string;
//   read: boolean;
// };

export default function ProductDetail() {
  const params = useParams();
  const id = params.id as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  // const [showMessageModal, setShowMessageModal] = useState(false);
  // const [message, setMessage] = useState("");
  // const [sending, setSending] = useState(false);
  // const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/product/getproduct/${id}`
        );
        setProduct(res.data);
      } catch (err) {
        console.error("Failed to fetch product:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  // useEffect(() => {
  //   // Fetch notification count
  //   const fetchNotifications = async () => {
  //     try {
  //       const token = localStorage.getItem("token");
  //       const res = await fetch("/api/notifications/count", {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       const data = await res.json();
  //       setNotificationCount(data.count || 0);
  //     } catch (error) {
  //       console.error("Failed to fetch notifications:", error);
  //     }
  //   };

  //   fetchNotifications();

  //   // Set up real-time notifications with Pusher (if implemented)
  //   // setupPusherNotifications();
  // }, []);

  // const sendMessageToSeller = async () => {
  //   if (!message.trim() || !product) return;

  //   setSending(true);
  //   try {
  //     const response = await fetch("/api/messages", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       credentials: "include", // Important for sending cookies
  //       body: JSON.stringify({
  //         sellerId: product.sellerId,
  //         productId: product.productId,
  //         productTitle: product.title,
  //         message: message.trim(),
  //       }),
  //     });

  //     const responseData = await response.json();

  //     if (response.ok) {
  //       setMessage("");
  //       setShowMessageModal(false);
  //       alert("Message sent successfully!");
  //     } else {
  //       console.error("Error response:", responseData);
  //       throw new Error(responseData.message || "Failed to send message");
  //     }
  //   } catch (error: any) {
  //     console.error("Error sending message:", error);
  //     alert(error.message || "Failed to send message. Please try again.");
  //   } finally {
  //     setSending(false);
  //   }
  // };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex flex-col md:flex-row gap-8 animate-pulse">
          <div className="flex-1">
            <div className="bg-gray-200 h-96 rounded-xl"></div>
          </div>
          <div className="flex-1 space-y-6 py-4">
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/3"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2"></div>
            <div className="h-10 bg-gray-200 rounded w-1/4"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center py-16">
        <div className="bg-gray-50 p-8 rounded-xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto text-gray-400 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Product Not Found
          </h2>
          <p className="text-gray-600">
            The product you are looking for does not exist or may have been
            removed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Notification Bell */}
      {/* <div className="flex justify-end mb-6">
        <button
          className="relative p-2 text-gray-600 hover:text-purple-600 transition-colors duration-300"
          onClick={() => (window.location.href = "/customer/notifications")}
        >
          <Bell className="w-6 h-6" />
          {notificationCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {notificationCount}
            </span>
          )}
        </button>
      </div> */}

      <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
        {/* Product Images */}
        <div className="flex-1">
          <div className="sticky top-6">
            <div className="relative h-80 sm:h-96 rounded-xl overflow-hidden bg-gray-100 mb-4">
              {product.images[selectedImage] ? (
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}/product/getimage/${product.images[selectedImage]}`}
                  alt={product.title}
                  fill
                  style={{ objectFit: "contain" }}
                  className="rounded-lg"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              )}
            </div>

            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative h-20 rounded-md overflow-hidden border-2 ${
                      selectedImage === index
                        ? "border-blue-500"
                        : "border-gray-200"
                    }`}
                  >
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_URL}/product/getimage/${image}`}
                      alt={`${product.title} view ${index + 1}`}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Product Details */}
        <div className="flex-1">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="mb-4">
              <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full mb-2">
                {product.categoryName}
              </span>
              <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full ml-2">
                {product.brandName}
              </span>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {product.title}
            </h1>

            <div className="flex items-center mb-6">
              <span className="text-3xl font-bold text-blue-700">
                ${product.price}
              </span>
              {product.costPrice &&
                parseFloat(product.costPrice) > parseFloat(product.price) && (
                  <span className="ml-3 text-lg text-gray-500 line-through">
                    ${product.costPrice}
                  </span>
                )}
              {product.quantity > 0 ? (
                <span className="ml-auto bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
                  In Stock
                </span>
              ) : (
                <span className="ml-auto bg-red-100 text-red-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
                  Out of Stock
                </span>
              )}
            </div>

            <p className="text-gray-700 mb-6 leading-relaxed">
              {product.description}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 p-3 rounded-lg">
                <span className="block text-sm text-gray-500 mb-1">Brand</span>
                <span className="font-medium">{product.brandName}</span>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <span className="block text-sm text-gray-500 mb-1">
                  Category
                </span>
                <span className="font-medium">{product.categoryName}</span>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <span className="block text-sm text-gray-500 mb-1">
                  Available
                </span>
                <span className="font-medium">{product.quantity} units</span>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <span className="block text-sm text-gray-500 mb-1">Tags</span>
                <span className="font-medium">{product.tags || "None"}</span>
              </div>
            </div>

            <div className="flex space-x-4 mt-8">
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                Add to Cart
              </button>
              {/* <button
                className="flex items-center justify-center text-gray-500 hover:text-gray-700 border border-gray-300 hover:border-gray-400 rounded-lg w-12 h-12 transition-colors"
                onClick={() => setShowMessageModal(true)}
              >
                <MessageCircle className="h-6 w-6" />
              </button> */}
            </div>

            {/* Message Seller Button */}
            {/* <button
              onClick={() => setShowMessageModal(true)}
              className="w-full mt-4 flex items-center justify-center gap-2 bg-purple-100 text-purple-700 hover:bg-purple-200 font-medium py-3 px-6 rounded-lg transition-colors"
            >
              <MessageCircle className="h-5 w-5" />
              Message Seller
            </button> */}
          </div>
        </div>
      </div>

      {/* Message Modal */}
      {/* {showMessageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Message Seller</h2>
            <p className="text-gray-600 mb-4">
              Ask a question about this product:
            </p>
            <p className="font-semibold mb-2">{product.title}</p>

            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here..."
              className="w-full h-32 p-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowMessageModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={sendMessageToSeller}
                disabled={sending || !message.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-not-allowed"
              >
                {sending ? "Sending..." : "Send Message"}
              </button>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
}
