import React from "react";
import "./LandingPage.css";
import backgroundimage from "./background.jpg"
import { Link } from "react-router-dom";


const LandingPage = () => {
    return (
        <>
            <section
                className="landingpage"
                style={{
                    
                    background: 'url('+backgroundimage+')',
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "90% 90%",
                    height: "100vh",
                    width:"100vw"
                }}
            >
                <div className="heading-button-wrapper">
                    <div className="main-heading-wrapper">
                        <span className="main-heading">Your</span>
                        <span className="main-heading1"> Support</span>
                        <span className="main-heading"> Matters</span>
                    </div>

                    <div className="buttons-wrapper">
                        <Link to="/ongoing">
                            <button className="create-own-fund-btn">
                                Donate to charities
                            </button>
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
};

export default LandingPage;