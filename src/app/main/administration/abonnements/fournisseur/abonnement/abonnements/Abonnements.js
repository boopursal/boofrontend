import React,{useEffect} from 'react';
import {FusePageCarded} from '@fuse';
import withReducer from 'app/store/withReducer';
import AbonnementsTable from './AbonnementsTable';
import AbonnementsHeader from './AbonnementsHeader';
import reducer from '../store/reducers';
import { useDispatch,useSelector } from 'react-redux';
import * as Actions from '../store/actions';

function Abonnements()
{
    
    const dispatch = useDispatch();
    const parametres = useSelector(({ abonnementOffreApp }) => abonnementOffreApp.abonnements.parametres);
    const user = useSelector(({auth}) => auth.user);
    
    useEffect(() => {
        dispatch(Actions.getAbonnements(parametres));
    }, [dispatch,parametres]);

    return (
        <FusePageCarded
            classes={{
                content: "flex flex-col h-full",
                header : "min-h-72 h-72 sm:h-136 sm:min-h-136"
            }}
            header={
                <AbonnementsHeader/>
            }
            content={
                <AbonnementsTable/>
            }
            innerScroll
        />
    );
}

export default withReducer('abonnementOffreApp', reducer)(Abonnements);
