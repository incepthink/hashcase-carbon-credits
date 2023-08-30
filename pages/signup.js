/* eslint-disable react-hooks/rules-of-hooks */
import Navbar from '@/components/Navbar/Navbar'
import { Google } from '@mui/icons-material'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

const signup = () => {
    const router = useRouter();
  return (
    <>
      <Navbar />
      <div className='max-w-screen max-h-screen flex overflow-hidden justify-center items-center my-12 md:my-0'>
          <div className='md:w-[50%] max-w-screen flex justify-center items-center'>
            <div className='flex flex-col'>
              <h1 className='font-bebas text-4xl uppercase'>Welcome There!</h1>
              <p className='text-[#667085]'>Please fill your detail to access your account.</p>
              <form className='flex flex-col w-full'>
                <div className='flex flex-col w-full my-2'>
                  <label>Name</label>
                  <input 
                    type='text' 
                    placeholder='Enter Your Name' 
                    className='bg-white border border-gray-300 rounded-md py-2 px-4 placeholder-gray-400 text-gray-700 focus:outline-none focus:ring-2 focus:ring-white-600 focus:border-white' 
                  />
                </div>
                <div className='flex flex-col w-full my-2'>
                  <label>Password</label>
                  <input 
                    type="password" 
                    placeholder="Enter Your Password" 
                    className="bg-white border border-gray-300 rounded-md py-2 px-4 placeholder-gray-400 text-gray-700 focus:outline-none focus:ring-2 focus:ring-white-600 focus:border-white" 
                  />
                </div>
                <div className='flex flex-col w-full my-2'>
                  <label>Confirm Password</label>
                  <input 
                    type='password' 
                    placeholder='Confirm Password' 
                    className='bg-white border border-gray-300 rounded-md py-2 px-4 placeholder-gray-400 text-gray-700 focus:outline-none focus:ring-2 focus:ring-white-600 focus:border-white' 
                  />
                </div>
                <div className='flex flex-row w-full justify-between my-2'>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className='h-full'
                    />
                    <span className="ml-1 text-gray-700">Remember me</span>
                  </div>
                  <Link href='/forgot-password' className='text-[#68CAF1] underline underline-offset-4'>Forgot Password</Link>
                </div>

                <button className="w-full bg-[#68CAF1] py-3 text-white rounded-md my-6">Sign In</button>

                <div className='w-full flex flex-row'>
                  <button className='bg-transparent border-2  border-slate-400 mr-4 py-1 px-4 rounded-lg'>
                    <Image 
                      src='/images/googleLogo.png' 
                      alt='google logo' 
                      width={20} 
                      height={20} 
                    />
                  </button>
                  <button className='bg-transparent border-2  border-slate-400 mr-4 py-1 px-4 rounded-lg'>
                    <Image 
                      src='/images/metamaskLogo.png' 
                      alt='google logo' 
                      width={20} 
                      height={20} 
                    />
                  </button>
                  <button className='bg-transparent border-2  border-slate-400 mr-4 py-1 px-4 rounded-lg'>
                    <Image 
                      src='/images/walletConnectLogo.png' 
                      alt='google logo' 
                      width={20} 
                      height={20} 
                    />
                  </button>
                  <button className='bg-transparent border-2  border-slate-400 mr-4 py-1 px-4 rounded-lg'>
                    <Image 
                      src='/images/metaLogo.png' 
                      alt='google logo' 
                      width={20} 
                      height={20} 
                    />
                  </button>
                </div>
                <div className='w-full text-center my-4'>
                  Don&apos;t have an account? <span className='text-[#68CAF1]' onClick={()=>router.push('/signin')}>Sign In</span>
                </div>
              </form>

            </div>
          </div>
          <div className='w-[50%] hidden md:flex p-3'>
            <Image src="/images/signin.png" alt="signin earth image" width={1960} height={1080} /> 
          </div>
      </div>
    </>
  )
}

export default signup