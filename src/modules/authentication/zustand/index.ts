import create from 'zustand';
import {devtools} from 'zustand/middleware';
import {User} from "../../../types/user";
import {combineAndImmer, zustandLogger} from "@scandinavia/ts-zustand";
import api from "../../../axiosWithDelimiterFile";


const initialState = {
    isAuthenticated: false,
    isInitialized: false,
    user: null,
    userLogin: null,
    platform: 'Firebase',
    shouldNavigate: true,
    loginError: '',
    signupError: '',
};
// config like action
const config = (set) => ({
    //function signUp
    createUserWithNameAndEmailAndPassword: async (userData) => {
        console.log('we are insideeeeeeeeee: ', userData)
        const response = await api.post(
            "account/signup", userData
        ).then(res => {
            console.log('values inside zustand: ', userData)
            console.log('response inside zustand: ', res);

            set(state => {
                state.shouldNavigate = false;
                state.user = res.data;
            })
        }).catch(err => {
            console.log(err)
        })
        console.log('response at the end of create function inside zustand: ', response);
    },

    loginUserWithEmailAndPassword: async (userData) => {
        const response = await api.post(
            "account/login", userData
        ).then(res => {
            const token = res.data.token
            localStorage.setItem('token', token);
            console.log('values inside zustand: ', userData)
            console.log('token: ', token)
            console.log('response inside zustand: ', res)
            set(state => {
                state.user = res.data;
                state.isAuthenticated = true;
                state.loginError = '';
            })
        }).catch(err => {
            console.error('Error while signing: ', err.response.data.message);
            const { message } = err.response.data;
            set(state => {
                state.loginError = message;
            })
        })
        console.log('response at the end of create function inside zustand: ', response);
    },


    confirmEmail: async (userData) => {
        console.log('userData inside confirmEmail: ', userData);
        const userEmail = userData.email;
        console.log(userEmail)
        const response = await api.get(
            `/account/reactivate/${userEmail}`
        ).then(res => {
            console.log('response: ', res);
        }).catch(err => {
            console.log(err)
        })
        console.log(response)
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
