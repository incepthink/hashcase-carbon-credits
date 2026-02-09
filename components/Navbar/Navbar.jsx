import { StoreContext } from "@/utils/Store";
import { logoutHandler } from "@/utils/user";
import { Button, Menu, MenuItem } from "@mui/material";
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useDisconnect } from 'wagmi';
import Cookies from 'js-cookie';


function MobileNav({open, setOpen ,user, anchorEl, openDropdown, handleClose, handleClick,dispatch, onLogout}) {
    const router = useRouter();
    return (
        <div className={`absolute top-0 left-0 h-screen w-screen bg-gradient-to-b from-white to-gray-50 transform ${open ? "-translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out shadow-2xl`}>
            <div className="flex items-center justify-center bg-white/80 backdrop-blur-sm h-20 border-b border-gray-100">
                <Link
                    className="flex items-center gap-3"
                    href="/"
                >
                    <Image
                        width={45}
                        height={45}
                        src="/images/hclogo.jpg"
                        alt="website logo"
                        className="rounded-lg shadow-sm"
                        style={{ objectFit: "contain" }}
                    />
                    <span className="text-lg font-poppins font-semibold text-[#0891b2]">
                        HASHCASE Carbon Credit
                    </span>
                </Link>
            </div>
            <div className="flex flex-col px-6 pt-8 text-[#1e3a5f] text-xl font-poppins">

                <Link
                    className={`py-4 px-4 rounded-xl transition-all duration-200 ${router.pathname=='/' ? 'bg-[#04A6E7]/10 text-[#0891b2] font-semibold' : 'hover:bg-gray-100'}`}
                    href="/"
                    onClick={() => setTimeout(() => {setOpen(!open)}, 100)}
                >
                    REC NFTs
                </Link>
                <Link
                    className={`py-4 px-4 rounded-xl transition-all duration-200 ${router.pathname=='/aboutus' ? 'bg-[#04A6E7]/10 text-[#0891b2] font-semibold' : 'hover:bg-gray-100'}`}
                    href="/aboutus"
                    onClick={() => setTimeout(() => {setOpen(!open)}, 100)}
                >
                    About Us
                </Link>
                <div className="mt-4 px-4 flex flex-col gap-3">
                    <div className="flex justify-center">
                        <ConnectButton.Custom>
                            {({ account, chain, openConnectModal, openAccountModal, mounted }) => {
                                const connected = mounted && account && chain;
                                return (
                                    <button
                                        onClick={connected ? openAccountModal : openConnectModal}
                                        className="w-full bg-[#0891b2] text-white rounded-full px-6 py-3 font-poppins font-medium shadow-lg hover:bg-[#0e7490] transition-all duration-300"
                                    >
                                        {connected ? account.displayName : 'Connect Wallet'}
                                    </button>
                                );
                            }}
                        </ConnectButton.Custom>
                    </div>
                    {
                        user &&
                        <button
                            className="w-full bg-[#0891b2] text-white rounded-full px-6 py-3 font-medium shadow-lg hover:bg-[#0e7490] transition-all duration-300"
                            id="basic-button"
                            aria-controls={openDropdown ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={openDropdown ? 'true' : undefined}
                            onClick={handleClick}
                        >
                            My Account
                        </button>
                        // :<Link
                        //     onClick={()=>{setTimeout(()=>{setOpen(!open)},100)}}
                        //     href='/signin'
                        //     className="block text-center w-full bg-[#0891b2] text-white rounded-full px-6 py-3 font-medium shadow-lg hover:bg-[#0e7490] transition-all duration-300"
                        // >
                        //     Sign In
                        // </Link>
                    }

                </div>
            </div>
        </div>
    )
}

const Navbar = () => {
    const { state, dispatch } = useContext(StoreContext);
    const [userText, setUserText] = useState("Connect Wallet");
    const [open,setOpen] = useState(false);
    const router = useRouter();
    const { address: wagmiAddress, isConnected: wagmiConnected } = useAccount();
    const { disconnect } = useDisconnect();
    const isUserConnected = state.user || wagmiConnected;

    //check if user is empty and logout if empty
    try {
        if (state.user && Object.keys(state.user).length == 0) {
        dispatch({ type: "UNSET_USER" });
        Cookies.remove("user");
        dispatch({ type: "UNSET_JWT" });
        Cookies.remove("jwt");
        }
    } catch (error) {
        console.log(error);
    }
    
    useEffect(() => {
        console.log(state.user);
        state?.user?.wallet_address
          ? setUserText(
              state.user.wallet_address.slice(0, 4) +
                "..." +
                state.user.wallet_address.slice(-3)
            )
          : state?.user?.email
          ? setUserText(state.user.email)
          : setUserText("CONNECTED");
      }, [state.user]);

      const [anchorEl, setAnchorEl] = useState(null);
        const openDropdown = Boolean(anchorEl);
        const handleClick = (event) => {
            setAnchorEl(event.currentTarget);
        };
        const handleClose = () => {
            setAnchorEl(null);
        };

    return (
        <nav className="relative z-50 flex bg-white/95 backdrop-blur-md px-6 lg:px-12 py-3 h-[72px] justify-between items-center border-b border-gray-100 shadow-sm">
            <MobileNav
                open={open}
                setOpen={setOpen}
                user={isUserConnected}
                handleClick={handleClick}
                handleClose={handleClose}
                openDropdown={openDropdown}
                anchorEl={anchorEl}
                dispatch={dispatch}
                onLogout={() => { if (wagmiConnected) disconnect(); logoutHandler(dispatch); }}
            />
            <div className="flex items-center">
                <Link
                    className="flex items-center gap-3 group"
                    href="/"
                >
                    <div className="relative">
                        <Image
                            width={50}
                            height={50}
                            src="/images/hclogo.jpg"
                            alt="website logo"
                            className="rounded-lg shadow-sm group-hover:shadow-md transition-shadow duration-300"
                            style={{ objectFit: "contain" }}
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xl font-poppins font-bold leading-tight">
                            HashCase
                        </span>
                        <span className="text-xs font-poppins font-medium text-gray-500 tracking-wide">
                            Carbon Credit
                        </span>
                    </div>
                </Link>
            </div>
            <div className="flex items-center gap-2">

                <div className="z-50 flex relative w-8 h-8 flex-col justify-between items-center md:hidden cursor-pointer" onClick={() => {
                    setOpen(!open)
                }}>
                    <span className={`h-[3px] w-full bg-[#0891b2] rounded-full transform transition duration-300 ease-in-out ${open ? "rotate-45 translate-y-[10px]" : ""}`} />
                    <span className={`h-[3px] w-full bg-[#0891b2] rounded-full transition-all duration-300 ease-in-out ${open ? "opacity-0" : "opacity-100"}`} />
                    <span className={`h-[3px] w-full bg-[#0891b2] rounded-full transform transition duration-300 ease-in-out ${open ? "-rotate-45 -translate-y-[10px]" : ""}`} />
                </div>

                <div className="hidden md:flex items-center gap-1">
                    <Link
                        href="/"
                        className={`px-5 py-2.5 rounded-full font-poppins font-medium text-[15px] transition-all duration-300
                            ${router.pathname=='/'
                                ? 'bg-[#04A6E7]/10 text-[#0891b2]'
                                : 'text-[#1e3a5f] hover:bg-gray-100'
                            }`}
                    >
                        REC NFTs
                    </Link>
                    <Link
                        href="/aboutus"
                        className={`px-5 py-2.5 rounded-full font-poppins font-medium text-[15px] transition-all duration-300
                            ${router.pathname=='/aboutus'
                                ? 'bg-[#04A6E7]/10 text-[#0891b2]'
                                : 'text-[#1e3a5f] hover:bg-gray-100'
                            }`}
                    >
                        About Us
                    </Link>
                    {
                    isUserConnected ?
                    <div className="flex items-center ml-2">
                        <button
                            className="bg-[#0891b2] text-white rounded-full px-6 py-2.5 font-poppins font-medium text-[15px] shadow-md hover:bg-[#0e7490] hover:scale-[1.02] transition-all duration-300"
                            id="basic-button"
                            aria-controls={openDropdown ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={openDropdown ? 'true' : undefined}
                            onClick={handleClick}
                        >
                            My Account
                        </button>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={openDropdown}
                            onClose={handleClose}
                            MenuListProps={{
                            'aria-labelledby': 'basic-button',
                            }}
                            className="mt-2"
                            PaperProps={{
                                sx: {
                                    borderRadius: '12px',
                                    boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                                    mt: 1.5,
                                }
                            }}
                        >
                            <Link
                                href="/myWallet"
                            >
                                <MenuItem onClick={handleClose} sx={{  py: 1.5, px: 3 }}>My Wallet</MenuItem>
                            </Link>

                            <MenuItem onClick={() => { handleClose(); if (wagmiConnected) disconnect(); logoutHandler(dispatch); }} sx={{  py: 1.5, px: 3 }}>Logout</MenuItem>
                        </Menu>
                    </div>
                    : <div className="flex items-center ml-2 gap-3">
                        <ConnectButton.Custom>
                            {({ account, chain, openConnectModal, openAccountModal, mounted }) => {
                                const connected = mounted && account && chain;
                                return (
                                    <button
                                        onClick={connected ? openAccountModal : openConnectModal}
                                        className="bg-[#0891b2] text-white rounded-full px-6 py-2.5 font-poppins font-medium text-[15px] shadow-md hover:bg-[#0e7490] hover:scale-[1.02] transition-all duration-300"
                                    >
                                        {connected ? account.displayName : 'Connect Wallet'}
                                    </button>
                                );
                            }}
                        </ConnectButton.Custom>
                        {/* <Link
                            href='/signin'
                            className="bg-[#0891b2] text-white rounded-full px-6 py-2.5 font-poppins font-medium text-[15px] shadow-md hover:bg-[#0e7490] hover:scale-[1.02] transition-all duration-300"
                        >
                            Sign In
                        </Link> */}
                    </div>
                }
                </div>
            </div>
        </nav>
    )
}

export default Navbar;