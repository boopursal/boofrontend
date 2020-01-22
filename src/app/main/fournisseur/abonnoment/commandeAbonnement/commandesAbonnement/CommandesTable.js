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
function CommandesTable(props) {

    const classes = useStyles();
    const dispatch = useDispatch();
    const commandes = useSelector(({ commandeOffreApp }) => commandeOffreApp.commandes.data);
    const loading = useSelector(({ commandeOffreApp }) => commandeOffreApp.commandes.loading);
    const pageCount = useSelector(({ commandeOffreApp }) => commandeOffreApp.commandes.pageCount);
    const parametres = useSelector(({ commandeOffreApp }) => commandeOffreApp.commandes.parametres);
    const searchText = useSelector(({ commandeOffreApp }) => commandeOffreApp.commandes.searchText);

    const [filteredData, setFilteredData] = useState(null);

    useEffect(() => {
        function getFilteredArray(entities, searchText) {
            const arr = Object.keys(entities).map((id) => entities[id]);
            if (searchText.length === 0) {
                return arr;
            }
            return FuseUtils.filterArrayByString(arr, searchText);
        }

        if (commandes) {
            setFilteredData(getFilteredArray(commandes, searchText));
        }
    }, [commandes, searchText]);



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
                        Header: "Statut",
                        sortable: false,
                        filterable: false,
                        Cell: row => (
                            <div className="flex items-center">

                                {

                                    row.original.statut === false
                                        ?
                                        <Chip className={classes.chipOrange} label="En attente" />
                                        :
                                        <Chip className={classes.chip2} label="Traitée" />


                                }

                            </div>
                        )

                    },
                    {
                        Header: "Durée",
                        sortable: false,
                        filterable: false,
                        Cell: row => (
                            <div className="flex items-center">
                                {
                                    row.original.duree
                                        ?
                                        row.original.duree.name + ' mois'
                                        :
                                       ''
                                }
                            </div>
                        )

                    },



                    {
                        Header: "",
                        Cell: row => (
                            <div className="flex items-center">
                                {row.original.statut === false
                                    ?
                                    <Tooltip title="Editer" >
                                        <IconButton className="text-orange text-20"
                                            onClick={() =>
                                                props.history.push('/offres/commande/' + row.original.id)
                                            }
                                        >
                                            <Icon>edit</Icon>
                                        </IconButton>
                                    </Tooltip>
                                    :
                                    <Tooltip title="Editer" >
                                        <IconButton className="text-grey text-20">
                                            <Icon>edit</Icon>
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
                noDataText="No Commande found"
                loadingText='Chargement...'
                ofText='sur'
            />
        </FuseAnimate>
    );
}

export default withRouter(CommandesTable);
