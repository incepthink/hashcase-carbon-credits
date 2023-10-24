import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

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

const AboutUs = () => {
  return (
    <>
      <Navbar />
      <div className="font-poppins w-full h-screen md:bg-home-background bg-[#3addf6] bg-center  flex flex-row items-stretch bg-cover relative overflow-hidden ">
        <div className="flex-1 flex justify-center items-center p-8">
          <div className="flex flex-col items-start">
            <h1 className="font-bebas text-4xl uppercase">Hashcase CC NFT</h1>
            <h2>
              This NFT corresponds to 1,000th of a Carbon credit and represents
              1kg of sequestered carbon from the environment.
            </h2>
            <br></br>
            <p>
              Carbon Credit trading is a growing sector, however transparent
              reporting continues to be a challenge. In this product, we solve
              that problem as follows:{" "}
            </p>
            <br></br>
            <p>
              1. Each NFT has 1,000 copies which together comprise 1 Carbon
              Credit ie. 1 ton of CO2. Thus, each NFT corresponds to 1kg of CO2,
              which is a much more consumable size for an individual user.{" "}
            </p>
            <br></br>
            <p>
              2. Each transaction happens on-chain, and returns a verifiable
              transaction hash thus giving proof to the consumer that this
              particular carbon credit piece was retired on their behalf alone
              and not for anyone else, making the overall accounting trustless,
              easy and transparent.{" "}
            </p>

            <p>
              {" "}
              The carbon credit was acquired from the Gold Standard Carbon
              Registry.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;
