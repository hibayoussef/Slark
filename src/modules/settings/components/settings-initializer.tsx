import {useEffect} from "react";
import {useSettings} from "../zustand";

export const SettingsInitializer = ({children}: any) => {
    const restoreSettings = useSettings(state => state.restoreSettings);
    useEffect(() => {
        restoreSettings();
    }, []);
    return <>
        {children}
    </>
}
