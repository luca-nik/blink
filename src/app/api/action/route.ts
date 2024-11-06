import { ActionGetResponse, ActionPostResponse, ActionPostRequest, ACTIONS_CORS_HEADERS } from "@solana/actions"
import {PublicKey, SystemProgram, Transaction} from "@solana/web3.js"

export async function GET(request: Request) {
  const responseBody: ActionGetResponse = {
    icon: "https://naiky.vercel.app/_images/luca-nik.jpeg",
    description: "My demo blink",
    title: "BLINK",
    label: "Click me",
    error: {
      message: "Not implemented yet!"
    },

  }
  const response = Response.json(responseBody, {headers: ACTIONS_CORS_HEADERS});
  return response
}


export async function POST(request: Request) {
  
  const requestBody: ActionPostRequest = await request.json();
  const userPubkey = requestBody.account;
  console.log(userPubkey);

  const tx = new Transaction();
  tx.feePayer = new PublicKey(userPubkey);
  tx.recentBlockhash = SystemProgram.programId.toBase58(); // you should put the recent blockhash
  const serialTX =  tx.serialize({requireAllSignatures: false, verifySignatures: false}).toString("base64");

  const response: ActionPostResponse = {
    transaction: serialTX,
    message: "hello " + userPubkey,
  };


  return Response.json(response, {headers: ACTIONS_CORS_HEADERS})

}

export async function OPTIONS(request: Request){
  return new Response(null, {headers: ACTIONS_CORS_HEADERS})
}