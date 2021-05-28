import type {FC, ReactNode} from 'react';
import PropTypes from 'prop-types';
import {matchPath} from 'react-router-dom';
import {List, ListSubheader} from '@material-ui/core';
import type {ListProps} from '@material-ui/core';
import WorkspaceNavItem from './WorkspaceNavItem';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },

        fontSize: {
            fontSize: 18
        },

        menuButton: {
            marginRight: theme.spacing(2),
            [theme.breakpoints.up('sm')]: {
                display: 'none',
            },
        },

        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },
    }),
);


interface Item {
    path?: string;
    info?: ReactNode;
    children?: Item[];
    title: string;
}

interface NavSectionProps extends ListProps {
    items: Item[];
    pathname: string;
    title: string;
}

const renderNavItems = ({
                            depth = 0,
                            items,
                            pathname
                        }: {
    items: Item[];
    pathname: string;
    depth?: number;
}): JSX.Element => (
    <List disablePadding>
        {items.reduce(
            // eslint-disable-next-line @typescript-eslint/no-use-before-define, no-use-before-define
            (acc, item) => reduceChildRoutes({
                acc,
                item,
                pathname,
                depth
            }),
            []
        )}
    </List>
);

const reduceChildRoutes = ({
                               acc,
                               pathname,
                               item,
                               depth
                           }: {
    acc: JSX.Element[];
    pathname: string;
    item: Item;
    depth: number;
}): Array<JSX.Element> => {

    const key = `${item.title}-${depth}`;
    const exactMatch = item.path ? !!matchPath({
        path: item.path,
        end: true
    }, pathname) : false;

    if (item.children) {
        const partialMatch = item.path ? !!matchPath({
            path: item.path,
            end: false
        }, pathname) : false;

        acc.push(
            <WorkspaceNavItem
                active={partialMatch}
                depth={depth}
                info={item.info}
                open={partialMatch}
                path={item.path}
                key={key}
                title={item.title}
            >
                {renderNavItems({
                    depth: depth + 1,
                    items: item.children,
                    pathname
                })}
            </WorkspaceNavItem>
        );
    } else {
        acc.push(
            <WorkspaceNavItem
                active={exactMatch}
                depth={depth}
                info={item.info}
                key={key}
                path={item.path}
                title={item.title}
            />
        );
    }

    return acc;
};

const WorkspaceNavSection: FC<NavSectionProps> = (props) => {


    const {
        items,
        pathname,
        title,
    } = props;

    return (
        <List
            subheader={(
                <ListSubheader
                    disableGutters
                    disableSticky
                    sx={{
                        color: 'text.primary',
                        fontSize: '0.75rem',
                        lineHeight: 2.5,
                        fontWeight: 700,
                        textTransform: 'uppercase'

                    }}
                    style={{color: '#d5d6d7'}}
                >
                    {title}
                </ListSubheader>
            )}
        >
            {renderNavItems({
                items,
                pathname
            })}
        </List>
    );
};

WorkspaceNavSection.propTypes = {
    items: PropTypes.array,
    pathname: PropTypes.string,
    title: PropTypes.string
};

export default WorkspaceNavSection;
