import create from 'zustand';
import {devtools} from 'zustand/middleware';
import {THEMES} from "../../../constants";
import {combineAndImmer, zustandLogger} from "@scandinavia/ts-zustand";



export interface Settings {
    compact?: boolean;
    direction?: 'ltr' | 'rtl';
    responsiveFontSizes?: boolean;
    roundedCorners?: boolean;
    theme?: string;
}

const initialState = {
    settings: {
        compact: true,
        direction: 'ltr',
        responsiveFontSizes: true,
        roundedCorners: true,
        theme: THEMES.LIGHT
    }
};

const config = (set) => ({
    saveSettings: (_settings: Settings) => {
        window.localStorage.setItem('settings', JSON.stringify(_settings));
        set(state => {
            state.settings = _settings
        });
    },
    restoreSettings: () => {
        let settings = null;
        try {
            const storedData: string | null = window.localStorage.getItem('settings');

            if (storedData) {
                settings = JSON.parse(storedData);
            } else {
                settings = {
                    compact: true,
                    direction: 'ltr',
                    responsiveFontSizes: true,
                    roundedCorners: true,
                    theme: window.matchMedia('(prefers-color-scheme: dark)').matches
                        ? THEMES.DARK
                        : THEMES.LIGHT
                };
            }
        } catch (err) {
            console.error(err);
            // If stored data is not a stringified JSON this will fail,
            // that's why we catch the error
        }

        set(state => {
            state.settings = settings
        });
    },
    storeSettings(settings: Settings) {
        window.localStorage.setItem('settings', JSON.stringify(settings));
    }
});


const createState = combineAndImmer(initialState, zustandLogger(config));
export const useSettings = create(devtools(createState));
