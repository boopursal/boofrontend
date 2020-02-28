import React from 'react';
import ProduitListItem from './ProduitListItem';
import HeaderProduit from './HeaderProduit';
import { useSelector } from 'react-redux';
import { Typography } from '@material-ui/core';



function Produits(props) {
    const data = useSelector(({ ficheFournisseurApp }) => ficheFournisseurApp.fournisseur.data);

    return (
        <div className="flex flex-col p-20">
            <Typography variant="h6" gutterBottom>
                {data && 'Les produits de la société ' + data.societe}
            </Typography>
            <HeaderProduit />
            <ProduitListItem />
        </div>
    );
}

export default React.memo(Produits);
