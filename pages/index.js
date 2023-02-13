import {
  ConnectWallet,
  MediaRenderer,
  useActiveListings,
  useContract,
  useNFTs,
  useOwnedNFTs,
} from "@thirdweb-dev/react";
import { BigNumber } from "ethers";
import styles from "../styles/Home.module.css";

export default function Home() {
  const { contract } = useContract(
    "0x869Ac51fe8a8EecBB1A41270a560a5E2316C13dC",
    "marketplace"
  );

  // console.log(ownedNFTs);

  const { data: nfts, isLoading } = useActiveListings(contract);
  return (
    <div className={styles.container}>
      {!isLoading ? (
        <>
          {nfts &&
            nfts.map((nft) => {
              return (
                <div key={nft.asset.name}>
                  <MediaRenderer
                    src={nft.asset.image}
                    width="200px"
                    height="200px"
                  />
                  <p>{nft.asset.name}</p>
                  <p>Price: {nft.buyoutCurrencyValuePerToken.displayValue}</p>
                  <button
                    onClick={async () => {
                      try {
                        // await contract?.buyoutListing(
                        //   BigNumber.from(nft.id),
                        //   1
                        // );
                        await contract?.buyoutListing(
                          BigNumber.from(nft.id),
                          1
                        );
                        // await contract.buyoutListing(nft.id, 1);
                      } catch (e) {
                        console.log(e);
                        alert(e);
                      }
                    }}
                  >
                    Buy Now
                  </button>
                </div>
              );
            })}
        </>
      ) : (
        "loading"
      )}
      <div className={styles.connect}>
        <ConnectWallet />
      </div>
    </div>
  );
}
