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
    <div className='w-full flex text-white bg-[#04A6E7] flex-col font-poppins overflow-hidden'>
        <div className='hidden md:flex flex-row justify-between items-center'>
            <Link className="flex items-center px-12 py-2 text-xl font-semibold" href="/">
                <Image width={130} height={130} src='/images/hashcaselogo.png' alt='website logo' style={{"objectFit":"contain"}} />
            </Link>
        </div>
        <Link className="md:hidden flex justify-center items-center bg-[#00000033] px-12 py-6 text-2xl font-semibold" href="/">
            <Image width={130} height={130} src='/images/hashcaselogo.png' alt='website logo' style={{"objectFit":"contain"}} />
        </Link>
        <div className='flex md:flex-row flex-col justify-between items-start p-6 font-poppins'>
            <div className='flex flex-col md:w-[25%] w-full'>
                <div className='flex flex-row items-center my-2'>
                    <div className='rounded-full p-3 bg-[#111C55] flex items-center justify-center'>
                        <EmailOutlined className='text-green-500' />
                    </div>
                    <div className='flex flex-col mx-3'>
                        <p className='text-sm font-medium'>Email</p>
                        <p className='text-sm'>contact@hashcase.com</p>
                    </div>
                </div>
                <div className='flex flex-row items-center my-2'>
                    <div className='rounded-full p-3 bg-[#111C55] flex items-center justify-center'>
                        <LocalPhoneOutlined className='text-green-500' />
                    </div>
                    <div className='flex flex-col mx-3'>
                        <p className='text-sm font-medium'>Call Us</p>
                        <p className='text-sm'>+91 98347 80832</p>
                    </div>
                </div>
            </div>
            <div className='flex md:w-[30%] w-full md:flex-row flex-col items-center justify-center text-white py-4 md:py-0'>
                <Link href='/nfts' className='font-normal text-lg mx-4 hover:underline'>Claim NFT</Link>
                <Link href='/faq' className='font-normal text-lg mx-4 hover:underline'>FAQs</Link>
            </div>
            <div className='flex flex-col md:w-[35%] w-full text-white'>
                <input
                    onChange={(e) => {setMsg(e.target.value)}}
                    className='outline-none border-white rounded-md border-2 w-full bg-transparent placeholder-white px-4 py-2 text-sm'
                    placeholder='Enter your message'
                />
                <div className='w-full flex flex-row mt-4 items-center gap-4'>
                    <button onClick={sendMail} className='text-white bg-green-500 px-4 py-2 rounded-md text-sm font-medium hover:bg-green-600'>Email Now</button>
                    <div className='flex items-center gap-3'>
                        <LinkedIn className='text-white cursor-pointer hover:opacity-80' style={{ fontSize: 24 }} />
                        <FacebookOutlined className='text-white cursor-pointer hover:opacity-80' style={{ fontSize: 24 }} />
                        <Twitter className='text-white cursor-pointer hover:opacity-80' style={{ fontSize: 24 }} />
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Footer