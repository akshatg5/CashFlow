import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";

export const SendMoney = () => {
  const username = localStorage.getItem("username");
  const token = localStorage.getItem(`security-token-for-${username}`);
  const headers = { Authorization: `Bearer ${token}` };

  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState(null);
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [transfermsg, setTransfermsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/cfapi/v1/account/balance",
          { headers }
        );
        const formatBalance = Number(response.data.balance).toFixed(2);
        setBalance(formatBalance);
      } catch (error) {
        console.log("Balance fetch error occured");
        setError("Error in getting balances");
      }
    };
    fetchBalance();
  }, [balance]);

  const handleTransfer = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3000/cfapi/v1/account/transfer",
        { to: id, amount: parseFloat(amount) },
        { headers }
      );
      // Handle success
      console.log(response);
      setTransfermsg(response.data.msg);
      setTimeout(() => {
        navigate("/dashboard");
        setLoading(false)
      }, 4000);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setError("Insufficient Balance. Try again!");
      } else {
        setError("Insufficient Balance. Please try again!");
      }
      console.error("Error sending the money", error);
    }
  };

  return (
    <div className="flex justify-center h-screen bg-gray-100">
      <div className="h-full flex flex-col justify-center">
        <div className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
          <div className="flex flex-col">
            <h2 className="text-3xl font-bold text-center">Send Money</h2>
            <h2 className="text-xl mt-2 font-semibold text-center">
              Current Balance: ₹{balance}
            </h2>
          </div>
          <div className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center">
                <span className="text-2xl text-white">
                  {name && name[0].toUpperCase()}
                </span>
              </div>
              <h3 className="text-2xl font-semibold">{name}</h3>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="amount"
                >
                  Amount (in Rs)
                </label>
                <input
                  onChange={(e) => setAmount(e.target.value)}
                  type="number"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  id="amount"
                  placeholder="Enter amount"
                />
              </div>
              {loading ? (
                <div className="justify-center">
                  <button
                    disabled
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
                  >
                    <svg
                      aria-hidden="true"
                      role="status"
                      class="inline w-4 h-4 me-3 text-white animate-spin"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="#E5E7EB"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentColor"
                      />
                    </svg>
                    Loading...
                  </button>
                </div>
              ) : null}
              <button
                onClick={handleTransfer}
                className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white"
              >
                Send Money
              </button>
              <button
                onClick={() => {
                  navigate("/dashboard");
                }}
                className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-red-500 text-white"
              >
                Cancel Transaction
              </button>
            </div>
            <div>
              {transfermsg && (
                <p className="text-green-500 text-sm text-center mb-4">
                  {transfermsg}
                </p>
              )}
            </div>
            {error && (
              <p className="text-red-500 text-sm text-center mb-4">{error}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
