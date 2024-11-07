import { ActionGetResponse, ActionPostResponse, ActionPostRequest, ACTIONS_CORS_HEADERS } from "@solana/actions"
import {clusterApiUrl, PublicKey, SystemProgram, Transaction, Connection, LAMPORTS_PER_SOL} from "@solana/web3.js"
import { headers } from "next/headers";
import { stringify } from "querystring";

export async function GET(request: Request) {
  const responseBody: ActionGetResponse = {
    icon: "http://localhost:3000/Dr.Cypher.png",
    description: "Let's empower supporters to fund scientists directly in real-time using blockchain technology.\n\nThis is a Blink (Blockchain Link) and allows you to directly and safely transfer funds from your wallet to Dr. CatBlock's to help her in her quest towards decentralization of science.\n\nImagine this being you, allowing your fellow scientists and organization to finance your work directly, speeding up the pace of scientific progress.",
    title: "Donate to Dr. CatBlock, the paladin of DeSci.",
    label: "Donate",
    error: {
      message: "Huston we got a problem"
    },
    links: {
      actions: [
        {
          href: request.url+"?action=donate&amount={amountParam}",
          label: "donate",
          parameters:[
            {
              name: "amountParam",
              label: "Amount in SOL",
              required: true,
            }
          ]
        }
    ]
    },

  }
  const response = Response.json(responseBody, {headers: ACTIONS_CORS_HEADERS});
  return response
}


export async function POST(request: Request) {
  
  const requestBody: ActionPostRequest = await request.json();
  const userPubkey = requestBody.account;
  console.log(userPubkey);

  const url = new URL(request.url);
  const action = url.searchParams.get('action');
  const amount_ = url.searchParams.get('amount');

  const user = new PublicKey(userPubkey)

  const connection = new Connection(clusterApiUrl("devnet"));


  let message_:string;
  // Convert amount_ to a number and handle cases where it's null or invalid
  const amount_lamports = amount_ ? parseFloat(amount_) * LAMPORTS_PER_SOL : 0;

  if (isNaN(amount_lamports)) {
    return Response.json({ error: "Invalid amount" }, { status: 400 , headers: ACTIONS_CORS_HEADERS});
  }

  if (action =="donate"){
    message_ = "Thanks for your donation of " + amount_ + " SOL, this will help DeSci."; 
  }else{
    message_ ="Thanks for your donation, this will help DeSci."; 
  };

  const tx = new Transaction();
  const ix = SystemProgram.transfer({
    fromPubkey: user,
    toPubkey: new PublicKey('4vQWXAFDZtpQ4o5AmJ1bdDZ8UDFD6tSnqnMqskWB6sXu'),
    lamports: amount_lamports,
  });
  tx.add(ix);
  tx.feePayer = new PublicKey(userPubkey);
  tx.recentBlockhash = (await connection.getLatestBlockhash({commitment: "finalized"})).blockhash;
  const serialTX =  tx.serialize({requireAllSignatures: false, verifySignatures: false}).toString("base64");

  const response: ActionPostResponse = {
    transaction: serialTX,
    message: message_,
  };

  return Response.json(response, {headers: ACTIONS_CORS_HEADERS})

}

export async function OPTIONS(request: Request){
  return new Response(null, {headers: ACTIONS_CORS_HEADERS})
}