import React, { useState } from "react";
const ethers = require("ethers")
// import { ethers } from "ethers";

const Metamask = () => {
    const [errMessage, setErrMessage] = React.useState("");
    const [defaultAccount, setDefaultAccount] = React.useState("");
    const [userBalance, setUserBalance] = React.useState("");

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({
                    method: "eth_requestAccounts",
                });
                const account = accounts[0];
                setDefaultAccount(account);
                getBalance(account);
            } catch (err) {
                setErrMessage(err.message);
            }
        } else {
            setErrMessage("Please install Metamask");
        }
    }

    const accountChange = async () => {
        window.ethereum.on("accountsChanged", (accounts) => {
            setDefaultAccount(accounts[0]);
            getBalance(accounts[0]);
        });
    }

    const getBalance = async (account) => {
        window.ethereum.request({
            method: "eth_getBalance",
            params: [account, "latest"],
        }).then((balance) => {
            setUserBalance(ethers.formatEther(balance));
        });
    }
    


        return (
            <>
                <h1>Metamask</h1>
                <button onClick={connectWallet}>Connect Wallet</button>
                <p>Wallet Address - {defaultAccount}</p>
                <p>User Balance - {userBalance}</p>
                {/* display errMessage if it is not empty */}
                {errMessage && <p>Error Message - {errMessage}</p>}

            </>
        );
    }

    export default Metamask;
