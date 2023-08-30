import { FacebookOutlined, Instagram, LinkedIn, Twitter } from '@mui/icons-material'
import Image from 'next/image'
import Link from 'next/link'

const teamMembers = [
  {
    name: 'Prafulla Agarwal',
    // role: 'Founding Team',
    image: '/images/prafulla2.png',
  },
  {
    name: 'Taaha Nizam',
    // role: 'Founding Team',
    image: '/images/Taaha1.png',
  },
  {
    name: 'VKS Sastry',
    // role: 'Founding Team',
    image: '/images/vksastry2.png',
  },
  {
    name: 'Pooja Raikwar',
    // role: 'Founding Team',
    image: '/images/pooja2.png',
  },
  {
    name: 'Dr Anjan Ray',
    // role: 'Founding Team',
    image: '/images/Anjan2.png',
  },
]

const MeetOurTeam = () => {
  return (
    <div className='max-w-screen  font-poppins mt-2 mb-4'>
        <div className='md:w-[80%] w-96 mx-auto flex-col border-b-2 border-gray-300 mt-28 pb-4'>
            <div className='flex justify-between items-center'>
                <h2 className="text-3xl font-bold uppercase tracking-wide">Meet Our Team</h2>
            </div>
        </div>
        <div className='flex w-[80%] my-8 mx-auto flex-col md:flex-row justify-between items-center'>
            {
                teamMembers.map((member) => {
                    return (
                        <div 
                            key={member.name}
                            className='w-80 h-full mx-auto'
                        >
                            <div className='p-2'>
                                <div className="h-auto w-full">
                                    <Image
                                        width={300}
                                        height={350}
                                        // style={{"objectFit":"contain"}}
                                        src={member.image}
                                        alt={member.name}
                                    />
                                </div>
                                <div className='bg-[#04A6E7] px-4 py-4 text-white'>
                                    <h3 className="text-lg font-bold">
                                        {member.name}
                                    </h3>
                                    <div className='flex w-full justify-between items-center'>
                                        {/* <p className="mt-1 text-sm ">{member.role}</p> */}
                                        <div className='flex text-white'>
                                            <LinkedIn  className='px-1'/>
                                            <Twitter className='px-1' />
                                        </div>
                                    </div>


                                </div>

                            </div>
                        </div>
                    )
                })
            }
          
        </div>
    </div>
  )
}

{/* <div
              key={member.name}
              className='w-80 h-full mx-auto'
            >
                <div className="p-2 ">
                    <div className="h-full w-full">
                        <Image
                            width={1920}
                            height={1080}
                            style={{"objectFit":"contain"}}
                            src={member.image}
                            alt={member.name}
                        />
                    </div>
                    <div className='bg-[#04A6E7] px-8 py-4 text-white'>
                        <h3 className="text-xl font-bold">
                            {member.name}
                        </h3>
                        <div className='flex w-full justify-between items-center'>
                            <p className="mt-1 text-sm ">{member.role}</p>
                            <div className='flex text-white'>
                                <Instagram />
                                <FacebookOutlined />
                                <LinkedIn />
                                <Twitter />
                            <div>
                        </div>
                    </div>                   
                    
                    
                </div>
            </div> */}
export default MeetOurTeam