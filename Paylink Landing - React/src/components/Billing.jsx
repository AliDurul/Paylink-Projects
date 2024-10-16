import { apple, bill, google, webDesign } from "../assets";
import styles, { layout } from "../style";
import Button from "./Button";

const Billing = () => (
  <section id="product" className={layout.sectionReverse}>
    <div className={layout.sectionImgReverse}>
      <img src={webDesign} alt="billing" className="w-[100%] h-[100%] relative z-[5] md:mr-48 mr-0" />

      {/* gradient start */}
      <div className="absolute z-[3] -left-1/2 top-0 w-[50%] h-[50%] rounded-full white__gradient" />
      <div className="absolute z-[0] w-[50%] h-[50%] -left-1/2 bottom-0 rounded-full pink__gradient" />
      {/* gradient end */}
    </div>

    <div className={layout.sectionInfo}>
      <h2 className={styles.heading2}>
        Web Development
      </h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
        To leverage technology to empower businesses, enhance efficiency, and drive growth. Committed to providing top-notch technological services tailored to the unique needs of businesses, we ensure they not only adapt but thrive in the ever-evolving digital era.
      </p>
      <Button styles={`mt-10`} />
    
    </div>
  </section>
);

export default Billing;
