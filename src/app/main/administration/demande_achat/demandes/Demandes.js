import React,{useEffect} from 'react';
import {FusePageCarded} from '@fuse';
import withReducer from 'app/store/withReducer';
import DemandesTable from './DemandesTable';
import DemandesHeader from './DemandesHeader';
import reducer from '../store/reducers';
import { useDispatch,useSelector } from 'react-redux';
import * as Actions from '../store/actions';

function Demandes()
{
    
    const dispatch = useDispatch();
    const parametres = useSelector(({ demandesAdminApp }) => demandesAdminApp.demandes.parametres);
    
    
    useEffect(() => {
        dispatch(Actions.getDemandes(parametres));
    }, [dispatch,parametres]);

    return (
        <FusePageCarded
            classes={{
                content: "flex",
                header : "min-h-72 h-72 sm:h-136 sm:min-h-136"
            }}
            header={
                <DemandesHeader/>
            }
            content={
                <DemandesTable/>
            }
            innerScroll
        />
    );
}

export default withReducer('demandesAdminApp', reducer)(Demandes);
