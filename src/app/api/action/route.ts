import { ActionGetResponse, ActionPostResponse } from "@solana/actions"

export async function GET(request: Request) {
  const response: ActionGetResponse = {
    icon: "https://naiky.vercel.app/_images/luca-nik.jpeg",
    description: "My demo blink",
    title: "BLINK",
    label: "Click me",
    error: {
      message: "Not implemented yet!"
    },

  }
  return Response.json(response)
}


export async function POST(request: Request) {
  
  const postRequest = request.json();

  const response: ActionPostResponse = {
    transaction: "",
    message: "Not implemented yet"
  };
  return Response.json(response)

}
