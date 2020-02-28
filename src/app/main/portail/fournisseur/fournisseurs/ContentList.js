import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { FuseAnimate, FuseUtils } from '@fuse';
import { useDispatch, useSelector } from 'react-redux';
import FournisseurListItem from './FournisseurListItem';
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
            <FournisseurListItem />
           

        </div>
    );
}

export default React.memo(ContentList);
