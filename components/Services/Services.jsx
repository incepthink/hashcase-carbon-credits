import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { useRouter } from 'next/router';

const Services = () => {
    const router = useRouter();
    return (
    <div className='max-w-screen flex-col justify-between p-12 my-4 bg-[#E6F6FD] font-poppins'>
        <div className='md:w-[90%] w-100 mx-auto flex-col border-b-2 border-gray-300'>
            <div className='flex justify-between items-center'>
                <h2 className="text-4xl font-bold uppercase tracking-wide">services</h2>
            </div>
            <p className='text-lg mt-4 text-gray-500 leading-8 pb-4'>
            Enterprises, Real Estate Developers and Individuals will find tok-e-re a highly efficient platform to manage their customised fractional REC transactions easier and faster.
Our platform provides verified, transparent and immutable REC NFTs for a clear trail and transfer of ownership.
            </p>
        </div>
        <div className='flex flex-col md:flex-row md:max-w-[90%] w-100 mx-auto justify-evenly items-center my-12 font-poppins'>
        
             <div  className='md:w-[30%] w-100  my-4 mx-auto items-center justify-center bg-white text-black rounded-lg hover:bg-[#04A6E7] hover:text-white '>
                <div  className='rounded-full overflow-hidden mx-auto mt-8 w-16 p-3 h-16 flex items-center justify-center bg-[#04A6E7]'>
                    <Image  src="/images/services/apartment.png" alt="skyline" width={50} height={50} style={{"objectFit":"contain"}} />
                </div>
                <div className='text-center items-center justify-center flex-col my-4'>
                    <h2 className='text-xl font-semibold'>
                        Enterprise 
                    </h2>
                    <p className='font-light text-md my-2 px-1'>
                    All enterprises be it large, medium and small, committed to Net 0 for a sustainable business, can start with offsetting their power consumptions with our curated and tokenised RECs. 
                    </p>
                </div>
                <div className='bg-slate-200 flex items-center justify-center rounded-full overflow-hidden w-10 h-10 mx-auto my-4'>
                    <ArrowRightAltIcon className='text-[#4C40F7]' />
                </div>
            </div>
            <div  className='md:w-[30%] w-100  my-4 mx-auto items-center justify-center bg-white text-black rounded-lg hover:bg-[#04A6E7] hover:text-white '>
                <div  className='rounded-full overflow-hidden mx-auto mt-8 w-16 p-3 h-16 flex items-center justify-center bg-[#04A6E7]'>
                    <Image  src="/images/services/industrial.png" alt="skyline" width={50} height={50} style={{"objectFit":"contain"}} />
                </div>
                <div className='text-center items-center justify-center flex-col my-4'>
                    <h2 className='text-xl font-semibold'>
                       Real Estate Developers
                    </h2>
                    <p className='font-light text-md my-2 px-2'>
                    Irrespective of the scale of the asset, every building has an immense opportunity to upgrade its value for higher returns. You can start by offsetting your power consumption with our curated and tokenised RECs. 
                    </p>
                </div>
                <div className='bg-slate-200 flex items-center justify-center rounded-full overflow-hidden w-10 h-10 mx-auto my-4'>
                    <ArrowRightAltIcon className='text-[#4C40F7]' />
                </div>
            </div>

            <div  className='md:w-[30%] w-100  my-4 mx-auto items-center justify-center bg-white text-black rounded-lg hover:bg-[#04A6E7] hover:text-white '>
                <div  className='rounded-full overflow-hidden mx-auto mt-8 w-16 p-3 h-16 flex items-center justify-center bg-[#04A6E7]'>
                    <Image  src="/images/services/apartment.png" alt="skyline" width={50} height={50} style={{"objectFit":"contain"}} />
                </div>
                <div className='text-center items-center justify-center flex-col my-4'>
                    <h2 className='text-xl font-semibold'>
                        Individuals 
                    </h2>
                    <p className='font-light text-md my-2 px-1'>
                    Discerning, globally conscious and trendsetting individuals also how have an opportunity to contribute to global Net 0. Connect with us to offset your power consumption with our curated and tokenised RECs. 
                    </p>
                </div>
                <div className='bg-slate-200 flex items-center justify-center rounded-full overflow-hidden w-10 h-10 mx-auto my-4'>
                    <ArrowRightAltIcon className='text-[#4C40F7]' />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Services