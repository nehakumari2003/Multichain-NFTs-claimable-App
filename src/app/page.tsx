"use client";

import Image from "next/image";
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import thirdwebIcon from "@public/thirdweb.svg";
import { client } from "./client";
import NFTClaimer from "./Components/NFTClaimer";
import { useActionState } from "react";
import { defineChain, getContract } from "thirdweb";

export default function Home() {
  const account = useActiveAccount();

  const NEOContract = getContract({
    client: client,
    chain: defineChain(12227332),
    address: "0x0387b515283aECA43a8ec7af9Dd1350785632BcC"
  });
  
  const EDUContract = getContract({
    client: client,
    chain: defineChain(656476),
    address: "0xBb2E3BF1B99Cb7f4BDa44a2143aC8B634b08A63a"
  });

  return (
    <main className="p-4 pb-10 min-h-[100vh] flex items-center justify-center ">
      <div className="py-20">
        <h1 className="text-center text-2xl md:text-6xl font-semibold md:font-bold tracking-tighter mb-12 text-zinc-100">
          Multichain
          <br />
          NFTs Claimable App
        </h1>

        <ConnectButton 
          client={client}
          chain={defineChain(12227332)}
        />

        <div className="flex flex-row">
          <NFTClaimer
            recieveAddress={account?.address}
            dropContract={NEOContract}
            tokenId={0n}
          />
          <div className="h-auto w-[1px] bg-gray-600 mx-12 mt-8"/>
          <NFTClaimer
            recieveAddress={account?.address}
            dropContract={EDUContract}
            tokenId={0n}
          />
        </div>
      </div>
    </main>
  );
}
