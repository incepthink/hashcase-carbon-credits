/*import { StoreContext } from "@/utils/Store";
import { PlayCircleOutline } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";

const Header = () => {
    const { state, dispatch } = useContext(StoreContext);

    return (
        <div className="max-w-screen min-[880px]:h-[80%] h-[100%] bg-[#04a6e71a] min-[880px]:rounded-bl-[163px] rounded-bl-[80px]">
            <div className="flex flex-col min-[880px]:flex-row justify-around items-center">
                <div className="min-[880px]:w-[60%] w-[100%] my-4 min-[880px]:px-24 px-8 font-bold min-[880px]:py-16 flex-col font-poppins ">
                    <h1 className="min-[880px]:text-7xl text-5xl flex text-[#04A6E7] items-center">
                        tok-e-re
                    </h1>
                    <h1 className="min-[880px]:text-4xl text-2xl  items-center">
                        Switch to <span className="text-green-500">green energy</span> made Affordable, Simple & Quick
                    </h1>
                    <h1 className="text-base min-[880px]:text-xl min-[880px]:my-4 items-center normal-case text-gray-500 font-poppins">
                    Fractionalized & Tokenised Renewable Energy Certificates
                    </h1>
                    <div className="flex my-12 items-center font-poppins normal-case hidden min-[880px]:flex">
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

                <div className="w-[90%] min-[880px]:my-0 my-4 min-[880px]:w-[40%]  justify-center items-center">

                    <Image
                        src="/images/40813.png"
                        alt="Globe"
                        width={450}
                        height={450}
                        style={{ objectFit: "contain", margin:'0 auto' }}
                    />

                </div>

                <div className="flex items-center font-poppins normal-case mb-4 min-[880px]:hidden">
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
import { useAccount } from "wagmi";
import { ConnectButton } from '@rainbow-me/rainbowkit';

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

const Header = () => {
    const router = useRouter();
    const token = env.HASHCASE_API_KEY;
    const { state, dispatch } = useContext(StoreContext);
    const [transactionHash, setTransactionHash] = useState("");
    const [isLoadingModalOpen, setIsLoadingModalOpen] = useState(false);
    const [accountAddress, setAccountAddress] = useState("");
    const [nftBalance, setNftBalance] = useState(-1);
    const { address: wagmiAddress } = useAccount();

    const getWalletAddress = () => {
        return state?.user?.magic_wallet || state?.user?.wallet_address || wagmiAddress || null;
    };

    useEffect(() => {
        console.log("state.user:", state.user, "wagmiAddress:", wagmiAddress);
        checkNFTBalanceForUser();
    }, [state.user, wagmiAddress]);

    const checkNFTBalanceForUser = async () => {
        const wallet_address = getWalletAddress();
        if(!wallet_address) return;
        setAccountAddress(wallet_address);

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
        const wallet_address = getWalletAddress();
        console.log("mintNFTToWallet wallet_address:", wallet_address, "wagmiAddress:", wagmiAddress);
        if(!wallet_address){
            router.push('/signin')
            return;
        }
        setAccountAddress(wallet_address);
        openLoadingModal();

        try{
            const bodyParameters = {
                collection_id: 226,
                name: "Greenvest CC NFT",
                description: "This is a FREE CLAIM for the early supporters of Greenvest as we make the world greener.",
                image_url: "https://metadata-hashcase-admin.s3.us-east-2.amazonaws.com/nft-images/1770376182099-sample_nft.png",
                attributes: [],
                recipient: wallet_address,
                amount: 1,
                metadata_id: 53,
            };

            const res = await axios.post("https://api.hashcase.co/platform/mint-nft", bodyParameters);
            console.log(res.data);
            const { data } = res.data;
            if(data){
                setTransactionHash(data.transactionHash || "claimed");
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
                            <span className="font-bold font-poppins text-2xl">Carbon Credits Claimed!</span>
                            <div className="flex flex-col items-center mt-4">
                                <a
                                    href={`https://polygonscan.com/tx/${transactionHash}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 underline break-all text-sm mt-2"
                                >
                                    {`https://polygonscan.com/tx/${transactionHash}`}
                                </a>
                                <Link href={`/myWallet`}>
                                    <button
                                        className="text-white bg-[#04A6E7] rounded-[1.5rem] px-4 py-2 hover:scale-105 hover:duration-150 hover:ease-in hover:delay-150 font-poppins mt-8"
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
            <div className="font-poppins w-full min-h-screen bg-home-background bg-center flex flex-col min-[880px]:flex-row items-stretch bg-cover relative overflow-auto">

                <Head>
                    <title>Hashcase Carbon Credit&apos;s NFT</title>
                </Head>

                <div className="flex-1 flex justify-center items-center p-4 min-[880px]:p-8">
                    <div className="flex flex-col items-start">
                        <h1 className="font-bebas text-3xl min-[880px]:text-4xl uppercase">
                            Hashcase CC NFT
                        </h1>
                        <p className="text-[#667085] text-justify max-w-3xl mt-2 text-sm min-[880px]:text-base">
                        This is a FREE CLAIM for the early supporters of Hashcase as we make the world greener. Each NFT represents 1kg of CO2 that has been sequestered from the environment. Together, the 1,000 NFTs make up a single carbon credit. For more details on the Carbon Credit, view the certificate at:
                        </p>
                        <a className="text-blue-600 underline mt-2 text-sm min-[880px]:text-base break-all" href="https://drive.google.com/file/d/1RS0usksdEJSgWYJnTP3Ax8TwuyinB5wy/view" target="_blank">https://drive.google.com/file/d/1RS0usksdEJSgWYJnTP3Ax8TwuyinB5wy/view</a>

                    </div>
                </div>


                {/* nft page content */}
                <div className='min-[880px]:min-w-[500px] min-[880px]:mx-4 my-4 min-[880px]:w-[35%] w-full flex bg-[#04A6E7] rounded-md items-center'>

                    {/* nft page content with scroll */}
                    <div className='w-full px-4 min-[880px]:px-6 py-4 min-[880px]:py-0 flex flex-col'>

                        {/* nft page content top */}
                        <div>

                            {/* information content */}
                            <div className='w-full flex flex-col font-poppins'>
                                {/* NFT NAME */}
                                <span className='text-lg min-[880px]:text-xl text-white font-semibold mb-1'>Name of NFT:</span>
                                <span
                                    className='bg-[#68CAF1] p-3 text-base min-[880px]:text-xl text-white font-bold rounded-xl border-[#E3E3E3] border-solid border-[2px] flex items-center'
                                >
                                    Hashcase Carbon Credit TREE&nbsp;&nbsp;<Image src='/images/sample_nft.png' alt="sample nft" width={40} height={40} style={{objectFit:'contain'}}/>
                                </span>
                            </div>


                            <div className='w-full flex flex-col font-poppins'>
                                <span className='text-lg min-[880px]:text-xl text-white font-semibold mb-1 mt-4'>Description:</span>
                                <span
                                    className='bg-[#68CAF1] p-3 min-[880px]:p-4 text-base min-[880px]:text-xl text-white font-bold rounded-xl border-[#E3E3E3] border-solid border-[2px] flex flex-col items-start'
                                >
                                    1 REC NFT  = 1kWh (Unit of power)
                                </span>
                            </div>
                            <div className="w-full flex flex-col my-4">
                                <img src='/images/sample_nft.png' alt="sample nft" className="w-[70%] min-[880px]:w-[50%]" style={{'margin':'0 auto', borderRadius:'0.75rem'}} />
                            </div>

                            {
                            !getWalletAddress() ? (
                                <ConnectButton.Custom>
                                    {({ account, chain, openConnectModal, mounted }) => {
                                        const connected = mounted && account && chain;
                                        if (connected) return null;
                                        return (
                                            <button
                                                onClick={openConnectModal}
                                                className='w-full text-lg min-[880px]:text-xl self-center bg-[#0e7490] px-2 py-3 min-[880px]:py-4 rounded-md text-centers border-none outline-none cursor-pointer bg-white text-[#04A6E7] font-semibold mt-1 mb-1 transition delay-500 ease hover:-translate-y-2 active:translate-y-4'
                                                style={{fontSize:"1.25rem"}}
                                            >
                                                Connect Wallet
                                            </button>
                                        );
                                    }}
                                </ConnectButton.Custom>
                            ) : nftBalance > 0 ?
                            <span className="mt-2 text-[#000000] font-bold text-sm min-[880px]:text-base">Claimed! You have {nftBalance} Hashcase Carbon Credit NFTs</span> : <button
                                onClick={mintNFTToWallet}
                                className='w-full text-lg min-[880px]:text-xl self-center bg-[#0e7490] px-2 py-3 min-[880px]:py-4 rounded-md text-centers border-none outline-none cursor-pointer bg-white text-[#04A6E7] font-semibold mt-1 mb-1 transition delay-500 ease hover:-translate-y-2 active:translate-y-4'
                                style={{fontSize:"1.25rem"}}
                            >
                                Claim NFT
                            </button>
                        }

                                {/* credits corner */}
                            <Link href='https://www.hashcase.co'>
                                <div className='mt-2 w-[80%] min-[880px]:w-[60%] mx-auto self-center bg-[#0e7490] p-2 rounded-full text-white border-2 border-[#3e4eaa98] border-solid hidden min-[880px]:flex justify-center items-center cursor-pointer mb-4 min-[880px]:mb-0'>
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

export default Header;
