import create from "zustand";
import {devtools} from "zustand/middleware";
import {Board, Card, CheckItem, Checklist, Column, Comment, ITask} from "../models/kanban";
import objFromArray from "../../../utils/objFromArray";
import api from "../../../axiosWithDelimiterFile";
import {combineAndImmer, zustandLogger} from "@scandinavia/ts-zustand";


const initialState = {
    isLoaded: false,
    columns: {
        byId: {},
        allIds: []
    },
    selectedTask: null,
    lists: [],
    tasks: [],
    cards: {
        byId: {},
        allIds: []
    },
    members: {
        byId: {},
        allIds: []
    }
}


const config = (set) => ({
        // async getBoard() {
        //     const response = await api.get<{ board: Board }>('/api/kanban/board');
        //     const {board} = response.data;
        //     set(state => {
        //         state.columns.byId = objFromArray(board.columns);
        //         state.columns.allIds = Object.keys(state.columns.byId);
        //         state.cards.byId = objFromArray(board.cards);
        //         state.cards.allIds = Object.keys(state.cards.byId);
        //         state.members.byId = objFromArray(board.members);
        //         state.members.allIds = Object.keys(state.members.byId);
        //         state.isLoaded = true;
        //     })
        // },
        getSpaceLists: async (spaceId) => {
            return await api.get('lists', {
                params: {
                    _space: spaceId
                }
            }).then(r => {
                console.log('getSpaceLists r: ', r);
                const lists = r.data;
                set(state => {
                    state.lists = lists;
                })
                return lists;
            }).catch(console.error);
        },


        //base
        async createColumn(name: string, spaceId: string) {
            // const response = await api.post<{ column: Column }>(
            //     'lists',
            //     {
            //         name ,
            //         spaceId
            //     }
            // );
            // const {column} = response.data;
            // set(state => {
            //     state.columns.byId[column.id] = column;
            //     state.columns.allIds.push(column.id);
            // })
        },

        async createList(name: string, spaceId: string) {
            const response = await api.post(
                'lists',
                {
                    name,
                    _space: spaceId
                }
            );
            const list = response.data;
            console.log('list: ', list)
            set(state => {
                state.lists.push(list)
            })
            return list;
        },

        async updateColumn(columnId: string, update: any) {
            const response = await api.post<{ column: Column }>(
                '/api/kanban/columns/update',
                {
                    columnId,
                    update
                }
            );
            const {column} = response.data;
            set(state => {
                state.columns.byId[column.id] = column;
            })
        },
        async clearColumn(columnId: string) {

            await api.post(
                '/api/kanban/columns/clear',
                {
                    columnId
                }
            );
            set(state => {
                // cardIds to be removed
                const {cardIds} = state.columns.byId[columnId];

                // Delete the cardIds references from the column
                state.columns.byId[columnId].cardIds = [];

                // Delete the cards from state
                cardIds.forEach((cardId) => {
                    delete state.cards.byId[cardId];
                });

                state.cards.allIds = state.cards.allIds.filter((cardId) => cardIds.includes(cardId));
            })
        },
        //delete column
        async deleteColumn(columnId: string) {
            await api.post(
                '/lists',
                {
                    columnId
                }
            );
            set(state => {
                delete state.columns.byId[columnId];
                state.columns.allIds = state.columns.allIds.filter((_listId) => _listId !== columnId);
            })
        },
        //base
        async createCard(name: string, listId) {
            const response = await api.post(
                'tasks',
                {
                    name,
                    _list: listId
                }
            );
            const card = response.data;
            // set(state => {
            //     state.cards.byId[card.id] = card;
            //     state.cards.allIds.push(card.id);
            //     // Add the cardId reference to the column
            //     state.columns.byId[card.columnId].cardIds.push(card._id);
            // })
            console.log('card:', card)
        },
        //base
        async updateCard(cardId: string, update: any) {
            const response = await api.put<{ card: Card }>(
                '/tasks',
                {
                    cardId,
                    update
                }
            );
            const {card} = response.data;
            //update
            set(state => {
                Object.assign(state.cards.byId[card.id], card);
            })
        },


        async moveCard(cardId: string, position: number, columnId?: string) {
            await api.post(
                '/api/kanban/cards/move',
                {
                    cardId,
                    position,
                    columnId
                }
            );
            set(state => {
                const sourceColumnId = state.cards.byId[cardId].columnId;

                // Remove card from source column
                state.columns.byId[sourceColumnId].cardIds = (
                    state.columns.byId[sourceColumnId].cardIds.filter((_cardId) => _cardId !== cardId)
                );

                // If columnId exists, it means that we have to add the card to the new column
                if (columnId) {
                    // Change card's columnId reference
                    state.cards.byId[cardId].columnId = columnId;
                    // Push the cardId to the specified position
                    state.columns.byId[columnId].cardIds.splice(position, 0, cardId);
                } else {
                    // Push the cardId to the specified position
                    state.columns.byId[sourceColumnId].cardIds.splice(position, 0, cardId);
                }
            })
        }
        ,
        //base
        async deleteCard(cardId: string) {
            await api.post(
                '/tasks',
                {
                    cardId
                }
            );
            set(state => {
                const {columnId} = state.cards.byId[cardId];
                delete state.cards.byId[cardId];
                state.cards.allIds = state.cards.allIds.filter((_cardId) => _cardId !== cardId);
                state.columns.byId[columnId].cardIds = (
                    state.columns.byId[columnId].cardIds.filter((_cardId) => _cardId !== cardId)
                );
            })
        },

        getAllTasks: async (listId) => {
            console.log('listId for task:', listId)
            return await api.get(
                "tasks", {
                    params: {
                        listId: listId
                    }
                }
            ).then(res => {
                return res.data;
            }).catch(err => {
                console.error(err)
            })
        },


        async updateTask(task: ITask) {
            // Sanitize data
            if(task) {
                if(task._subTasks) {
                    task._subTasks = task._subTasks.map(e => {
                        if(typeof e !== 'string') {
                            return e._id
                        }
                        return e;
                    });
                }
                if(task._assignedUsers) {
                    task._assignedUsers = task._assignedUsers.map(e => {
                        if(typeof e !== 'string') {
                            return e._id
                        }
                        return e;
                    });
                }
                if(task.assets) {
                    task.assets = task.assets.map(e => {
                        if(typeof e !== 'string') {
                            return e._id
                        }
                        return e;
                    });
                }
                if(task._list) {
                    task._list = task._list._id;
                }
            }
            return await api.put(`tasks/${task._id}`, task)
                .then(res => {
                    const updatedTask = res.data;
                    set(state => {
                        state.tasks = state.tasks.map(t => {
                            if(t._id === updatedTask._id) return updatedTask;
                            return t;
                        })
                    })
                })
        },

        async addComment(cardId: string,
                         message: string) {
            const response = await api.post<{ comment: Comment }>(
                '/api/kanban/comments/new',
                {
                    cardId,
                    message
                }
            );
            const {comment} = response.data;
            set(state => {
                const card = state.cards.byId[comment.cardId];
                card.comments.push(comment);
            })
        },
        async addChecklist(cardId: string, name: string) {
            const response = await api.post<{ checklist: Checklist }>(
                '/api/kanban/checklists/new',
                {
                    cardId,
                    name
                }
            );
            const {checklist} = response.data;
            set(state => {
                const card = state.cards.byId[cardId];
                card.checklists.push(checklist);
            })
        },
        async updateChecklist(cardId: string,
                              checklistId: string,
                              update: any) {
            const response = await api.post<{ checklist: Checklist }>(
                '/api/kanban/checklists/update',
                {
                    cardId,
                    checklistId,
                    update
                }
            );
            const {checklist} = response.data;
            set(state => {
                const card = state.cards.byId[cardId];
                card.checklists = card.checklists.map((_checklist) => {
                    if (_checklist.id === checklist.id) {
                        return checklist;
                    }

                    return _checklist;
                });
            })
        },
        async deleteChecklist(cardId: string, checklistId: string) {
            await api.post(
                '/api/kanban/checklists/remove',
                {
                    cardId,
                    checklistId
                }
            );
            set(state => {
                const card = state.cards.byId[cardId];
                card.checklists = card.checklists.filter((checklist) => checklist.id !== checklistId);
            })
        },
        async addCheckItem(cardId: string, checklistId: string, name: string) {
            const response = await api.post<{ checkItem: CheckItem }>(
                '/api/kanban/check-items/new',
                {
                    cardId,
                    checklistId,
                    name
                }
            );
            const {checkItem} = response.data;
            set(state => {
                const card = state.cards.byId[cardId];
                const checklist = card.checklists.find((_checklist) => _checklist.id === checklistId);
                checklist.checkItems.push(checkItem);
            })
        },
        async updateCheckItem(cardId: string, checklistId: string, checkItemId: string, update: any) {
            const response = await api.post<{ checkItem: CheckItem }>(
                '/api/kanban/check-items/update',
                {
                    cardId,
                    checklistId,
                    checkItemId,
                    update
                }
            );
            const {checkItem} = response.data;
            set(state => {
                const card = state.cards.byId[cardId];
                const checklist = card.checklists.find((_checklist) => _checklist.id === checklistId);

                checklist.checkItems = checklist.checkItems.map((_checkItem) => {
                    if (_checkItem.id === checkItem.id) {
                        return checkItem;
                    }

                    return _checkItem;
                });
            })
        },
        async deleteCheckItem(cardId: string,
                              checklistId: string,
                              checkItemId: string) {

            await api.post(
                '/api/kanban/check-items/remove',
                {
                    cardId,
                    checklistId,
                    checkItemId
                }
            );
            set(state => {
                const card = state.cards.byId[cardId];
                const checklist = card.checklists.find((_checklist) => _checklist.id === checklistId);

                checklist.checkItems = (
                    checklist.checkItems.filter((checkItem) => checkItem.id !== checkItemId)
                );
            })
        }
    })
;

const createState = combineAndImmer(initialState, config);
export const useKanban = create(devtools(createState));

