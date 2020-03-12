import React from 'react';
import { Grid, Card, CircularProgress, CardContent, Typography, Icon, Avatar, Button, Chip, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { FuseAnimate, FuseUtils } from '@fuse';
import { useDispatch, useSelector } from 'react-redux';
import ContentLoader from "react-content-loader"
import * as Actions from '../store/actions';
import { Helmet } from "react-helmet";
import moment from 'moment';
import ReactHtmlParser from 'react-html-parser';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const useStyles = makeStyles(theme => ({
    root: {
        minWidth: 275,
        borderTop: '2px solid ' + theme.palette.secondary.main

    },
    progress: {
        margin: theme.spacing(2),
    },
    title: {
        fontSize: 30,
        textTransform: 'capitalize'
    },
    chip: {
        padding: 0,
        background: '#ef5350',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '11px',
        height: 24


    },
    chip2: {
        padding: 0,
        background: '#4caf50',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '11px',
        height: 24
    },

}));

function NewDetail(props) {
    const dispatch = useDispatch();
    const classes = useStyles();
    const actualite = useSelector(({ newsApp }) => newsApp.actualite);

    /*
        if ( !New.data )
        {
            return props.history.push('/')
        }
        if ( New.data.length === 0 && !New.loading)
        {
            return (
                <div className="flex flex-1 items-center justify-center h-full">
                    <Typography color="textSecondary" variant="h5">
                        Il n'y a pas de Villes!
                    </Typography>
                </div>
            );
        }
    */



    return (
        <>
            {
                actualite.data &&
                <Helmet>
                    <title>{actualite.data.titre}</title>
                    <meta name="description" content='' />
                    <meta property="og:title" content={actualite.data.titre} />
                    <meta property="og:description" content='' />
                </Helmet>
            }

            <Grid container spacing={2} className="max-w-2xl mx-auto py-48 sm:px-16 items-start">

                {
                    actualite.loading ?
                        <Grid item xs={12} sm={12}>
                            <ContentLoader
                                speed={2}
                                width={480}
                                height={400}
                                viewBox="0 0 480 400"
                            >
                                <rect x="5" y="5" rx="3" ry="3" width="121" height="13" />
                                <rect x="219" y="7" rx="3" ry="3" width="85" height="8" />
                                <rect x="6" y="27" rx="3" ry="3" width="297" height="160" />
                                <rect x="92" y="199" rx="0" ry="0" width="22" height="19" />
                                <rect x="122" y="199" rx="0" ry="0" width="22" height="19" />
                                <rect x="153" y="199" rx="0" ry="0" width="22" height="19" />
                                <rect x="181" y="199" rx="0" ry="0" width="22" height="19" />
                                <rect x="4" y="228" rx="3" ry="3" width="299" height="18" />
                                <rect x="3" y="255" rx="3" ry="3" width="299" height="82" />
                                <rect x="354" y="4" rx="3" ry="3" width="121" height="20" />
                                <circle cx="373" cy="51" r="20" />
                                <rect x="398" y="35" rx="3" ry="3" width="69" height="13" />
                                <rect x="399" y="57" rx="3" ry="3" width="69" height="7" />
                                <rect x="362" y="79" rx="3" ry="3" width="102" height="23" />
                                <rect x="362" y="109" rx="3" ry="3" width="102" height="23" />
                            </ContentLoader>
                        </Grid>
                        :
                        (
                            actualite.data &&
                            (
                                <>
                                    <Grid item xs={12}  >
                                        <Card className={classes.root}>

                                            <CardContent>
                                                <div className="flex justify-between items-center">
                                                    <div>
                                                        <Typography className={classes.title} component="h1" color="primary">
                                                            {actualite.data.titre}
                                                        </Typography>
                                                        <Typography color="textSecondary" >
                                                            Publiée le {moment(actualite.data.created).format("DD-MM-YYYY à HH:mm")}
                                                        </Typography>
                                                    </div>

                                                </div>


                                               
                                                <CKEditor
                                                    editor={ClassicEditor}
                                                    data={actualite.data.description}
                                                    config={{
                                                        language: 'fr',
                                                        toolbar: [  ],
                                                      
                                                    }}
                                                    onInit={editor => {
                                                        // You can store the "editor" and use when it is needed.
                                                        console.log('Editor is ready to use!', editor);
                                                    }}
                                                    disabled ={true}
                                                    className="border-0"
                                                />

                                            </CardContent>

                                        </Card>
                                    </Grid>
                                </>
                            )
                        )
                }


            </Grid>
        </>
    );
}

export default React.memo(NewDetail);
