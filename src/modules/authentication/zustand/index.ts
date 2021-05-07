import create, {State} from 'zustand';
import {devtools} from 'zustand/middleware';
import {User} from "../../../types/user";
import {combineAndImmer, zustandLogger} from "@scandinavia/ts-zustand";
import axios from 'axios';

const initialState = {
    isAuthenticated: false,
    isInitialized: false,
    user: null,
    userLogin: null,
    platform: 'Firebase'
};
// config like action
const config = (set) => ({
    //function signUp
    createUserWithNameAndEmailAndPassword: async (userData ) => {
        console.log('we are insideeeeeeeeee: ', userData)
        const response = await axios.post(
            "https://slark-backend.herokuapp.com/account/signup" , userData
        ).then(res=>{
            console.log('values inside zustand: ',userData)
            console.log('response inside zustand: ', res)
            set(state =>{
                state.user = res.data;

            })
        }).catch(err =>{
            console.log(err)
        })
        console.log('response at the end of create function inside zustand: ' , response);
    },

    loginUserWithEmailAndPassword: async (userData ) => {
        console.log('we are insideeeeeeeeee: ', userData)
        const response = await axios.post(
            "https://slark-backend.herokuapp.com/account/login" , userData
        ).then(res=>{
            console.log('values inside zustand: ',userData)
            console.log('response inside zustand: ', res)
            set(state =>{
                state.user = res.data;

            })
        }).catch(err =>{
            console.log(err)
        })
        console.log('response at the end of create function inside zustand: ' , response);
    },

    logout: async (): Promise<void> => {
        // Todo
        set(state => {
            state.user = null;
            state.isAuthenticated = false;
            localStorage.removeItem('user');

        })
    },

    onAuthenticationChanged(user: User, isAuthenticated: boolean) {
        set(state => {
            state.isInitialized = true;
            state.isAuthenticated = isAuthenticated;
            state.user = user;
        })
    }
});
const createState = combineAndImmer(initialState, zustandLogger(config));
export const useAuthModule = create(devtools(createState));
