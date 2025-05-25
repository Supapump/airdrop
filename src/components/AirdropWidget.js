"use client";

import { useEffect } from "react";

export default function AirdropWidget({
    name = "SUPA",
    distributorId = process.env.NEXT_PUBLIC_DISTRIBUTOR_ID,
    // distributorId = "95A7ib6QnpMxnRGmLZy3bp4E5MzvtCUPn3UxJgM4VGQY",
    // distributorId = "GMUKXbdR2AXbSxLnjZJH6nynT9RBNHZkgwCwxa8k5QCK",

    endpoint = "https://velvet-hw7q70-fast-mainnet.helius-rpc.com/",
    tokenDecimals = "6",
    tokenSymbol = "SUPA",
}) {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://widgets.streamflow.finance/widgets/airdrop-claim/airdrop-claim-0-0-1.js";
        script.type = "module";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <sf-airdrop-claim
            name={name}
            distributor-id={distributorId}
            endpoint={endpoint}
            token-decimals={tokenDecimals}
            token-symbol={tokenSymbol}
            style={{ "--brand": "0 255 0", "--text": "0 255 0" }}
        />
    );
}
