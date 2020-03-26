import React from 'react';
import { NavLinkAdapter} from '@fuse';
import {
    ListItem, ListItemIcon, Icon, ListItemText, ListItemSecondaryAction, IconButton,
} from '@material-ui/core';

function Categories(props) {
    const [secondary, setSecondary] = React.useState(false);

    return (
        <ListItem
            dense={true}
            component={NavLinkAdapter}
            to={'/apps/todo/'}
            button
        >
            <ListItemIcon>
                <Icon>folder</Icon>
            </ListItemIcon>
            <ListItemText
                primary="Single-line item"
                secondary={secondary ? 'Secondary text' : null}
            />
            <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="more">
                    <Icon>chevron_right</Icon>
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
}

export default Categories;
