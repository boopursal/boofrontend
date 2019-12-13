import React, {useEffect, useRef} from 'react';
import {FusePageSimple} from '@fuse';
import {useDispatch,useSelector} from 'react-redux';
import withReducer from 'app/store/withReducer';
import PersonnelsList from './PersonnelsList';
import PersonnelsHeader from './PersonnelsHeader';
import PersonnelsDialog from './PersonnelsDialog';
import * as Actions from './store/actions';
import reducer from './store/reducers';

function PersonnelsApp(props)
{
    const dispatch = useDispatch();
    const pageLayout = useRef(null);
    const user = useSelector(({auth}) => auth.user);
    useEffect(() => {
        if(user)
        dispatch(Actions.getPersonnels(user.id));
    }, [dispatch]);

    return (
        <React.Fragment>
            <FusePageSimple
                classes={{
                    contentWrapper: "p-0 sm:p-24 pb-80 sm:pb-80 h-full",
                    content       : "flex flex-col h-full",
                    leftSidebar   : "w-256 border-0",
                    header        : "min-h-72 h-72 sm:h-136 sm:min-h-136"
                }}
                header={
                    <PersonnelsHeader pageLayout={pageLayout}/>
                }
                content={
                    <PersonnelsList/>
                }
                sidebarInner
                ref={pageLayout}
                innerScroll
            />
            
            <PersonnelsDialog/>
        </React.Fragment>
    )
}

export default withReducer('personnelsApp', reducer)(PersonnelsApp);
