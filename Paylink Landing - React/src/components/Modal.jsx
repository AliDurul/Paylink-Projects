import React, { useRef, useState } from 'react'
import styles from '../style'
import emailjs from '@emailjs/browser';


const Modal = () => {

    const form = useRef()
    const sendEmail = (e) => {
        e.preventDefault();

        const inputs = form.current.querySelectorAll('input, textarea');
        let allFilled = true;
        inputs.forEach(input => {
            if (!input.value.trim()) {
                allFilled = false;
            }
        });

        // If not all inputs are filled, return early and possibly show an alert or message
        if (!allFilled) {
            alert("Please fill in all the fields.");
            return;
        }
        emailjs
            .sendForm('service_ock2lzq', 'template_orvk07j', form.current, {
                publicKey: 'HT-W6XkVuOHTyLNNk',
            })
            .then(
                () => {
                    console.log('SUCCESS!');
                    form.current.reset();
                    // Close the modal using vanilla JavaScript
                    const modal = document.getElementById("my_modal_3");
                    if (modal && modal.close) {
                        modal.close();
                    }
                },
                (error) => {
                    console.log('FAILED...', error.text);
                },
            );
    };

    return (
        <div>
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box w-11/12 max-w-3xl">
                    <h3 className="font-bold text-lg pb-7">Hello there, You can send an email to us.</h3>
                    {/* <p className="pb-1">As soon as possible we get back to you.</p> */}

                    <form ref={form} method="dialog" className="space-y-5">

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <label className="input input-bordered flex items-center gap-2">
                                First Name :
                                <input type="text" className="grow" name='user_firstName' placeholder="Lee" />
                            </label>
                            <label className="input input-bordered flex items-center gap-2">
                                Last Name :
                                <input type="text" className="grow" name='user_lastName' placeholder="Phiri" />
                            </label>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <label className="input input-bordered flex items-center gap-2">
                                Phone No :
                                <input type="text" className="grow" name='user_phoneNumber' placeholder="+260970732144" />
                            </label>
                            <label className="input input-bordered flex items-center gap-2">
                                Email :
                                <input type="email" className="grow" name='user_email' placeholder="info@paylinkzm.com" />
                            </label>
                        </div>

                        <div>
                            <textarea className="textarea textarea-ghost textarea-lg w-full" name='user_message' placeholder="Enter you message here.."></textarea>
                        </div>


                        <div className={styles.flexCenter}>
                            <button onClick={sendEmail} type='submit' value="Send" className="btn btn-ghost  px-10">Send</button>
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </div>

                    </form>


                </div>
            </dialog>
        </div>
    )
}

export default Modal