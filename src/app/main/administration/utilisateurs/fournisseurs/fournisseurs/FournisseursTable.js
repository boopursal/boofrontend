import React, { useEffect, useState } from 'react';
import { Icon, IconButton, Chip, Tooltip, Avatar, TextField } from '@material-ui/core';
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
function FournisseursTable(props) {

    const classes = useStyles();
    const dispatch = useDispatch();
    const fournisseurs = useSelector(({ fournisseursAdminApp }) => fournisseursAdminApp.fournisseurs.data);
    const loading = useSelector(({ fournisseursAdminApp }) => fournisseursAdminApp.fournisseurs.loading);
    const pageCount = useSelector(({ fournisseursAdminApp }) => fournisseursAdminApp.fournisseurs.pageCount);
    const parametres = useSelector(({ fournisseursAdminApp }) => fournisseursAdminApp.fournisseurs.parametres);

    const searchText = useSelector(({ fournisseursAdminApp }) => fournisseursAdminApp.fournisseurs.searchText);

    const [filteredData, setFilteredData] = useState(null);

    useEffect(() => {
        function getFilteredArray(entities, searchText) {
            const arr = Object.keys(entities).map((id) => entities[id]);
            if (searchText.length === 0) {
                return arr;
            }
            return FuseUtils.filterArrayByString(arr, searchText);
        }

        if (fournisseurs) {
            setFilteredData(getFilteredArray(fournisseurs, searchText));
        }
    }, [fournisseurs, searchText]);



    if (!filteredData) {
        return null;
    }


    //dispatch from function filter
    const run = (parametres) =>
        dispatch(Actions.setParametresData(parametres))

    //call run function
    const fn =
        _.debounce(run, 1000);

    return (
        <div className="w-full flex flex-col">


            <FuseAnimate animation="transition.slideUpIn" delay={300}>

                <ReactTable

                    className="-striped -highlight h-full sm:rounded-16 overflow-hidden"
                    getTrProps={(state, rowInfo, column) => {
                        return {
                            className: "h-64 cursor-pointer",
                            onClick: (e, handleOriginal) => {
                                if (rowInfo) {
                                    props.history.push('/users/fournisseurs/' + rowInfo.original.id);
                                }
                            }
                        }
                    }}
                    getTheadProps={(state, rowInfo, column) => {
                        return {
                            className: "h-64",

                        }
                    }}

                    data={filteredData}
                    columns={[
                        {
                            Header: "",
                            Cell: row =>

                                row.original.avatar ?
                                    <Avatar className="mr-8" alt={row.original.firstName} src={FuseUtils.getUrl() + row.original.avatar.url} />
                                    : <Avatar className="mr-8" alt={row.original.firstName} src="assets/images/avatars/images.png" />

                            ,
                            className: "justify-center",
                            width: 64,
                            sortable: false
                        },
                        {
                            Header: "Société",
                            accessor: "societe",
                            filterable: true,

                        },
                        {
                            Header: "Nom",
                            accessor: "lastName",
                            filterable: true,

                        },
                        {
                            Header: "Prénom",
                            accessor: "firstName",
                            filterable: true,

                        },
                        {
                            Header: "Email",
                            accessor: "email",
                            filterable: true,

                        },
                        {
                            Header: "Téléphone",
                            accessor: "phone",
                            filterable: true,

                        },
                        {
                            Header: "Date de création",
                            accessor: "created",
                            filterable: true,
                            Filter: ({ filter, onChange }) =>
                                <TextField
                                    onChange={event => onChange(event.target.value)}
                                    style={{ width: "100%" }}
                                    value={filter ? filter.value : ""}
                                    type="date"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />,
                            Cell: row =>
                                moment(row.original.created).format('L')

                        },
                        {
                            Header: "Statut",
                            accessor: "isactif",
                            filterable: true,
                            Cell: row =>
                                row.original.isactif ?
                                    (
                                        <Tooltip title="Activé">
                                            <IconButton className="text-green text-20" onClick={(ev) => {
                                                ev.stopPropagation();
                                                dispatch(Actions.activeAccount(row.original, false, parametres))

                                            }}><Icon>check_circle</Icon>
                                            </IconButton>
                                        </Tooltip>
                                    ) :
                                    (
                                        <Tooltip title="Désactivé">
                                            <IconButton className="text-red text-20" onClick={(ev) => {
                                                ev.stopPropagation();
                                                dispatch(Actions.activeAccount(row.original, true, parametres));
                                            }}><Icon>remove_circle</Icon>
                                            </IconButton>
                                        </Tooltip>
                                    )
                            ,
                            Filter: ({ filter, onChange }) =>
                                <select
                                    onChange={event => onChange(event.target.value)}
                                    style={{ width: "100%" }}
                                    value={filter ? filter.value : ""}
                                >
                                    <option value="">Tous</option>
                                    <option value="true">Actif</option>
                                    <option value="false">Inactif</option>
                                </select>


                        },
                        {
                            Header: "Etape",
                            accessor: "step",
                            filterable: true,
                            Cell: row =>
                                (
                                    row.original.step === 1
                                        ?
                                        (!row.original.isactif ? 'Confirmation email' : 'Infos de la société')
                                        :
                                        row.original.step === 2 ? 'Produits' : <span className="text-green">Inscription complète</span>

                                )
                            ,
                            Filter: ({ filter, onChange }) =>
                                <select
                                    onChange={event => onChange(event.target.value)}
                                    style={{ width: "100%" }}
                                    value={filter ? filter.value : ""}
                                >
                                    <option value="">Tous</option>
                                    <option value="-1">Confirmation email</option>
                                    <option value="1">Infos de la société</option>
                                    <option value="2">Produits</option>
                                    <option value="3">Inscription complète</option>
                                </select>


                        },
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
                    onFilteredChange={filtered => {
                        parametres.page = 1;
                        parametres.search = filtered;
                        // _.debounce( dispatch(Actions.setParametresData(parametres)),3000)
                        fn(parametres);
                    }}
                    noDataText="Aucun fournisseur trouvé"
                    loadingText='Chargement...'
                    ofText='sur'
                />
            </FuseAnimate>




        </div>
    );
}

export default withRouter(FournisseursTable);
