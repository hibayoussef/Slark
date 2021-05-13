import create from 'zustand';
import {devtools} from 'zustand/middleware';
import {combineAndImmer, zustandLogger} from "@scandinavia/ts-zustand";
import api from "../../../axiosWithDelimiterFile";

const initialState = {
    workspace: null,
    userEmail:null,
    Invitemessage:null,
    //upload image,
    loading: false,
    mainState: "initial", // initial gallery, uploaded
    selectedFile: null,
    platform: 'Firebase',
};
// config like action
const config = (set) => ({
    //function signUp
    createWorkspace: async (workspaceData) => {
        console.log('we are inside zustand 1: ', workspaceData)
        const response = await api.post(
            "workspace" , workspaceData
        ).then(res=>{
            console.log('values inside zustand 2: ',workspaceData)
            console.log('response inside zustand 3: ', res);

            set(state =>{
                state.workspace = res.data;
            })
        }).catch(err =>{
            console.log(err)
        })
        console.log('4: ',response)
    },
    inviteUsersByEmail: async(userEmail) =>{
        console.log('User Email invite to workspace is: ', userEmail);
        const response = await api.post('workspace/invite-user', userEmail)
            .then(res =>{
                console.log('values inside zustand 2: ', userEmail);
                console.log('response inside zustand 3: ', res);

                set(state =>{
                   state.message = res.data
                })
            }).catch(err =>{
                console.log(err);
            })
        console.log(response);
    }
});
const createState = combineAndImmer(initialState, zustandLogger(config));
export const useWorkspaceModule = create(devtools(createState));
