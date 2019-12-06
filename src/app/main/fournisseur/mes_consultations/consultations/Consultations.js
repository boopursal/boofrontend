import React, { useEffect } from 'react';
import { FusePageCarded } from '@fuse';
import withReducer from 'app/store/withReducer';
import ConsultationsTable from './ConsultationsTable';
import ConsultationsHeader from './ConsultationsHeader';
import reducer from '../store/reducers';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../store/actions';

function Consultations() {

    const dispatch = useDispatch();
    const parametres = useSelector(({ consultationsApp }) => consultationsApp.consultations.parametres);
    const user = useSelector(({ auth }) => auth.user);

    useEffect(() => {
        if (user)
            dispatch(Actions.getConsultations(parametres, user.id));
    }, [dispatch, parametres, user.id]);

    return (
        <FusePageCarded
            classes={{
                content: "flex flex-col h-full",
                header: "min-h-72 h-72 sm:h-136 sm:min-h-136"
            }}
            header={
                <ConsultationsHeader />
            }
            content={
                <ConsultationsTable />
            }
            innerScroll
        />
    );
}

export default withReducer('consultationsApp', reducer)(Consultations);
