import React from 'react';
import ProduitListItem from './ProduitListItem';
import HeaderProduit from './HeaderProduit';



function Produits(props) {
    
    return (
        <div className="flex flex-col p-20">
            <HeaderProduit />
            <ProduitListItem />
        </div>
    );
}

export default React.memo(Produits);
