import React, { useRef, useState } from 'react';
import { Tab, Tabs, Typography } from '@material-ui/core';
import { FusePageSimple } from '@fuse';
import Widget7 from '../dashboard/widgets/Widget7';
import Widget8 from '../dashboard/widgets/Widget8';
import Widget9 from '../dashboard/widgets/Widget9';
import { makeStyles } from '@material-ui/styles';
import { Helmet } from "react-helmet";
import withReducer from 'app/store/withReducer';
import reducer from '../dashboard/store/reducers';


const useStyles = makeStyles(theme => ({
    content: {
        '& canvas': {
            maxHeight: '100%'
        }
    },
    selectedProject: {
        background: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        borderRadius: '8px 0 0 0'
    },
    projectMenuButton: {
        background: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        borderRadius: '0 8px 0 0',
        marginLeft: 1
    },
}));

function SuiviPersonnel(props) {
    const classes = useStyles(props);
    const pageLayout = useRef(null);
    const [tabValue, setTabValue] = useState(0);
    function handleChangeTab(event, tabValue) {
        setTabValue(tabValue);
    }

    return (
        <>
            <Helmet>
                <title>Suivi des ventes de vos Agences / Services | Les Achats Industriels</title>
                <meta name="robots" content="noindex, nofollow" />
                <meta name="googlebot" content="noindex" />
            </Helmet>
            <FusePageSimple
                classes={{
                    header: "min-h-160 h-160",
                    toolbar: "min-h-48 h-48",
                    rightSidebar: "w-288",
                    content: classes.content,
                }}
                header={
                    <div className="flex flex-col justify-between flex-1 px-24 pt-24">
                        <div className="flex justify-between">
                            <Typography className="py-0 sm:py-24" variant="h4">Suivi des ventes de vos Agences / Services</Typography>

                        </div>
                    </div>
                }
                contentToolbar={
                    <Tabs
                        value={tabValue}
                        onChange={handleChangeTab}
                        indicatorColor="secondary"
                        textColor="secondary"
                        variant="scrollable"
                        scrollButtons="off"
                        className="w-full border-b-1 px-24"
                    >
                        <Tab className="text-14 font-600 normal-case" label="Agence / Service" />
                        <Tab className="text-14 font-600 normal-case" label="Résumé du budget" />
                    </Tabs>
                }
                content={
                    <div className="p-12">
                        {tabValue === 0 && (

                            <Widget9 />
                        )}
                        {tabValue === 1 && (

                            <div className="flex flex-wrap">
                                <div className="widget w-full sm:w-1/3 p-16">
                                    <Widget7 />
                                </div>
                                <div className="widget w-full sm:w-2/3 p-16">
                                    <Widget8 />
                                </div>
                            </div>

                        )}

                    </div>
                }
                ref={pageLayout}
            />
        </>
    );
}

export default withReducer('dashboardApp', reducer)(SuiviPersonnel);

