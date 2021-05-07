import create from "zustand";
import {devtools} from "zustand/middleware";
import {Board, Card, CheckItem, Checklist, Column, Comment} from "../models/kanban";
import objFromArray from "../../../utils/objFromArray";
import axios from "../../../lib/axios";
import {combineAndImmer, zustandLogger} from "@scandinavia/ts-zustand";


const initialState = {
    isLoaded: false,
    columns: {
        byId: {},
        allIds: []
    },
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
        async getBoard() {
            const response = await axios.get<{ board: Board }>('/api/kanban/board');
            const {board} = response.data;
            set(state => {
                state.columns.byId = objFromArray(board.columns);
                state.columns.allIds = Object.keys(state.columns.byId);
                state.cards.byId = objFromArray(board.cards);
                state.cards.allIds = Object.keys(state.cards.byId);
                state.members.byId = objFromArray(board.members);
                state.members.allIds = Object.keys(state.members.byId);
                state.isLoaded = true;
            })
        },
        async createColumn(name: string) {
            const response = await axios.post<{ column: Column }>(
                '/api/kanban/columns/new',
                {
                    name
                }
            );
            const {column} = response.data;
            set(state => {
                state.columns.byId[column.id] = column;
                state.columns.allIds.push(column.id);
            })
        },
        async updateColumn(columnId: string, update: any) {
            const response = await axios.post<{ column: Column }>(
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

            await axios.post(
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
        async deleteColumn(columnId: string) {
            await axios.post(
                '/api/kanban/columns/remove',
                {
                    columnId
                }
            );
            set(state => {
                delete state.columns.byId[columnId];
                state.columns.allIds = state.columns.allIds.filter((_listId) => _listId !== columnId);
            })
        },
        async createCard(columnId: string, name: string) {
            const response = await axios.post<{ card: Card }>(
                '/api/kanban/cards/new',
                {
                    columnId,
                    name
                }
            );
            const {card} = response.data;
            set(state => {
                state.cards.byId[card.id] = card;
                state.cards.allIds.push(card.id);
                // Add the cardId reference to the column
                state.columns.byId[card.columnId].cardIds.push(card.id);
            })
        },
        async updateCard(cardId: string, update: any) {
            const response = await axios.post<{ card: Card }>(
                '/api/kanban/cards/update',
                {
                    cardId,
                    update
                }
            );
            const {card} = response.data;
            set(state => {
                Object.assign(state.cards.byId[card.id], card);
            })
        },
        async moveCard(cardId: string, position: number, columnId?: string) {
            await axios.post(
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
        async deleteCard(cardId: string) {
            await axios.post(
                '/api/kanban/cards/remove',
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
        async addComment(cardId: string,
                         message: string) {
            const response = await axios.post<{ comment: Comment }>(
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
            const response = await axios.post<{ checklist: Checklist }>(
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
            const response = await axios.post<{ checklist: Checklist }>(
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
            await axios.post(
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
            const response = await axios.post<{ checkItem: CheckItem }>(
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
            const response = await axios.post<{ checkItem: CheckItem }>(
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

            await axios.post(
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

const createState = combineAndImmer(initialState, zustandLogger(config));
export const useKanban = create(devtools(createState));

