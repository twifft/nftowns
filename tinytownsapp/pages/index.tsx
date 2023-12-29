import { ConnectWallet, ThirdwebNftMedia, useAddress, useContract, useOwnedNFTs } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Image from "next/image";
import { NextPage } from "next";
import * as path from 'path';
import { json } from "node:stream/consumers";
import userLocks from "../userLocks.json"
import {  UserLocks, getUserEnergy, getUserKontostand, getUserNumber } from "./functions/userLocks";




const Home: NextPage = () => {

  const addressID = "0xbB01f159905Da3fe0532B2E1E9fF05E86713ED66";

  const { contract } = useContract(
    addressID
  );

  const metadatas = contract?.metadata.get();
  
  const activeAddress = useAddress();

  const userNumber: string | undefined = getUserNumber(activeAddress, userLocks);

  const { data: nfts } = useOwnedNFTs(contract, activeAddress)

  const checkFile = () => {

    const userIds = activeAddress;

    fetch('/api/addUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: userIds }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => console.log(`User added with number ${data.number}`))
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    if(activeAddress != null) {
      checkFile();
    }
  })

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            Welcome to {"NFTowns"}
          </h1>
          <div className={styles.connect}>
            <ConnectWallet
              dropdownPosition={{
                side: "bottom",
                align: "center",
              }}
              
            />
            
          </div>
          {activeAddress != null && (
          <Link href="/game" className="playButtonMAIN">
            Proceed to Game
          </Link>
          )}
          
          
          
            
        </div>


      </div>
    </main>
  );

};


export default Home;
