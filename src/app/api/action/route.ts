import { ActionGetResponse, ActionPostResponse, ActionPostRequest, ACTIONS_CORS_HEADERS } from "@solana/actions"
import {clusterApiUrl, PublicKey, SystemProgram, Transaction, Connection} from "@solana/web3.js"
import { stringify } from "querystring";

export async function GET(request: Request) {
  const responseBody: ActionGetResponse = {
    icon: "https://naiky.vercel.app/_images/luca-nik.jpeg",
    description: "A demo blink to donate to cypherscientist.",
    title: "cypherscientist",
    label: "Donate",
    error: {
      message: "Huston we got a problem"
    },
    links: {
      actions: [
        {
          href: request.url,
          label: "same action",
        },

        {
          href: request.url+"?action=nickname&name={nameParam}",
          label: "nickname",
          parameters:[
            {
              name: "nameParam",
              label: "nickname",
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
  const param = url.searchParams.get('name');

  const user = new PublicKey(userPubkey)

  const connection = new Connection(clusterApiUrl("devnet"));


  let message_:string;
  if (action =="nickname"){
    const name_ = param!;
    message_ = "Hey " + name_;
  }else{
    message_ = "Thanks for your donation, this will help DeSci.";
  };

  const tx = new Transaction();
  const ix = SystemProgram.transfer({
    fromPubkey: user,
    toPubkey: new PublicKey('4vQWXAFDZtpQ4o5AmJ1bdDZ8UDFD6tSnqnMqskWB6sXu'),
    lamports: 1,
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