import React, { useEffect, useState } from 'react';
import { Chip, Tooltip, IconButton, Icon } from '@material-ui/core';
import { FuseAnimate } from '@fuse';
import { withRouter } from 'react-router-dom';
import * as Actions from '../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import FuseUtils from '@fuse/FuseUtils';
import ReactTable from "react-table";
import { makeStyles } from '@material-ui/core/styles';
import _ from '@lodash';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
    chip: {
        marginLeft: theme.spacing(1),
        background: '#ef5350',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '11px'

    },
    chip2: {
        marginLeft: theme.spacing(1),
        background: '#4caf50',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '11px'
    },
    chipOrange: {
        marginLeft: theme.spacing(1),
        background: '#ff9800',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '11px'
    },
}));
function ProduitsTable(props) {

    const classes = useStyles();
    const dispatch = useDispatch();
    const produits = useSelector(({ produitsApp }) => produitsApp.produits.data);
    const loading = useSelector(({ produitsApp }) => produitsApp.produits.loading);
    const pageCount = useSelector(({ produitsApp }) => produitsApp.produits.pageCount);
    const parametres = useSelector(({ produitsApp }) => produitsApp.produits.parametres);
    const user = useSelector(({ auth }) => auth.user);
    const searchText = useSelector(({ produitsApp }) => produitsApp.produits.searchText);

    const [filteredData, setFilteredData] = useState(null);

    useEffect(() => {
        function getFilteredArray(entities, searchText) {
            const arr = Object.keys(entities).map((id) => entities[id]);
            if (searchText.length === 0) {
                return arr;
            }
            return FuseUtils.filterArrayByString(arr, searchText);
        }

        if (produits) {
            setFilteredData(getFilteredArray(produits, searchText));
        }
    }, [produits, searchText]);



    if (!filteredData) {
        return null;
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
                                props.history.push('/produits/' + rowInfo.original.id);
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
                        Header: '',
                        accessor: "featuredImageId",
                        Cell: row => (
                            row.original.featuredImageId ? (
                                <img className="w-full block rounded" src={FuseUtils.getUrl() + row.original.featuredImageId.url} alt={row.original.reference} />
                            ) : (
                                    <img className="w-full block rounded" src="assets/images/ecommerce/product-image-placeholder.png" alt={row.original.reference} />
                                )

                        ),
                        className: "justify-center",
                        width: 64,
                        sortable: false,
                        filterable: false,

                    },
                    {
                        Header: "Ref",
                        accessor: "reference",
                        filterable: false,
                    },
                    {
                        Header: "Titre",
                        accessor: "titre",
                        filterable: false,
                    },
                    {
                        Header: "Statut",
                        sortable: false,
                        filterable: false,
                        Cell: row => (
                            <div className="flex items-center">

                                {

                                    !row.original.isValid
                                        ?
                                        <Chip className={classes.chipOrange} label="En attente" />
                                        :
                                        <Chip className={classes.chip2} label="Publié" />


                                }
                                {
                                    row.original.isSelect ?
                                        <Chip className={classes.chip2} label="Produit de la semaine" />
                                        : ''
                                }
                            </div>
                        )

                    },
                    {
                        Header: "Description",
                        accessor: "description",
                        filterable: false,
                        Cell: row => (
                            <div className="flex items-center">
                                {_.capitalize(_.truncate(row.original.description, {
                                    'length': 15,
                                    'separator': ' '
                                }))}
                            </div>
                        )
                    },
                    {
                        Header: "PU",
                        className: "font-bold",
                        id: "pu",
                        accessor: p => p.pu.toLocaleString(
                            undefined, // leave undefined to use the browser's locale,
                            // or use a string like 'en-US' to override it.
                            { minimumFractionDigits: 2 }
                        ) + ' ' + user.data.currency,
                    },
                    {
                        Header: "Secteur",
                        className: "font-bold",
                        id: "secteur",
                        accessor: p => p.secteur.name,
                    },
                    {
                        Header: "Activité",
                        className: "font-bold",
                        id: "sousSecteurs",
                        accessor: p => p.sousSecteurs.name,
                    },

                    {
                        Header: "Catégorie",
                        className: "font-bold",
                        id: "categorie",
                        accessor: p => p.categorie ? p.categorie.name : p.sousSecteurs.name,
                    },
                    {
                        Header: "Date de création",
                        accessor: "created",
                        filterable: false,
                        Cell: row => moment(row.original.created).format('DD/MM/YYYY HH:mm')
                    },



                    {
                        Header: "",
                        Cell: row => (
                            <div className="flex items-center">

                                <Tooltip title="Supprimer" >
                                    <IconButton className="text-red text-20"
                                        onClick={(ev) => {
                                            ev.stopPropagation();
                                            dispatch(Actions.removeProduit(row.original, parametres,user.id));
                                        }}
                                    >
                                        <Icon>delete</Icon>
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Modifier" >
                                    <IconButton className="text-orange text-20">
                                        <Icon>edit</Icon>
                                    </IconButton>
                                </Tooltip>


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
                    dispatch(Actions.setParametresData(parametres))
                }}

                onSortedChange={(newSorted, column, shiftKey) => {
                    parametres.page = 1;
                    parametres.filter.id = newSorted[0].id;
                    parametres.filter.direction = newSorted[0].desc ? 'desc' : 'asc';
                    dispatch(Actions.setParametresData(parametres))
                }}
                noDataText="No Produit found"
                loadingText='Chargement...'
                ofText='sur'
            />
        </FuseAnimate>
    );
}

export default withRouter(ProduitsTable);
