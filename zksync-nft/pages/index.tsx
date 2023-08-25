import {
  ConnectWallet,
  useContract,
  useContractRead,
  useAddress,
  Web3Button,
  TokenDrop,
} from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import { NextPage } from "next";
import {ethers} from "ethers";
// import { ThirdwebSDK } from "@thirdweb-dev/sdk";

const Home: NextPage = () => {
  const nftDrop = "0xE1d391a1BcB79d6857ce05Af1D0229c72A87647C";
  const editionDrop = "0x400621aa1C3c0139bB21326C8cE1eDd1cd5ed5ff";
  const ERC20Token = "0x598F43DC61f5698d51D67eD80CeB1D1a0DE33716";

  const address = useAddress();

  const { contract: nftDropContract } = useContract(nftDrop);

  const { contract: editionDropContract } = useContract(editionDrop);

  const { contract: ERC20TokenContract } = useContract(ERC20Token);

  const { data: nftDropTotalMinted, isLoading: nftDropTotalMintedisLoading } =
    useContractRead(nftDropContract, "totalMinted");

  const { data: editionTotalMinted, isLoading: editionTotalMintedisLoading } =
    useContractRead(editionDropContract, "totalSupply", [0]);

  const { data: tokenBalance, isLoading: tokenBalanceisLoading } =
    useContractRead(ERC20TokenContract, "balanceOf", [address]);

  // const data = await contract.call("totalMinted", [{{args}}])
  // const data = await contract.call("totalSupply", [{{args}}])
  // const data = await contract.call("balanceOf", [account])

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <ConnectWallet />
        <h1>ZK Sync Era Hackathon NFT Drop</h1>
        {nftDropTotalMintedisLoading ? (
          <p> Loading </p>
        ) : (
          <p> Total NFTs Minted: {nftDropTotalMinted?.toNumber()}</p>
        )}
        <Web3Button
          contractAddress={nftDrop}
          action={(contract) => contract.erc721.claim(1)}
          >Claim a ERC 721 NFT in this NFT Drop for ZK Sync Hackathon! </Web3Button>
          <br />
          {editionTotalMintedisLoading ? (
            <p>Loading...</p> 
          ) : (
            <p>Total Editions minted: {editionTotalMinted?.toNumber()}</p> 
          )}
          <Web3Button
          contractAddress={editionDrop}
          action={(contract) => contract.erc1155.claim(0, 1)}
          // claim token id and then the quantity
          >Claim a ERC 1155 NFT in this Edition for ZK Sync Hackathon! </Web3Button>
          {tokenBalanceisLoading ? (
            <p>Loading...</p> 
          ) : (
            <p>Total ERC20 Balance: {tokenBalance? ethers.utils.formatUnits(tokenBalance) : 'Connect Wallet to check ERC20 Balance. Loading...'}</p> 
          )}
          
      </main>
    </div>
  );
};

export default Home;
