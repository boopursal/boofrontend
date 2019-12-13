import React, {useEffect, useRef} from 'react';
import {FusePageSimple} from '@fuse';
import {useDispatch,useSelector} from 'react-redux';
import withReducer from 'app/store/withReducer';
import JetonsList from './JetonsList';
import JetonsHeader from './JetonsHeader';
import JetonsDialog from './JetonsDialog';
import * as Actions from './store/actions';
import reducer from './store/reducers';


function JetonsApp(props)
{
    const dispatch = useDispatch();
    const pageLayout = useRef(null);
    const parametres = useSelector(({jetonsApp}) => jetonsApp.jetons.parametres);

    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(Actions.getJetons(parametres));
        }, 1000);
        dispatch(Actions.getPaiements());
        return () => clearTimeout(timer);
        
        
    }, [dispatch,parametres]);

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
                    <JetonsHeader pageLayout={pageLayout}/>
                }
                content={
                    <JetonsList/>
                }
                sidebarInner
                ref={pageLayout}
                innerScroll
            />
            
            <JetonsDialog/>
        </React.Fragment>
    )
}

export default withReducer('jetonsApp', reducer)(JetonsApp);
