import React from "react";
// import { ethers } from "ethers";
import {
    Container
} from "@material-ui/core";
const ethers = require("ethers")

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
            <Container style={{ textAlign: "center", marginTop: 20, marginBottom: 20 }}>
                <h1>Wallet Integration</h1>
                <button onClick={connectWallet} style={{ margin: 18, fontFamily: "Montserrat", padding: 20 }}>Connect Wallet</button>
                <p>Wallet Address - {defaultAccount}</p>
                <p>User Balance - {userBalance}</p>
                {/* display errMessage if it is not empty */}
                {errMessage && <p>Error Message - {errMessage}</p>}

            </Container>

        </>
    );
}

export default Metamask;
