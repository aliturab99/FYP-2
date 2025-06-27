"use client"
import React from 'react';
import { FaSquareWhatsapp } from "react-icons/fa6";

const Whatsapp = () => {
  const openWhatsApp = () => {
    window.open("https://wa.me/923151455522", "_blank");
  };

  return (
    <div className='rounded-full bg-[#1a1a1a] cursor-pointer flex' onClick={openWhatsApp}>
      <FaSquareWhatsapp size={40} color="#25D366" className='m-auto justify-center'/>
    </div>
  );
};

export default Whatsapp;