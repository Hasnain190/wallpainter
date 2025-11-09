"use client";
import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { BsSend } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { PHONE_NUMBER } from "@/constants";
import Image from "next/image";


export const WhatsAppWidget = ({
  phoneNumber = PHONE_NUMBER, 
  message = "Hello! I'm interested in your services.",
  position = "right",
  agentName = "Support Team",
  agentTitle = "Typically replies within minutes",
  agentAvatar = "https://ui-avatars.com/api/?name=Support+Team&background=25D366&color=fff",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [customMessage, setCustomMessage] = useState(message);

  const handleSendMessage = () => {
    const encodedMessage = encodeURIComponent(customMessage);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  const positionClasses =
    position === "left" ? "left-4 sm:left-6" : "right-4 sm:right-6";

  return (
    <>
      {/* Chat Box */}
      <div
        className={`fixed ${positionClasses} bottom-24 z-50 transition-all duration-300 ease-in-out transform ${
          isOpen
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-4 scale-95 pointer-events-none"
        }`}
      >
        <div className="bg-white rounded-2xl shadow-2xl w-[320px] sm:w-[360px] overflow-hidden">
          {/* Header */}
          <div className="bg-linear-to-r from-[#25D366] to-[#128C7E] p-4 relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full p-1 transition-colors"
              aria-label="Close chat"
            >
              <AiOutlineClose className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 pr-8">
              <div className="relative">
                <Image
                  src={agentAvatar}
                  alt={agentName}
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full border-2 border-white"
                />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
              </div>

              <div className="text-white">
                <h3 className="font-semibold text-base">{agentName}</h3>
                <p className="text-xs text-white/90">{agentTitle}</p>
              </div>
            </div>
          </div>

          {/* Chat Body */}
          <div className="p-4 bg-gray-50 min-h-[200px]">
            {/* Agent Message Bubble */}
            <div className="flex gap-2 mb-4">
              <Image
                src={agentAvatar}
                alt={agentName}
                width={32}
                height={32}
                className="w-8 h-8 rounded-full shrink-0"
              />
              <div className="bg-white rounded-2xl rounded-tl-sm p-3 shadow-sm max-w-[85%]">
                <p className="text-sm text-gray-800">
                  Hi there! 👋
                  <br />
                  How can I help you today?
                </p>
                <span className="text-xs text-gray-400 mt-1 block">
                  Just now
                </span>
              </div>
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-gray-100">
            <div className="flex gap-2">
              <input
                type="text"
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2.5 border border-gray-200 rounded-full focus:outline-none focus:border-[#25D366] focus:ring-2 focus:ring-[#25D366]/20 text-sm"
              />
              <button
                onClick={handleSendMessage}
                className="bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full p-2.5 transition-colors shrink-0"
                aria-label="Send message"
              >
                <BsSend  className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-gray-400 text-center mt-2">
              Powered by WhatsApp
            </p>
          </div>
        </div>
      </div>

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed ${positionClasses} bottom-6 z-50 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full p-4 shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 group`}
        aria-label="Open WhatsApp chat"
      >
        {isOpen ? (
          <AiOutlineClose className="w-7 h-7 transition-transform group-hover:rotate-90" />
        ) : (
          <>
            <FaWhatsapp className="w-7 h-7" />
            {/* Notification Badge */}
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
              1
            </span>
            {/* Ripple Effect */}
            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20"></span>
          </>
        )}
      </button>

      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 sm:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};
