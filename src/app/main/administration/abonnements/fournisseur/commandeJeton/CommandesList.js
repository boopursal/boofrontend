import React, { useEffect, useState } from 'react';
import { Icon, IconButton, Typography, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Chip } from '@material-ui/core';
import { FuseUtils, FuseAnimate } from '@fuse';
import { useDispatch, useSelector } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip'
import ReactTable from "react-table";
import * as Actions from './store/actions';
import { makeStyles } from '@material-ui/core/styles';
//import CommandesMultiSelectMenu from './CommandesMultiSelectMenu';
import _ from '@lodash';
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
function CommandesList(props) {
    const dispatch = useDispatch();
    const Commandes = useSelector(({ commandesApp }) => commandesApp.commandes.entities);
    //const selectedCommandesIds = useSelector(({commandesApp}) => commandesApp.commandes.selectedCommandesIds);
    const searchText = useSelector(({ commandesApp }) => commandesApp.commandes.searchText);
    const classes = useStyles();
    const parametres = useSelector(({ commandesApp }) => commandesApp.commandes.parametres);
    const loading = useSelector(({ commandesApp }) => commandesApp.commandes.loading);
    const pageCount = useSelector(({ commandesApp }) => commandesApp.commandes.pageCount);

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

        if (Commandes) {
            setFilteredData(getFilteredArray(Commandes, searchText));
        }
    }, [Commandes, searchText]);


    if (!filteredData) {
        return null;
    }

    if (filteredData.length === 0) {
        return (
            <div className="flex flex-1 items-center justify-center h-full">
                <Typography color="textSecondary" variant="h5">
                    Il n'y a pas de Commandes!
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
                                dispatch(Actions.openEditCommandesDialog(rowInfo.original));
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
                        Header: "Commande N°",
                        accessor: "id",
                    },
                    {
                        Header: "Nombre de jetons",
                        accessor: "nbrJeton",
                    },
                    {
                        Header: "Fournisseur",
                        className: "font-bold",
                        id: "fournisseur",
                        accessor: d => d.fournisseur.societe,
                    },
                    {
                        Header: "ُEtat",
                        id: "isUse",
                        accessor: d => d.isUse ?
                            <Chip className={classes.chip2} label="Traité" /> :
                            <Chip className={classes.chipOrange} label="En attente" />,
                    },
                    {
                        Header: "Date de commande",
                        id: "created",
                        accessor: d => moment(d.created).format('DD/MM/YYYY HH:mm'),
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
                                                            {
                                                                !row.original.isUse ?
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
                                                            !row.original.isUse ?
                                                                <Button
                                                                    onClick={(ev) => {
                                                                        dispatch(Actions.removeCommande(row.original, parametres));
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
                noDataText="Aucune commande trouvée"
                loadingText='Chargement...'
                ofText='sur'
            />
        </FuseAnimate>
    );
}

export default CommandesList;
