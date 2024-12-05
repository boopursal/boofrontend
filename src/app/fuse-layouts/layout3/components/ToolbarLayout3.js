import React from "react";
import { AppBar, Hidden, Toolbar } from "@material-ui/core";
import { makeStyles, ThemeProvider } from "@material-ui/styles";
import clsx from "clsx";
import NavbarMobileToggleButton from "app/fuse-layouts/shared-components/NavbarMobileToggleButton";
import LogoPortail from "app/fuse-layouts/shared-components/LogoPortail";
import { useSelector } from "react-redux";
import UserMenu from "app/fuse-layouts/shared-components/UserMenu";
import history from "@history";
import Search from "../../../main/portail/Search/Search";
import PSecteurs from "app/fuse-layouts/shared-components/PSecteurs";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  separator: {
    width: 1,
    height: 64,
    backgroundColor: theme.palette.divider,
  },
  
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
              <LogoPortail />
            </div>
          </Hidden>
          {/* <div className="flex flex-shrink items-center">
            <PSecteurs />
          </div> */}
          <Hidden mdDown>
          <Typography className="uppercase font-bold ml-24"color="primary">
            <div className="flex justify-center space-x-4">
              <Link 
                component="true" 
                to="/annuaire-entreprises" 
                className="link-button"
              >
                Parcourir les Secteurs
              </Link>
              <Link 
                component="true" 
                to="/vente-produits" 
                className="link-button"
              >
                Produits
              </Link>
              <Link 
                component="true" 
                to="/tarifs/plans" 
                className="link-button"
              >
                Tarifs
              </Link>
              <Link 
                component="true" 
                to="/actualites" 
                className="link-button"
              >
                Actualités
              </Link>
              
            </div>
          </Typography>
          </Hidden>
            
          <Hidden smUp>
                <PSecteurs />
            
              <div className={classes.separator} />
          </Hidden>
          
          
          <div className={clsx("flex flex-shrink-0 items-center justify-start" , "ml-72")}> {/* Ajoutez justify-start pour aligner à gauche */}
            <UserMenu />
          </div>
        </Toolbar>
        <div className="flex flex-1 justify-center"> {/* Justifiez le contenu au centre si nécessaire */}
                   <Hidden xsDown>
                      {history.location && history.location.pathname === "/" ? (
                        ""
                      ) : (
                        <div className="w-1/2"> {/* Réduisez la largeur ici */}
                          <Search className="mx-8 lg:mx-16" variant="basic" />
                        </div>
                      )}
                    </Hidden>
          </div>
       <br></br>
      </AppBar>
    </ThemeProvider>
  );
}

export default ToolbarLayout3;
