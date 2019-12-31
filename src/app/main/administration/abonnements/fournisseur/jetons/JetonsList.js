import React, { useEffect, useState } from 'react';
import { Icon, IconButton, Typography, Chip } from '@material-ui/core';
import { FuseUtils, FuseAnimate } from '@fuse';
import { useDispatch, useSelector } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip'
import ReactTable from "react-table";
import * as Actions from './store/actions';
import { makeStyles } from '@material-ui/core/styles';
//import JetonsMultiSelectMenu from './JetonsMultiSelectMenu';
import moment from 'moment';

const useStyles = makeStyles(theme => ({

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
function JetonsList(props) {
    const dispatch = useDispatch();
    const Jetons = useSelector(({ jetonsApp }) => jetonsApp.jetons.entities);
    //const selectedJetonsIds = useSelector(({jetonsApp}) => jetonsApp.jetons.selectedJetonsIds);
    const searchText = useSelector(({ jetonsApp }) => jetonsApp.jetons.searchText);
    const classes = useStyles();
    const parametres = useSelector(({ jetonsApp }) => jetonsApp.jetons.parametres);
    const loading = useSelector(({ jetonsApp }) => jetonsApp.jetons.loading);
    const pageCount = useSelector(({ jetonsApp }) => jetonsApp.jetons.pageCount);

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
    const [filteredData, setFilteredData] = useState(null);

    useEffect(() => {
        function getFilteredArray(entities, searchText) {
            const arr = Object.keys(entities).map((id) => entities[id]);
            if (searchText.length === 0) {
                return arr;
            }
            return FuseUtils.filterArrayByString(arr, searchText);
        }

        if (Jetons) {
            setFilteredData(getFilteredArray(Jetons, searchText));
        }
    }, [Jetons, searchText]);


    if (!filteredData) {
        return null;
    }

    if (filteredData.length === 0) {
        return (
            <div className="flex flex-1 items-center justify-center h-full">
                <Typography color="textSecondary" variant="h5">
                    Il n'y a pas de Jetons!
                </Typography>
            </div>
        );
    }

    return (

        <FuseAnimate animation="transition.slideUpIn" delay={300}>

            <ReactTable
                className="-striped -highlight h-full sm:rounded-16 overflow-hidden"

                getTheadProps={(state, rowInfo, column) => {
                    return {
                        className: "h-64 font-bold",

                    }
                }}
                data={filteredData}
                columns={[

                    {
                        Header: "N° commande",
                        className: "font-bold",
                        id: "demande",
                        accessor: d => d.demande ? d.demande.id : 'Sans commande',
                    },
                    {
                        Header: "Nombre de jetons",
                        accessor: "nbrJeton",
                    },

                    {
                        Header: "Mode de paiement",
                        id: "paiement",
                        accessor: d => d.paiement.name,
                    },
                    {
                        Header: "Prix",
                        id: "prix",
                        accessor: d => parseFloat(d.prix).toLocaleString(
                            'fr', // leave undefined to use the browser's locale,
                            // or use a string like 'en-US' to override it.
                            { minimumFractionDigits: 2 }
                        ) + ' Dhs ',
                    },
                    {
                        Header: "Fournisseur",
                        className: "font-bold",
                        id: "fournisseur",
                        accessor: d => d.fournisseur.societe,
                    },

                    {
                        Header: "ُEtat",
                        id: "isPayed",
                        accessor: d => d.isPayed ?
                            <Chip className={classes.chip2} label="Payé" /> :
                            <Chip className={classes.chipOrange} label="En attente de paiement" />,
                    },
                    {
                        Header: "Date de création",
                        id: "created",
                        accessor: d => moment(d.created).format('DD/MM/YYYY HH:mm'),
                    },
/*
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
                                                            {
                                                                !row.original.isPayed ?
                                                                    'Voulez vous vraiment supprimer cet enregistrement ?'
                                                                    :
                                                                    'Vous ne pouvez pas supprimer cet enregistrement, car il est traité!'
                                                            }
                                                        </DialogContentText>
                                                    </DialogContent>
                                                    <DialogActions>
                                                        <Button onClick={() => dispatch(Actions.closeDialog())} color="primary">
                                                            Non
                                                    </Button>
                                                        {
                                                            !row.original.isPayed ?
                                                                <Button
                                                                    onClick={(ev) => {
                                                                        dispatch(Actions.removeJeton(row.original, parametres));
                                                                        dispatch(Actions.closeDialog())
                                                                    }} color="primary"
                                                                    autoFocus>
                                                                    Oui
                                                                </Button>
                                                                :
                                                                <Button
                                                                    disabled
                                                                    color="primary"
                                                                    autoFocus>
                                                                    Oui
                                                                </Button>
                                                        }

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
                    },
                    */
                    {
                        Header: "",
                        sortable: false,
                        width: 64,
                        Cell: row => (
                            <div className="flex items-center">
                                <IconButton className="text-orange text-20"
                                    onClick={(ev) => {
                                        ev.stopPropagation();
                                        dispatch(Actions.openEditJetonsDialog(row.original));
                                    }}>
                                    <Icon>edit</Icon>
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
                    dispatch(Actions.setParametresData(parametres))
                }}

                onSortedChange={(newSorted, column, shiftKey) => {
                    parametres.page = 1;
                    parametres.filter.id = newSorted[0].id;
                    parametres.filter.direction = newSorted[0].desc ? 'desc' : 'asc';
                    dispatch(Actions.setParametresData(parametres))
                }}
                noDataText="Aucun jeton trouvé"
                loadingText='Chargement...'
                ofText='sur'
            />
        </FuseAnimate>
    );
}

export default JetonsList;
