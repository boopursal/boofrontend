import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { FuseAnimate, FuseUtils } from '@fuse';
import { useDispatch, useSelector } from 'react-redux';
import ProduitListItem from './ProduitListItem';
import HeaderContentList from './HeaderContentList';

const useStyles = makeStyles(theme => ({
    root: {
        minWidth: 275,

    },

}));

function ContentList(props) {
    const dispatch = useDispatch();
    const classes = useStyles();

  

    return (
        <div className="flex flex-col">
            <HeaderContentList />
            <ProduitListItem />
           

        </div>
    );
}

export default React.memo(ContentList);
