import { StoreContext } from "@/utils/Store";
import { logoutHandler } from "@/utils/user";
import { Button, Menu, MenuItem } from "@mui/material";
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"


function MobileNav({open, setOpen ,user, anchorEl, openDropdown, handleClose, handleClick,dispatch}) {
    const router = useRouter();
    return (
        <div className={`absolute top-0 left-0 h-screen w-screen bg-white transform ${open ? "-translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out filter drop-shadow-md `}>
            <div className="flex items-center justify-center filter drop-shadow-md bg-white h-20"> {/*logo container*/}
                <Link
                    className="flex items-center md:text-2xl text-lg font-semibold "
                    href="/"
                >
                    <Image
                        width={55}
                        height={55}
                        src="/images/hclogo.jpg"
                        alt="website logo"
                        style={{ objectFit: "contain" }}
                    />
                    <span className="text-[#04A6E7] font-ayuthaya ml-1">{" "}Hashcase Carbon Credit</span>
                </Link>
            </div>
            <div className="flex flex-col ml-4 text-[#00337C]  text-2xl font-nunito">
                
                <Link 
                    className={`my-4 ${router.pathname=='/' && 'underline underline-offset-[6px] decoration-[#00337C] decoration-2'}`} 
                    href="/" 
                    onClick={() => setTimeout(() => {setOpen(!open)}, 100)}
                >
                    REC NFTs
                </Link>
                <Link 
                    className={`my-4 ${router.pathname=='/aboutus' && 'underline underline-offset-[6px] decoration-[#00337C] decoration-2 '} `} 
                    href="/aboutus" 
                    onClick={() => setTimeout(() => {setOpen(!open)}, 100)}
                >
                    About Us
                </Link>
                <div 
                    
                >
                    {
                        user ?
                        <button
                            className="my-4 bg-[#04A6E7] text-white rounded-3xl px-4 py-2"
                            id="basic-button"
                            aria-controls={openDropdown ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={openDropdown ? 'true' : undefined}
                            onClick={handleClick}
                        >
                            My Account
                        </button>
                        :<Link onClick={()=>{setTimeout(()=>{setOpen(!open)},100) }} href='/signin'className="my-4 bg-[#04A6E7] text-white rounded-3xl px-4 py-2">Sign In</Link>
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
        <nav className="relative z-50 flex filter drop-shadow-md bg-white px-4 py-4 h-20 justify-center items-center">
            <MobileNav 
                open={open} 
                setOpen={setOpen} 
                user={state.user} 
                handleClick={handleClick} 
                handleClose={handleClose} 
                openDropdown={openDropdown} 
                anchorEl={anchorEl} 
                dispatch={dispatch}
            />
            <div className="md:w-3/12 w-1/2 flex items-center">
                <Link
                    className="flex items-center text-2xl font-semibold "
                    href="/"
                >
                    <Image
                        width={30}
                        height={30}
                        src="/images/hclogo.jpg"
                        alt="website logo"
                        style={{ objectFit: "contain" }}
                    />
                    <span className="text-[#04A6E7] ayuthaya ">{" "}  Hashcase Carbon Credit</span>
                </Link>
            </div>
            <div className="w-9/12 flex justify-end items-center">

                <div className="z-50 flex relative w-8 h-8 flex-col justify-between items-center md:hidden" onClick={() => {
                    setOpen(!open)
                }}>
                    {/* hamburger button */}
                    <span className={`h-1 w-full bg-black rounded-lg transform transition duration-300 ease-in-out ${open ? "rotate-45 translate-y-3.5" : ""}`} />
                    <span className={`h-1 w-full bg-black rounded-lg transition-all duration-300 ease-in-out ${open ? "w-0" : "w-full"}`} />
                    <span className={`h-1 w-full bg-black rounded-lg transform transition duration-300 ease-in-out ${open ? "-rotate-45 -translate-y-3.5" : ""}`} />
                </div>

                <div className="hidden md:flex justify-center items-center text-[#00337C] text-lg font-nunito ">
                    <Link 
                        href="/" 
                        className={`mx-4 hover:scale-105 duration-150 items-center justify-center ease-in delay-150 ${router.pathname=='/' && 'underline underline-offset-[6px] decoration-[#00337C] decoration-2'} `}
                    >
                        REC NFTs
                    </Link>
                    <Link 
                        href="/aboutus" 
                        className={`mx-4 hover:scale-105 duration-150 ease-in delay-150 ${router.pathname=='/aboutus' && 'underline underline-offset-[6px] decoration-[#00337C] decoration-2'} `}
                    >
                        About Us
                    </Link>
                    {
                    state.user ? 
                    <div className="hidden md:flex text-lg justify-center font-nunito items-center">
                        {/* <button 
                            onClick={() => {logoutHandler(dispatch)}}
                            className="mx-4 text-white bg-[#04A6E7] rounded-[1.5rem] px-4 py-2 hover:scale-105 hover:duration-150 hover:ease-in hover:delay-150"
                            >
                                Log out
                        </button> */}
                        <button
                            className="mx-4 text-white bg-[#04A6E7] rounded-[1.5rem] px-4 py-2 hover:scale-105 hover:duration-150 hover:ease-in hover:delay-150"
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
                        >
                            <Link 
                                href="/myWallet" 
                            >
                                <MenuItem onClick={handleClose}>My Wallet</MenuItem>
                            </Link>
                            
                            <MenuItem onClick={() => {logoutHandler(dispatch)}}>Logout</MenuItem>
                        </Menu>
                    </div>
                    : <div className="hidden md:flex text-lg font-nunito items-center">
                    <Link 
                        href='/signin'
                        className="mx-4 text-white bg-[#04A6E7] rounded-[1.5rem] px-4 py-2 hover:scale-105 hover:duration-150 hover:ease-in hover:delay-150"
                    >
                        Sign In
                    </Link>
                </div>  
                }
                </div>
            </div>
        </nav>
    )
}

export default Navbar;