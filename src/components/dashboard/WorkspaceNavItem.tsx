import { useState } from 'react';
import type { FC, ReactNode } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Box, Button, ListItem } from '@material-ui/core';
import type { ListItemProps } from '@material-ui/core';

interface WorkspaceNavItemProps extends ListItemProps {
    active?: boolean;
    depth: number;
    info?: ReactNode;
    open?: boolean;
    path?: string;
    title: string;
}

const WorkspaceNavItem: FC<WorkspaceNavItemProps> = (props) => {
    const {
        active,
        depth,
        info,
        open: openProp,
        path,
        title,
    } = props;
    const [open, setOpen] = useState<boolean>(openProp);

    const handleToggle = (): void => {
        setOpen((prevOpen) => !prevOpen);
    };

    let paddingLeft = 16;

    if (depth > 0) {
        paddingLeft = 32 + 8 * depth;
    }


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
                    color: 'text.secondary',
                    fontWeight: 'fontWeightMedium',
                    justifyContent: 'flex-start',
                    textAlign: 'left',
                    pl: `${paddingLeft}px`,
                    pr: '8px',
                    py: '12px',
                    textTransform: 'none',
                    width: '100%',
                    ...(
                        active && {
                            color: 'primary.main',
                            fontWeight: 'fontWeightBold',
                            '& svg': {
                                color: 'primary.main'
                            }
                        }
                    )
                }}
                variant="text"
                to={path}
            >
                <Box sx={{ flexGrow: 1 }}>
                    {title}
                </Box>
                {info}
            </Button>
        </ListItem>
    );
};

WorkspaceNavItem.propTypes = {
    active: PropTypes.bool,
    depth: PropTypes.number.isRequired,
    info: PropTypes.node,
    open: PropTypes.bool,
    path: PropTypes.string,
    title: PropTypes.string.isRequired
};

WorkspaceNavItem.defaultProps = {
    active: false,
    open: false
};

export default WorkspaceNavItem