import { EmailOutlined, FacebookOutlined, LinkedIn, LocalPhoneOutlined, Twitter } from '@mui/icons-material'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
    const [msg,setMsg] = React.useState("");
    const sendMail = () => {
        if(msg != "") {
            const mailto = "mailto:contact@tokere.com?body=" +encodeURIComponent(msg);
            window.location.href = mailto;
        }
    }
  return (
    <div className='max-w-screen    flex text-white bg-[#04A6E7]  flex-col font-poppins'>
        <div className='hidden md:flex flex-row justify-between items-center'>
            <Link className="flex items-center  px-12 py-2 text-xl font-semibold " href="/">
                <Image width={130} height={130} src = '/images/hashcaselogo.png' alt='website logo' style={{"objectFit":"contain"}}  />
                <span className="text-white font-ayuthaya"> </span>
            </Link>
        </div>
        <Link className="md:hidden flex justify-center items-center bg-[#00000033] px-12 py-6 text-2xl font-semibold " href="/">
            <Image width={130} height={130} src = '/images/hashcaselogo.png' alt='website logo' style={{"objectFit":"contain"}}  />
            <span className="text-white"> </span>
        </Link>
        <div className='flex md:flex-row flex-col justify-around  p-6 font-poppins'>
            <div className='flex flex-col  md:w-[20%] w-[100%]'>
                <div className='flex flex-row my-2'>
                    <div className='rounded-full p-4 bg-[#111C55] items-center'><EmailOutlined className='text-green-500' /></div>
                    
                    <div className='flex text-xl  flex-col mx-2'>
                        <p>Email</p>
                        <p>contact@hashcase.com</p>
                    </div>
                </div>
                <div className='flex  flex-row my-2 '>
                <div className='rounded-full p-4 bg-[#111C55] items-center'><LocalPhoneOutlined className='text-green-500' /></div>
                    <div className='text-xl flex flex-col mx-2'>
                        <p>Call Us</p>
                        <p>+919986034385</p>
                    </div>
                </div>
            </div>
            <div className='flex  md:w-[40%] w-[100%] md:flex-row flex-col  md:justify-between justify-center  text-white'>
                    <Link href='/nfts' className=' font-normal text-xl m-2' >Place Order</Link>
                    <Link href='/privacypolicy' className='font-normal text-xl m-2' >Privacy & Policy</Link>
                    <Link href='/disclaimer' className='font-normal text-xl m-2' >Disclaimer</Link>
                    <Link href='/faq' className='font-normal text-xl m-2' >FAQs</Link>
                
            </div>
            <div className='flex flex-col md:w-[25%] w-[100%] text-white'>
                <input onChange={(e) => {setMsg(e.target.value)}}  className='outline-none text-white border-white rounded-md border-2 w-[80%] mx-auto bg-transparent text-white placeholder-white px-6 py-4' placeholder='Enter your message' />
                <div className='w-[80%] flex flex-row mx-auto mt-4 items-center justify-between'>
                    <button onClick={sendMail} className='text-white bg-green-500 px-4 py-2 rounded-md'>Email Now</button>
                    <LinkedIn className='text-white' />
                    <FacebookOutlined className='text-white' />
                    <Twitter className='text-white' />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Footer