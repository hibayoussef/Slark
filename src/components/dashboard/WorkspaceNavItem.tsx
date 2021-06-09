import { useState } from 'react';
import type { FC, ReactNode } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Box, Button, ListItem } from '@material-ui/core';
import type { ListItemProps } from '@material-ui/core';

interface WorkspaceNavItemProps extends ListItemProps {
    path?: string;
    title: string;
}

const WorkspaceNavItem: FC<WorkspaceNavItemProps> = (props) => {
    const {
        path,
        title,
    } = props;

    // Leaf
    return (
        <ListItem
            disableGutters
            sx={{
                display: 'flex',
                py: 0
            }}
        >
            <Button
                component={path && RouterLink}
                sx={{
                    justifyContent: 'flex-start',
                    textAlign: 'left',
                    pr: '15px',
                    py: '10px',
                    textTransform: 'none',
                    width: '100%',
                    color: '#828588',
                    fontWeight: 400,
                    fontSize:  '17px',
                    fontFamily:'Gotham Pro,Proxima Nova,arial,serif',
                    '& svg': {
                        color: 'primary.main'
                    }
                }}
                variant="text"
                to={path}
            >
                <Box sx={{ flexGrow: 1 }}>
                    {title}
                </Box>
            </Button>
        </ListItem>
    );
};

WorkspaceNavItem.propTypes = {
    path: PropTypes.string,
    title: PropTypes.string.isRequired
};

export default WorkspaceNavItem