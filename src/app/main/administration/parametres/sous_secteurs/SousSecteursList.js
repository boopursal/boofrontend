import React, { useEffect, useState } from 'react';
import { Icon, IconButton, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';
import { FuseUtils, FuseAnimate } from '@fuse';
import { useDispatch, useSelector } from 'react-redux';
import ReactTable from "react-table";
import * as Actions from './store/actions';
import _ from '@lodash';
import Tooltip from '@material-ui/core/Tooltip'
import { withStyles } from '@material-ui/core/styles';

function SousSecteursList(props) {
    const dispatch = useDispatch();
    const SousSecteurs = useSelector(({ sous_secteursApp }) => sous_secteursApp.sous_secteurs.entities);
    const pageCount = useSelector(({ sous_secteursApp }) => sous_secteursApp.sous_secteurs.pageCount);
    const loading = useSelector(({ sous_secteursApp }) => sous_secteursApp.sous_secteurs.loading);
    const parametres = useSelector(({ sous_secteursApp }) => sous_secteursApp.sous_secteurs.parametres);
    const searchText = useSelector(({ sous_secteursApp }) => sous_secteursApp.sous_secteurs.searchText);

    const [filteredData, setFilteredData] = useState(null);
    const HtmlTooltip = withStyles(theme => ({
        tooltip: {
            maxWidth: 220,
            fontSize: theme.typography.pxToRem(12),
            border: '1px solid #dadde9',
            '& b': {
                fontWeight: theme.typography.fontWeightMedium,
            },
        },
    }))(Tooltip);

    useEffect(() => {
        dispatch(Actions.getSecteurs());
    }, [dispatch]);

    useEffect(() => {
        function getFilteredArray(entities, searchText) {
            const arr = Object.keys(entities).map((id) => entities[id]);
            if (searchText.length === 0) {
                return arr;
            }
            return FuseUtils.filterArrayByString(arr, searchText);
        }

        if (SousSecteurs) {
            setFilteredData(getFilteredArray(SousSecteurs, searchText));
        }
    }, [SousSecteurs, searchText]);


    if (!filteredData) {
        return null;
    }



    //dispatch from function filter
    const run = (parametres) => (
        dispatch(Actions.setParametresData(parametres))
    )

    //call run function
    const fn =
        _.debounce(run, 700);

    return (

        <FuseAnimate animation="transition.slideUpIn" delay={300}>

            <ReactTable
                className="-striped -highlight h-full sm:rounded-16 overflow-hidden"
                getTrProps={(state, rowInfo, column) => {
                    return {
                        className: "cursor-pointer",
                        onClick: (e, handleOriginal) => {
                            if (rowInfo) {
                                dispatch(Actions.openEditSousSecteursDialog(rowInfo.original));
                            }
                        }
                    }
                }}
                data={filteredData}
                columns={[


                    {
                        Header: "Activité",
                        accessor: "name",
                        filterable: true,
                    },
                    {
                        Header: "Activité parent",
                        className: "font-bold",
                        filterable: true,
                        accessor: "parent",
                        Cell: row => (row.original.parent ? row.original.parent.name : '')
                    },
                    {
                        Header: "Secteur",
                        accessor: "secteur.name",
                        filterable: true,
                        Cell: row => (
                            <div className="flex items-center">
                                {row.original.secteur ? row.original.secteur.name : ''}
                            </div>
                        )
                    },

                    {
                        Header: "Nbr Fournisseurs",
                        sortable: false,
                        className: "font-bold",
                        Cell: row => (
                            <div className="flex items-center">
                                <HtmlTooltip
                                    title={
                                        <React.Fragment>

                                            {
                                                Object.keys(_.pullAllBy(row.original.fournisseurs, [{ 'del': true }], 'del')).length === 0 ? 'Il n\'y aucun Fournisseur' :
                                                    <ul>
                                                        {
                                                            _.map(_.pullAllBy(row.original.fournisseurs, [{ 'del': true }], 'del'), function (value, key) {
                                                                return <li key={key}> {value.firstName + ' ' + value.lastName} </li>;
                                                            })
                                                        }
                                                    </ul>
                                            }

                                        </React.Fragment>
                                    }
                                >
                                    <Button onClick={(ev) => { ev.stopPropagation(); }} >
                                        {Object.keys(_.pullAllBy(row.original.fournisseurs, [{ 'del': true }], 'del')).length}
                                    </Button>
                                </HtmlTooltip>

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
                                                                dispatch(Actions.removeSousSecteur(row.original, parametres));
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
                pages={pageCount}
                defaultPageSize={10}
                loading={loading}
                showPageSizeOptions={false}
                onPageChange={(pageIndex) => {
                    parametres.page = pageIndex + 1;
                    dispatch(Actions.setParametresData(parametres))
                }}
                onSortedChange={(newSorted, column, shiftKey) => {
                    parametres.page = 1;
                    parametres.filter.id = newSorted[0].id;
                    parametres.filter.direction = newSorted[0].desc ? 'desc' : 'asc';
                    dispatch(Actions.setParametresData(parametres))
                }}
                onFilteredChange={filtered => {
                    parametres.page = 1;
                    parametres.search = filtered;
                    fn(parametres);
                }}
                noDataText="Aucune activité trouvée"
                loadingText='Chargement...'
                ofText='sur'
            />
        </FuseAnimate>
    );
}

export default SousSecteursList;
