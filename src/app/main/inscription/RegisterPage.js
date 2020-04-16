import React, { useState } from 'react';
import { Tabs, Card, CardContent, Typography, Tab } from '@material-ui/core';
import { darken } from '@material-ui/core/styles/colorManipulator';
import { makeStyles } from '@material-ui/styles';
import { FuseAnimate } from '@fuse';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import FournisseurTab from './tabs/FournisseurTab';
import AcheteurTab from './tabs/AcheteurTab';
import { withRouter } from 'react-router-dom';
import { Helmet } from "react-helmet";

const useStyles = makeStyles(theme => ({
    root: {
        background: 'radial-gradient(' + darken(theme.palette.primary.dark, 0.5) + ' 0%, ' + theme.palette.primary.dark + ' 80%)',
        color: theme.palette.primary.contrastText
    }
}));


function RegisterPage(props) {

    const classes = useStyles();
    const [selectedTab, setSelectedTab] = useState(0);

    function handleTabChange(event, value) {
        setSelectedTab(value);
    }

    return (
        <div className={clsx(classes.root, "flex flex-col flex-auto flex-shrink-0 items-center justify-center p-32")}>
            <Helmet>
                <title>Inscription | Les Achats Industriels</title>
                <meta name="description" content="inscription sur notre place de marché B to B, b2b est gratuite pour les Achteurs ainsi que pour les Fournisseurs" />
            </Helmet>
            <div className="flex flex-col items-center justify-center w-full">

                <FuseAnimate animation="transition.expandIn">

                    <Card className=" min-w-450 max-w-450">

                        <CardContent className="flex flex-col items-center justify-center p-32">

                            <img className="w-128 m-20" src="assets/images/logos/icon.png" alt="logo" />

                            <Typography variant="h6" className="mt-16 mb-32">CRÉER UN COMPTE</Typography>




                            <Tabs
                                value={selectedTab}
                                onChange={handleTabChange}
                                variant="fullWidth"
                                className="mb-32"
                            >
                                <Tab
                                    icon={<img className="h-40 " src="assets/images/logos/manufacture.png" alt="Fournisseur" />}
                                    className="min-w-0"
                                    label="Fournisseur"
                                />
                                <Tab
                                    icon={<img className="h-40" src="assets/images/logos/customer-behavior.png" alt="Acheteur" />}
                                    className="min-w-0"
                                    label="Acheteur"
                                />

                            </Tabs>

                            {selectedTab === 0 && <FournisseurTab {...props} />}
                            {selectedTab === 1 && <AcheteurTab {...props} />}


                            <div className="flex flex-col items-center justify-center pt-32 pb-24">
                                <span className="font-medium">Vous avez déjà un compte?</span>
                                <Link className="font-medium" to="/login">Connexion</Link>
                            </div>

                        </CardContent>
                    </Card>
                </FuseAnimate>
            </div>
        </div>
    );
}

export default withRouter(RegisterPage);
