import create from 'zustand';
import {devtools} from 'zustand/middleware';
import {combineAndImmer, zustandLogger} from "@scandinavia/ts-zustand";
import api from "../../../axiosWithDelimiterFile";
import {useNavigate} from "react-router-dom";
import React from "react";

const initialState = {
    selectedImage: null,
    selectedCustomers: null,
    page: null,
    limit: null,
    query: null,
    users: null,
    filters: null,
    Members: null,
    workspace: null,
    userEmail: null,
    spaceData: null,
    selectedWorkspace: null,
    selectedSpace: '',
    Invitemessage: null,
    file: '',
    space: null,
    workspaceImageId: null,
    selectedFile: null,
    //upload image,
    loading: false,
    platform: 'Firebase',
};

// config like action
const config = (set) => ({

    //new
    createWorkspace: async (workspaceData) => {
        return await api.post(
            "workspaces", workspaceData
        ).then(res => {
            set(state => {
                state.workspace = res.data;
            })
            return res.data;
        }).catch(err => {
            console.log(err)
        })
    },

    WorkspaceUploadImage: async (formData) => {
        // console.log('Workspcae image inside zustand is: ', );
        return await api.post('uploads', formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data" // This means change content type from default or json to multipart-form data
                }
            }).then(r => r.data)
    },
    //new
    inviteUsersByEmail: async (userEmail, workspaceId, workspaceName) => {
        console.log('User Email invite to workspace is: ', userEmail, workspaceId, workspaceName);
        const response = await api.post('workspaces/invite-user', {userEmail, workspaceId, workspaceName})
            .then(res => {
                console.log('values inside zustand 4: ', userEmail);
                console.log('response inside zustand 5: ', res);

                set(state => {
                    state.message = res.data.message
                })
                console.log('res.data.messageeeeeeeee:', res.data.message)
            }).catch(err => {
                console.error(err);
            })
        console.log(response);
    },

    //
    // createSpace: async (spaceData , workspaceId) => {
    //     console.log('we are inside zustand 1: ', spaceData)
    //     const response = await api.post(
    //         "space" , spaceData , workspaceId
    //     ).then(res=>{
    //         console.log('values inside zustand 2: ',spaceData ,workspaceId)
    //         console.log('response inside zustand 3: ', res);
    //
    //
    //         set(state =>{
    //             state.space = res.data;
    //         })
    //         console.log('response data: ', res.data)
    //     }).catch(err =>{
    //         console.log(err)
    //     })
    // },


    setSelectedWorkspace: (workspace) => {
        set(state => {
            state.selectedWorkspace = workspace;
        })
    },

    WorkspaceInformation: async (id) => {
        console.log('Workspce Information...')
        const response = await api.get(`workspace/${id}`)
            .then(res => {
                console.log('value inside zustand workspace Information....', id);
                console.log('response inside zustand workspace information....', res)
                const spaces = res.data.workspace._spaces;
                set(state => {
                    state.selectedSpace = spaces ? spaces[0] : null;
                })
            })
            .catch(err => {
                console.log(err)
            })
        console.log(response)

    },

    deleteUserFromWorkspace: async (userId, workspaceId) => {
        return await api.delete(
            `/workspaces/remove-user`, {
                params: {
                    userId,
                    workspaceId
                }
            }
        ).then(r => r.data);
    },

    deleteWorkspace: async (workspaceId) => {
        console.log('workspaceId for space:', workspaceId)
        return await api.delete(
            `workspaces/${workspaceId}`
        ).then(res => {
            console.log(res)
        }).catch(err => {
            console.error(err)
        })
    },

    getAllUser: async (workspace) => {
        console.log('workspaceId for user:', workspace)
        return await api.get(
            "workspaces/all-users", {
                params: {
                    workspace: workspace
                }

            }
        ).then(res => {
            console.log('[getAllUser] method: ', res);
            set(state => {
                state.users = res.data;
                // state.selectedUser = state.users && state.users.length > 0 ? state.users[0] : null;
            })
            return res.data;
        }).catch(err => {
            console.error(err)
        })
    },


});
const createState = combineAndImmer(initialState, config);
export const useWorkspaceModule = create(devtools(createState));
