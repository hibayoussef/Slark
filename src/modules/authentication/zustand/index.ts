import create from 'zustand';
import {devtools} from 'zustand/middleware';
import {User} from "../../../types/user";
import {combineAndImmer, zustandLogger} from "@scandinavia/ts-zustand";
import api from "../../../axiosWithDelimiterFile";
import {useSpaceModule} from "../../spaces/zustand";


const initialState = {
    isAuthenticated: false,
    isInitialized: false,
    user: null,
    userLogin: null,
    platform: 'Firebase',
    shouldNavigate: true,
    loginError: '',
    signupError: '',
    selectedWorkspace: null
};
// config like action
const config = (set) => ({
    //function signUp
    createUserWithNameAndEmailAndPassword: async (userData) => {
        console.log('we are insideeeeeeeeee: ', userData)
        const response = await api.post(
            "accounts/signup", userData
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
    },

    loginUserWithEmailAndPassword: async (userData) => {
        const response = await api.post(
            "accounts/login", userData
        ).then(async (res) => {
            console.log('res.data: ', res.data);
            const token = res.data.token
            const workspaces = res.data.user._workspaces;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            const defaultWorkspace = workspaces ? workspaces[0] : null;

            console.log('defaultWorkspace: ', defaultWorkspace);
            set(state => {
                state.user = res.data.user;
                state.isAuthenticated = true;
                state.loginError = '';
                state.selectedWorkspace = defaultWorkspace;

                // const getAllSpaces = useSpaceModule(state => state.getAllSpaces);
                // console.log('getAllSpaces: ', getAllSpaces)
                // const spaces = await getAllSpaces(defaultWorkspace._id);
                // localStorage.setItem('spaces', JSON.stringify(spaces));

            })
        }).catch(err => {
            console.error('Error while signing: ', err.response.data.message);
            const {message} = err.response.data;
            localStorage.removeItem('user')
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
const createState = combineAndImmer(initialState, config);
export const useAuthModule = create(devtools(createState));
