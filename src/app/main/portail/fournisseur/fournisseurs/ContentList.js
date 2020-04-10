import React from 'react';
import FournisseurListItem from './FournisseurListItem';
import HeaderContentList from './HeaderContentList';

function ContentList(props) {

    return (
        <div className="flex flex-col">
            <HeaderContentList />
            <FournisseurListItem />
        </div>
    );
}

export default React.memo(ContentList);
