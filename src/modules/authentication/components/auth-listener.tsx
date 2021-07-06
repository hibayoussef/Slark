import { AuthListenerProps } from "../models/auth-provider-props";
import { useEffect } from "react";
import { useAuthModule } from "../zustand";
import {useWorkspaceModule} from "../../workspaces/zustand";
import {useSpaceModule} from "../../spaces/zustand";

const isValid = (token: string) => true;
const isExpired = (token: string) => false;

export const AuthListener = ({ children }: AuthListenerProps) => {
  const onAuthenticationChanged = useAuthModule(
    (state) => state.onAuthenticationChanged
  );

  const setSelectedWorkspace = useWorkspaceModule(state => state.setSelectedWorkspace)
  const setSelectedSpace = useSpaceModule(state => state.setSelectedSpace)
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    if (!token || !user) {
      onAuthenticationChanged(null, false);
    } else {
        if(isValid(token) && !isExpired(token)) {
            onAuthenticationChanged(user, true);
            setSelectedWorkspace(user._workspaces[0] || null);
            const spacesAsJson = localStorage.getItem('spaces');
            const spaces = JSON.parse(spacesAsJson);
            setSelectedSpace(spaces && spaces.length > 0 ? spaces[0]: null);
        } else {
            console.log('token is not valid')
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
