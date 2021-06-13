import type { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AppBar, Box, Hidden, IconButton, Toolbar } from '@material-ui/core';
import { experimentalStyled } from '@material-ui/core/styles';
import type { AppBarProps } from '@material-ui/core';
import MenuIcon from '../../icons/Menu';
import Logo from '../Logo';

interface WorkspaceSidebarMobileIconProps extends AppBarProps {
    onSidebarMobileOpen?: () => void;
}

const WorkspaceSidebarMobileIconRoot = experimentalStyled(AppBar)(
    ({ theme }) => (
        {
            ...(
                theme.palette.mode === 'light' && {
                    backgroundColor: theme.palette.primary.main,
                    boxShadow: 'none',
                    color: theme.palette.primary.contrastText
                }
            ),
            ...(
                theme.palette.mode === 'dark' && {
                    backgroundColor: theme.palette.background.paper,
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    boxShadow: 'none'
                }
            ),
            zIndex: theme.zIndex.drawer + 100
        }
    )
);

const WorkspaceSidebarMobileIcon: FC<WorkspaceSidebarMobileIconProps> = (props) => {
    const { onSidebarMobileOpen, ...other } = props;

    return (
        <WorkspaceSidebarMobileIconRoot {...other}>
            {/*<Toolbar sx={{ minHeight: 64 }}>*/}
                <Hidden lgUp >
                    <IconButton
                        // sx={{ minHeight: 64 }}
                        style={{ marginRight: '55rem'}}
                        color="inherit"
                        onClick={onSidebarMobileOpen}
                    >
                        <MenuIcon fontSize="small" />
                    </IconButton>
                </Hidden>

            {/*</Toolbar>*/}
        </WorkspaceSidebarMobileIconRoot>
    );
};

WorkspaceSidebarMobileIcon.propTypes = {
    onSidebarMobileOpen: PropTypes.func
};

export default WorkspaceSidebarMobileIcon;
