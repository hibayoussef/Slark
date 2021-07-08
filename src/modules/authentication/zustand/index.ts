import create from 'zustand';
import {devtools} from 'zustand/middleware';
import {User} from "../../../types/user";
import {combineAndImmer} from "@scandinavia/ts-zustand";
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
    selectedWorkspace: null
};
// config like action
const config = (set) => ({
    //function signUp
    createUserWithNameAndEmailAndPassword: async (userData) => {
        return await api.post(
            "accounts/signup", userData
        ).then(res => {
            set(state => {
                state.shouldNavigate = false;
                state.user = res.data;
            })
            return res.data;
        }).catch(err => {
            console.log(err)
        })
    },
    addWorkspace(w) {
        set(state => {
            state.user._workspaces.push(w)
        })
    },
    removeWorkspace(w) {
      set(state => {
          state.user._workspaces = state.user._workspaces.filter(workspace => workspace._id !== w._id);
      })
    },
    loginUserWithEmailAndPassword: async (userData) => {
        const response = await api.post(
            "accounts/login", userData
        ).then(async (res) => {
            const { token, user } = res.data;
            const workspaces = user._workspaces;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            const defaultWorkspace = workspaces && workspaces.length > 0 ? workspaces[0] : null;
            set(state => {
                state.user = user;
                state.isAuthenticated = true;
                state.loginError = '';
                state.selectedWorkspace = defaultWorkspace;
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
