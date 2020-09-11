import React, { useRef, useState } from 'react';
import { Tab, Tabs, Typography } from '@material-ui/core';
import { FusePageSimple } from '@fuse';
import { makeStyles } from '@material-ui/styles';
import { Helmet } from "react-helmet";
import withReducer from 'app/store/withReducer';
import reducer from './store/reducers';
import MonAbonnement from './tabs/MonAbonnement';
import Packs from './tabs/Packs';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
    content: {
        '& canvas': {
            maxHeight: '100%'
        }
    }
}));

function BillingApp(props) {

    const classes = useStyles(props);
    const pageLayout = useRef(null);
    const [tabValue, setTabValue] = useState(0);
    const user = useSelector(({ auth }) => auth.user);

    function handleChangeTab(event, tabValue) {
        setTabValue(tabValue);
    }

    return (
        <>
            <Helmet>
                <title>Facturations | Les Achats Industriels</title>
                <meta name="robots" content="noindex, nofollow" />
                <meta name="googlebot" content="noindex" />
            </Helmet>
            <FusePageSimple
                classes={{
                    toolbar: "min-h-48 h-48",
                    rightSidebar: "w-288",
                    content: classes.content,
                }}
                header={
                    <div className="flex flex-col justify-between flex-1 px-24 pt-24">
                        <div className="flex justify-between">
                            <Typography className="py-0 sm:py-24" variant="h4">Facturations</Typography>

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
                        <Tab className="text-14 font-600 normal-case" label="Mon abonnement" />
                        <Tab className="text-14 font-600 normal-case" label="Mon historique de facturation" />
                        <Tab className="text-14 font-600 normal-case" label="Les Packs d'abonnements" />
                    </Tabs>
                }
                content={
                    <div className="p-12">
                        {tabValue === 0 && (
                            <MonAbonnement />
                        )}
                        {tabValue === 2 && (
                            <Packs currency={user.data ? user.data.currency : 'MAD'} />
                        )}

                    </div>
                }
                ref={pageLayout}
            />
        </>
    );
}

export default withReducer('billingApp', reducer)(BillingApp);

