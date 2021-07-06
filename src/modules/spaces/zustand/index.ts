import create from 'zustand';
import {devtools} from 'zustand/middleware';
import {combineAndImmer, zustandLogger} from "@scandinavia/ts-zustand";
import api from "../../../axiosWithDelimiterFile";
import {useNavigate} from "react-router-dom";
import React from "react";
import {useWorkspaceModule} from "../../workspaces/zustand";

const initialState = {
    selectedImage: null,
    selectedCustomers:null,
    page: null,
    limit: null,
    query: null,
    filters:null,
    Members: null,
    workspace: null,
    userEmail:null,
    selectedSpace: null,
    spaces: null,
    loading: false,
    platform: 'Firebase',
};

// config like action
const config = (set) => ({

    createSpace: async (spaceData , workspaceId) => {
        console.log('we are inside zustand 1: ', spaceData)
        const response = await api.post(
            "spaces" , spaceData, workspaceId
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

    getAllSpaces: async (workspaceId) => {
        console.log('workspaceId for space:' , workspaceId)
        return await api.get(
            "spaces", {
                params: {
                    workspaceId: workspaceId
                }

            }
        ).then(res=>{
            console.log('[getAllSpaces] method: ', res  );
            set(state =>{
                state.spaces = res.data;
                state.selectedSpace = state.spaces && state.spaces.length > 0 ? state.spaces[0] : null;
            })
            return res.data;
        }).catch(err =>{
            console.error(err)
        })
    },
    getSpace: async(id) => {
        return await api.get(`spaces/${id}`)
            .then(r => r.data)
            .catch(e => {
                console.error(e)
            });
    },
    setSelectedSpace: (space) => {
      set(state => {
          state.selectedSpace = space;
      })
    },
    deleteSpace: async (spaceId , workspace) => {
        console.log('workspaceId for space:' , spaceId , workspace)
        return await api.delete(
            `spaces/${spaceId}`, {
                params: {
                    workspaceId: workspace

                }

            }
        ).then(res=>{
            if(res && res.status >= 200 && res.status <= 399) {
                set(state => {
                    state.spaces = state.spaces.filter(s => s._id !== spaceId);
                })
            }
        }).catch(err =>{
            console.error(err)
        })
    }

});
const createState = combineAndImmer(initialState, config);
export const useSpaceModule = create(devtools(createState));
