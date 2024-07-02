import React, { useState, useEffect } from "react";
import {
  FaWhatsapp,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
  FaArrowUp,
  FaShare,
} from "react-icons/fa";
import { FiMail } from "react-icons/fi";

function Share() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [recipient, setRecipient] = useState("bhubconsultancy@gmail.com");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      // Close the menu when scrolling
      setIsMenuOpen(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const openWhatsApp = () => {
    const whatsappChatURL = "https://wa.me/" + 8124813376;

    // Open the WhatsApp chat link in a new tab
    window.open(whatsappChatURL, "_blank");
  };

  const openGmailCompose = () => {
    // URL for opening Gmail compose window
    const url = `https://mail.google.com/mail/u/0/?view=cm&fs=1&to=${recipient}`;
    // Open the Gmail compose window in a new tab
    window.open(url, "_blank");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="fixed bottom-6 right-4 z-50">
      <div className={`App ${isVisible ? "visible" : "hidden"}`}>
        <div id="uparrow">
          <button
            className="p-2 rounded-full bg-textcolor-0 text-background-0 bg-primecolor"
            onClick={scrollToTop}
          >
            <FaArrowUp size={22} className="text-orange-100 hover:scale-125" />
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className=" w-48 rounded-lg shadow-lg bg-white ring-1 ring-textcolor-0 flex text-textcolor-0 gap-3 p-2 bottom-0 mr-3  absolute -ml-52">
          <a href="https://wa.me/8124813376" target="_blank">
            <FaWhatsapp size={22} className="cursor-pointer hover:scale-125" />
          </a>
          <a href="https://www.instagram.com/bhub_2024/" target="_blank">
            <FaInstagram size={22} className="cursor-pointer hover:scale-125" />
          </a>
          <FaLinkedinIn size={22} className="cursor-pointer hover:scale-125" />
          <FaYoutube size={22} className="cursor-pointer hover:scale-125" />
          <FiMail
            size={22}
            className="cursor-pointer hover:scale-125"
            alt="Gmail Logo"
            onClick={openGmailCompose}
          />
        </div>
      )}
      <div className="mt-2">
        <div className="flex">
          <button
            className="bg-primecolor text-orange-100 p-2 rounded-full bg-textcolor-0 text-background-0"
            onClick={toggleMenu}
          >
            <FaShare size={20} className="hover:scale-125" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Share;
