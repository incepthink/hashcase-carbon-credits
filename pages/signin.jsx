import Navbar from "@/components/Navbar/Navbar";
import { env } from "@/next.config";
import { StoreContext } from "@/utils/Store";
import { connectToMetamask } from "@/utils/user";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext } from "react";

const Singin = () => {
  const { state, dispatch } = useContext(StoreContext);
  const router = useRouter();
  const path = router.asPath;
  console.log(path);

  const googleLoginHandler = async (e) => {
    e.preventDefault();
    const idToken = await state.magic.oauth.loginWithRedirect({
      provider: "google",
      redirectURI: `${env.NEXT_PUBLIC_URL}/redirect?link=/`,
    });
    console.log(idToken);
  };

  const metamaskLoginHandler = async (e) => {
    e.preventDefault();
    const loginSuccess = await connectToMetamask(dispatch);
    if (loginSuccess) {
      router.push(`/`);
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-screen max-h-screen flex overflow-hidden justify-center items-center my-12 md:my-0">
        <div className="md:w-[50%] max-w-screen flex justify-center items-center">
          <div className="flex flex-col">
            <h1 className="font-bebas text-4xl text-center uppercase">
              Welcome There!
            </h1>
            <p className="text-[#667085] mb-4 text-center">
              Select one of the ways to sign in.
            </p>
            <form className="flex flex-col w-full items-center">
              <button
                onClick={googleLoginHandler}
                className="w-full flex items-center justify-center bg-transparent hover:bg-[#d3e4ff] border-2 border-slate-400 py-2 px-4 text-lg font-semibold rounded-lg my-2"
              >
                <Image
                  src="/images/googleLogo.png"
                  alt="google logo"
                  width={20}
                  height={20}
                />
                <span className="mx-2">Sign in with Google</span>
              </button>
            </form>
          </div>
        </div>
        <div className="w-[50%] hidden md:flex p-3">
          <Image
            src="/images/signin.png"
            alt="signin earth image"
            width={1960}
            height={1080}
          />
        </div>
      </div>
    </>
  );
};

export default Singin;
