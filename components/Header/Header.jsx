/*import { StoreContext } from "@/utils/Store";
import { PlayCircleOutline } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";

const Header = () => {
    const { state, dispatch } = useContext(StoreContext);

    return (
        <div className="max-w-screen md:h-[80%] h-[100%] bg-[#04a6e71a] md:rounded-bl-[163px] rounded-bl-[80px]">
            <div className="flex flex-col md:flex-row justify-around items-center">
                <div className="md:w-[60%] w-[100%] my-4 md:px-24 px-8 font-bold md:py-16 flex-col font-poppins ">
                    <h1 className="md:text-7xl text-5xl flex text-[#04A6E7] items-center">
                        tok-e-re
                    </h1>
                    <h1 className="md:text-4xl text-2xl  items-center">
                        Switch to <span className="text-green-500">green energy</span> made Affordable, Simple & Quick 
                    </h1>
                    <h1 className="text-base md:text-xl md:my-4 items-center normal-case text-gray-500 font-poppins">
                    Fractionalized & Tokenised Renewable Energy Certificates
                    </h1>
                    <div className="flex my-12 items-center font-poppins normal-case hidden md:flex">
                        <Link
                                href="/apply"
                                className="text-white  bg-[#04A6E7] rounded-[1.5rem] px-4 py-2 hover:scale-105 hover:duration-150 hover:ease-in hover:delay-150 font-poppins"
                                style={{ fontSize: "1.25rem" }}
                            >
                                Place Order
                            </Link>
                        {/* <Link
                            href="/watch-video"
                            className="flex ml-12 hover:scale-105 hover:duration-150 hover:ease-in hover:delay-150 font-poppins"
                            style={{ fontSize: "1.25rem" }}
                        >
                            <PlayCircleOutline
                                style={{ fontSize: "2rem" }}
                                className="text-[#04A6E7]"
                            />
                            <button className="text-[#04A6E7] flex ml-1 items-center">
                                Watch Video
                            </button>
                        </Link> */
 /*                   </div>
                </div>

                <div className="w-[90%] md:my-0 my-4 md:w-[40%]  justify-center items-center">
                
                    <Image
                        src="/images/40813.png"
                        alt="Globe"
                        width={450}
                        height={450}
                        style={{ objectFit: "contain", margin:'0 auto' }}
                    />
                
                </div>

                <div className="flex items-center font-poppins normal-case mb-4 md:hidden">
                    <Link
                        href="/apply"
                        className="text-white  bg-[#04A6E7] rounded-[1.5rem] px-4 py-2 hover:scale-105 hover:duration-150 hover:ease-in hover:delay-150 font-poppins"
                        style={{ fontSize: "1.25rem" }}
                    >
                        Place Order
                    </Link>
                    {/* <Link
                        href="/watch-video"
                        className="flex ml-12 hover:scale-105 hover:duration-150 hover:ease-in hover:delay-150 font-poppins"
                        style={{ fontSize: "1.25rem" }}
                    >
                        <PlayCircleOutline
                            style={{ fontSize: "2rem" }}
                            className="text-[#04A6E7]"
                        />
                        <button className="text-[#04A6E7] flex ml-1 items-center">
                            Watch Video
                        </button>
                    </Link> */
 /*               </div>
            </div>
        </div>
    );
};

export default Header; */

import Image from "next/image";
import Navbar from "@/components/Navbar/Navbar";
import { env } from "@/next.config";
import { StoreContext } from "@/utils/Store";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import Modal from "react-modal";
import { PropagateLoader } from "react-spinners";
import { toast } from "react-toastify";

const customStyles = {
    content: {
        width: "90%",
        maxWidth: "500px",
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        transform: "translate(-50%, -50%)",
        borderRadius: "1rem",
        backgroundImage: "#ffffff",
    },
    overlay: {
        background: "#00000083",
        zIndex: 1000,
    },
};

const Marketplace = () => {
    const router = useRouter();
    const token = env.HASHCASE_API_KEY;
    const { state, dispatch } = useContext(StoreContext);
    const [transactionHash, setTransactionHash] = useState("");
    const [isLoadingModalOpen, setIsLoadingModalOpen] = useState(false);
    const [accountAddress, setAccountAddress] = useState("");
    const [nftBalance, setNftBalance] = useState(-1);
    
    useEffect(() => {
        console.log(state.user);
        checkNFTBalanceForUser();
    }, [state.user]);

    const checkNFTBalanceForUser = async () => {
        let wallet_address;
        
        if(state?.user?.magic_wallet){
            wallet_address = state.user.magic_wallet;
            setAccountAddress(state.user.magic_wallet);
        }else if(state?.user?.wallet_address){
            wallet_address = state.user.wallet_address;
            setAccountAddress(state.user.wallet_address);
        }else{
            return;
        }

        try{
            const config = {
                headers: {
                  "Content-Type": "application/json",
                },
            };
        
            axios.defaults.headers.common = {
                "x-api-key": token,
            };
            const res = await axios.get(`https://api.hashcase.co/dev/checkBalanceOfNFTInWallet?wallet_address=${wallet_address}&token_id=6&collection_id=2`, config);
            console.log(res.data);
            setNftBalance(res.data.balance);
        }catch(e){
            console.log(e);
            setNftBalance(0);
        }
        
    }

    const openLoadingModal = () => {
        setIsLoadingModalOpen(true);
    };

    const closeLoadingModal = () => {
        setIsLoadingModalOpen(false);
        setTransactionHash("");
    };

    const mintNFTToWallet = async () => {
        let wallet_address;
        
        if(state?.user?.magic_wallet){
            wallet_address = state.user.magic_wallet;
            setAccountAddress(state.user.magic_wallet);
        }else if(state?.user?.wallet_address){
            wallet_address = state.user.wallet_address;
            setAccountAddress(state.user.wallet_address);
        }else{
            router.push('/signin')
            return;
        }
        openLoadingModal();

        try{
            const bodyParameters = {
                wallet_address: `${wallet_address}`,
                collection_id: 2,
                token_id: 6
            };
        
            const config = {
                headers: {
                  "Content-Type": "application/json",
                },
            };
        
            axios.defaults.headers.common = {
                "x-api-key": token,
            };
            const res = await axios.post("https://api.hashcase.co/dev/mintNFTtoAccount", bodyParameters, config);
            console.log(res.data);
            if(res.data.transactionHash != ""){
                setTransactionHash(res.data.transactionHash);
                checkNFTBalanceForUser();
            }else{
                toast.error("Error occurred, try later!");
                closeLoadingModal();
            }
        }catch(err){
            console.log(err);
            toast.error("Error occurred, try later!");
            closeLoadingModal();
        }
    }

    return (
        <>
            
            <Modal
                isOpen={isLoadingModalOpen}
                onRequestClose={closeLoadingModal}
                style={customStyles}
                contentLabel="Loading Modal"
            >
                <div className="w-full flex flex-col items-center">
                    {transactionHash == "" ? (
                        <>
                            <div>
                                <PropagateLoader size={20} color={"#04A6E7"} />
                            </div>
                            <div className="mt-8 font-semibold">Claiming your free carbon credits...</div>
                        </>
                    ) : (
                        <>
                            <span className="font-bold">Carbon Credits Claimed!</span>
                            <div>
                                <Link className="mr-4" href={`https://polygonscan.com/tx/${transactionHash}`}>
                                    <button
                                        className="text-[#04A6E7] bg-[#e8f6ff] rounded-[1.5rem] px-4 py-2 hover:scale-105 hover:duration-150 hover:ease-in hover:delay-150 font-poppins mt-8"
                                        style={{fontSize:"1.25rem"}}
                                    >
                                        Verify
                                    </button>
                                </Link>
                                <Link href={`/myWallet`}>
                                    <button
                                        className="text-white  bg-[#04A6E7] rounded-[1.5rem] px-4 py-2 hover:scale-105 hover:duration-150 hover:ease-in hover:delay-150 font-poppins mt-8"
                                        style={{fontSize:"1.25rem"}}
                                    >
                                        View NFT
                                    </button>
                                </Link>

                            </div>
                        </>
                    )}
                </div>
            </Modal>
            <div className="absolute font-poppins w-full h-screen md:bg-home-background bg-[#3addf6] bg-center  flex flex-row items-stretch bg-cover   relative overflow-hidden ">
                
                <Head>
                    <title>Hashcase Carbon Credit&apos;s NFT</title>
                </Head>

                { <div className="flex-1 flex justify-center items-center p-8">
                    <div className="flex flex-col items-start">
                        <h1 className="font-bebas text-4xl uppercase">
                            Greenvest CC NFT
                        </h1>
                        <p className="text-[#667085]">
                        This is a FREE CLAIM for the early supporters of Greenvest as we make the world greener.Each NFT represents 1kg of CO2 that has been sequestered from the environment. Together, the 1,000 NFTs make up a single carbon credit.For more details on the Carbon Credit, view the certificate at: <a href="https://drive.google.com/file/d/1RS0usksdEJSgWYJnTP3Ax8TwuyinB5wy/view" target="_blank">https://drive.google.com/file/d/1RS0usksdEJSgWYJnTP3Ax8TwuyinB5wy/view</a>
                        </p>
                        {
                            nftBalance == -1 ? <></> : 
                            nftBalance > 0 ? 
                            <span className="mt-2 text-[#04A6E7] font-bold">Claimed! You have {nftBalance} Carbon Credit NFTs</span> : <button
                                onClick={mintNFTToWallet}
                                className="text-white  bg-[#04A6E7] rounded-[1.5rem] px-4 py-2 hover:scale-105 duration-150 ease-in delay-150 font-poppins mt-8"
                                style={{fontSize:"1.25rem"}}
                            >
                                Claim NFT
                            </button>
                        }
                        
                    </div>
                </div> }


                {/* nft page content */}
                <div className=' md:min-w-[500px] md:mx-4 md:my-3 m-0 md:w-[35%] w-[100vw] flex md:bg-[#04A6E7]  rounded-md md:rounded-md items-center  overflow-hidden '>
                    
                    {/* nft page content with scroll */}
                    <div className='w-full p-6 flex flex-col h-full overflow-x-hidden overflow-y-auto scroll-smooth hover:scroll-auto custom-scrollbar'>

                        {/* nft page content top */}
                        <div>
                            
                            
                            
                            {/* information content */}
                            <div className='w-full flex flex-col font-poppins'>
                                {/* NFT NAME */}
                                <span className='text-xl text-white font-semibold '>Name of NFT</span>
                                <span
                                    className='bg-[#68CAF1] p-3 text-xl text-white font-bold rounded-xl border-[#E3E3E3] border-solid border-[2px] flex  items-center'
                                >
                                    Hashcase Carbon Credit TREE&nbsp;&nbsp;<Image src='/images/sample_nft.png' alt="sample nft" width={40} height={40} style={{objectFit:'contain'}}/>
                                </span>
                            </div>


                            <div className='w-full flex flex-col font-poppins '>
                                {/* NFT NAME */}
                                <span className='text-xl text-white font-semibold my-2'>Description</span>
                                <span
                                    className='bg-[#68CAF1] p-4 text-xl text-white font-bold rounded-xl border-[#E3E3E3] border-solid border-[2px] flex flex-col items-start'
                                > 
                                    1 REC NFT  = 1kWh (Unit of power)
                                </span>
                            </div>    
                            <div className="w-full flex flex-col my-4 ">
                                <img src='/images/sample_nft.png' alt="sample nft" className="md:w-[50%] w-[85%]" style={{'margin':'0 auto', borderRadius:'0.75rem'}} />
                            </div>

                            
                            

                                <div className="w-full flex justify-center items-center">
                                    <button onClick={() => router.push('/apply')} className='w-full text-xl self-center bg-[#0e7490] px-2 py-4 rounded-md text-centers border-none outline-none cursor-pointer bg-white text-[#04A6E7] font-semibold mt-3 mb-3 transition delay-500 ease hover:-translate-y-2 active:translate-y-4'>
                                        Place Order 
                                    </button>
                                </div>

                                {/* credits corner */}
                            <Link href='https://www.hashcase.co'>
                                <div className='md:w-[60%] w-[80%] mx-auto self-center bg-[#0e7490] p-2 rounded-full text-white border-2 border-[#3e4eaa98] border-solid flex justify-center items-center cursor-pointer'>
                                    Powered by {" "} 
                                    <img className='h-5 ml-2 text-white' src='/images/hashcaselogo.png' alt='hashcase logo' />
                                </div>
                            </Link>

                        </div>
            
                    </div>


                </div>
                
            </div>
        </>
    );
};

export default Marketplace;

