import { ConnectWallet, ThirdwebNftMedia, Web3Button, useAddress, useContract, useOwnedNFTs } from "@thirdweb-dev/react";
import styles from '../styles/Game.module.css';
import { useState, useEffect } from 'react';
import Image from "next/image";
import { NextPage } from "next";
import { useRouter } from 'next/router';
import userLocks from "../userLocks.json"
import { UserLocks, getUserEnergy, getUserKontostand, getUserNumber } from "./functions/userLocks";

const Game: NextPage = () => {
    const router = useRouter();
    const addressID = "0xbB01f159905Da3fe0532B2E1E9fF05E86713ED66";
    const [clientSecret, setClientSecret] = useState("");
    const { contract } = useContract(
        addressID
    );
    const metadatas = contract?.metadata.get();
    const activeAddress = useAddress();
    const userNumber: string | undefined = getUserNumber(activeAddress, userLocks);
    const { data: nfts } = useOwnedNFTs(contract, activeAddress);

    const updateMoney = () => {

        const userID = userNumber;
        const numb_ = 3;

        fetch('/api/setData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: userID, newAddition: numb_, userLocksCheckNUMB: 1 }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then((data) => (data))
            .catch((error) => console.error(error));
    }


    const expIndexNumber = () => {
        return (userNumber);
    }
    const expEnergy = () => {
        const userEnergy: number | undefined = getUserEnergy(userNumber, userLocks);
        return (userEnergy);
    }
    const expKontostand = () => {
        const userKontostand: number | undefined = getUserKontostand(userNumber, userLocks);
        return (userKontostand);
    }
    const buyNFT = async() => {
    }



    useEffect(() => {
        if (activeAddress == undefined) {
            router.push("/");
        }
    })


    return (
        <div className={styles.gameContainer}>

            <h1 className={`${styles.centralTitle} additional`}>NFTowns</h1>
            <Web3Button className={`${styles.mintNFTbutton}`} contractAddress={"0xbB01f159905Da3fe0532B2E1E9fF05E86713ED66"} 
                action={(contract) => contract.erc721}>
                <h2 className={`${styles.mintNFTbuttonText}`}>Mint an NFT</h2>
            </Web3Button>
            <div className="valueDisplays">
                <button onClick={updateMoney}>Click me not
                
                </button>
                <div className="INDEXsNumberDisplay">
                    {"Your indexNumber is " + expIndexNumber()}
                </div>
                <div className="INDEXsNumberDisplay">
                    {"You have " + expEnergy() + " Energy!"}
                </div>
                <div className="INDEXsNumberDisplay">
                    {"Your Kontostand is " + expKontostand()}
                </div>
            </div>

            <div className="displayOwnedNFTS">

                <hr />
                {nfts?.map((nft) => (
                    <div key={nft.metadata.id.toString()}>
                        <ThirdwebNftMedia metadata={nft.metadata}  >

                        </ThirdwebNftMedia>
                        {" " + nft.metadata.name}
                    </div>
                ))}
            </div>



        </div>
    );
};

export default Game;
function loadStripe(arg0: string) {
    throw new Error("Function not implemented.");
}

