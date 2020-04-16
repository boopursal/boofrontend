import React, { useEffect, useRef } from 'react';
import { FusePageCarded } from '@fuse';
import { useDispatch, useSelector } from 'react-redux';
import withReducer from 'app/store/withReducer';
import BlackListesList from './BlackListesList';
import BlackListesHeader from './BlackListesHeader';
import BlackListesDialog from './BlackListesDialog';
import * as Actions from './store/actions';
import reducer from './store/reducers';
import { Helmet } from "react-helmet";


function BlackListesApp(props) {
    const dispatch = useDispatch();
    const user = useSelector(({ auth }) => auth.user);

    const pageLayout = useRef(null);

    useEffect(() => {

        if (user)
            dispatch(Actions.getBlackListes(user.id));
    }, [dispatch, user]);

    return (
        <React.Fragment>
            <Helmet>
                <title>Black listes | Les Achats Industriels</title>
                <meta name="robots" content="noindex, nofollow" />
                <meta name="googlebot" content="noindex" />
            </Helmet>
            <FusePageCarded
                classes={{
                    content: "flex flex-col h-full",
                    header: "min-h-72 h-72 sm:h-136 sm:min-h-136"
                }}
                header={
                    <BlackListesHeader pageLayout={pageLayout} />
                }
                content={
                    <BlackListesList />
                }
                innerScroll
            />

            <BlackListesDialog />
        </React.Fragment>
    )
}

export default withReducer('blackListesApp', reducer)(BlackListesApp);
