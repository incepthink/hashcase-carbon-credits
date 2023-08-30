import Footer from '@/components/Footer/Footer';
import Navbar from '@/components/Navbar/Navbar'
import React, { useState } from 'react'

const faqsData = [
    {
      question: 'What does 1 REC mean ?',
      answer: 'REC stands for Renewable Energy Certificate.'
    },
    {
      question: 'What is the measurement fo 1 REC ?',
      answer: '1REC = 1MWh of power'
    },
    {
        question: 'What is the use of a REC ?',
        answer: 'A REC acts as a proof of purchase for the attributes of renewable energy generation. So 1 REC means one megawatt-hour (MWh) of renewable energy generated and delivered to the grid.'
    },
    {
        question: 'Do RECs reduce carbon footprint ?',
        answer: 'The main difference between RECs and carbon credits is that carbon credits cap carbon emissions whereas RECs create new energy from renewable sources. Purchasing RECs directly reduces your carbon footprint whereas carbon credits do not directly reduce your carbon footprint.'
    },
    {
        question: 'What is the difference between RECs and carbon credits ?',
        answer: 'The main difference between RECs and carbon credits is what they offset. Where carbon credits help reduce greenhouse gas emissions, renewable energy certificates offset electricity use from non-renewable sources. Instead of offsetting carbon, RECs offset kilowatt hours.'
    },
    {
        question: 'Are RECs tradeable ?',
        answer: 'Yes. RECs can be traded by licensed traders as environmental commodities that cen be traded separately from wholesale electricity markets.'
    },
    {
        question:'Are RECs better than carbon offsets ?',
        answer:'Both can hekp you reduce or mitigate the greenhouse gas emissions associated with yoru business. The biggest difference is that whie RECs deluver carbon mitigation within your value chain, carbon offsetiimhg delvere mitigaring beyond your value chain.'
    },
    {
        question:'What is the validity of RECs ?',
        answer:'It is perpetual till it is sold.'
    },
    {
        question:'Do RECs offset emissions ?',
        answer:'RECs are used to address indirect greenhouse gas emissions associated with purchased electricity (scope 2 emissions) by verifying use of zero-or-low emissions renewable source of electricity.'
    },
    {
        question:'Is this a mandatory regulation ?',
        answer:'No, we are offering this for voluntary consumers only.'
    },
    {
        question:'Can RECs be used to offset any emissions ?',
        answer:'RECs can only offset Scope 2 emissions, which is related to your energy consumption.'
    },
    {
        question:'Can RECs to resold ?',
        answer:'Once you have availed the REC from our platform, we will deem it as consumed and will retire it so that there is no further resale of the attribute.'
    },
    {
        question:'Can RECs be transferred ?',
        answer:'Electronic tracking systems allow RECs to be transferred among account holders, similar to how currency is transferred within our online banking system.'
    },
    {
        question:'How does the REC offset work ?',
        answer:'Total energy consumption in units (KWh) - No. of green power units (KWh) - RECs = 100% GREEN POWER Recognised as  Scope 2 emissions offset under United Nations’ Sustainability Development Goals.'
    },
    {
        question:'Is there an Additionality Test Requirement as validity proof of the REC ?',
        answer:'Project additionality is not required for renewable energy usage claim or to report use of zero-emissions power, unlike in the case of carbon credits.'
    },
];

const FaqItem = ({ faq }) => {
    const [isOpen, setIsOpen] = useState(false);
  
    return (
        <div className="mb-4 text-white border-2 outline-none  border-[#04A6E7] rounded-md">
            <button
                className="flex items-center justify-between w-full py-2 px-4 bg-[#04A6E7]  focus:bg-[#04A6E7] "
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="font-semibold text-left">{faq.question}</span>
                <span className='font-extrabold text-xl'>{isOpen ? '-' : '+'}</span>
            </button>
            {
                isOpen && (
                <div className="px-4 py-2 bg-transparent ">
                    <p className="text-black font-semibold ">{faq.answer}</p>
                </div>
            )}
        </div>
    );
};

const index = () => {



    return (
        <div className='max-w-screen bg-[#b3e8f0]'>
            <Navbar />
            <div className='max-w-2xl p-4 font-poppins justify-center items-center mx-auto '>
                <h1 className="text-2xl  font-bold mb-4">Frequently Asked Questions</h1>
                {faqsData.map((faq, index) => (
                    <FaqItem key={index} faq={faq} />
                ))}
            </div>
            <Footer />
        </div>
    )
}

export default index