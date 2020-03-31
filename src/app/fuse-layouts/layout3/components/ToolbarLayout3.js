import React from 'react';
import { AppBar, Hidden, Toolbar, IconButton, Icon } from '@material-ui/core';
import { makeStyles, ThemeProvider } from '@material-ui/styles';
import { FuseSearch } from '@fuse';
import clsx from 'clsx';
import NavbarMobileToggleButton from 'app/fuse-layouts/shared-components/NavbarMobileToggleButton';
import QuickPanelToggleButton from 'app/fuse-layouts/shared-components/quickPanel/QuickPanelToggleButton';
import Logo from 'app/fuse-layouts/shared-components/Logo';
import { useSelector } from 'react-redux';
import UserMenu from 'app/fuse-layouts/shared-components/UserMenu';
import history from '@history';
import GlobalSearch from '../../../main/portail/Search/GlobalSearch';
import Search from '../../../main/portail/Search/Search';
import PSecteurs from 'app/fuse-layouts/shared-components/PSecteurs';
const useStyles = makeStyles(theme => ({
    separator: {
        width: 1,
        height: 64,
        backgroundColor: theme.palette.divider
    }
}));

function ToolbarLayout3(props) {
    const config = useSelector(({ fuse }) => fuse.settings.current.layout.config);
    const toolbarTheme = useSelector(({ fuse }) => fuse.settings.toolbarTheme);
    const classes = useStyles(props);
    return (
        <ThemeProvider theme={toolbarTheme}>
            <AppBar id="fuse-toolbar" className="flex relative z-10" color="default">
                <Toolbar className="container p-0 lg:px-24">

                    {config.navbar.display && (
                        <Hidden lgUp>
                            <NavbarMobileToggleButton className="w-64 h-64 p-0" />
                            <div className={classes.separator} />
                        </Hidden>
                    )}

                    <Hidden mdDown>
                        <div className={clsx("flex flex-shrink-0 items-center")}>
                            <Logo />
                        </div>
                    </Hidden>
                    <div className="flex flex-shrink items-center">
                        <PSecteurs />
                    </div>
                   

                    <div className="flex flex-1">
                        <Hidden xsDown>
                            {
                                history.location && history.location.pathname === '/' ? '' :
                                    <Search className="mx-16 lg:mx-24" variant="basic" />
                            }

                        </Hidden>
                    </div>
                    {
                        /**
                         * <div className="flex flex-1">
                         <Hidden xsDown>
                             {
                                 history.location && history.location.pathname === '/' ? '' :
                                     <GlobalSearch className="lg:mx-24" />
                             }
 
                         </Hidden>
                     </div>
                         */
                    }

                    <div className="flex">
                        {
                            /**
                             <Hidden smUp>
                                 {
                                     history.location && history.location.pathname === '/' ? '' :
                                         <GlobalSearch className="mx-16 lg:mx-24" variant="basic" />
                                 }
                                 <div className={classes.separator} />
                             </Hidden>
        */
                        }
                        <Hidden smUp>
                            {
                                history.location && history.location.pathname === '/' ? '' :
                                    <Search />
                            }

                            <div className={classes.separator} />
                        </Hidden>
                        <UserMenu />


                        <Hidden mdDown>
                            <div className={classes.separator} />
                        </Hidden>

                    </div>

                </Toolbar>
            </AppBar>
        </ThemeProvider>
    );
}

export default ToolbarLayout3;
