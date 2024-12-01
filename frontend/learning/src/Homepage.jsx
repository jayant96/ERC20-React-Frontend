import { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { ConnectKitButton } from "connectkit";
import { useSnackbar } from "notistack";
import { useAccount, useWriteContract, useReadContract } from "wagmi";
import LearningAbi from "./abis/Learning.json";
import { ethers } from "ethers";

const LEARNING_ADDRESS = "0x950d17D143BCb464Ca9dEcf56b6D41B996801CFA";
const LEARNING_ABI = LearningAbi.abi;

export default function Homepage() {
  const [mintAddress, setMintAddress] = useState("");
  const [mintAmount, setMintAmount] = useState(0);
  const [txInFlight, setTxInFlight] = useState(false);

  const { address, isConnected } = useAccount();
  const { enqueueSnackbar } = useSnackbar();

  const { data: hash, writeContract, error: writeError } = useWriteContract();

  const { data: balance } = useReadContract({
    abi: LEARNING_ABI,
    address: LEARNING_ADDRESS,
    functionName: "balanceOf",
    args: [address],
    watch: true,
  });

  const { data: totalSupply } = useReadContract({
    abi: LEARNING_ABI,
    address: LEARNING_ADDRESS,
    functionName: "totalSupply",
    watch: true,
  });

  const { data: maxSupply } = useReadContract({
    abi: LEARNING_ABI,
    address: LEARNING_ADDRESS,
    functionName: "maxSupply",
    watch: true,
  });
  

  const mintToken = () => {
    if (!isConnected) {
      enqueueSnackbar("Please connect your wallet first", {
        variant: "warning",
      });
      return;
    }
    const mintAmountInWei = ethers.parseUnits(mintAmount.toString(), 18);

    writeContract({
      abi: LEARNING_ABI,
      address: LEARNING_ADDRESS,
      functionName: "mint",
      args: [mintAddress, mintAmountInWei],
    });
  };

  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item size={{ xs: 12, sm: 10, md: 12 }}>
        <Typography
          variant="h3"
          style={{ textAlign: "left" }}
          sx={{ fontWeight: 700 }}
        >
          Learning
        </Typography>
      </Grid>
      <Grid item size={12}>
        <ConnectKitButton />
      </Grid>
      <Grid item size={12}>
        <Typography variant="h6">
          Your Balance:{" "}
          {balance
            ? ethers.formatUnits(balance, 18)
            : isConnected
            ? "Loading..."
            : "Please connect your wallet"}
          {" LTK"}
        </Typography>
        <Typography variant="h6">
          Minted Till Now:{" "}
          {totalSupply ? ethers.formatUnits(totalSupply, 18) : "Loading..."}
          {" LTK"}
        </Typography>
        <Typography variant="h6">
          Max Supply:{" "}
          {maxSupply ? ethers.formatUnits(maxSupply, 18) : "Loading..."}
          {" LTK"}
        </Typography>
      </Grid>
      <Grid item size={{ xs: 12, sm: 10, md: 12 }}>
        <TextField
          label="Address"
          value={mintAddress}
          onChange={(e) => setMintAddress(e.target.value)}
          fullWidth
        />
        <TextField
          label="Amount"
          value={mintAmount}
          onChange={(e) => setMintAmount(e.target.value)}
          fullWidth
        />
        <Button onClick={mintToken}>Mint Token</Button>
      </Grid>
    </Grid>
  );
}
