import React,{useEffect} from 'react';
import {FusePageCarded} from '@fuse';
import withReducer from 'app/store/withReducer';
import MessageTable from './MessageTable';
import MessageHeader from './MessageHeader';
import reducer from '../store/reducers';
import { useDispatch,useSelector } from 'react-redux';
import * as Actions from '../store/actions';

function Message()
{
    
    const dispatch = useDispatch();
    const parametres = useSelector(({ messagesApp }) => messagesApp.messages.parametres);
    const user = useSelector(({auth}) => auth.user);
    
    useEffect(() => {
        if(user)
        dispatch(Actions.getMessages(parametres,user.id));
    }, [dispatch,parametres]);

    return (
        <FusePageCarded
            classes={{
                content: "flex",
                header : "min-h-72 h-72 sm:h-136 sm:min-h-136"
            }}
            header={
                <MessageHeader/>
            }
            content={
                <MessageTable/>
            }
            innerScroll
        />
    );
}

export default withReducer('messagesApp', reducer)(Message);
