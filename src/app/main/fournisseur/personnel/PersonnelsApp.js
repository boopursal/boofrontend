import React, { useEffect, useRef } from 'react';
import { FusePageSimple } from '@fuse';
import { useDispatch, useSelector } from 'react-redux';
import withReducer from 'app/store/withReducer';
import PersonnelsList from './PersonnelsList';
import PersonnelsHeader from './PersonnelsHeader';
import PersonnelsDialog from './PersonnelsDialog';
import * as Actions from './store/actions';
import reducer from './store/reducers';
import { Helmet } from "react-helmet";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';

function PersonnelsApp(props) {
    const dispatch = useDispatch();
    const pageLayout = useRef(null);
    const user = useSelector(({ auth }) => auth.user);
    useEffect(() => {
        if (!user.id)
            return
        dispatch(Actions.getPersonnels(user.id));
    }, [dispatch, user]);

    /* const handleClose = () => {
         props.history.push('/dashboard');
     };
     return (
         <div>
 
             <Dialog
                 open={true}
                 disableBackdropClick={true}
                 disableEscapeKeyDown={true}
                 onClose={handleClose}
                 aria-labelledby="alert-dialog-title"
                 aria-describedby="alert-dialog-description"
             >
                 <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
                 <DialogContent>
                     <DialogContentText id="alert-dialog-description">
                         Let Google help apps determine location. This means sending anonymous location data to
                         Google, even when no apps are running.
               </DialogContentText>
                 </DialogContent>
                 <DialogActions>
                     <Button onClick={handleClose} color="primary">
                         Disagree
               </Button>
                     <Button onClick={handleClose} color="primary" autoFocus>
                         Agree
               </Button>
                 </DialogActions>
             </Dialog>
         </div>
     );*/
    return (
        <React.Fragment>
            <Helmet>
                <title>Agences / Services | Les Achats Industriels</title>
                <meta name="robots" content="noindex, nofollow" />
                <meta name="googlebot" content="noindex" />
            </Helmet>
            <FusePageSimple
                classes={{
                    contentWrapper: "p-0 sm:p-24 pb-80 sm:pb-80 h-full",
                    content: "flex flex-col h-full",
                    leftSidebar: "w-256 border-0",
                    header: "min-h-72 h-72 sm:h-136 sm:min-h-136"
                }}
                header={
                    <PersonnelsHeader pageLayout={pageLayout} />
                }
                content={
                    <PersonnelsList />
                }
                sidebarInner
                ref={pageLayout}
                innerScroll
            />

            <PersonnelsDialog />
        </React.Fragment>
    )
}

export default withReducer('personnelsApp', reducer)(PersonnelsApp);
