import React from "react";

const Button = ({ styles }) => (
  <button type="button" className={`py-4 px-6 font-poppins font-medium text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none ${styles}`} onClick={() => document.getElementById('my_modal_3').showModal()}>
    Get Started
  </button>
);

export default Button;
