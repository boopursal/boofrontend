import React, {useEffect, useState} from 'react';
import { Icon, IconButton, Typography,  Tooltip} from '@material-ui/core';
import {FuseUtils, FuseAnimate} from '@fuse';
import {useDispatch, useSelector} from 'react-redux';
import ReactTable from "react-table";
import * as Actions from './store/actions';
import moment from 'moment';

//import BlackListesMultiSelectMenu from './BlackListesMultiSelectMenu';
function BlackListesList(props)
{
    const dispatch = useDispatch();
    const BlackListes = useSelector(({blackListesApp}) => blackListesApp.blackListes.entities);
    //const selectedBlackListesIds = useSelector(({blackListesApp}) => blackListesApp.blackListes.selectedBlackListesIds);
    const searchText = useSelector(({blackListesApp}) => blackListesApp.blackListes.searchText);
    const user = useSelector(({ auth }) => auth.user);
    
 
    const [filteredData, setFilteredData] = useState(null);

    useEffect(() => {
        function getFilteredArray(entities, searchText)
        {
            const arr = Object.keys(entities).map((id) => entities[id]);
            if ( searchText.length === 0 )
            {
                return arr;
            }
            return FuseUtils.filterArrayByString(arr, searchText);
        }

        if ( BlackListes )
        {
            setFilteredData(getFilteredArray(BlackListes, searchText));
        }
    }, [BlackListes, searchText]);

  
    if ( !filteredData )
    {
        return null;
    }

    if ( filteredData.length === 0 )
    {
        return (
            <div className="flex flex-1 items-center justify-center h-full">
                <Typography color="textSecondary" variant="h5">
                    Il n'y a pas de BlackListes!
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
                        onClick  : (e, handleOriginal) => {
                            if ( rowInfo )
                            {
                                dispatch(Actions.openEditBlackListesDialog(rowInfo.original));
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
                   /* {
                        Header   : () => (
                            <Checkbox
                                onClick={(event) => {
                                    event.stopPropagation();
                                }}
                                onChange={(event) => {
                                    event.target.checked ? dispatch(Actions.selectAllBlackListes()) : dispatch(Actions.deSelectAllBlackListes());
                                }}
                                checked={selectedBlackListesIds.length === Object.keys(BlackListes).length && selectedBlackListesIds.length > 0}
                                indeterminate={selectedBlackListesIds.length !== Object.keys(BlackListes).length && selectedBlackListesIds.length > 0}
                            />
                        ),
                        accessor : "",
                        Cell     : row => {
                            return (<Checkbox
                                    onClick={(event) => {
                                        event.stopPropagation();
                                    }}
                                    checked={selectedBlackListesIds.includes(row.value.id)}
                                    onChange={() => dispatch(Actions.toggleInSelectedBlackListes(row.value.id))}
                                />
                            )
                        },
                        className: "justify-center",
                        sortable : false,
                        width    : 64
                    },
                    {
                        Header   : () => (
                            selectedBlackListesIds.length > 0 && (
                                <BlackListesMultiSelectMenu/>
                            )
                        ),
                        width    : 40,
                        accessor : "",
                        Cell  : row => (
                            <div className="items-center">
                               
                            </div>
                        )
                    },*/
                    {
                        Header: "Fournisseur",
                        className : "font-bold",
                        filterable:true,
                        id: "fournisseur",
                        accessor: f => f.fournisseur.societe,
                    },
                    {
                        Header    : "Raison",
                        accessor  : "raison",
                        filterable:true,
                        className : "font-bold"
                    }, 
                    {
                        Header: "Date de blackListe",
                        id: "created",
                        accessor: d => moment(d.created).format('DD/MM/YYYY HH:mm'),
                    },   
                    {
                        Header: "Date de déblackListe",
                        id: "deblacklister",
                        accessor: d => moment(d.deblacklister).format('DD/MM/YYYY HH:mm'),
                    },  
                    {
                        Header: "Etat",
                        accessor: "etat",
                        Cell: row =>
                            row.original.etat ?
                                (
                                    <Tooltip title="Blacklister">
                                        <IconButton className="text-red text-20" onClick={(ev) => {
                                            ev.stopPropagation();
                                            dispatch(Actions.removeBlackListe(row.original, false, user.id))

                                        }}>
                                            <Icon>remove_circle</Icon>
                                        </IconButton>
                                    </Tooltip>
                                ) :
                                (
                                    <Tooltip title="Déblacklister">
                                        <IconButton className="text-green text-20" onClick={(ev) => {
                                            ev.stopPropagation();
                                            dispatch(Actions.removeBlackListe(row.original, true, user.id))

                                        }} >
                                            <Icon>check_circle</Icon>
                                        </IconButton>
                                    </Tooltip>
                                )


                    },    
                            
                    
                ]}
                defaultPageSize={10}
               
                noDataText="No BlackListe found"
                ofText='sur'
            />
        </FuseAnimate>
    );
}

export default BlackListesList;
