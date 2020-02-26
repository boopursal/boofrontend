import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { Card, Icon, CardContent, List, ListItem, ListItemText, Typography, Chip, IconButton, ListItemSecondaryAction } from '@material-ui/core';
import { FuseAnimateGroup } from '@fuse';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles(theme => ({
    layoutRoot: {},
    listRoot: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        overflow: 'auto',
        maxHeight: 300,
    },
    listRoot2: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        overflow: 'auto',
        maxHeight: 300,
        padding: 0,
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

    chip: {
        margin: theme.spacing(0),
        height: 27,
    },
    nested: {
        paddingLeft: theme.spacing(4),
        padding: 0,
    },
    nested2: {
        paddingLeft: theme.spacing(8),
        padding: 0,
    },

}));
function useQuery(location) {
    return new URLSearchParams(location.search);
}


function jsUcfirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
function SideBareSearch(props) {
    const classes = useStyles();
    const loadingSecteurs = useSelector(({ produitsApp }) => produitsApp.produits.loadingSecteurs);
    const secteurs = useSelector(({ produitsApp }) => produitsApp.produits.secteurs);
    const loadingActivites = useSelector(({ produitsApp }) => produitsApp.produits.loadingActivites);
    const activites = useSelector(({ produitsApp }) => produitsApp.produits.activites);
    const loadingCategories = useSelector(({ produitsApp }) => produitsApp.produits.loadingCategories);
    const categories = useSelector(({ produitsApp }) => produitsApp.produits.categories);
    const loadingPays = useSelector(({ produitsApp }) => produitsApp.produits.loadingPays);
    const payss = useSelector(({ produitsApp }) => produitsApp.produits.pays);

    const query = useQuery(props.location);
    const params = props.match.params;
    const { secteur, activite, categorie } = params;
    const pays = query.get("pays");

    function handleDeletePathSecteur() {
        props.history.replace({ pathname: '/vente-produits', search: pays ? 'pays=' + pays : '' })
        document.querySelector('.ps').scrollTop = 0;
    }
    function handleDeletePathActivite() {
        props.history.replace({ pathname: '/vente-produits/' + secteur, search: pays ? 'pays=' + pays : '' })
        document.querySelector('.ps').scrollTop = 0;
    }

    function handleDeleteQueryPays() {
        let secteurParm = '';
        let activiteParm = '';
        let categorieParm = '';
        if (secteur) {
            secteurParm = '/' + secteur;
        }
        if (activite) {
            activiteParm = '/' + activite;
        }
        if (categorie) {
            categorieParm = '/' + categorie;
        }
        const path = secteurParm + activiteParm + categorieParm;
        props.history.replace({ pathname: '/vente-produits' + path, search: '' })
        document.querySelector('.ps').scrollTop = 0;
    }

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
                            pays ?
                                <ListItem>
                                    <ListItemText
                                        primary={
                                            <Chip
                                                label={jsUcfirst(pays.replace('-', ' '))}
                                                onDelete={handleDeleteQueryPays}
                                                className={classes.chip}
                                                color="primary"
                                                variant="outlined"
                                            />}
                                    />
                                </ListItem> :
                                (
                                    loadingPays ? <LinearProgress color="secondary" /> :
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
                                                        onClick={event => {
                                                            const location = props.location;
                                                            query.set('pays', item.slug)
                                                            props.history.replace({ pathname: location.pathname, search: 'pays=' + query.get('pays') })
                                                            document.querySelector('.ps').scrollTop = 0;
                                                        }}>
                                                        <ListItemText
                                                            primary={item.name + ' (' + item.count + ')'}
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
                    <List dense={true} component="nav" className={classes.listRoot}>
                        {
                            secteur ?
                                <>
                                    <ListItem>
                                        <ListItemText
                                            primary={
                                                <Chip
                                                    label={jsUcfirst(secteur.replace('-', ' '))}
                                                    onDelete={handleDeletePathSecteur}
                                                    className={classes.chip}
                                                    color="primary"
                                                    variant="outlined"
                                                />}
                                        />

                                    </ListItem>
                                    <List component="div" className={classes.listRoot2}>
                                        {
                                            activite ?
                                                <>
                                                    <ListItem className={classes.nested}>
                                                        <ListItemText
                                                            primary={
                                                                <Chip
                                                                    label={jsUcfirst(activite.replace('-', ' '))}
                                                                    onDelete={handleDeletePathActivite}
                                                                    className={classes.chip}
                                                                    color="primary"
                                                                    variant="outlined"
                                                                />}
                                                        />
                                                    </ListItem>
                                                    <List component="div" className={classes.listRoot2}>
                                                        {
                                                            loadingCategories ?
                                                                <LinearProgress color="secondary" /> :
                                                                <FuseAnimateGroup
                                                                    enter={{
                                                                        animation: "transition.slideUpBigIn"
                                                                    }}
                                                                >
                                                                    {
                                                                        categories && categories.map((item, index) => (
                                                                            <ListItem
                                                                                key={index}
                                                                                className={classes.nested2}
                                                                                selected={item.slug === categorie}
                                                                                button={item.slug !== categorie}
                                                                                onClick={event => {
                                                                                    item.slug === categorie ? console.log('') : 
                                                                                   (props.history.replace({ pathname: '/vente-produits/' + secteur + '/' + activite + '/' + item.slug, search: pays ? 'pays=' + pays : '' }))
                                                                                   document.querySelector('.ps').scrollTop = 0
                                                                                }}>
                                                                                <ListItemText
                                                                                    primary={item.name + ' (' + item.count + ')'}
                                                                                />
                                                                            </ListItem>

                                                                        ))
                                                                    }
                                                                </FuseAnimateGroup>

                                                        }
                                                    </List>
                                                </> :
                                                loadingActivites ? <LinearProgress color="secondary" /> :
                                                    <FuseAnimateGroup
                                                        enter={{
                                                            animation: "transition.slideUpBigIn"
                                                        }}
                                                    >
                                                        {
                                                            activites && activites.map((item, index) => (
                                                                <ListItem
                                                                    key={index}
                                                                    className={classes.nested}
                                                                    button
                                                                    onClick={event => {
                                                                        props.history.replace({ pathname: '/vente-produits/' + secteur + '/' + item.slug, search: pays ? 'pays=' + pays : '' });
                                                                        document.querySelector('.ps').scrollTop = 0;
                                                                   
                                                                   }}>
                                                                    <ListItemText
                                                                        primary={item.name + ' (' + item.count + ')'}
                                                                    />
                                                                </ListItem>

                                                            ))
                                                        }
                                                    </FuseAnimateGroup>
                                        }

                                    </List>
                                </> :
                                (
                                    loadingSecteurs ?
                                        <LinearProgress color="secondary" /> :
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
                                                        onClick={event => {
                                                            props.history.replace({ pathname: '/vente-produits/' + secteur.slug, search: pays ? 'pays=' + pays : '' })
                                                        }}>
                                                        <ListItemText
                                                            primary={secteur.name + ' (' + secteur.count + ')'}
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