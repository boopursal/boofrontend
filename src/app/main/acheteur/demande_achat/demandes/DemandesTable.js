import React, { useEffect, useState } from 'react';
import { Icon, IconButton, Typography, Chip, Tooltip } from '@material-ui/core';
import { FuseAnimate } from '@fuse';
import { withRouter } from 'react-router-dom';
import * as Actions from '../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import FuseUtils from '@fuse/FuseUtils';
import ReactTable from "react-table";
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import red from '@material-ui/core/colors/red';

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
function DemandesTable(props) {

    const classes = useStyles();
    const dispatch = useDispatch();
    const demandes = useSelector(({ demandesApp }) => demandesApp.demandes.data);
    const loading = useSelector(({ demandesApp }) => demandesApp.demandes.loading);
    const pageCount = useSelector(({ demandesApp }) => demandesApp.demandes.pageCount);

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



    function handleClick(item) {
        props.history.push('/demandes/' + item.id);
    }

    return (
        <div className="w-full flex flex-col">

            {loading && loading ?

                <div className={classes.root}>
                    <LinearProgress color="secondary" />
                </div>
                :
                <FuseAnimate animation="transition.slideUpIn" delay={300}>

                    <ReactTable
                        className="-striped -highlight h-full sm:rounded-16 overflow-hidden"
                        getTrProps={(state, rowInfo, column) => {
                            return {
                                className: "cursor-pointer",
                                onClick: (e, handleOriginal) => {
                                    if (rowInfo) {
                                        console.log(rowInfo)
                                        props.history.push('/demandes/' + rowInfo.original.id);
                                    }
                                }
                            }
                        }}
                        data={filteredData}
                        columns={[

                            {
                                Header: "Ref",
                                width: 100,
                                
                                accessor: "reference",
                                filterable: false,
                            },

                            {
                                Header: "Description",
                                width: 250,
                                
                                sortable: false,
                                filterable: false,
                                Cell: row => (
                                    <div className="flex items-center">
                                        {_.capitalize(_.truncate(row.original.description, {
                                            'length': 24,
                                            'separator': ' '
                                        }))}
                                    </div>
                                )
                            },
                            {
                                Header: "Secteurs",
                                width: 130,
                                
                                sortable: false,
                                filterable: false,
                                Cell: row =>
                                _.join(_.map(row.original.sousSecteurs,'name'),', ')
                            },
                            {
                                Header: "Date",
                                width: 90,
                                
                                sortable: false,
                                filterable: false,
                                Cell: row => moment(row.original.created).format('L')
                            },
                            {
                                Header: "Échéance",
                                width: 150,
                                
                                sortable: false,
                                filterable: false,
                                Cell: row => (
                                    row.original.dateExpiration = moment(row.original.dateExpiration),
                                    <div className="flex items-center">
                                        {
                                            moment(row.original.dateExpiration).format('L')

                                        }

                                        {
                                            row.original.dateExpiration.diff(moment(), 'days') >= 1
                                                ?
                                                <Chip className={classes.chip2} label={row.original.dateExpiration.diff(moment(), 'days')} />
                                                :
                                                <Chip className={classes.chip} label={row.original.dateExpiration.diff(moment(), 'days')} />

                                        }

                                    </div>
                                )

                            },
                            {
                                Header: "Statut",
                                
                                width: 100,
                                
                                sortable: false,
                                filterable: false,
                                Cell: row => (
                                    row.original.dateExpiration = moment(row.original.dateExpiration),
                                    <div className="flex items-center">

                                        {
                                            row.original.dateExpiration.diff(moment(), 'days') >= 1
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

                            },

                            {
                                Header    : "Public",
                                width: 64,
                                Cell  : row => 
                                row.original.isPublic ?
                                (
                                    <Tooltip title="Public">
                                        <IconButton className="text-green text-20"><Icon>check_circle</Icon>
                                        </IconButton>
                                    </Tooltip>
                                ) :
                                (
                                    <Tooltip title="Privé">
                                        <IconButton className="text-red text-20" ><Icon>remove_circle</Icon>
                                        </IconButton>
                                    </Tooltip>
                                ) 
                               
                                
                            }, 

                            {
                                Header: "",
                                width: 64,
                                Cell: row => (
                                    <div className="flex items-center">

                                        <IconButton className="text-red text-20"
                                            onClick={(ev) => {
                                                ev.stopPropagation();

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
                        // onPageChange={(pageIndex) => {
                        //    parametres.page = pageIndex + 1;
                        //     dispatch(Actions.setParametresData(parametres))
                        //}}

                        /* onSortedChange={(newSorted, column, shiftKey) => {
                             parametres.page = 1;
                             parametres.filter.id = newSorted[0].id;
                             parametres.filter.direction = newSorted[0].desc ? 'desc' : 'asc';
                             dispatch(Actions.setParametresData(parametres))
                         }}*/
                        noDataText="No Demande found"
                        loadingText='Chargement...'
                        ofText='sur'
                    />
                </FuseAnimate>

            }


        </div>
    );
}

export default withRouter(DemandesTable);
