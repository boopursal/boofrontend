import React from 'react';
import { Paper } from '@material-ui/core';
import { FuseAnimate } from '@fuse';
import PricingFournisseur from './PricingFournisseur';

function TarifDetail(props) {

    return (

        <FuseAnimate animation="transition.slideLeftIn" delay={200}>
            <PricingFournisseur />
        </FuseAnimate>

    );
}

export default React.memo(TarifDetail);
