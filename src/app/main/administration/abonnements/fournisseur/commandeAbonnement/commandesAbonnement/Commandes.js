import React,{useEffect} from 'react';
import {FusePageCarded} from '@fuse';
import withReducer from 'app/store/withReducer';
import CommandesTable from './CommandesTable';
import CommandesHeader from './CommandesHeader';
import reducer from '../store/reducers';
import { useDispatch,useSelector } from 'react-redux';
import * as Actions from '../store/actions';

function Commandes()
{
    
    const dispatch = useDispatch();
    const parametres = useSelector(({ commandeOffreAdminApp }) => commandeOffreAdminApp.commandes.parametres);
    const user = useSelector(({auth}) => auth.user);
    
    useEffect(() => {
        dispatch(Actions.getCommandesAb(parametres));
    }, [dispatch,parametres]);

    return (
        <FusePageCarded
            classes={{
                content: "flex flex-col h-full",
                header : "min-h-72 h-72 sm:h-136 sm:min-h-136"
            }}
            header={
                <CommandesHeader/>
            }
            content={
                <CommandesTable/>
            }
            innerScroll
        />
    );
}

export default withReducer('commandeOffreAdminApp', reducer)(Commandes);
