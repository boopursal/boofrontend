import React, { useEffect, useState } from 'react';
import { Icon, IconButton, Chip, Tooltip, TextField, InputAdornment } from '@material-ui/core';
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
        padding : 2,
        background: '#ef5350',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '11px',
        height:20


    },
    chip2: {
        marginLeft: theme.spacing(1),
        padding : 2,
        background: '#4caf50',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '11px',
        height:20
    },
    chipOrange: {
        marginLeft: theme.spacing(1),
        padding : 2,
        background: '#ff9800',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '11px',
        height:20

    },
}));
function DemandesTable(props) {

    const classes = useStyles();
    const dispatch = useDispatch();
    const demandes = useSelector(({ demandesAdminApp }) => demandesAdminApp.demandes.data);
    const loading = useSelector(({ demandesAdminApp }) => demandesAdminApp.demandes.loading);
    const pageCount = useSelector(({ demandesAdminApp }) => demandesAdminApp.demandes.pageCount);
    const parametres = useSelector(({ demandesAdminApp }) => demandesAdminApp.demandes.parametres);

    const searchText = useSelector(({ demandesAdminApp }) => demandesAdminApp.demandes.searchText);

    const [filteredData, setFilteredData] = useState(null);

    useEffect(() => {
        function getFilteredArray(entities, searchText) {
            const arr = Object.keys(entities).map((id) => entities[id]);
            if (searchText.length === 0) {
                return arr;
            }
            return FuseUtils.filterArrayByString(arr, searchText);
        }

        if (demandes) {
            setFilteredData(getFilteredArray(demandes, searchText));
        }
    }, [demandes, searchText]);



    if (!filteredData) {
        return null;
    }


    //dispatch from function filter
    const run = (parametres) => (
         dispatch(Actions.setParametresData(parametres))
    )

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
                                    props.history.push('/demandes_admin/' + rowInfo.original.id);
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
                            Header: "Référence",
                            className: "font-bold",
                            filterable: true,
                            accessor: "reference",
                            Cell: row => row.original.reference ? 'RFQ-' + row.original.reference : 'En attente',
                            Filter: ({ filter, onChange }) =>
                                <TextField
                                    onChange={event => onChange(event.target.value)}
                                    style={{ width: "100%" }}
                                    value={filter ? filter.value : ""}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">RFQ-</InputAdornment>,
                                    }}
                                />
                            ,
                        },
                        {
                            Header: "Titre",
                            accessor: "titre",
                            filterable: true,
                            Cell: row => (
                                <div className="flex items-center">
                                    {_.capitalize(_.truncate(row.original.titre, {
                                        'length': 15,
                                        'separator': ' '
                                    }))}
                                </div>
                            )
                        },
                        {
                            Header: "Budget",
                            accessor: "budget",
                            filterable: true,
                            Cell: row =>
                                (
                                    parseFloat(row.original.budget).toLocaleString(
                                        'fr', // leave undefined to use the browser's locale,
                                        // or use a string like 'en-US' to override it.
                                        { minimumFractionDigits: 2 }
                                    ) + ' ' + (row.original.currency ? row.original.currency.name : '')

                                )
                        },
                        {
                            Header: "Secteurs",
                            accessor: "sousSecteurs.name",
                            filterable: true,
                            Cell: row =>
                                _.truncate(_.join(_.map(row.original.sousSecteurs, 'name'), ', '), {
                                    'length': 36,
                                    'separator': ' '
                                })

                        },
                        {
                            Header: "Date de création",
                            accessor: "created",
                            filterable: true,
                            Cell: row => moment(row.original.created).format('DD/MM/YYYY'),
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
                        },
                        {
                            Header: "Échéance",
                            filterable: true,
                            accessor: "dateExpiration",
                            Cell: row => (
                                <div className="flex items-center">
                                    {
                                        moment(row.original.dateExpiration).format('DD/MM/YYYY')

                                    }

                                    {
                                        moment(row.original.dateExpiration) >= moment()
                                            ?

                                            <Chip className={classes.chip2} label={moment(row.original.dateExpiration).diff(moment(), 'days') === 0 ? moment(row.original.dateExpiration).diff(moment(), 'hours') + ' h' : moment(row.original.dateExpiration).diff(moment(), 'days') + ' j'} />
                                            :
                                            <Chip className={classes.chip} label={moment(row.original.dateExpiration).diff(moment(), 'days') === 0 ? moment(row.original.dateExpiration).diff(moment(), 'hours') + ' h' : moment(row.original.dateExpiration).diff(moment(), 'days') + ' j'} />

                                    }

                                </div>
                            ),
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

                        },
                        {
                            Header: "Statut",
                            accessor: "statut",
                            filterable: true,
                            sortable: false,
                            Cell: row => (
                                <div className="flex items-center">

                                    {
                                        moment(row.original.dateExpiration) >= moment()
                                            ?
                                            row.original.statut === 0
                                                ?
                                                <Chip className={classes.chipOrange} label="En attente" />
                                                :
                                                (row.original.statut === 1 ? <Chip className={classes.chip2} label="En cours" />
                                                    :
                                                    <Chip className={classes.chip} label="Refusé" />
                                                )
                                            :
                                            <Chip className={classes.chip} label="Expiré" />

                                    }

                                </div>
                            )
                            ,
                            Filter: ({ filter, onChange }) =>
                                <select
                                    onChange={event => onChange(event.target.value)}
                                    style={{ width: "100%" }}
                                    value={filter ? filter.value : ""}
                                >
                                    <option value="">Tous</option>
                                    <option value="0">En attente</option>
                                    <option value="1">En cours</option>
                                    <option value="2">Refusé</option>
                                    <option value="3">Expiré</option>
                                </select>

                        },

                        {
                            Header: "Publier",
                            accessor: "isPublic",
                            filterable: true,
                            Cell: row => (
                                row.original.isPublic ?
                                    (
                                        <Tooltip title="Public">
                                            <IconButton className="text-green text-20" onClick={(ev) => {
                                                ev.stopPropagation();
                                                dispatch(Actions.PublishDemande(row.original, false, parametres))

                                            }}>
                                                <Icon>check_circle</Icon>
                                            </IconButton>
                                        </Tooltip>
                                    ) :
                                    (
                                        <Tooltip title="Privé">
                                            <IconButton className="text-red text-20" onClick={(ev) => {
                                                ev.stopPropagation();
                                                dispatch(Actions.PublishDemande(row.original, true, parametres))

                                            }} >
                                                <Icon>remove_circle</Icon>
                                            </IconButton>
                                        </Tooltip>
                                    )
                            ),
                            Filter: ({ filter, onChange }) =>
                                <select
                                    onChange={event => onChange(event.target.value)}
                                    style={{ width: "100%" }}
                                    value={filter ? filter.value : ""}
                                >
                                    <option value="">Tous</option>
                                    <option value="true">Public</option>
                                    <option value="false">Privé</option>
                                </select>




                        },

                        {
                            Header: "",
                            Cell: row => (
                                <div className="flex items-center">
                                    {
                                        row.original.statut !== 1 ?
                                            <Tooltip title="Supprimer" >
                                                <IconButton className="text-red text-20"
                                                    onClick={(ev) => {
                                                        ev.stopPropagation();
                                                        dispatch(Actions.removeDemande(row.original, parametres));
                                                    }}
                                                >
                                                    <Icon>delete</Icon>
                                                </IconButton>
                                            </Tooltip>
                                            : <Tooltip title="Interdit!" >
                                                <IconButton className="text-20 cursor-not-allowed disable"
                                                    onClick={(ev) => {
                                                        ev.stopPropagation();
                                                    }}
                                                >
                                                    <Icon>delete</Icon>
                                                </IconButton>
                                            </Tooltip>
                                    }
                                    <Tooltip title="Détails" >
                                        <IconButton className="text-teal text-20">
                                            <Icon>remove_red_eye</Icon>
                                        </IconButton>
                                    </Tooltip>

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
                    noDataText="Aucune demande trouvée"
                    loadingText='Chargement...'
                    ofText='sur'
                />
            </FuseAnimate>




        </div>
    );
}

export default withRouter(DemandesTable);
