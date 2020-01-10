import React,{useEffect} from 'react';
import {FusePageCarded} from '@fuse';
import withReducer from 'app/store/withReducer';
import ProduitsTable from './ProduitsTable';
import ProduitsHeader from './ProduitsHeader';
import reducer from '../store/reducers';
import { useDispatch,useSelector } from 'react-redux';
import * as Actions from '../store/actions';

function Produits()
{
    
    const dispatch = useDispatch();
    const user = useSelector(({auth}) => auth.user);
    const parametres = useSelector(({ produitsApp }) => produitsApp.produits.parametres);
    
    
    useEffect(() => {
        if(user)
        dispatch(Actions.getProduits(user.id,parametres));

        return ()=>{
            dispatch(Actions.cleanUp())
        }
    }, [dispatch,parametres,user]);

    return (
        <FusePageCarded
            classes={{
                content: "flex flex-col h-full",
                header : "min-h-72 h-72 sm:h-136 sm:min-h-136"
            }}
            header={
                <ProduitsHeader/>
            }
            content={
                <ProduitsTable/>
            }
            innerScroll
        />
    );
}

export default withReducer('produitsApp', reducer)(Produits);