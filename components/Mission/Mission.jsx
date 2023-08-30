
import React from 'react'

const Mission = () => {
  return (
    <div className='max-w-screen my-8 text-2xl flex flex-col justify-center items-center'>
            <div className='md:hidden flex w-100 justify-beteen items-center'>
                <h2 className=" text-4xl font-bold my-2">Our Mission</h2>
            </div>
            <h2 className="font-bold text-4xl hidden md:block">Our Mission</h2>
            <p className="text-gray-500 text-md">Accelerating the solutions that are </p>
    
        <div className='max-w-screen  flex md:flex-row flex-col justify-between p-12'>
            
            <div className="bg-white py-12 md:w-[30%] my-2 mx-auto rounded-xl w-[90%] shadow-sm shadow-[#04A6E7] flex justify-center items-center font-poppins cursor-pointer hover:scale-105 hover:duration-500 hover:bg-[#b0e9f2]">
                <p className="text-black flex p-4 font-bold justify-center items-center text-center text-md ">Tailor made to fit everyone&apos;s requirement.</p>
            </div>
            <div className="bg-white py-12 md:w-[30%] mx-auto my-2 rounded-xl w-[90%] shadow-sm shadow-[#04A6E7] flex justify-center items-center font-poppins  cursor-pointer hover:scale-105 hover:duration-500 hover:bg-[#b0e9f2]">
                <p className="text-black p-4 font-bold flex justify-center items-center text-center text-md ">Simple, Affordable, Quick, Easy to implement and report.</p>
            </div>
            <div className="bg-white py-12 md:w-[30%] mx-auto my-2 rounded-xl w-[90%] shadow-sm shadow-[#04A6E7] flex justify-center items-center font-poppins cursor-pointer hover:scale-105 hover:duration-500 hover:bg-[#b0e9f2]">
                <p className="text-black p-4 font-bold flex justify-center items-center text-center text-md ">Incentivise, Reward and celebrate &apos; green footprints &apos;.</p>
            </div>
        </div>
    </div>
  )
}

export default Mission