import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEth } from "../../contexts/EthContext";
import Charity from "../../contracts/Charity.json";
import "./Description.css";

const Description = () => {
    // eslint-disable-next-line
    const [isLoading, setIsLoading] = useState(false);

    const [amountCollected, setAmountCollected] = useState("5");
    const [charityName, setCharityName] = useState("");
    const [description, setDescription] = useState("static desc");
    const [minAmount, setMinAmount] = useState("00");
    const [requiredAmount, setRequiredAmount] = useState("100");
    const [pastDonors, setPastDonors] = useState([]);
    const [width, setWidth] = useState(100);
    const [refresh,setRefresh] = useState(false);

    const [amount, setAmount] = useState("");

    const { id } = useParams();
    const { state } = useEth();

    useEffect(() => {
        const init = async () => {
            if (state.contract) {
                try {
                    let address = await state.contract.methods
                        .charities(id)
                        .call();
                    let instance = new state.web3.eth.Contract(
                        Charity.abi,
                        address
                    );
                    setCharityName(await instance.methods.charityName().call());
                    setDescription(await instance.methods.description().call());
                    setMinAmount(await instance.methods.minAmount().call());
                    setRequiredAmount(
                        await instance.methods.requiredAmount().call()
                    );
                    setAmountCollected(
                        await instance.methods.amountCollected().call()
                    );

                    

                    setWidth((amountCollected / requiredAmount) * 100);

                    let numOfDonors = await instance.methods
                        .noOfDonors()
                        .call();

                    let donorsArray = [];
                    for (let i = 0; i < numOfDonors; i++) {
                        let donor = await instance.methods.donors(i).call();
                        donorsArray.push(donor);
                    }
                    setPastDonors(donorsArray);
                } catch (err) {
                    console.log(err);
                }
            }
        };
        init();
    }, 
    // eslint-disable-next-line
    [state.contract,amountCollected,refresh]);

    const handleDonate = async () => {
        let address = await state.contract.methods.charities(id).call();
        let instance = new state.web3.eth.Contract(Charity.abi, address);

        // console.log(state.accounts[0]);
        await instance.methods
            .pay()
            .send({ from: state.accounts[0], value: amount });

        setRefresh(!refresh);

        setAmount("");
    };

    return !isLoading ? (
        <section className="main">
            <div className="div1">
                <h1 className="desc-heading">{charityName}</h1>
                <div className="desc">{description}</div>
            </div>
            <div className="div2">
                <div className="progess">
                    <div className="progess-text">
                        Progress: {amountCollected ? amountCollected : 0}/
                        {requiredAmount};
                    </div>
                    <div className="progress-bar">
                        <div
                            className="fullfilled"
                            style={{
                                backgroundColor: "green",
                                width: `${width}%`,
                                height: "100%",
                                borderRadius: "16rem",
                            }}
                        ></div>
                    </div>
                </div>
                <form>
                    <input
                        type="text"
                        value={amount}
                        placeholder={"Minimum amount to donate is " + minAmount}
                        onChange={(e) => {
                            setAmount(e.target.value);
                        }}
                    />
                </form>
                <button className="create-fund-btn" onClick={handleDonate}>
                    Donate
                </button>

                <div className="past-donors">
                    <h1>Past Donors:</h1>
                    {pastDonors?.map((pastDonor) => {
                        return (
                            <div key="pastDonor" className="donor">
                                {pastDonor}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    ) : (
        <p>Loading</p>
    );
};

export default Description;