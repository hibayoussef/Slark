import { useState } from 'react';
import type { FC, ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import { experimentalStyled } from '@material-ui/core/styles';
import WorkspaceSideBarNav from "./WorkspaceSideBarNav";
import WorkspaceSidebarMobileIcon from "./WorkspaceSideBarMobileIcon";
interface DashboardLayoutProps {
    children?: ReactNode;
}

const DashboardLayoutRoot = experimentalStyled('div')(
    ({ theme }) => (
        {
            backgroundColor: theme.palette.background.default,
            display: 'flex',
            height: '100%',
            overflow: 'hidden',
            width: '100%'
        }
    )
);

const DashboardLayoutWrapper = experimentalStyled('div')(
    ({ theme }) => (
        {
            display: 'flex',
            flex: '1 1 auto',
            overflow: 'hidden',
            paddingTop: '64px',
            [theme.breakpoints.up('lg')]: {
                paddingLeft: '280px'
            }
        }
    )
);

const DashboardLayoutContainer = experimentalStyled('div')({
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden'
});

const DashboardLayoutContent = experimentalStyled('div')({
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto',
    position: 'relative',
    WebkitOverflowScrolling: 'touch'
});

const WorkspaceSidebarLayout: FC<DashboardLayoutProps> = () => {
    const [isSidebarMobileOpen, setIsSidebarMobileOpen] = useState<boolean>(false);

    return (
        <DashboardLayoutRoot>
            <WorkspaceSidebarMobileIcon
                onSidebarMobileOpen={(): void => setIsSidebarMobileOpen(true)}
            />
            <WorkspaceSideBarNav
                onMobileClose={(): void => setIsSidebarMobileOpen(false)}
                openMobile={isSidebarMobileOpen}
            />
            <DashboardLayoutWrapper>
                <DashboardLayoutContainer>
                    <DashboardLayoutContent>
                        <Outlet />
                    </DashboardLayoutContent>
                </DashboardLayoutContainer>
            </DashboardLayoutWrapper>
        </DashboardLayoutRoot>
    );
};

export default WorkspaceSidebarLayout;
