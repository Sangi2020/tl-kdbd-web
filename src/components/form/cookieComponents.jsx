import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import cookie from '../../img/coockie.png'
import { IoClose } from 'react-icons/io5';

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);
  const [isPolicyModalOpen, setIsPolicyModalOpen] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setVisible(false);
  };

  const handleClose = () => {
    setVisible(false);
  };

  const togglePolicyModal = (e) => {
    e.preventDefault();
    setIsPolicyModalOpen(!isPolicyModalOpen);
  };

  const PolicyModal = () => (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-40 p-4 md:p-6">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl relative flex flex-col max-h-[95dvh]">
        {/* Header Section - Fixed */}
        <div className="p-6 border-b">
          <button 
            onClick={() => setIsPolicyModalOpen(false)}
            className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <IoClose className="h-6 w-6 text-gray-500 hover:text-gray-700" />
          </button>
          <h2 className="text-2xl font-bold pr-8">Cookie Policy</h2>
        </div>

        {/* Content Section - Scrollable */}
        <div className="p-6 overflow-y-auto flex-grow">
          <div className="prose max-w-none">
            <h3 className="text-xl font-semibold mb-2">What are cookies?</h3>
            <p className="mb-4">
              Cookies are small text files that are placed on your computer or mobile device when you visit our website.
            </p>

            <h3 className="text-xl font-semibold mb-2">How we use cookies</h3>
            <p className="mb-2">We use cookies for the following purposes:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Essential cookies: Required for the website to function properly</li>
              <li>Analytics cookies: Help us understand how visitors use our website</li>
              <li>Preference cookies: Remember your settings and preferences</li>
              <li>Marketing cookies: Used to deliver relevant advertisements</li>
            </ul>

            <h3 className="text-xl font-semibold mb-2">Your choices</h3>
            <p className="mb-4">
              You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed.
            </p>

            <h3 className="text-xl font-semibold mb-2">Contact us</h3>
            <p className="mb-4">
              If you have any questions about our use of cookies, please contact us.
            </p>
          </div>
        </div>

        {/* Footer Section - Fixed */}
        <div className="p-6 border-t bg-white">
          <div className="flex justify-end">
            <button
              onClick={() => setIsPolicyModalOpen(false)}
              className="bg-black text-white py-2 px-6 rounded-lg hover:bg-gray-800"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const portalElement = document.getElementById('cookie-consent-portal');

  return (
    <>
      {visible && portalElement && ReactDOM.createPortal(
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-40 p-4">
          <div className="bg-white border overflow-hidden relative border-gray-300 shadow-lg p-6 max-w-xs w-full">
            <div className="absolute bottom-[-30px] left-[-30px]">
              <img src={cookie} alt="Cookie icon" className="h-28 w-auto z-10" />
            </div>
            
            <div className="flex justify-between items-start z-20 mb-4">
              <div className="text-left">
                <h3 className="text-2xl font-extrabold text-black">
                  We use <span className="bg-yellow-200">cookies</span>
                </h3>
                <p className="text-sm text-gray-600 mt-2">
                  We use <strong>cookies</strong> to make your experience on this website better.
                </p>
              </div>
              <button onClick={handleClose} className="p-1 rounded-full hover:bg-gray-100">
                <IoClose className="h-5 w-5 text-gray-500 hover:text-gray-700" />
              </button>
            </div>

            <div className="flex justify-between z-20 items-end space-x-4">
              <button
                onClick={togglePolicyModal}
                className="border border-gray-400 text-xs z-20 text-gray-700 py-1 px-4 rounded-lg bg-gray-100 bg-opacity-70"
              >
                Cookie Policies
              </button>
              <button
                onClick={handleAccept}
                className="bg-black text-white z-10 py-1 px-4 rounded-lg hover:bg-gray-800"
              >
                Accept
              </button>
            </div>
          </div>
        </div>,
        portalElement
      )}
      
      {isPolicyModalOpen && portalElement && ReactDOM.createPortal(
        <PolicyModal />,
        portalElement
      )}
    </>
  );
};

export default CookieConsent;