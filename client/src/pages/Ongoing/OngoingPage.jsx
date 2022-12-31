import React, { useEffect } from "react";
import "./OngoingPage.css";
import Fund from "../../components/Fund/Fund";
import useEth from "../../contexts/EthContext/useEth";
import { useState } from "react";
import Charity from "../../contracts/Charity.json";

const OngoingPage = () => {
    const { state } = useEth();
    const [funds, setFunds] = useState([
        {
            number: 0,
            amountCollected: 100,
            requiredAmount: 10000,
            charityName: "static charity",
        },
    ]);
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        const init = async () => {
            try {
                let numOfCharities = await state.contract.methods
                    .availableContracts().call();
                let newFunds = [];
                for (let i = 0; i < numOfCharities; i++) {
                    let charityAddress = await state.contract.methods
                        .charities(i)
                        .call();

                    let instance = new state.web3.eth.Contract(
                        Charity.abi,
                        charityAddress
                    );
                    let tempObj = {};
                    console.log(i);
                    tempObj.number = i;
                    tempObj.charityName = await instance.methods
                        .charityName()
                        .call();
                    tempObj.requiredAmount = await instance.methods
                        .requiredAmount()
                        .call();
                    tempObj.amountCollected = await instance.methods
                        .amountCollected()
                        .call();
                    tempObj.charityOwner = await instance.methods
                        .charityOwner()
                        .call();
                    tempObj.isOpen = await instance.methods.isOpen().call();
                    
                    newFunds.push(tempObj);

                }
                setFunds(newFunds);
            } catch (err) {
                console.error(err);
            }
        };
        init();
    }, 
    // eslint-disable-next-line
    [state.contract]);

    // amountCollected: "0"
    // ​charityName: "new"
    // charityOwner: "0x95FA9F30fb02a884b7e87ba770D7C0dCFE3Ca59E"
    // description: "money"
    // isOpen: true
    // minAmount: "10"
    // requiredAmount: "100"

    return (
        <section
            style={{
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                height: "100vh",
                width: "100vw",
            }}
        >
            <h2 className="heading">
                Ongoing <span className="main-heading1">Funds</span>
            </h2>
            <div className="all-running-btn-wrapper">
                <button className="donate-btn" onClick={() => setShowAll(true)}>
                    Show All Charities
                </button>
                <button
                    className="donate-btn"
                    onClick={() => setShowAll(false)}
                >
                    Show Running Charities
                </button>
            </div>

            {showAll ? (
                <div className="funds-wrapper">
                    {funds?.map((fund) => {
                        return (
                            <Fund
                                key={fund.number}
                                number={fund.number}
                                amountCollected={fund.amountCollected}
                                charityName={fund.charityName}
                                requiredAmount={fund.requiredAmount}
                            />
                        );
                    })}
                </div>
            ) : (
                <div className="funds-wrapper">
                    {funds?.map((fund) => {
                        return fund.isOpen ? (
                            <Fund
                                key={fund.number}
                                number={fund.number}
                                amountCollected={fund.amountCollected}
                                charityName={fund.charityName}
                                requiredAmount={fund.requiredAmount}
                            />
                        ) : null;
                    })}
                </div>
            )}
        </section>
    );
};

export default OngoingPage;