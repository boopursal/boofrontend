import React from 'react';
import { Grid, Card, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import ContentLoader from "react-content-loader"
import { Helmet } from "react-helmet";
import moment from 'moment';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { InlineShareButtons } from 'sharethis-reactjs';
import _ from '@lodash';
import { FuseUtils } from '@fuse';

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
                    <title>{_.truncate(actualite.data.titre, { 'length': 70, 'separator': ' ' })}</title>
                    <meta name="description" content={_.truncate(actualite.data.description, { 'length': 160, 'separator': ' ' })} />
                    <meta property="og:title" content={_.truncate(actualite.data.titre, { 'length': 70, 'separator': ' ' })} />
                    <meta property="og:description" content={_.truncate(actualite.data.description, { 'length': 160, 'separator': ' ' })} />
                    <meta property="twitter:title" content={_.truncate(actualite.data.titre, { 'length': 70, 'separator': ' ' })} />
                    <meta property="twitter:description" content={_.truncate(actualite.data.description, { 'length': 160, 'separator': ' ' })} />
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
                                                    <div className="flex justify-end items-center">
                                                        <div className="mr-8 font-bold">Partager sur :</div>
                                                        <div >
                                                            <InlineShareButtons
                                                                config={{
                                                                    alignment: 'center',  // alignment of buttons (left, center, right)
                                                                    color: 'social',      // set the color of buttons (social, white)
                                                                    enabled: true,        // show/hide buttons (true, false)
                                                                    font_size: 16,        // font size for the buttons
                                                                    labels: 'null',        // button labels (cta, counts, null)
                                                                    language: 'fr',       // which language to use (see LANGUAGES)
                                                                    networks: [           // which networks to include (see SHARING NETWORKS)
                                                                        'linkedin',
                                                                        'facebook',
                                                                        'twitter',
                                                                        'email',
                                                                        'messenger',
                                                                        'whatsapp'
                                                                    ],
                                                                    padding: 8,          // padding within buttons (INTEGER)
                                                                    radius: 4,            // the corner radius on each button (INTEGER)
                                                                    show_total: false,
                                                                    size: 30,             // the size of each button (INTEGER)

                                                                    // OPTIONAL PARAMETERS
                                                                    //url: 'https://www.sharethis.com', // (defaults to current url)
                                                                    image: actualite.data.image &&
                                                                        FuseUtils.getUrl() + actualite.data.image.url,  // (defaults to og:image or twitter:image)
                                                                    //description: 'custom text',       // (defaults to og:description or twitter:description)
                                                                    title: actualite.data.titre,            // (defaults to og:title or twitter:title)
                                                                    //message: 'custom email text',     // (only for email sharing)
                                                                    //subject: 'custom email subject',  // (only for email sharing)
                                                                    //username: 'custom twitter handle' // (only for twitter sharing)
                                                                }}
                                                            />
                                                        </div>
                                                    </div>



                                                </div>



                                                <CKEditor
                                                    editor={ClassicEditor}
                                                    data={actualite.data.description}
                                                    config={{
                                                        language: 'fr',
                                                        toolbar: [],

                                                    }}
                                                    onInit={editor => {
                                                        // You can store the "editor" and use when it is needed.
                                                        console.log('Editor is ready to use!', editor);
                                                    }}
                                                    disabled={true}
                                                    className="border-0"
                                                />

                                                <div className="mt-16">
                                                    Source : <a href={actualite.data.source}>{actualite.data.source}</a>
                                                </div>

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
