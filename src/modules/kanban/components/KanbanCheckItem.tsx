import {useState} from 'react';
import type {FC, ChangeEvent} from 'react';
import PropTypes from 'prop-types';
import {useSnackbar} from 'notistack';
import {
    Box,
    Button,
    Checkbox,
    IconButton,
    TextField,
    Theme,
    Typography
} from '@material-ui/core';
import {experimentalStyled} from '@material-ui/core/styles';
import type {SxProps} from '@material-ui/system';
import TrashIcon from '../../../icons/Trash';
import type {CheckItem} from '../models/kanban';
import {useKanban} from "../zustand";

interface KanbanCheckItemProps {
    cardId: string;
    checkItem: CheckItem;
    checklistId: string;
    editing?: boolean;
    onEditCancel?: () => void;
    onEditComplete?: () => void;
    onEditInit?: () => void;
    sx?: SxProps<Theme>;
}

const KanbanCheckItemRoot = experimentalStyled('div')(
    ({theme}) => (
        {
            alignItems: 'flex-start',
            borderRadius: theme.shape.borderRadius,
            display: 'flex',
            padding: theme.spacing(1),
            '&:hover': {
                backgroundColor: theme.palette.background.default,
                '& button': {
                    visibility: 'visible'
                }
            }
        }
    )
);

const KanbanCheckItem: FC<KanbanCheckItemProps> = (props) => {
    const {
        cardId,
        checkItem,
        checklistId,
        editing,
        onEditCancel,
        onEditComplete,
        onEditInit,
        ...other
    } = props;
    const {deleteCheckItem, updateCheckItem} = useKanban(state => state);
    const {enqueueSnackbar} = useSnackbar();
    const [name, setName] = useState<string>(checkItem.name);

    const handleStateChange = async (event: ChangeEvent<HTMLInputElement>): Promise<void> => {
        try {
            const state = event.target.checked ? 'complete' : 'incomplete';

            await updateCheckItem(
                cardId,
                checklistId,
                checkItem.id,
                {state}
            );
            enqueueSnackbar('Check item updated', {
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

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setName(event.target.value);
    };

    const handleSave = async (): Promise<void> => {
        try {
            await updateCheckItem(
                cardId,
                checklistId,
                checkItem.id,
                {name}
            );
            enqueueSnackbar('Check item updated', {
                anchorOrigin: {
                    horizontal: 'right',
                    vertical: 'top'
                },
                variant: 'success'
            });

            if (onEditComplete) {
                onEditComplete();
            }
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

    const handleCancel = (): void => {
        setName(checkItem.name);

        if (onEditCancel) {
            onEditCancel();
        }
    };

    const handleDelete = async (): Promise<void> => {
        try {
            await deleteCheckItem(
                cardId,
                checklistId,
                checkItem.id
            );
            enqueueSnackbar('Check item deleted', {
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
        <KanbanCheckItemRoot {...other}>
            <Checkbox
                checked={checkItem.state === 'complete'}
                color="primary"
                onChange={handleStateChange}
                sx={{
                    ml: -1,
                    mr: 1
                }}
            />
            {
                editing
                    ? (
                        <Box sx={{flexGrow: 1}}>
                            <TextField
                                fullWidth
                                onChange={handleNameChange}
                                value={name}
                                variant="outlined"
                            />
                            <Box sx={{mt: 1}}>
                                <Button
                                    color="primary"
                                    onClick={handleSave}
                                    size="small"
                                    variant="contained"
                                >
                                    Save
                                </Button>
                                <Button
                                    color="primary"
                                    onClick={handleCancel}
                                    size="small"
                                    variant="text"
                                >
                                    Cancel
                                </Button>
                            </Box>
                        </Box>
                    )
                    : (
                        <Box
                            sx={{
                                alignItems: 'center',
                                display: 'flex',
                                flexGrow: 1
                            }}
                        >
                            <Typography
                                color="textPrimary"
                                onClick={onEditInit}
                                sx={{
                                    flexGrow: 1,
                                    cursor: 'pointer',
                                    minHeight: 32
                                }}
                                variant="body1"
                            >
                                {checkItem.name}
                            </Typography>
                            <IconButton
                                onClick={handleDelete}
                                sx={{visibility: 'hidden'}}
                            >
                                <TrashIcon fontSize="small"/>
                            </IconButton>
                        </Box>
                    )
            }
        </KanbanCheckItemRoot>
    );
};

KanbanCheckItem.propTypes = {
    cardId: PropTypes.string.isRequired,
    // @ts-ignore
    checkItem: PropTypes.object.isRequired,
    checklistId: PropTypes.string.isRequired,
    editing: PropTypes.bool,
    onEditCancel: PropTypes.func,
    onEditComplete: PropTypes.func,
    onEditInit: PropTypes.func,
    sx: PropTypes.object
};

KanbanCheckItem.defaultProps = {
    editing: false
};

export default KanbanCheckItem;
