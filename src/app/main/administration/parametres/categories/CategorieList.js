import React, { useEffect, useState } from 'react';
import { Icon, IconButton, Typography, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';
import { FuseUtils, FuseAnimate } from '@fuse';
import { useDispatch, useSelector } from 'react-redux';
import ReactTable from "react-table";
import * as Actions from './store/actions';
import _ from '@lodash';

function CategorieList(props) {
    const dispatch = useDispatch();
    const categories = useSelector(({ categoriesApp }) => categoriesApp.categories.entities);
    const pageCount = useSelector(({ categoriesApp }) => categoriesApp.categories.pageCount);
    const loading = useSelector(({ categoriesApp }) => categoriesApp.categories.loading);
    const parametres = useSelector(({ categoriesApp }) => categoriesApp.categories.parametres);
    const searchText = useSelector(({ categoriesApp }) => categoriesApp.categories.searchText);

    const [filteredData, setFilteredData] = useState(null);

    

    useEffect(() => {
        function getFilteredArray(entities, searchText) {
            const arr = Object.keys(entities).map((id) => entities[id]);
            if (searchText.length === 0) {
                return arr;
            }
            return FuseUtils.filterArrayByString(arr, searchText);
        }

        if (categories) {
            setFilteredData(getFilteredArray(categories, searchText));
        }
    }, [categories, searchText]);


    if (!filteredData) {
        return null;
    }

    if (filteredData.length === 0) {
        return (
            <div className="flex flex-1 items-center justify-center h-full">
                <Typography color="textSecondary" variant="h5">
                    Il n'y a pas de catégories!
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
                        className: "cursor-pointer",
                        onClick: (e, handleOriginal) => {
                            if (rowInfo) {
                                dispatch(Actions.openEditCategoriesDialog(rowInfo.original));
                            }
                        }
                    }
                }}
                data={filteredData}
                columns={[

                    {
                        Header: "Catégorie",
                        accessor: "name",
                        filterable: false,
                    },
                    {
                        Header: "Activité",
                        accessor: "sousSecteur",
                        Cell: row => (
                            <div className="flex items-center">
                                {row.original.sousSecteur ? row.original.sousSecteur.name : ''}
                            </div>
                        )
                    },

                    {
                        Header: "",
                        sortable: false,
                        width: 64,
                        Cell: row => (
                            <div className="flex items-center">

                                <IconButton className="text-red text-20"
                                    onClick={(ev) => {
                                        ev.stopPropagation();
                                        dispatch(Actions.openDialog({
                                            children: (
                                                <React.Fragment>
                                                    <DialogTitle id="alert-dialog-title">Suppression</DialogTitle>
                                                    <DialogContent>
                                                        <DialogContentText id="alert-dialog-description">
                                                            Voulez vous vraiment supprimer cet enregistrement ?
                                                        </DialogContentText>
                                                    </DialogContent>
                                                    <DialogActions>
                                                        <Button onClick={() => dispatch(Actions.closeDialog())} color="primary">
                                                            Non
                                                    </Button>
                                                        <Button
                                                            onClick={(ev) => {
                                                                dispatch(Actions.removeCategorie(row.original, parametres));
                                                                dispatch(Actions.closeDialog())
                                                            }} color="primary"
                                                            autoFocus>
                                                            Oui
                                                        </Button>

                                                    </DialogActions>
                                                </React.Fragment>
                                            )
                                        }))
                                    }}
                                >
                                    <Icon>delete</Icon>
                                </IconButton>
                            </div>
                        )
                    }
                ]}
                manual

                defaultSortDesc={true}
                pages={pageCount}
                defaultPageSize={10}
                loading={loading}
                showPageSizeOptions={false}
                onPageChange={(pageIndex) => {
                    parametres.page = pageIndex + 1;
                    dispatch(Actions.setCurrentPage(parametres))
                }}

                onSortedChange={(newSorted, column, shiftKey) => {
                    parametres.page = 1;
                    parametres.filter.id = newSorted[0].id === 'sousSecteur' ? 'sousSecteur.id' : newSorted[0].id;
                    parametres.filter.direction = newSorted[0].desc ? 'desc' : 'asc';
                    dispatch(Actions.setSortedData(parametres))
                }}
                noDataText="No category found"
                loadingText='Chargement...'
                ofText='sur'
            />
        </FuseAnimate>
    );
}

export default CategorieList;
