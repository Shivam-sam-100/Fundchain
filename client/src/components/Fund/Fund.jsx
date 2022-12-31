import React from "react";
import { Link } from "react-router-dom";
import "./Fund.css";

const Fund = ({ number,amountCollected,charityName,requiredAmount }) => {

    const LINK_URL = "/desc/"+number;
  

    return (
        <div className="fund">
            <div className="fund-heading">{charityName}</div>

            <div className="progess">
                <div className="progess-text">
                    Progress: {amountCollected ? amountCollected : 0}/
                    {requiredAmount}
                </div>
                <div className="progress-bar">
                    <div
                        className="progress"
                        style={{
                            width: `${
                                (amountCollected / requiredAmount) * 100
                            }%`,
                            backgroundColor: "#54F754",
                            height: "100%",
                            borderRadius:"16rem"
                        }}
                    ></div>
                </div>
            </div>

            <Link to={LINK_URL}>
                <button className="fund-donate">Donate</button>
            </Link>
        </div>
    );
};

export default Fund;