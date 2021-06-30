import create from 'zustand';
import {devtools} from 'zustand/middleware';
import {combineAndImmer, zustandLogger} from "@scandinavia/ts-zustand";
import api from "../../../../axiosWithDelimiterFile";
import {useNavigate} from "react-router-dom";

const initialState = {
    selectedCustomers:null,
    page: null,
    limit: null,
    query: null,
    filters:null,
    Members: null,
    workspace: null,
    userEmail:null,
    spaceData:null,
    selectedWorkspace: '',
    Invitemessage:null,
    file: '',
    space:null,
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
    },

    createSpace: async (spaceData , workspaceId) => {
        console.log('we are inside zustand 1: ', spaceData)
        const response = await api.post(
            "space" , spaceData , workspaceId
        ).then(res=>{
            console.log('values inside zustand 2: ',spaceData ,workspaceId)
            console.log('response inside zustand 3: ', res);

            set(state =>{
                state.space = res.data;
            })
            console.log('response data: ', res.data)
        }).catch(err =>{
            console.log(err)
        })
    },
    createList: async (listData , spaceId) => {
        console.log('we are inside zustand 1: ', listData)
        const response = await api.post(
            "space" , listData , spaceId
        ).then(res=>{
            console.log('values inside zustand 2: ',listData ,spaceId)
            console.log('response inside zustand 3: ', res);

            set(state =>{
                state.space = res.data;
            })
            console.log('response data: ', res.data)
        }).catch(err =>{
            console.log(err)
        })
    },
    inviteUsersByEmail: async(userEmail) =>{
        console.log('User Email invite to workspace is: ', userEmail);
        const response = await api.post('workspace/invite-user', {userEmail})
            .then(res =>{
                console.log('values inside zustand 4: ', userEmail);
                console.log('response inside zustand 5: ', res);

                set(state =>{
                    state.message = res.data.message
                })
                console.log('res.data.messageeeeeeeee:' , res.data.message)
            }).catch(err =>{
                console.log(err);
            })
        console.log(response);
    },

    WorkspaceInformation: async(id) =>{
        console.log('Workspce Information...')
        const response = await api.get(`workspace/${id}`)
            .then(res=>{
                console.log('value inside zustand workspace Information....', id);
                console.log('response inside zustand workspace information....', res)
            })
            .catch(err=>{
                console.log(err)
            })
            console.log(response)

    },

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
    },
});
const createState = combineAndImmer(initialState, zustandLogger(config));
export const useWorkspaceModule = create(devtools(createState));
