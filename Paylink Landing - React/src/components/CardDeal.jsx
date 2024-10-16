import { apple, card, card1, google } from "../assets";
import styles, { layout } from "../style";
import Button from "./Button";

const CardDeal = () => (
  <section className={layout.section}>
    <div className={layout.sectionInfo}>
      <h2 className={styles.heading2}>
        Mobile Development
      </h2>
      <p className={`${styles.paragraph} max-w-[550px] mt-5`}>
        To leverage technology to empower businesses, enhance efficiency, and drive growth. Committed to providing top-notch technological services tailored to the unique needs of businesses, we ensure they not only adapt but thrive in the ever-evolving digital era.
      </p>
      <div className="flex flex-row flex-wrap sm:mt-10 mt-6">
        <img src={apple} alt="google_play" className="w-[128.86px] h-[42.05px] object-contain mr-5 cursor-pointer" />
        <img src={google} alt="google_play" className="w-[144.17px] h-[43.08px] object-contain cursor-pointer" />
      </div>
    </div>

    <div className={layout.sectionImg}>
      <img src={card1} alt="billing" className="w-[100%] h-[100%]" />
    </div>
  </section>
);

export default CardDeal;
