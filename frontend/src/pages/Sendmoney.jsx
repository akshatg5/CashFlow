import axios from "axios";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export const SendMoney = () => {
  const username = localStorage.getItem("username");
  const token = localStorage.getItem(`security-token-for-${username}`);
  const headers = { Authorization: `Bearer ${token}` };

  const [amount, setAmount] = useState(null);
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");

  return (
    <div class="flex justify-center h-screen bg-gray-100">
      <div className="h-full flex flex-col justify-center">
        <div class="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
          <div class="flex flex-col space-y-1.5 p-6">
            <h2 class="text-3xl font-bold text-center">Send Money</h2>
          </div>
          <div class="p-6">
            <div class="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center">
                <span className="text-2xl text-white">
                  {name[0].toUpperCase()}
                </span>
              </div>
              <h3 className="text-2xl font-semibold">{name}</h3>
            </div>
            <div class="space-y-4">
              <div className="space-y-2">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  for="amount"
                >
                  Amount (in Rs)
                </label>
                <input
                  onChange={(e) => {
                    setAmount(Number(e.target.value));
                  }}
                  type="number"
                  class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  id="amount"
                  placeholder="Enter amount"
                />
              </div>
              <button
                onClick={() => {
                  axios
                    .post(
                      "http://localhost:3000/cfapi/v1/account/transfer",
                      { to: id, amount: amount },
                      { headers }
                    )
                    .then((response) => {
                      //if succesfull
                      console.log(response);
                    })
                    .catch((error) => {
                      console.error("Error sending the money", error);
                    });
                }}
                className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-blue-500 text-white"
              >
                Send Money
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
