"use client"
import React, { useEffect, useState } from 'react'
import { FaArrowUp } from 'react-icons/fa6'
const GoToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
}
const ScrollToTop = () => {
    return (
        <div onClick={GoToTop} className='bg-white fixed bottom-4 right-4 p-4 cursor-pointer rounded-full' >
            <FaArrowUp />
        </div>
    )
}

export default ScrollToTop