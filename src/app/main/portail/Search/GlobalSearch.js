import React, { useEffect, useRef } from 'react';
import { FuseAnimate, FuseAnimateGroup, FuseUtils } from '@fuse';
import { ClickAwayListener, Paper, Icon, Input, Grid, List, ListItem, ListItemAvatar, Avatar, ListItemText, Divider, Typography, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import reducer from './store/reducers';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from './store/actions';
import withReducer from 'app/store/withReducer';
import _ from '@lodash';
import Highlighter from "react-highlight-words";

const useStyles = makeStyles(theme => ({

    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        overflow: 'auto',
        height: 200,
        border: '1px solid #ccc',
        padding:0
    },
    cat: {
        width: '100%',
        backgroundColor: '#edf2f7',
        height: 200,
        paddingTop: 20,
        fontWeight: 'bold',
        borderTop: '1px solid #ccc',
        borderLeft: '1px solid #ccc',
        borderBottom: '1px solid #ccc'
    },
    inline: {
        display: 'inline',
    },
}));

function GlobalSearch(props) {

    const dispatch = useDispatch();
    const classes = useStyles(props);
    const globalSearch = useSelector(({ globalSearchApp }) => globalSearchApp.globalSearch);
    const ResultsNode = useRef(null);
    useEffect(() => {
        if (globalSearch.searchText.length > 1) {
            dispatch(Actions.showSearch());
            dispatch(Actions.getResults(globalSearch.searchText));
        }
        else {
            dispatch(Actions.hideSearch());
        }

    }, [globalSearch.searchText, dispatch]);

    function handleClickAway(event) {
        return (
            !ResultsNode.current ||
            !ResultsNode.current.contains(event.target)
        ) && dispatch(Actions.hideSearch());
    }
    
    return (
        <div ref={ResultsNode} className="mx-auto w-full max-w-640 ">
            <FuseAnimate animation="transition.slideUpIn" duration={400} delay={100}>
                <Paper className="flex p-4 items-center w-full" elevation={1}>

                    <Icon className="mr-8" color="action">search</Icon>

                    <Input
                        placeholder="Rechercher un produit, une activité, un fournisseur"
                        className="flex flex-1 h-48"
                        disableUnderline
                        fullWidth
                        onChange={(event) => { dispatch(Actions.setGlobalSearchText(event)) }}
                        autoFocus
                        value={globalSearch.searchText}
                        inputProps={{
                            'aria-label': 'Search'
                        }}
                    />
                </Paper>
            </FuseAnimate>
            {globalSearch.opened && (
                <ClickAwayListener onClickAway={handleClickAway}>
                    <FuseAnimate animation="transition.slideUpIn" duration={400} delay={100}>
                        <div className="mx-auto w-full  z-999">
                            <Paper className="absolute shadow w-full z-9999" elevation={1}>
                                {
                                    !globalSearch.loading
                                        ?
                                        (
                                            globalSearch.produits.length === 0 && globalSearch.fournisseurs.length === 0 && globalSearch.activites.length === 0 ? (
                                                <div className="p-10 font-bold">
                                                    No resultats found
                                                </div>
                                            ) :
                                                <>
                                                    {
                                                        globalSearch.produits.length > 0 ?
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={2} style={{
                                                                    paddingRight: '0',
                                                                    paddingBottom: '0',
                                                                }}>
                                                                    <div className={classes.cat}>
                                                                        Produits
                                                            </div>
                                                                </Grid>
                                                                <Grid item xs={10} style={{
                                                                    paddingLeft: '0',
                                                                    paddingBottom: '0',
                                                                }}>
                                                                    <List className={classes.root} dense={true}>
                                                                        <FuseAnimateGroup
                                                                            enter={{
                                                                                animation: "transition.slideUpBigIn"
                                                                            }}
                                                                        >
                                                                            {
                                                                                globalSearch.produits.map((produit, index) => (
                                                                                    
                                                                                    <React.Fragment key={index}>
                                                                                    
                                                                                        <ListItem
                                                                                         onClick={(ev) => {
                                                                                            ev.preventDefault();
                                                                                            // dispatch(Actions.openEditTodoDialog(props.todo));
                                                                                        }}
                                                                                        dense={true}
                                                                                        button alignItems="flex-start">
                                                                                            <ListItemAvatar>
                                                                                                {
                                                                                                    produit.featuredImageId ?
                                                                                                        <Avatar alt={produit.titre} src={FuseUtils.getUrl() + produit.featuredImageId.url} />
                                                                                                        :
                                                                                                        <Avatar alt={produit.titre} src="assets/images/ecommerce/product-placeholder.jpg" />
                                                                                                }
                                                                                            </ListItemAvatar>
                                                                                            <ListItemText primary={
                                                                                                <Highlighter
                                                                                                highlightClassName="YourHighlightClass"
                                                                                                searchWords={[globalSearch.searchText]}
                                                                                                autoEscape={true}
                                                                                                textToHighlight={produit.titre}
                                                                                              />} 
                                                                                              secondary={
                                                                                                _.capitalize(_.truncate(produit.description, {
                                                                                                    'length': 50
                                                                                                }))
                                                                                            } />
                                                                                            <ListItemSecondaryAction>
                                                                                                
                                                                                                    {
                                                                                                        produit.pu
                                                                                                            ? 
                                                                                                           <span className="text-green">{ produit.pu + ' ' + (produit.currency?produit.currency.name:'') + ' HT' }</span>
                                                                                                            : ''
                                                                                                            }
                                                                                               
                                                                                            </ListItemSecondaryAction>
                                                                                        </ListItem>
                                                                                        <Divider variant="inset" component="li" />
                                                                                    </React.Fragment>
                                                                                ))
                                                                            }

                                                                        </FuseAnimateGroup>
                                                                    </List>
                                                                </Grid>

                                                            </Grid>
                                                            :
                                                            ''
                                                    }

                                                    <Grid container spacing={2}>
                                                        <Grid item xs={2} style={{
                                                            paddingRight: '0',
                                                            paddingBottom: '0',
                                                        }}>
                                                            <div className={classes.cat} style={{
                                                                borderTop: '0',

                                                            }}>
                                                                Catégories
                                                </div>
                                                        </Grid>
                                                        <Grid item xs={10} style={{
                                                            paddingLeft: '0',
                                                            paddingBottom: '0',
                                                        }}>
                                                            <List className={classes.root} style={{
                                                                borderTop: '0',

                                                            }} dense={true}>
                                                                <ListItem>
                                                                    <ListItemText
                                                                        primary="Single-line item"
                                                                    />
                                                                </ListItem>
                                                                <ListItem>
                                                                    <ListItemText
                                                                        primary="Single-line item"
                                                                    />
                                                                </ListItem>
                                                                <ListItem>
                                                                    <ListItemText
                                                                        primary="Single-line item"
                                                                    />
                                                                </ListItem>
                                                                <ListItem>
                                                                    <ListItemText
                                                                        primary="Single-line item"
                                                                    />
                                                                </ListItem>
                                                                <ListItem>
                                                                    <ListItemText
                                                                        primary="Single-line item"
                                                                    />
                                                                </ListItem>
                                                            </List>
                                                        </Grid>

                                                    </Grid>
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={2} style={{
                                                            paddingRight: '0',
                                                            paddingBottom: '0',
                                                        }}>
                                                            <div className={classes.cat} style={{
                                                                borderTop: '0',

                                                            }}>
                                                                Fournisseurs
                                                </div>
                                                        </Grid>
                                                        <Grid item xs={10} style={{
                                                            paddingLeft: '0',
                                                            paddingBottom: '0',
                                                        }}>
                                                            <List className={classes.root} style={{
                                                                borderTop: '0',

                                                            }} dense={true}>
                                                                <ListItem>
                                                                    <ListItemText
                                                                        primary="Single-line item"
                                                                    />
                                                                </ListItem>
                                                                <ListItem>
                                                                    <ListItemText
                                                                        primary="Single-line item"
                                                                    />
                                                                </ListItem>
                                                                <ListItem>
                                                                    <ListItemText
                                                                        primary="Single-line item"
                                                                    />
                                                                </ListItem>
                                                                <ListItem>
                                                                    <ListItemText
                                                                        primary="Single-line item"
                                                                    />
                                                                </ListItem>
                                                                <ListItem>
                                                                    <ListItemText
                                                                        primary="Single-line item"
                                                                    />
                                                                </ListItem>
                                                            </List>
                                                        </Grid>

                                                    </Grid>
                                                </>
                                        )
                                        :
                                        'Loading ...'

                                }


                            </Paper>
                        </div>
                    </FuseAnimate>
                </ClickAwayListener>)
            }
        </div>
    )


}

export default withReducer('globalSearchApp', reducer)(GlobalSearch);

