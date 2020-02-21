import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { Card, Icon, CardContent, List, ListItem, ListItemText, Typography } from '@material-ui/core';
import { FuseAnimateGroup } from '@fuse';

const useStyles = makeStyles(theme => ({
    layoutRoot: {},
    listRoot: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        overflow: 'auto',
        maxHeight: 300,
    },
    link: {
        display: 'flex',
    },
    icon: {
        marginRight: theme.spacing(0.5),
        width: 20,
        height: 20,
    },
    filterIcon: {
        color: 'white',
        fontSize: 40,
        width: 40,
        height: 40,
        marginRight: 8,
        pointerEvents: 'none'
    },

}));
function useQuery(location) {
    return new URLSearchParams(location.search);
}

function SideBareSearch(props) {
    const classes = useStyles();
    const secteurs = useSelector(({ produitsApp }) => produitsApp.produits.secteurs);
    const payss = useSelector(({ produitsApp }) => produitsApp.produits.pays);

    const query = useQuery(props.location);
    const params = props.match.params;
    const { secteur, activite, categorie } = params;
    const pays = query.get("pays");

    return (
        <>
            <Card className={clsx("", classes.root)} >
                <div className="p-20 bg-gray-400 uppercase flex items-center font-bold text-16 ">
                    <Icon className={classes.filterIcon}>settings_input_component</Icon>

                    <span>  AFFINER VOTRE RECHERCHE</span>
                </div>
                <CardContent>
                    <Typography color="textPrimary" className="pl-16 text-18 uppercase w-full " >
                        par <span className='font-extrabold'>pays</span>
                    </Typography>
                    <List dense={true} className={classes.listRoot}>
                    {
                            pays ? '' :
                                (
                                    <FuseAnimateGroup
                                        enter={{
                                            animation: "transition.slideUpBigIn"
                                        }}
                                    >
                                        {
                                            payss && payss.map((item, index) => (
                                                <ListItem
                                                    key={index}
                                                    button
                                                    onClick={event => console.log(event)}>
                                                    <ListItemText
                                                        primary={item.name + ' ('+item.count +')'}
                                                    />
                                                </ListItem>
                                            ))
                                        }
                                    </FuseAnimateGroup>
                                )
                        }



                    </List>
                </CardContent>

            </Card>

            <Card className='mt-16'>

                <CardContent>
                    <Typography color="textPrimary" className="pl-16 text-18 uppercase w-full " >
                        par <span className='font-extrabold'>catégorie</span>
                    </Typography>
                    <List dense={true} className={classes.listRoot}>
                        {
                            secteur ? '' :
                                (
                                    <FuseAnimateGroup
                                        enter={{
                                            animation: "transition.slideUpBigIn"
                                        }}
                                    >
                                        {
                                            secteurs && secteurs.map((secteur, index) => (
                                                <ListItem
                                                    key={index}
                                                    button
                                                    onClick={event => console.log(event)}>
                                                    <ListItemText
                                                        primary={secteur.name+ ' ('+secteur.count +')'}
                                                    />
                                                </ListItem>
                                            ))
                                        }
                                    </FuseAnimateGroup>
                                )
                        }


                    </List>
                </CardContent>

            </Card>

        </>

    )
}

export default SideBareSearch;