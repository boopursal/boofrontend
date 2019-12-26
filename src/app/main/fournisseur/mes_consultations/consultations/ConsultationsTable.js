import React, { useEffect, useState } from 'react';
import { Icon, IconButton, Chip, Tooltip } from '@material-ui/core';
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
function ConsultationsTable(props) {

    const classes = useStyles();
    const dispatch = useDispatch();
    const consultations = useSelector(({ consultationsApp }) => consultationsApp.consultations.data);
    const loading = useSelector(({ consultationsApp }) => consultationsApp.consultations.loading);
    const pageCount = useSelector(({ consultationsApp }) => consultationsApp.consultations.pageCount);
    const parametres = useSelector(({ consultationsApp }) => consultationsApp.consultations.parametres);

    const searchText = useSelector(({ consultationsApp }) => consultationsApp.consultations.searchText);

    const [filteredData, setFilteredData] = useState(null);
    const user = useSelector(({ auth }) => auth.user);

    useEffect(() => {
        function getFilteredArray(entities, searchText) {
            const arr = Object.keys(entities).map((id) => entities[id]);
            if (searchText.length === 0) {
                return arr;
            }
            return FuseUtils.filterArrayByString(arr, searchText);
        }

        if (consultations) {
            setFilteredData(getFilteredArray(consultations, searchText));
        }
    }, [consultations, searchText]);



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
                                props.history.push('/consultations/' + rowInfo.original.id);
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
                        Header: "Ref",
                        className: "font-bold",
                        id: "reference",
                        accessor: p => p.demande.reference ? 'RFQ-' + p.demande.reference : ''
                    },

                    {
                        Header: "État",
                        sortable: false,
                        filterable: false,
                        Cell: row => (
                            <div className="flex items-center">

                                {
                                    moment(row.original.demande.dateExpiration) >= moment()
                                        ?
                                        row.original.demande.statut === 0
                                            ?
                                            <strong className="text-orange">En attente</strong> 
                                            :
                                            (row.original.demande.statut === 1 ? 
                                                <strong className="text-green">En cours</strong>
                                                :
                                                <Chip className={classes.chip} label="Refusé" />
                                            )
                                        :
                                        <strong className="text-red">Expiré</strong>

                                }

                            </div>
                        )

                    },
                    {
                        Header: "Affecté à",
                        className: "font-bold",
                        id: "personnel",
                        accessor: p => p.personnel?  p.personnel.name : ''
                    },
                    {
                        Header: "Budget",
                        className: "font-bold",
                        sortable: false,
                        filterable: false,
                        Cell: row => (
                            <div className="flex items-center">

                                {
                                   row.original.budget
                                }
                                &ensp;
                                {
                                   user.data && user.data.currency ? user.data.currency :''
                                }
                            </div>
                        )

                    },
                   
                    {
                        Header: "Societé",
                        className: "font-bold",
                        id: "acheteur",
                        accessor: p =>
                            (
                                <div className="flex items-center">
                                    {p.demande.acheteur.societe}
                                    <Tooltip title={p.demande.acheteur.firstName + ' ' + p.demande.acheteur.lastName} >
                                        <Icon>account_circle</Icon>
                                    </Tooltip>
                                </div>
                            ),
                    },
                    {
                        Header: "Description",
                        accessor: "description",
                        filterable: false,
                        Cell: row => (
                            <div className="flex items-center">
                                {_.capitalize(_.truncate(row.original.demande.description, {
                                    'length': 15,
                                    'separator': ' '
                                }))}
                            </div>
                        )
                    },

                    {
                        Header: "Date d'éxpiration",
                        filterable: false,
                        Cell: row => (
                            <div className="flex items-center">
                                {
                                    moment(row.original.demande.dateExpiration).format('DD/MM/YYYY HH:mm')

                                }

                                {
                                    moment(row.original.demande.dateExpiration) >= moment()
                                        ?

                                        <Chip className={classes.chip2} label={moment(row.original.demande.dateExpiration).diff(moment(), 'days') === 0 ? moment(row.original.demande.dateExpiration).diff(moment(), 'hours') + ' h' : moment(row.original.demande.dateExpiration).diff(moment(), 'days') + ' j'} />
                                        :
                                        <Chip className={classes.chip} label={moment(row.original.demande.dateExpiration).diff(moment(), 'days') === 0 ? moment(row.original.demande.dateExpiration).diff(moment(), 'hours') + ' h' : moment(row.original.demande.dateExpiration).diff(moment(), 'days') + ' j'} />

                                }

                            </div>
                        )

                    },
                    {
                        Header: "Statut",
                        sortable: false,
                        filterable: false,
                        Cell: row => (
                            <div className="flex items-center">

                                {
                                    row.original.statut === 0 ?
                                        <Chip className={classes.chipOrange} label="En cours" />
                                        : row.original.statut === 1 ?
                                            <Chip className={classes.chip2} label="Gagner" />
                                            :
                                            <Chip className={classes.chip} label="Perdue" />

                                }

                            </div>
                        )

                    },
                    {
                        Header: "",
                        Cell: row => (
                            <div className="flex items-center">
                                {
                                    <Tooltip title="Détails" >
                                        <IconButton className="text-teal text-20">
                                            <Icon>remove_red_eye</Icon>
                                        </IconButton>
                                    </Tooltip>
                                }
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
                noDataText="No Consultation found"
                loadingText='Chargement...'
                ofText='sur'
            />
        </FuseAnimate>
    );
}

export default withRouter(ConsultationsTable);
