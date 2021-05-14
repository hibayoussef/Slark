import create from 'zustand';
import {devtools} from 'zustand/middleware';
import {combineAndImmer, zustandLogger} from "@scandinavia/ts-zustand";
import api from "../../../../axiosWithDelimiterFile";

const initialState = {
    workspace: null,
    userEmail:null,
    Invitemessage:null,
    file: '',
    workspaceImageId: null,
    selectedFile: null,
    //upload image,
    loading: false,
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
            console.log('response data: ', res.data)
        }).catch(err =>{
            console.log(err)
        })
        console.log(response)
    },
    inviteUsersByEmail: async({userEmail, workspaceId , workspaceName}) =>{
        console.log('User Email invite to workspace is: ', {userEmail, workspaceId , workspaceName});
        const response = await api.post('workspace/invite-user', {userEmail , workspaceId , workspaceName})
            .then(res =>{
                console.log('values inside zustand 2: ', userEmail , workspaceId , workspaceName);
                console.log('response inside zustand 3: ', res);

                set(state =>{
                    state.message = res.data
                })
            }).catch(err =>{
                console.log(err);
            })
        console.log(response);
    }
    ,
    WorkspaceUploadImage: async (WorkspaceImage) =>{
        console.log('Workspcae image inside zustand is: ', WorkspaceImage);
        const response = await api.post('workspace/upload-image' , WorkspaceImage)
            .then(res =>{
                console.log('value inside zustand 2: ', WorkspaceImage);
                console.log('response inside zustand 3: ', res);

                set(state =>{
                    state.workspaceImageId = res.data;
                })
                    .catch(err =>{
                        console.log(err);
                    })
                console.log(response);
            })
    }
});
const createState = combineAndImmer(initialState, zustandLogger(config));
export const useWorkspaceModule = create(devtools(createState));
