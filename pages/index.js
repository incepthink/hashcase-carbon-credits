import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import MeetOurTeam from "@/components/MeetOurTeam/MeetOurTeam";
import OurPartners from "@/components/OurPartners/index";
import Navbar from "@/components/Navbar/Navbar";
import Services from "@/components/Services/Services";
import Visions from "@/components/Visions/Visions";
import Head from "next/head";
import Image from "next/image";

export default function Home() {
    return (
      <div>
          <Head>
            <title>About Us</title>
          </Head>
          <Navbar />
          <Header />
          {/*<Visions />
          <Services />
          
          <h2 className="text-center text-3xl font-bold mt-6 font-poppins"> This is how we work </h2>
          <div className="md:w-[90%] w-[95%] font-poppins flex flex-col md:flex-row mx-auto justify-between items-center ">
            <Image src="/images/workflow1.png" alt="vision 1" className="shadow-md my-4 mx-auto shadow-[#04A6E7] cursor-pointer hover:scale-105 hover:duration-500" width={700} height={700}  />
          </div>
          <div className="my-4 hidden md:flex max-w-screen  h-[52vh] bg-home-background-1 bg-cover bg-center" />
          <MeetOurTeam />
    <OurPartners />*/}
          <Footer />
      </div>
    )
}
