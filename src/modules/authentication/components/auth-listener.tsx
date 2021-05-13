import { AuthListenerProps } from "../models/auth-provider-props";
import { useEffect } from "react";
import { useAuthModule } from "../zustand";

const isValid = (token: string) => true;
const isExpired = (token: string) => true;

export const AuthListener = ({ children }: AuthListenerProps) => {
  const onAuthenticationChanged = useAuthModule(
    (state) => state.onAuthenticationChanged
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));


    if (!token || !user) {
      onAuthenticationChanged(null, false);
    } else {
        if(isValid(token) && !isExpired(token)) {
            onAuthenticationChanged(user, true);
        } else {
            onAuthenticationChanged(null, false);
        }
    }
  }, []);

  // const u = {
    //   id: "wdqdwqdqwdqwdqwdsa",
    //   avatar: "",
    //   email: "hiba@hiba.com",
    //   name: "Hiba Falyoun",
    //   plan: "Premium",
    // };

  return <>{children}</>;
};
