import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Visions = () => {
  return (
    <div className='max-w-screen flex md:flex-row flex-col justify-between p-12 md:mt-10'>
        <div className="bg-white rounded-lg md:w-[30%] w-[100%] md:my-4 flex flex-col items-center justify-center cursor-pointer hover:scale-105 hover:duration-500">
            <div className='md:hidden flex w-full justify-center items-center'>
                <h2 className="text-3xl text-center font-bold my-2">Vision & Mission</h2>
            </div>
            <h2 className="text-[1.95rem] font-bold my-2 hidden md:block">Vision & Mission</h2>
            <p className="hidden md:flex mb-4 text-gray-500 text-3xl  flex items-center">Accelerate Green Footprints&nbsp;<Image src='/images/Logo2.png' alt="nft image" width={35} height={35} /></p>
            <p className="md:hidden w-screen text-center justify-center  mb-4 text-gray-500 text-3xl flex items-center">Accelerate Green Footprints&nbsp;<Image src='/images/Logo2.png' alt="nft image" width={30} height={30} /></p>
        </div>
        <div className="bg-[#b0e9f2] py-12 md:w-[20%] my-2 mx-auto rounded-xl w-[90%] cursor-pointer shadow-sm shadow-[#04A6E7] flex justify-center items-center font-poppins cursor-pointer hover:scale-105 hover:duration-500 ">
            <p className="text-black flex px-3 font-bold justify-center items-center text-center  text-3xl">Tailor made to fit everyone&apos;s requirement</p>
        </div>
        <div className="bg-[#b0e9f2] py-12 md:w-[20%] mx-auto my-2 rounded-xl w-[90%] cursor-pointer shadow-sm shadow-[#04A6E7] flex justify-center items-center font-poppins  cursor-pointer hover:scale-105 hover:duration-500 ">
            <p className="text-black px-3 font-bold flex justify-center items-center text-center text-3xl ">Simple, Affordable, Quick, Easy to implement and report</p>
        </div>
        <div className="bg-[#b0e9f2] py-12 md:w-[20%] mx-auto my-2 rounded-xl w-[90%] cursor-pointer shadow-sm shadow-[#04A6E7] flex justify-center items-center font-poppins cursor-pointer hover:scale-105 hover:duration-500 ">
            <p className="text-black px-3 font-bold flex justify-center items-center text-center text-3xl ">Incentivise, Reward and celebrate &apos;green footprints&apos;</p>
        </div>
    </div>
  )
}

export default Visions