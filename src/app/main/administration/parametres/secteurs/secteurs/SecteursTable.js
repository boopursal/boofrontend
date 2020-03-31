import React, { useEffect, useState } from 'react';
import { Icon, IconButton,  Tooltip,Avatar,Typography } from '@material-ui/core';
import {FuseUtils,FuseAnimate } from '@fuse';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ReactTable from "react-table";
import _ from '@lodash';
import CircularProgress from '@material-ui/core/CircularProgress';

function SecteursTable(props) {
    const secteurs = useSelector(({ secteursApp }) => secteursApp.secteurs.entities);
    const loading = useSelector(({ secteursApp }) => secteursApp.secteurs.loading);
    const searchText = useSelector(({ secteursApp }) => secteursApp.secteurs.searchText);

    const [filteredData, setFilteredData] = useState(null);

    
    useEffect(() => {
        function getFilteredArray(entities, searchText) {
            const arr = Object.keys(entities).map((id) => entities[id]);
            if (searchText.length === 0) {
                return arr;
            }
            return FuseUtils.filterArrayByString(arr, searchText);
        }

        if (secteurs) {
            setFilteredData(getFilteredArray(secteurs, searchText));
        }
    }, [secteurs, searchText]);



    if (!filteredData) {
        return null;
    }
    if (loading) {
        return (
            <div className="flex flex-1 items-center justify-center h-full">
               <CircularProgress  color="secondary" /> &ensp;
               Chargement ...
            </div>
        );
    }
    if (filteredData.length === 0) {
        return (
            <div className="flex flex-1 items-center justify-center h-full">
                <Typography color="textSecondary" variant="h5">
                    Il n'y a pas d'activités!
                </Typography>
            </div>
        );
    }

    return (
        <FuseAnimate animation="transition.slideUpIn" delay={300}>
            <ReactTable
                className="-striped -highlight h-full sm:rounded-16 overflow-hidden"
                getTrProps={(state, rowInfo, column) => {
                    return {
                        className: "h-64 cursor-pointer",
                        onClick: (e, handleOriginal) => {
                            if (rowInfo) {
                                props.history.push('/parametres/secteurs/' + rowInfo.original.id);
                            }
                        }
                    }
                }}
                getTheadProps={(state, rowInfo, column) => {
                    return {
                        className: "h-64 font-bold",

                    }
                }}

                data={filteredData}
                columns={[
                    {
                        Header   : "",
                        Cell     : row => 

                            row.original.image ?
                            <Avatar className="mr-8" alt={row.original.firstName} src={FuseUtils.getUrl()+row.original.image.url}/>
                            : 
                            <Avatar className="mr-8" alt={row.original.firstName} src="assets/images/avatars/images.png"/>
                        
                        ,
                        className: "justify-center",
                        width    : 64,
                        sortable : false
                    },

                    {
                        Header    : "Secteur",
                        filterable: true,
                        accessor  : "name",
                    },
                  
                    {
                        Header: "",
                        Cell: row => (
                            <div className="flex items-center">
                                {
                                    <Tooltip title="Editer" >
                                        <IconButton className="text-teal text-20">
                                            <Icon>edit</Icon>
                                        </IconButton>
                                    </Tooltip>
                                }
                            </div>
                        )
                    }
                ]}
                defaultPageSize={10}
                loading={loading}
                noDataText="Aucun secteur trouvé"
                loadingText='Chargement...'
                ofText='sur'
                
            />
        </FuseAnimate>
    );
}

export default withRouter(SecteursTable);
