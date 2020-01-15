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
function AbonnementsTable(props) {

    const classes = useStyles();
    const dispatch = useDispatch();
    const abonnements = useSelector(({ abonnementOffreApp }) => abonnementOffreApp.abonnements.data);
    const loading = useSelector(({ abonnementOffreApp }) => abonnementOffreApp.abonnements.loading);
    const pageCount = useSelector(({ abonnementOffreApp }) => abonnementOffreApp.abonnements.pageCount);
    const parametres = useSelector(({ abonnementOffreApp }) => abonnementOffreApp.abonnements.parametres);
    const searchText = useSelector(({ abonnementOffreApp }) => abonnementOffreApp.abonnements.searchText);

    const [filteredData, setFilteredData] = useState(null);

    useEffect(() => {
        function getFilteredArray(entities, searchText) {
            const arr = Object.keys(entities).map((id) => entities[id]);
            if (searchText.length === 0) {
                return arr;
            }
            return FuseUtils.filterArrayByString(arr, searchText);
        }

        if (abonnements) {
            setFilteredData(getFilteredArray(abonnements, searchText));
        }
    }, [abonnements, searchText]);



    if (!filteredData) {
        return null;
    }



    return (
        <FuseAnimate animation="transition.slideUpIn" delay={300}>
            <ReactTable
                className="-striped -highlight h-full sm:rounded-16 overflow-hidden"
                getTrProps={(state, rowInfo, column) => {
                    return {
                        className: "h-64",

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
                        id: "reference",
                        accessor: f => f.reference,
                    },
                    {
                        Header: "Offre",
                        className: "font-bold",
                        id: "offre",
                        accessor: f => f.offre.name,
                    },
                    {
                        Header: "Fournisseur",
                        className: "font-bold",
                        id: "fournisseur",
                        accessor: f => f.fournisseur.societe,
                    },
                    {
                        Header: "Mode de paiement",
                        id: "mode",
                        accessor: f => f.mode.name,
                    },
                    {
                        Header: "Activités",
                        accessor: "sousSecteurs.name",
                        filterable: false,
                        Cell: row =>
                            _.truncate(_.join(_.map(row.original.sousSecteurs, 'name'), ', '), {
                                'length': 25,
                                'separator': ' '
                            })

                    },
                    {
                        Header: "Date de création",
                        accessor: "created",
                        filterable: false,
                        Cell: row => moment(row.original.created).format('DD/MM/YYYY HH:mm')
                    },
                    {
                        Header: "Date d'expiration",
                        accessor: "created",
                        filterable: false,
                        Cell: row => moment(row.original.expired).format('DD/MM/YYYY HH:mm')
                    },
                    {
                        Header: "Statut",
                        sortable: false,
                        filterable: false,
                        Cell: row => (
                            <div className="flex items-center">

                                {

                                    row.original.statut === 0
                                        ?
                                        <Chip className={classes.chipOrange} label="En attente" />
                                        :
                                        (
                                            moment(row.original.expired) >= moment()
                                                ?
                                                <Chip className={classes.chip2} label="En cours" />
                                                :
                                                <Chip className={classes.chip} label="Expiré" />
                                        )

                                }

                            </div>
                        )

                    },

                    {
                        Header: "",
                        Cell: row => (
                            <div className="flex items-center">

                                <Tooltip title="Editer" >
                                    <IconButton className="text-orange text-20"
                                        onClick={() =>
                                            props.history.push('/admin/offres/abonnement/' + row.original.id)
                                        }
                                    >
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
                noDataText="No Abonnement found"
                loadingText='Chargement...'
                ofText='sur'
            />
        </FuseAnimate>
    );
}

export default withRouter(AbonnementsTable);
