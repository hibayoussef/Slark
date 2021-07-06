import {useEffect, useRef, useState} from 'react';
import type {FC, ChangeEvent} from 'react';
import PropTypes from 'prop-types';
import {useSnackbar} from 'notistack';
import {Droppable, Draggable} from 'react-beautiful-dnd';
import {
    Box,
    ClickAwayListener,
    Divider,
    IconButton,
    Menu,
    MenuItem,
    Paper,
    TextField,
    Typography
} from '@material-ui/core';
import DotsHorizontalIcon from '../../../icons/DotsHorizontal';
import KanbanCard from './KanbanCard';
import KanbanCardAdd from './KanbanCardAdd';
import {useKanban} from "../zustand";
import {ITask} from "../models/kanban";

interface KanbanColumnProps {
    columnId: string;
}


const KanbanColumn: FC<KanbanColumnProps> = (props) => {
    const {columnId, ...other} = props;
    const {clearColumn, deleteColumn, updateColumn, lists , getAllTasks} = useKanban(state => state);
    const moreRef = useRef<HTMLButtonElement | null>(null);
    const column = lists.filter(l => l._id === columnId)[0]; // columns.byId[columnId];
    const {enqueueSnackbar} = useSnackbar();
    const [openMenu, setOpenMenu] = useState<boolean>(false);
    const [name, setName] = useState<string>(column.name);
    const [isRenaming, setIsRenaming] = useState<boolean>(false);

    const [tasks , setTasks] = useState(null);
    useEffect(()=>{
        getAllTasks(columnId)
            .then((tasks: ITask[])=>{
                console.log('tasks: ', tasks)
                setTasks(tasks)
            })
    },[])
    const handleMenuOpen = (): void => {
        setOpenMenu(true);
    };

    const handleMenuClose = (): void => {
        setOpenMenu(false);
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setName(event.target.value);
    };

    const handleRenameInit = (): void => {
        setIsRenaming(true);
        setOpenMenu(false);
    };

    const handleRename = async (): Promise<void> => {
        try {
            if (!name) {
                setName(column.name);
                setIsRenaming(false);
                return;
            }

            const update = {name};

            setIsRenaming(false);
            await updateColumn(column.id, update);
            enqueueSnackbar('Column updated', {
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

    const handleDelete = async (): Promise<void> => {
        try {
            setOpenMenu(false);
            await deleteColumn(column.id);
            enqueueSnackbar('Column deleted', {
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

    const handleClear = async (): Promise<void> => {
        try {
            setOpenMenu(false);
            await clearColumn(column.id);
            enqueueSnackbar('Column cleared', {
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
        <div {...other}>
            <Paper
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    maxHeight: '100%',
                    mx: 1,
                    overflowX: 'hidden',
                    overflowY: 'hidden',
                    width: {
                        xs: 300,
                        sm: 380
                    }
                }}
            >
                <Box
                    sx={{
                        alignItems: 'center',
                        display: 'flex',
                        px: 2,
                        py: 1
                    }}
                >
                    {
                        isRenaming
                            ? (
                                <ClickAwayListener onClickAway={handleRename}>
                                    <TextField
                                        margin="dense"
                                        onBlur={handleRename}
                                        onChange={handleChange}
                                        value={name}
                                        variant="outlined"
                                    />
                                </ClickAwayListener>
                            )
                            : (
                                <Typography
                                    color="inherit"
                                    onClick={handleRenameInit}
                                    variant="h6"
                                >
                                    {column.name}
                                </Typography>
                            )
                    }
                    <Box sx={{flexGrow: 1}}/>
                    <IconButton
                        color="inherit"
                        edge="end"
                        onClick={handleMenuOpen}
                        ref={moreRef}
                    >
                        <DotsHorizontalIcon fontSize="small"/>
                    </IconButton>
                </Box>
                <Divider/>
                <Droppable
                    droppableId={column.id}
                    type="card"
                >
                    {(provided): JSX.Element => (
                        <Box
                            ref={provided.innerRef}
                            sx={{
                                flexGrow: 1,
                                minHeight: 80,
                                overflowY: 'auto',
                                px: 2,
                                py: 1
                            }}
                        >
                            {
                                tasks &&
                                tasks.map((t, index) => (
                                <Draggable
                                    draggableId={t._id}
                                    index={index}
                                    key={t._id}
                                >
                                    {(_provided, snapshot): JSX.Element => (
                                        <KanbanCard
                                            cardId={t._id}
                                            dragging={snapshot.isDragging}
                                            index={index}
                                            key={t._id}
                                            column={column}
                                            task={t}
                                            ref={_provided.innerRef}
                                            style={{..._provided.draggableProps.style}}
                                            {..._provided.draggableProps}
                                            {..._provided.dragHandleProps}
                                        />
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </Box>
                    )}
                </Droppable>
                <Divider/>
                <Box sx={{p: 2}}>
                    <KanbanCardAdd listId={columnId}/>
                </Box>
                <Menu
                    anchorEl={moreRef.current}
                    anchorOrigin={{
                        horizontal: 'center',
                        vertical: 'bottom'
                    }}
                    getContentAnchorEl={null}
                    keepMounted
                    onClose={handleMenuClose}
                    open={openMenu}
                >
                    <MenuItem onClick={handleRenameInit}>
                        Rename
                    </MenuItem>
                    <MenuItem onClick={handleClear}>
                        Clear
                    </MenuItem>
                    <MenuItem onClick={handleDelete}>
                        Delete
                    </MenuItem>
                </Menu>
            </Paper>
        </div>
    );
};

KanbanColumn.propTypes = {
    columnId: PropTypes.string.isRequired
};

export default KanbanColumn;
