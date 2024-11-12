import { createActionHeaders, type ActionsJson , ACTIONS_CORS_HEADERS} from "@solana/actions";

export const GET = async () => {
  const payload: ActionsJson = {
    rules: [
      // map all root level routes to an action
      {
        pathPattern: "/donate",
        apiPath: "/api/actions/donate",
      },
    ],
  };

  return Response.json(payload, {
    headers: createActionHeaders(),
  });
};

// DO NOT FORGET TO INCLUDE THE `OPTIONS` HTTP METHOD
// THIS WILL ENSURE CORS WORKS FOR BLINKS
export async function OPTIONS(request: Request){
  return new Response(null, {headers: ACTIONS_CORS_HEADERS})
}