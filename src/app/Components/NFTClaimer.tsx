import { ThirdwebContract } from "thirdweb";
import { balanceOf, claimTo, getNFT } from "thirdweb/extensions/erc1155";
import { MediaRenderer, TransactionButton, useReadContract } from "thirdweb/react";
import { client } from "../client";

type NFTClaimerProps = {
    recieveAddress?: string;
    dropContract: ThirdwebContract;
    tokenId: bigint;
}

const NFTClaimer: React.FC<NFTClaimerProps> = ({ recieveAddress, dropContract, tokenId }) => {
    const {data: nft, isLoading: isnftLoading} = useReadContract(
        getNFT,
        {
            contract: dropContract,
            tokenId: tokenId
        }
    );

    const {data: ownedNFTs} = useReadContract(
        balanceOf,{
            contract: dropContract,
            owner: recieveAddress!,
            tokenId: tokenId,
            queryOptions: {enabled: !!recieveAddress }
        }
    )

    return (
        <div className="flex flex-col my-8">
            {isnftLoading ? (
                <div className="w-full mt-24">Loading...</div>
            ):(
                <>
                    {nft && (
                        <MediaRenderer 
                            client={client}
                            src={nft?.metadata?.image}
                        />    
                    )}
                    {recieveAddress ? (
                        <><p className="text-center mt-8">
                                you own {ownedNFTs?.toString() || "0"} NFTs
                            </p><TransactionButton
                                transaction={() => claimTo({
                                    contract: dropContract,
                                    to: recieveAddress,
                                    tokenId: tokenId,
                                    quantity: 1n
                                })}
                                onTransactionConfirmed={async () => {
                                    alert("Claimed!");
                                } }
                            >
                                    Claim
                                </TransactionButton></>
                    ):(
                        <p className="text-center mt-8">
                            Login to claim
                        </p>
                    )}
                </>
            )}
        </div>
    )
}

export default NFTClaimer;
