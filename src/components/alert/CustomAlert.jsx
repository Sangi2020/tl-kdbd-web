import React from 'react'
import SocialMediaIcons from '../icons/SocialMediaIcons'
import { FaWhatsapp } from 'react-icons/fa'

const CustomAlert = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
    {/* Backdrop */}
    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

    {/* Alert Container */}
    <div className="relative max-w-md w-full mx-4 animate-in fade-in zoom-in duration-300">
      <div className="bg-white rounded-2xl shadow-2xl p-8">
        <div className="flex flex-col items-center gap-6 text-center">
          {/* Top Loader */}
          <div className="relative">
            <div className="absolute inset-0 animate-ping rounded-full bg-green-200 opacity-75" />
            <div className="relative rounded-full bg-white p-3 shadow-lg">
              <svg 
                className="h-12 w-12 text-green-600 animate-spin" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24"
              >
                <circle 
                  className="opacity-25" 
                  cx="12" 
                  cy="12" 
                  r="10" 
                  stroke="currentColor" 
                  strokeWidth="4"
                />
                <path 
                  className="opacity-75" 
                  fill="currentColor" 
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            </div>
          </div>

          {/* Message Content */}
          <div className="space-y-3">
            <h3 className="text-2xl font-semibold text-gray-800">
              Redirecting to WhatsApp
            </h3>
            <p className="text-lg text-gray-600">
            You can edit the message and send it.
              
            </p>
          </div>

          {/* Bottom Animation */}
          <div className="flex items-center gap-3 text-green-600 animate-pulse">
            {/* Send Icon */}
            <SocialMediaIcons
            icon={
              <FaWhatsapp className=" md:text-2xl text-xl transition-all duration-300 ease-in-out  text-green-500" />
            }
            link={"https://api.whatsapp.com/send/?phone=%2B918086407979&text=Hello%2C+I+am+interested+to+know+more+about+your+service.&type=phone_number&app_absent=0"}
          />
            {/* Bouncing Dots */}
            <div className="flex gap-1">
              <div className="h-2 w-2 rounded-full bg-green-600" />
              <div className="h-2 w-2 rounded-full bg-green-600 animate-bounce delay-100" />
              <div className="h-2 w-2 rounded-full bg-green-600 animate-bounce delay-200" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default CustomAlert