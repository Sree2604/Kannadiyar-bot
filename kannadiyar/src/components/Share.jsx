import React, { useState, useEffect } from "react";
import {
  FaWhatsapp,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

function Share() {

  const [recipient, setRecipient] = useState("bhubconsultancy@gmail.com");

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



  return (
    <div className="fixed bottom-6 right-4 z-50">
        <div className=" w-10 rounded-lg shadow-lg bg-primecolor ring-1 ring-textcolor-0 flex  gap-3 p-2 bottom-0 mr-3  absolute -ml-8  flex-col">
          <a href="https://wa.me/8124813376" target="_blank">
            <FaWhatsapp size={24} className="cursor-pointer hover:scale-125 text-white" />
          </a>
          <a href="https://www.instagram.com/bhub_2024/" target="_blank">
            <FaInstagram size={24} className="cursor-pointer hover:scale-125 text-white" />
          </a>
          <FaYoutube size={24} className="cursor-pointer hover:scale-125 text-white" />
          {/* <FiMail
            size={22}
            className="cursor-pointer hover:scale-125"
            alt="Gmail Logo"
            onClick={openGmailCompose}
          /> */}
        </div>
    </div>
  );
}

export default Share;
