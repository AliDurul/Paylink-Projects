import styles from "../style";
import { discount, robot, robot1 } from "../assets";
import GetStarted from "./GetStarted";
import { useEffect, useState } from "react";
import SmileFace from "./SmileFace";

const Hero = () => {

  document.addEventListener('DOMContentLoaded', function () {
    var progressBar = document.querySelector('.progress-6');

    progressBar.addEventListener('animationend', function () {
      var message = document.getElementById('deploymentMessage');
      message.style.display = 'block'; // Show the deployment message
    });
  });

  const [text, setText] = useState('Loading...');

  useEffect(() => {
    // Set a timeout to change the text after 3 seconds
    const timer = setTimeout(() => {
      setText('Loaded 100');
    }, 2600);

    // Cleanup function to clear the timeout if the component unmounts before the timeout is reached
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="home" className={`flex md:flex-row flex-col ${styles.paddingY}`}>
      <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}>
        <SmileFace />

        <div className="flex flex-row items-center py-[6px] px-4 bg-discount-gradient rounded-[10px] mb-2">
          {/* <img src={discount} alt="discount" className="w-[32px] h-[32px]" /> */}
          {/* <span className="text-white"></span> {" "} */}
          {
            text === 'Loading...' && <div className="progress-6"></div>
          }

          <p className={`${styles.paragraph} ml-2`}>
            <span className="text-white">{text}</span> {" "}
          </p>
          {
            text === 'Loaded 100' && <img src={discount} alt="discount" className="w-[32px] h-[32px]" />
          }

        </div>





        <div className="flex flex-row justify-between items-center w-full">
          <div id="heroAnimation" className=" flex-1 font-poppins font-semibold ss:text-[72px] text-[52px] text-white ss:leading-[100.8px] leading-[75px]">
            <h1 className="">We are <span></span> <br className="sm:block hidden" /></h1>
            <h1 className=" pl-16">PayLink <span></span></h1>
          </div>
          <div className="ss:flex hidden md:mr-4 mr-0">
            <GetStarted />
          </div>
        </div>

        {/*    <h1 className="font-poppins font-semibold ss:text-[68px] text-[52px] text-white ss:leading-[100.8px] leading-[75px] w-full">
          Payment Method.
        </h1> */}
        <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
          We aspire to lead at the forefront of technological advancements,
          setting the standard for innovation and excellence in the Pan-African tech landscape.
        </p>
      </div>

      <div className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}>
        {/* <img src={robot} alt="billing" className="w-[100%] h-[100%] relative z-[5]" /> */}
        <img src={robot1} alt="billing" className="w-[100%] h-[100%] relative z-[5]" />

        {/* gradient start */}
        <div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient" />
        <div className="absolute z-[1] w-[80%] h-[80%] rounded-full white__gradient bottom-40" />
        <div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient" />
        {/* gradient end */}
      </div>

      <div className={`ss:hidden ${styles.flexCenter}`}>
        <GetStarted />
      </div>
    </section>
  );
};

export default Hero;
