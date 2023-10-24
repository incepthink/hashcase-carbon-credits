import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Navbar from "@/components/Navbar/Navbar";
import Head from "next/head";

export default function Home() {
  return (
    <div>
      <Head>
        <title>About Us</title>
      </Head>
      <Navbar />
      <Header />
      <Footer />
    </div>
  );
}
