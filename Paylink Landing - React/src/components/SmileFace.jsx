import React, { useEffect, useState } from 'react'

export default function SmileFace() {
    const [emotion, setEmotion] = useState('normal');

    useEffect(() => {
        // Change to happy face after 3 seconds
        const timer = setTimeout(() => {
            setEmotion('happy');
        }, 2500);

        return () => clearTimeout(timer); // Cleanup the timer if the component unmounts
    }, []); // Empty dependency array ensures this effect runs only once on mount

    return (

        <div className={`smiley ${emotion}`}>
            <div className="steam-container">
                <div className="squiggle-container squiggle-container-1">
                    <div className="squiggle">
                        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                            viewBox="0 0 28.1 80.6" style={{ enableBackground: "new 0 0 28.1 80.6" }}>
                            <path fill="none" strokeWidth="11" strokeLinecap="round" strokeMiterlimit="10" d="M22.6,75.1c-8-5.6-15.2-10.5-15.2-19.9c0-12.1,14.1-17.2,14.1-29.6c0-9.1-6.7-15.7-16-20.1" />
                        </svg>
                    </div>
                </div>
                <div className="squiggle-container squiggle-container-2">
                    <div className="squiggle">
                        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                            viewBox="0 0 28.1 80.6" style={{ enableBackground: "new 0 0 28.1 80.6" }}>
                            <path fill="none" stroke="#fff" strokeWidth="11" strokeLinecap="round" strokeMiterlimit="10" d="M22.6,75.1c-8-5.6-15.2-10.5-15.2-19.9c0-12.1,14.1-17.2,14.1-29.6c0-9.1-6.7-15.7-16-20.1" />
                        </svg>
                    </div>
                </div>
                <div className="squiggle-container squiggle-container-3">
                    <div className="squiggle">
                        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                            viewBox="0 0 28.1 80.6" style={{ enableBackground: "new 0 0 28.1 80.6" }}>
                            <path fill="none" stroke="#fff" strokeWidth="11" strokeLinecap="round" strokeMiterlimit="10" d="M22.6,75.1c-8-5.6-15.2-10.5-15.2-19.9c0-12.1,14.1-17.2,14.1-29.6c0-9.1-6.7-15.7-16-20.1" />
                        </svg>
                    </div>
                </div>
            </div>

            <div className="eyes">
                <div className="eye"></div>
                <div className="eye"></div>
            </div>
            <div className="mouth"></div>
        </div>


    )
}
