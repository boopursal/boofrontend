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
        padding: 2,
        background: '#ef5350',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '11px',
        height: 20


    },
    chip2: {
        marginLeft: theme.spacing(1),
        padding: 2,
        background: '#4caf50',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '11px',
        height: 20
    },
    chipOrange: {
        marginLeft: theme.spacing(1),
        padding: 2,
        background: '#ff9800',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '11px',
        height: 20

    },
}));
function DemandesTable(props) {

    const classes = useStyles();
    const dispatch = useDispatch();
    const demandes = useSelector(({ demandesApp }) => demandesApp.demandes.data);
    const loading = useSelector(({ demandesApp }) => demandesApp.demandes.loading);
    const pageCount = useSelector(({ demandesApp }) => demandesApp.demandes.pageCount);
    const parametres = useSelector(({ demandesApp }) => demandesApp.demandes.parametres);
    const user = useSelector(({ auth }) => auth.user);
    const searchText = useSelector(({ demandesApp }) => demandesApp.demandes.searchText);

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
        <FuseAnimate animation="transition.slideUpIn" delay={300}>
            <ReactTable
                className="-striped -highlight h-full sm:rounded-16 overflow-hidden"
                getTrProps={(state, rowInfo, column) => {
                    return {
                        className: "h-64 cursor-pointer",
                        onClick: (e, handleOriginal) => {
                            if (rowInfo) {
                                props.history.push('/demandes_prix/' + rowInfo.original.id);
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
                        Header: "",
                        accessor: "historiques",
                        width: 64,
                        filterable: false,
                        Cell: row =>
                            row.original.historiques.length > 0 && _.findKey(row.original.historiques, function (o) { return o.fournisseur.id === user.id; })
                                ? <strong className="text-green">Lu</strong>
                                :
                                <strong className="text-orange">Non lu</strong>

                    },
                    {
                        Header: "Titre",
                        accessor: "titre",
                        filterable: true,
                        Cell: row => (
                            <div className="flex items-center">
                                {_.capitalize(_.truncate(row.original.titre, {
                                    'length': 25,
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
                                <>
                                    {
                                        parseFloat(row.original.budget).toLocaleString(
                                            'fr', // leave undefined to use the browser's locale,
                                            // or use a string like 'en-US' to override it.
                                            { minimumFractionDigits: 2 }
                                        )
                                    }
                                    &ensp;
                                    {
                                        row.original.currency ? row.original.currency.name : ''
                                    }
                                </>
                            )
                    },
                    {
                        Header: "Activités",
                        accessor: "categories.name",
                        filterable: true,
                        Cell: row =>
                            _.truncate(_.join(_.map(row.original.categories, 'name'), ', '), {
                                'length': 25,
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
                            />
                    },

                    {
                        Header: "Échéance",
                        minWidth: 125,
                        accessor: "dateExpiration",
                        filterable: true,
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
                            />

                    },
                    {
                        Header: "Statut",
                        accessor: "statut",
                        sortable: false,
                        filterable: true,
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
                                                <Chip className={classes.chip} label="Refusée" />
                                            )
                                        :
                                        <Chip className={classes.chip} label="Expirée" />

                                }

                            </div>
                        ),
                        Filter: ({ filter, onChange }) =>
                            <select
                                onChange={event => onChange(event.target.value)}
                                style={{ width: "100%" }}
                                value={filter ? filter.value : ""}
                            >
                                <option value="">Tous</option>
                                <option value="1">En cours</option>
                                <option value="3">Expirée</option>
                            </select>

                    },


                    {
                        Header: "",
                        Cell: row => (
                            <div className="flex items-center">
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
                    fn(parametres);
                }}
                noDataText="Aucune demande en cours pour l'instant"
                loadingText='Chargement...'
                ofText='sur'
            />
        </FuseAnimate>
    );
}

export default withRouter(DemandesTable);
