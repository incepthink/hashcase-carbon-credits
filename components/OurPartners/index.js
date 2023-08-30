import React from 'react'

const index = () => {
  return (
    <div className='max-w-screen flex-col justify-between p-12 my-4  font-poppins'>
        <div className='md:w-[90%] w-100 mx-auto flex-col border-b-2 border-gray-300'>
            
            <div className='flex justify-between items-center'>
                <h2 className="text-4xl font-bold uppercase tracking-wide">Our Partners</h2>
            </div>
            

            

        </div>
        <div className='flex flex-col md:flex-row md:max-w-[90%] w-100 mx-auto justify-evenly items-center my-12 font-poppins'>
                
                <a href="https://ebtc.eu/" target="_blank">
                    <div className='flex flex-col my-4 cursor-pointer hover:scale-105 hover:duration-500'>
                        <img src="/images/partner4.png" alt="partner 1" width={250} height={250} style={{margin:'0 auto'}} />
                        </div>
                </a>

                <a href='https://cma-india.in/' target='_blank'>
                    <div className='flex flex-col my-4 cursor-pointer hover:scale-105 hover:duration-500'>
                        <img src="/images/partner5.png"  alt="partner 1" width={250} height={250} style={{margin:'0 auto'}} />
                    </div>
                </a>

                <a href='/' target='_blank'>
                    <div className='flex flex-col my-4 cursor-pointer hover:scale-105 hover:duration-500'>
                        <img src="/images/envf.png"  alt="partner 1" width={300} height={300} style={{margin:'0 auto'}} />
                    </div>
                </a>
        </div>
    </div>
  )
}

export default index