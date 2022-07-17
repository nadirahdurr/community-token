import { createContext, useEffect, useState, useContext } from "react";
import { useMoralis } from "react-moralis";

export const Web3Context = createContext(null);

export const useWeb3Context = () => useContext(Web3Context);

export const Web3Provider = ({ children }) => {
  const [address, setAddress] = useState();
  const { authenticate, user, logout, isAuthenticated } = useMoralis();

  const metaMaskLogin = async () => {
    try {
      await authenticate();
    } catch (e) {
      console.error(e);
    }
  };

  const walletConnectLogin = async () => {
    try {
      await authenticate({ provider: "walletconnect" });
    } catch (e) {
      console.error(e);
    }
  };

  const logoutWallet = async () => {
    await logout();
  };

  useEffect(() => {
    if (user) setAddress(user.get("ethAddress"));
  }, [address]);

  return (
    <Web3Context.Provider
      value={{
        user,
        address,
        isAuthenticated,
        metaMaskLogin,
        walletConnectLogin,
        logoutWallet,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export default { Web3Context, useWeb3Context, Web3Provider };