import React, {useState} from 'react';
import {Icon, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, MenuList} from '@material-ui/core';
import * as Actions from './store/actions';
import {useDispatch, useSelector} from 'react-redux';

function SousSecteursMultiSelectMenu(props)
{
    const dispatch = useDispatch();
    const selectedSousSecteursIds = useSelector(({secteursApp}) => secteursApp.secteurs.selectedSousSecteursIds);

    const [anchorEl, setAnchorEl] = useState(null);

    function openSelectedSousSecteursMenu(event)
    {
        setAnchorEl(event.currentTarget);
    }

    function closeSelectedSousSecteursMenu()
    {
        setAnchorEl(null);
    }

    return (
        <React.Fragment>
            <IconButton
                className="p-0"
                aria-owns={anchorEl ? 'selectedSousSecteursMenu' : null}
                aria-haspopup="true"
                onClick={openSelectedSousSecteursMenu}
            >
                <Icon>more_horiz</Icon>
            </IconButton>
            <Menu
                id="selectedSousSecteursMenu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={closeSelectedSousSecteursMenu}
            >
                <MenuList>
                    <MenuItem
                        onClick={() => {
                            dispatch(Actions.removeSousSecteur(selectedSousSecteursIds));
                            closeSelectedSousSecteursMenu();
                        }}
                    >
                        <ListItemIcon className="min-w-40">
                            <Icon>delete</Icon>
                        </ListItemIcon>
                        <ListItemText primary="Supprimer"/>
                    </MenuItem>
                    
                   
                </MenuList>
            </Menu>
        </React.Fragment>
    );
}

export default SousSecteursMultiSelectMenu;

