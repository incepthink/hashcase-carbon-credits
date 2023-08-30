import Cookies from 'js-cookie';
import axios from 'axios';
import notify from './notify';
import { notifyPromise, notifyResolve } from './notify';
import Router from 'next/router';
import { ethers } from 'ethers';
import { validateEmail } from './utils';


export const logoutHandler = (dispatch) => {
    console.log('Loggin out');
    dispatch({ type: 'UNSET_USER' });
    Cookies.remove('user');
    dispatch({ type: 'UNSET_JWT' });
    Cookies.remove('jwt');
    Router.push('/');
    // console.log('user',state.user)
};

export const loginWithEmail = async (dispatch, email, password) => {
    if (email.length === 0 || password.length === 0) {
        return notify('Please fill the login form', 'info');
    }
    
    const notifyId = notifyPromise('Logging with Email...', 'info');
    try {
        const res = await axios
            .post(`${process.env.API}/user/login`, {
                email,
                password,
            })
        var inThirtyMins = new Date(new Date().getTime() + 30 * 60 * 1000);
        console.log('res', res)
        dispatch({
            type: 'SET_USER',
            payload: res.data.user_instance,
            time: inThirtyMins,
        });

        Cookies.set('user', JSON.stringify(res.data.user_instance));

        dispatch({
            type: 'SET_JWT',
            payload: res.data.token,
            time: inThirtyMins,
        });

        Cookies.set('jwt', res.data.token);
        notifyResolve(notifyId, 'Logged In', 'success');
        return true;
    } catch (error) {
        if (error?.response?.data?.message) {
            notifyResolve(notifyId, error?.response?.data?.message, 'error');
        } else {
            notifyResolve(notifyId, error.message, 'error');
        }
        return false;
    }
}

export const signupWithEmail = async (dispatch, email, password, confirmPassword) => {

    if (!validateEmail(email)) {
        notify('Please enter valid email!', 'error');
        return;
    }

    if (password !== confirmPassword) {
        console.log(password, confirmPassword);
        notify('Passwords do not match', 'error');
        return;
    }
    const notifyId = notifyPromise('Signing Up with Email...', 'info');
    try {
        const res = await axios
            .post(`${process.env.API}/user/signup`, {
                email,
                password,
            })
        var inThirtyMins = new Date(new Date().getTime() + 30 * 60 * 1000);
        console.log('res', res)
        dispatch({
            type: 'SET_USER',
            payload: res.data.user_instance,
            time: inThirtyMins,
        });

        Cookies.set('user', JSON.stringify(res.data.user_instance));

        dispatch({
            type: 'SET_JWT',
            payload: res.data.token,
            time: inThirtyMins,
        });

        Cookies.set('jwt', res.data.token);
        notifyResolve(notifyId, 'Signed Up', 'success');
        return true;
    } catch (error) {
        if (error?.response?.data?.message) {
            notifyResolve(notifyId, error?.response?.data?.message, 'error');
        } else {
            notifyResolve(notifyId, error.message, 'error');
        }
        return false;
    }
}

export const loginWithGoogle = async (dispatch, code) => {
    const notifyId = notifyPromise('Google Logging...', 'info');
    try {
        const response = await axios.post(`${process.env.API}/user/googleLogin`, {
            code: code
        })
        console.log(response)
        var inThirtyMins = new Date(new Date().getTime() + 30 * 60 * 1000);
        dispatch({
            type: 'SET_USER',
            payload: response.data.user_instance,
            time: inThirtyMins,
        });
        Cookies.set('user', JSON.stringify(response.data.user_instance));
        dispatch({
            type: 'SET_JWT',
            payload: response.data.token,
            time: inThirtyMins,
        });
        Cookies.set('jwt', response.data.token);
        response.data.isNewUser ? notifyResolve(notifyId, 'Signed Up', 'success') : notifyResolve(notifyId, 'Logged In', 'success');
        return true
    } catch (error) {
        console.log(error)
        if (error?.response?.data?.message) {
            notifyResolve(notifyId, error?.response?.data?.message, 'error');
        } else {
            notifyResolve(notifyId, error.message, 'error');
        }
        return false
    }
}

export const connectToMetamask = async (dispatch) => {
 
    if (!window.ethereum || !window.ethereum.isMetaMask) {
        console.log('No metamask');
        notify('Please use a browser with Metamask', 'info');
        return;
    }

    const chainId = 137;
    const requrestNetworkSuccess = await requestNetwork(chainId);
    if (!requrestNetworkSuccess) {
        console.log("Not able to change network");
        return;
    }
    const notifyId = notifyPromise('Connecting to MetaMask...', 'info');
    try {
        const web3 = new ethers.providers.Web3Provider(window.ethereum, 'any');
        await web3.send('eth_requestAccounts', []);
        const signer = web3.getSigner();
        console.log('Account:', await signer.getAddress());
        const message = await axios
            .get(`${process.env.API}/user/getToken`)
            .then((res) => {
                console.log(res);
                return res.data.message;
            });

        const verifiedMessage = await axios.post(
            `${process.env.API}/user/verifyToken`,
            {
                address: await web3.getSigner().getAddress(),
                signature: await web3.getSigner().signMessage(message),
            }
        );

        const signerAddress = await web3.getSigner().getAddress();

        if (verifiedMessage.data.message === 'Token verified') {
            const userBackend = await axios
                .get(`${process.env.API}/user/getUser/${signerAddress}`)
                .then((res) => {
                    console.log(res);
                    return res.data;
                })
                .catch((error) => {
                    console.log(error);
                });

            // add token to user object

            // console.log('user',userBackend);

            var inThirtyMins = new Date(new Date().getTime() + 30 * 60 * 1000);

            dispatch({
                type: 'SET_USER',
                payload: userBackend,
                time: inThirtyMins,
            });

            console.log("SETTING USER", userBackend)

            Cookies.set('user', JSON.stringify(userBackend));

            dispatch({
                type: 'SET_JWT',
                payload: verifiedMessage.data.token,
                time: inThirtyMins,
            });

            Cookies.set('jwt', verifiedMessage.data.token);
            notifyResolve(notifyId, 'Connected to Metamask', 'success');
            return true;
        }
    } catch (error) {
        if (error?.response?.data?.message) {
            notifyResolve(notifyId, error?.response?.data?.message, 'error');
        } else {
            notifyResolve(notifyId, error.message, 'error');
        }
        return false;
    }
};

export const addEmail = async (dispatch, state, email, password, confirmPassword) => {
    if (email.length === 0 || password.length === 0 || confirmPassword.length === 0) {
        notify('Please fill the required details', 'info');
        return;
    }

    if (password !== confirmPassword) {
        notify('Passwords do not match', 'info');
        return;
    }

    const notifyId = notifyPromise('Adding Email...', 'info');
    try {
        const res = await axios.post(`${process.env.API}/user/addEmail`, {
            user_Id: state.user.id,
            email,
            password,
        })
        var inThirtyMins = new Date(new Date().getTime() + 30 * 60 * 1000);

        dispatch({
            type: 'SET_USER',
            payload: res.data.user_instance,
            time: inThirtyMins,
        });
        Cookies.set('user', JSON.stringify(res.data.user_instance));

        dispatch({
            type: 'SET_JWT',
            payload: res.data.token,
            time: inThirtyMins,
        });
        Cookies.set('jwt', res.data.token);

        notifyResolve(notifyId, 'Email Added!', 'success');
        return true;
    } catch (error) {
        if (error?.response?.data?.message) {
            notifyResolve(notifyId, error?.response?.data?.message, 'error');
        } else {
            notifyResolve(notifyId, error.message, 'error');
        }
        return false;
    }
}

export const addWallet = async (dispatch, state) => {
    if (!window.ethereum || !window.ethereum.isMetaMask) {
        console.log('No metamask');
        notify('Please use a browser with Metamask', 'info');
        return;
    }

    const chainId = 137;
    const requrestNetworkSuccess = await requestNetwork(chainId);
    if (!requrestNetworkSuccess) {
        console.log("Not able to change network");
        return;
    }
    const notifyId = notifyPromise('Adding Wallet...', 'info');
    try {
        const web3 = new ethers.providers.Web3Provider(window.ethereum, 'any');
        await web3.send('eth_requestAccounts', []);
        const signerAddress = await web3.getSigner().getAddress();
        console.log('Account:', signerAddress);

        const userBackend = await axios.post(`${process.env.API}/user/addWallet`, {
            user_Id: state.user.id,
            wallet_address: signerAddress,
        })
        console.log("USERBACKEND", userBackend);


        var inThirtyMins = new Date(new Date().getTime() + 30 * 60 * 1000);

        dispatch({
            type: 'SET_USER',
            payload: userBackend.data.user_instance,
            time: inThirtyMins,
        });
        Cookies.set('user', JSON.stringify(userBackend.data.user_instance));

        dispatch({
            type: 'SET_JWT',
            payload: userBackend.data.token,
            time: inThirtyMins,
        });
        Cookies.set('jwt', userBackend.data.token);
        notifyResolve(notifyId, 'Wallet Address Added!', 'success');
        return true;
    } catch (error) {
        console.log(error);
        if (error?.response?.data?.message) {
            notifyResolve(notifyId, error?.response?.data?.message, 'error');
        } else {
            notifyResolve(notifyId, error.message, 'error');
        }
        return false;
    }
}

export const magicLogin = async (state, dispatch, did, userInfo) => {
    console.log('magic loggin in', did, userInfo);
    const notifyId = notifyPromise(' Wallet Logging in...', 'info');
    try {
        const userBackend = await axios.post(`${process.env.API}/user/magicLogin`, {
            didToken: did,
            userInfo
        });
        console.log(userBackend);
        const inThirtyMins = new Date(new Date().getTime() + 30 * 60 * 1000);

        dispatch({
            type: 'SET_USER',
            payload: userBackend.data.user_instance,
            time: inThirtyMins,
        });
        Cookies.set('user', JSON.stringify(userBackend.data.user_instance));

        dispatch({
            type: 'SET_JWT',
            payload: userBackend.data.token,
            time: inThirtyMins,
        });
        Cookies.set('jwt', userBackend.data.token);
        if (userBackend.data.isNewUser) {
            notifyResolve(notifyId, 'Welcome to HashCase!', 'success');
        } else {
            notifyResolve(notifyId, 'Logged in!', 'success');
        }
        return true;
    } catch (error) {
        if (error?.response?.data?.message) {
            notifyResolve(notifyId, error?.response?.data?.message, 'error');
        } else {
            notifyResolve(notifyId, error.message, 'error');
        }
        return false;
    }
}

export const connectUDaccount = async (dispatch,userData) => {
    const notifyId = notifyPromise('Wallet Logging in...', 'info');
    console.log(userData);
    try {
        const response = await axios.post(`${process.env.API}/user/udLogin`, {
            userData: userData.idToken
        })
        const inThirtyMins = new Date(new Date().getTime() + 30 * 60 * 1000);
        dispatch({
            type: 'SET_USER',
            payload: response.data.user_instance,
            time: inThirtyMins,
        });
        Cookies.set('user', JSON.stringify(response.data.user_instance));

        dispatch({
            type: 'SET_JWT',
            payload: response.data.token,
            time: inThirtyMins,
        });
        Cookies.set('jwt', response.data.token);
        if (response.data.isNewUser) {
            notifyResolve(notifyId, 'Welcome to HashCase!', 'success');
        } else {
            notifyResolve(notifyId, 'Logged in!', 'success');
        }
        return true;
    } catch (error) {
        if (error?.response?.data?.message) {
            notifyResolve(notifyId, error?.response?.data?.message, 'error');
        } else {
            notifyResolve(notifyId, error.message, 'error');
        }
        return false;
    }
}

export const connectWalletConnect = async (dispatch, userData) => {

    console.log("Sending Connected Account and Chain ID to Moralis Auth API", userData);

    try {
        const data = await axios
            .get(`${process.env.API}/user/getToken`)
            .then((res) => {
                console.log(res);
                return res.data;
            });
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const walletConnectLogin = async (dispatch, signerAddress, signature, message) => {
    const notifyId = notifyPromise('Logging In...', 'info');
    try {
        const verifiedMessage = await axios.post(
            `${process.env.API}/user/verifyToken`,
            {
                address: signerAddress,
                signature: signature,
            }
        );

        if (verifiedMessage.data.message !== 'Token verified') {
            notify('Incorrect signature!', 'failure');
            return false;
        }

        const userBackend = await axios
            .get(`${process.env.API}/user/getUser/${signerAddress}`)
            .then((res) => {
                console.log(res);
                return res.data;
            })
            .catch((error) => {
                console.log(error);
            });

        // add token to user object

        // console.log('user',userBackend);

        var inThirtyMins = new Date(new Date().getTime() + 30 * 60 * 1000);

        dispatch({
            type: 'SET_USER',
            payload: userBackend,
            time: inThirtyMins,
        });

        console.log("SETTING USER", userBackend)

        Cookies.set('user', JSON.stringify(userBackend));

        dispatch({
            type: 'SET_JWT',
            payload: verifiedMessage.data.token,
            time: inThirtyMins,
        });

        Cookies.set('jwt', verifiedMessage.data.token);
        notifyResolve(notifyId, 'Wallet Connected!', 'success');
        return true;
    } catch (error) {
        if (error?.response?.data?.message) {
            notifyResolve(notifyId, error?.response?.data?.message, 'error');
        } else {
            notifyResolve(notifyId, error.message, 'error');
        }
        return false;
    }
}


const requestNetwork = async (chainId) => {
    console.log(window.ethereum.networkVersion);
    if (window.ethereum.networkVersion !== chainId) {
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: ethers.utils.hexValue(chainId) }]
            });
        } catch (error) {
            // This error code indicates that the chain has not been added to MetaMask
            console.log(error);
            if (error.code === 4902) {
                await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [
                        {
                            chainName: 'Polygon Mainnet',
                            chainId: ethers.utils.hexValue(chainId),
                            nativeCurrency: { name: 'MATIC', decimals: 18, symbol: 'MATIC' },
                            rpcUrls: ['https://polygon-rpc.com/']
                        }
                    ]
                });
            } else {
                notify(error.message, 'error');
                return false;
            }
        }
    }
    return true;
}
