/* eslint-disable react-hooks/rules-of-hooks */
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../utils/Store";
import { magicLogin } from "../../utils/user";
import { notifyPromise, notifyResolve } from "../../utils/notify";
import { BeatLoader } from "react-spinners";

// Module-level flags to prevent duplicate calls across StrictMode remounts
let isProcessing = false;
let hasLoggedIn = false;

const Redirect = () => {
    const { state, dispatch } = useContext(StoreContext)
    const router = useRouter();
    const [userInfo, setUserInfo] = useState(null);
    const [did, setDid] = useState(null);
    const [link, setLink] = useState('/');
    const [isRedirecting, setIsRedirecting] = useState(false);

    // Reset flags when component mounts fresh (not StrictMode remount)
    useEffect(() => {
        return () => {
            // Reset on unmount so next navigation works
            isProcessing = false;
            hasLoggedIn = false;
        };
    }, []);

    useEffect(() => {
        // Get redirect destination from sessionStorage
        const storedLink = sessionStorage.getItem('authRedirectLink') || '/';
        setLink(storedLink);
        sessionStorage.removeItem('authRedirectLink');
    }, []);

    useEffect(() => {
        const getRedirectResult = async () => {
            // Prevent duplicate calls (React StrictMode)
            if (isProcessing) return;
            isProcessing = true;

            console.log('getting redirect')
            const notifyId = notifyPromise('Verifying Credentials...', 'info');
            try {
                // Check if user is already logged in
                const isLoggedIn = await state.magic.user.isLoggedIn();
                if (isLoggedIn) {
                    console.log('User already logged in, getting token directly');
                    const idToken = await state.magic.user.getIdToken();
                    const metadata = await state.magic.user.getMetadata();
                    notifyResolve(notifyId, 'Credentials Verified', 'success');
                    setUserInfo(metadata);
                    setDid(idToken);
                    return;
                }

                const result = await state.magic.oauth.getRedirectResult();
                console.log(result)
                const idToken = await state.magic.user.getIdToken();
                notifyResolve(notifyId, 'Credentials Verified', 'success');
                setUserInfo(result.oauth.userInfo);
                setDid(idToken);
            } catch (error) {
                console.log(error)
                isProcessing = false;
                notifyResolve(notifyId, 'Error verifying credentials', 'error');
                router.push('/signin');
            }
        }
        if (!state.magic) return;
        getRedirectResult();
    }, [state.magic])

    useEffect(() => {
        const login = async () => {
            // Wait for both did and userInfo, and prevent duplicate login
            if (!did || !userInfo || hasLoggedIn) return;
            hasLoggedIn = true;

            const loginSuccess = await magicLogin(state, dispatch, did, userInfo);
            setIsRedirecting(true);
            if (loginSuccess) {
                router.push(link)
            } else {
                console.log('login failed')
                router.push(link)
            }
        }
        login()
    }, [did, userInfo, link, state, dispatch, router])

    if (isRedirecting) {
        return null;
    }

    return (
        <div className="flex items-center justify-center h-screen">
            {/* <LoadingModal showModal={true} /> */}
            <BeatLoader size={40} color="#04A6E7"/>
        </div>
    )
}

export default Redirect
