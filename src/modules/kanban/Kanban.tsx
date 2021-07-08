import {useEffect, useState} from 'react';
import type {FC} from 'react';
import {Link as RouterLink,} from 'react-router-dom';
import {Helmet} from 'react-helmet-async';
import {DragDropContext} from 'react-beautiful-dnd';
import type {DropResult} from 'react-beautiful-dnd';
import {useSnackbar} from 'notistack';
import {Box, Breadcrumbs, Link, Typography} from '@material-ui/core';
import {KanbanColumn, KanbanColumnAdd} from './components';
import ChevronRightIcon from '../../icons/ChevronRight';
import gtm from '../../lib/gtm';
import {useKanban} from "./zustand";
import {Space} from "../spaces/types/space";
import {useLocation} from "react-router-dom";
import {useSpaceModule} from "../spaces/zustand";
import {useWorkspaceModule} from "../workspaces/zustand";

const Kanban: FC = (props) => {
    const [lists, setLists] = useState(null);
    const selectedSpace = useSpaceModule(state => state.selectedSpace);
    const setSelectedSpace = useSpaceModule(state => state.setSelectedSpace);
    const getAllSpaces = useSpaceModule(state => state.getAllSpaces);
    const selectedWorkspace = useWorkspaceModule(state => state.selectedWorkspace);
    const getSpaceLists = useKanban(state => state.getSpaceLists);
    useEffect(() => {
        if (selectedSpace) {
            console.log(selectedSpace);
            getSpaceLists(selectedSpace._id)
                .then(async (lists) => {
                    console.log('lists: ', lists);
                    setLists(lists);
                })

        } else {
            if (selectedWorkspace) {
                console.log('selectedWorkspace: ', selectedWorkspace);
                getAllSpaces(selectedWorkspace['_id'])
                    .then(spaces => {
                        console.log('spaces: ', spaces);
                        setSelectedSpace(spaces && spaces.length > 0 ? spaces[0] : null);
                    });
            }
        }
    }, [selectedSpace]);

    const {columns, moveCard} = useKanban(state => state);
    const {enqueueSnackbar} = useSnackbar();

    useEffect(() => {
        gtm.push({event: 'page_view'});
    }, []);

    useEffect(() => {
        // getBoard().then();
    }, []);

    const handleDragEnd = async ({
                                     source,
                                     destination,
                                     draggableId
                                 }: DropResult): Promise<void> => {
        try {
            // Dropped outside the column
            if (!destination) {
                return;
            }

            // Card has not been moved
            if (
                source.droppableId === destination.droppableId
                && source.index === destination.index
            ) {
                return;
            }

            if (source.droppableId === destination.droppableId) {
                // Moved to the same column on different position
                await moveCard(draggableId, destination.index);
            } else {
                // Moved to another column
                await moveCard(draggableId, destination.index, destination.droppableId);
            }

            enqueueSnackbar('Card moved', {
                anchorOrigin: {
                    horizontal: 'right',
                    vertical: 'top'
                },
                variant: 'success'
            });
        } catch (err) {
            console.error(err);
            enqueueSnackbar(err.message, {
                anchorOrigin: {
                    horizontal: 'right',
                    vertical: 'top'
                },
                variant: 'error'
            });
        }
    };

    return (
        <>
            <Helmet>
                <title>Dashboard: Kanban | Slark</title>
            </Helmet>
            <Box
                sx={{
                    backgroundColor: 'background.default',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    overflow: 'hidden'
                }}
            >
                <Box sx={{p: 3}}>
                    <Typography
                        color="textPrimary"
                        variant="h5"
                    >
                        Kanban
                    </Typography>
                    <Breadcrumbs
                        aria-label="breadcrumb"
                        separator={<ChevronRightIcon fontSize="small"/>}
                        sx={{mt: 1}}
                    >
                        <Link
                            color="textPrimary"
                            component={RouterLink}
                            to="/dashboard"
                            variant="subtitle2"
                        >
                            Dashboard
                        </Link>
                        <Typography
                            color="textSecondary"
                            variant="subtitle2"
                        >
                            Kanban
                        </Typography>
                    </Breadcrumbs>
                </Box>
                <DragDropContext onDragEnd={handleDragEnd}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexGrow: 1,
                            flexShrink: 1,
                            overflowX: 'auto',
                            overflowY: 'hidden'
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                px: 1,
                                py: 3
                            }}
                        >
                            {/*{columns.allIds.map((columnId: string) => (*/}
                            {/*    <KanbanColumn*/}
                            {/*        columnId={columnId}*/}
                            {/*        key={columnId}*/}
                            {/*    />*/}
                            {/*))}*/}
                            {
                                lists && lists.map(l => (
                                    <KanbanColumn
                                        columnId={l._id}
                                        key={l._id}
                                    />
                                ))
                            }
                            {
                                selectedSpace && <KanbanColumnAdd spaceId={selectedSpace._id}/>
                            }
                        </Box>
                    </Box>
                </DragDropContext>
            </Box>
        </>
    );
};

export default Kanban;
