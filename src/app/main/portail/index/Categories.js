import React from 'react';
import {
    ListItem, ListItemIcon, Icon, ListItemText, ListItemSecondaryAction, IconButton,
} from '@material-ui/core';

function Categories(props) {
    const [secondary, setSecondary] = React.useState(false);

    return (
        <ListItem>
            <ListItemIcon>
                <Icon>folder</Icon>
            </ListItemIcon>
            <ListItemText
                primary="Single-line item"
                secondary={secondary ? 'Secondary text' : null}
            />
            <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="Delete">
                    <Icon>chevron_right</Icon>
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
}

export default Categories;
