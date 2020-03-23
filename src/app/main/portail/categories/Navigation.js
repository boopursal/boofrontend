import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import withReducer from 'app/store/withReducer';
import reducer from './store/reducers';
import { makeStyles } from '@material-ui/styles';
import * as Actions from './store/actions';
import CategorieNavigation from './CategorieNavigation';
import {
    Icon,
    List,
    Typography,
    ListItemText,
    ListItem,
    ListItemAvatar,
    Avatar,

} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    demo: {
        backgroundColor: theme.palette.background.paper,
    },
    mainAvatar: {
        margin: theme.spacing(1.25, 1.25, 1.25, 0),
        color: '#fff',
        backgroundColor: theme.palette.primary.main,
    },


}));
function Navigation(props) {
    const classes = useStyles(props);
    const dispatch = useDispatch();
    const categoriesNav = useSelector(({ navigationCategories }) => navigationCategories.categoriesNav);

    useEffect(() => {
        if (categoriesNav.secteurs.length === 0) {
            dispatch(Actions.getSecteurs());
        }
    }, [dispatch, categoriesNav.secteurs]);

    return (
        <div className={classes.demo}>
            <ListItem>
                <ListItemAvatar>
                    <Avatar className={classes.mainAvatar}>
                        <Icon >format_list_bulleted</Icon>
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={
                        <Typography variant="h2" component="h2" className="text-20 font-bold xs:text-11 mb-1">
                            CATÉGORIES
                        </Typography>
                    }
                />
            </ListItem>
            <List dense={true} disablePadding>
                {
                    categoriesNav.loadingSecteurs ? 'Loading...' : 
                    (
                        categoriesNav.secteurs && categoriesNav.secteurs.map((item,index)=>(
                            <CategorieNavigation item={item} key={index} nestedLevel={0} dense={true} />
                        ))
                    )
                }
              
            </List>
        </div>
    );
}

export default withReducer('navigationCategories', reducer)(Navigation);

