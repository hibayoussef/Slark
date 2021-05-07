import {useState} from 'react';
import type {FC, ChangeEvent, KeyboardEvent} from 'react';
import PropTypes from 'prop-types';
import {useSnackbar} from 'notistack';
import {Avatar, Box, TextField} from '@material-ui/core';
import {useAuthModule} from "../../authentication/zustand";
import {useKanban} from "../zustand";

interface KanbanCommentAddProps {
    cardId: string;
}

const KanbanCommentAdd: FC<KanbanCommentAddProps> = (props) => {
    const {cardId, ...other} = props;
    const addComment = useKanban(state => state.addComment);
    const user = useAuthModule(state => state.user);

    const {enqueueSnackbar} = useSnackbar();
    const [message, setMessage] = useState<string>('');

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setMessage(event.target.value);
    };

    const handleKeyUp = async (event: KeyboardEvent<HTMLInputElement>): Promise<void> => {
        try {
            if (event.code === 'Enter' && message) {
                await addComment(cardId, message);
                setMessage('');
                enqueueSnackbar('Comment added', {
                    anchorOrigin: {
                        horizontal: 'right',
                        vertical: 'top'
                    },
                    variant: 'success'
                });
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

    return (
        <Box
            sx={{
                alignItems: 'center',
                display: 'flex'
            }}
            {...other}
        >
            <Avatar
                src={user.avatar}
                sx={{mr: 2}}
            />
            <TextField
                fullWidth
                onChange={handleChange}
                onKeyUp={handleKeyUp}
                placeholder="Write a comment..."
                size="small"
                value={message}
                variant="outlined"
            />
        </Box>
    );
};

KanbanCommentAdd.propTypes = {
    cardId: PropTypes.string.isRequired
};

export default KanbanCommentAdd;
