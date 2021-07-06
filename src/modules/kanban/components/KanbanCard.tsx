import {forwardRef, useState} from 'react';
import PropTypes from 'prop-types';
import {
    Avatar,
    AvatarGroup,
    Box,
    Card,
    CardContent,
    CardMedia,
    Typography
} from '@material-ui/core';
import CheckIcon from '../../../icons/Check';
import ChatAltIcon from '../../../icons/ChatAlt';
import DocumentTextIcon from '../../../icons/DocumentText';
import EyeIcon from '../../../icons/Eye';
import type {
    Card as CardType,
    Column, ITask,
    Member
} from '../models/kanban';
import KanbanCardModal from './KanbanCardModal';
import {useKanban} from "../zustand";

interface KanbanCardProps {
    cardId: string;
    dragging: boolean;
    index?: number;
    column: Column;
    task: ITask;
    style?: Record<any, any>;
}

interface PopulatedCard extends CardType {
    members: Member[];
}

const cardSelector = (cards, members, cardId): PopulatedCard => {
    const card = cards.byId[cardId];
    return {
        ...card,
        members: [] // card.memberIds.map((memberId: string) => members.byId[memberId])
    };
};

const KanbanCard = forwardRef<HTMLDivElement, KanbanCardProps>((props, ref) => {
    const {
        cardId,
        dragging,
        column,
        task,
        ...other
    } = props;
    const {cards, members} = useKanban(state => state);
    const card = cardSelector(cards, members, cardId);
    const [open, setOpen] = useState<boolean>(false);

    const handleOpen = (): void => {
        setOpen(true);
    };

    const handleClose = (): void => {
        setOpen(false);
    };

    return (
        <Box
            ref={ref}
            sx={{
                outline: 'none',
                py: 1
            }}
            {...other}
        >
            <Card
                onClick={handleOpen}
                raised={dragging}
                sx={{
                    ...(
                        dragging && {
                            backgroundColor: 'background.paper'
                        }
                    ),
                    '&:hover': {
                        backgroundColor: 'background.default'
                    }
                }}
                variant={dragging ? 'elevation' : 'outlined'}
            >
                {card.cover && (
                    <CardMedia
                        image={card.cover}
                        sx={{height: 200}}
                    />
                )}
                <CardContent>
                    <Typography
                        color="textPrimary"
                        variant="subtitle2"
                    >
                        {task.name}
                    </Typography>
                    <Box
                        sx={{
                            alignItems: 'center',
                            display: 'flex',
                            mt: 2,
                            '& svg:not(:first-of-type)': {
                                ml: 2
                            }
                        }}
                    >
                        {/*{task.isSubscribed && <EyeIcon fontSize="small"/>}*/}
                        {task.assets && task.assets.length > 0 && <DocumentTextIcon fontSize="small"/>}
                        {task._subTasks && task._subTasks.length > 0 && <CheckIcon fontSize="small"/>}
                        {task.comments && task.comments.length > 0 && <ChatAltIcon fontSize="small"/>}
                        <Box sx={{flexGrow: 1}}/>
                        {task._assignedUsers && task._assignedUsers.length > 0 && (
                            <AvatarGroup max={5}>
                                {task._assignedUsers.map((user) => (
                                    <Avatar
                                        key={user._id}
                                        src={user?.avatar?.url || ''}
                                    />
                                ))}
                            </AvatarGroup>
                        )}
                    </Box>
                </CardContent>
            </Card>
            <KanbanCardModal
                card={card}
                column={column}
                onClose={handleClose}
                open={open}
                task={task}
            />
        </Box>
    );
});

KanbanCard.propTypes = {
    cardId: PropTypes.string.isRequired,
    dragging: PropTypes.bool,
    index: PropTypes.number,
    // @ts-ignore
    column: PropTypes.object.isRequired,
    style: PropTypes.object
};

KanbanCard.defaultProps = {
    dragging: false
};

export default KanbanCard;
