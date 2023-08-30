/* eslint-disable react-hooks/rules-of-hooks */
import { useRouter } from "next/router";
/* eslint-disable react-hooks/rules-of-hooks */
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../utils/Store";
import { magicLogin } from "../../utils/user";
import { notifyPromise, notifyResolve } from "../../utils/notify";
import { BeatLoader } from "react-spinners";


const redirect = ({ link }) => {
    const { state, dispatch } = useContext(StoreContext)
    const router = useRouter();
    const [userInfo, setUserInfo] = useState(null);
    const [did, setDid] = useState(null);


    useEffect(() => {
        const getRedirectResult = async () => {
            console.log('getting redirect')
            const notifyId = notifyPromise('Verifying Credentials...', 'info');
            try {
                const result = await state.magic.oauth.getRedirectResult();
                console.log(result)
                const idToken = await state.magic.user.getIdToken();
                notifyResolve(notifyId, 'Credentials Verified', 'success');
                setUserInfo(result.oauth.userInfo);
                setDid(idToken);
            } catch (error) {
                console.log(error)
                notifyResolve(notifyId, 'Error verifying credentials', 'error');
            }
        }
        if (!state.magic) return;
        getRedirectResult();
    }, [state.magic])

    useEffect(() => {
        login()
    }, [did])

    const login = async () => {
        if (!did) return;
        const loginSuccess = await magicLogin(state, dispatch, did, userInfo);
        if (loginSuccess) {
            router.push(`${link}`)
        } else {
            console.log('login failed')
            router.push(`${link}`)
        }
    }

    return (
        <div className="flex items-center justify-center h-screen">
            {/* <LoadingModal showModal={true} /> */}
            <BeatLoader size={40} color="#04A6E7"/>
        </div>
    )
}

export default redirect

export async function getServerSideProps(context) {
    console.log(context)
    const {link} = context.query;
    console.log(link)

    return {
        props: {
            link,
        },
    };
}