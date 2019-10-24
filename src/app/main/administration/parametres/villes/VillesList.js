import React, {useEffect, useState} from 'react';
import { Icon, IconButton, Typography, DialogTitle, DialogContent, DialogContentText, DialogActions, Button} from '@material-ui/core';
import {FuseUtils, FuseAnimate} from '@fuse';
import {useDispatch, useSelector} from 'react-redux';
import ReactTable from "react-table";
import * as Actions from './store/actions';
//import VillesMultiSelectMenu from './VillesMultiSelectMenu';

function VillesList(props)
{
    const dispatch = useDispatch();
    const Villes = useSelector(({villesApp}) => villesApp.villes.entities);
    
    //const selectedVillesIds = useSelector(({villesApp}) => villesApp.villes.selectedvillesIds);
    const searchText = useSelector(({villesApp}) => villesApp.villes.searchText);
    
    const [filteredData, setFilteredData] = useState(null);
    useEffect(() => {
        dispatch(Actions.getPays());
    }, [dispatch]);
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

        if ( Villes )
        {
            setFilteredData(getFilteredArray(Villes, searchText));
        }
    }, [Villes, searchText]);

    if ( !filteredData )
    {
        return null;
    }

    if ( filteredData.length === 0 )
    {
        return (
            <div className="flex flex-1 items-center justify-center h-full">
                <Typography color="textSecondary" variant="h5">
                    Il n'y a pas de Villes!
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
                                dispatch(Actions.openEditVillesDialog(rowInfo.original));
                            }
                        }
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
                                    event.target.checked ? dispatch(Actions.selectAllVilles()) : dispatch(Actions.deSelectAllVilles());
                                }}
                                checked={selectedVillesIds.length === Object.keys(Villes).length && selectedVillesIds.length > 0}
                                indeterminate={selectedVillesIds.length !== Object.keys(Villes).length && selectedVillesIds.length > 0}
                            />
                        ),
                        accessor : "",
                        Cell     : row => {
                            return (<Checkbox
                                    onClick={(event) => {
                                        event.stopPropagation();
                                    }}
                                    checked={selectedVillesIds.includes(row.value.id)}
                                    onChange={() => dispatch(Actions.toggleInSelectedVilles(row.value.id))}
                                />
                            )
                        },
                        className: "justify-center",
                        sortable : false,
                        width    : 64
                    },
                    {
                        Header   : () => (
                            selectedVillesIds.length > 0 && (
                                <VillesMultiSelectMenu/>
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
                        Header    : "Id",
                        accessor  : "id",
                        filterable: false,
                    },
                    {
                        Header    : "Villes",
                        accessor  : "name",
                        filterable: true,
                    },       
                    {
                        Header    : "Pays",
                        Cell  : row => (
                            <div className="flex items-center">
                              { row.original.pays ? row.original.pays.name : ''}
                            </div>
                        )
                    },              
                    {
                        Header: "",
                        width : 64,
                        Cell  : row => (
                            <div className="flex items-center">
                               
                                <IconButton className="text-red text-20"
                                    onClick={(ev)=>{
                                        ev.stopPropagation();
                                        dispatch(Actions.openDialog({
                                        children: (
                                            <React.Fragment>
                                                <DialogTitle id="alert-dialog-title">Suppression</DialogTitle>
                                                <DialogContent>
                                                    <DialogContentText id="alert-dialog-description">
                                                    Voulez vous vraiment supprimer cet enregistrement ?
                                                    </DialogContentText>
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button onClick={()=> dispatch(Actions.closeDialog())} color="primary">
                                                        Non
                                                    </Button>
                                                    <Button onClick={(ev) => {
                                                                dispatch(Actions.removeVille(row.original));
                                                                dispatch(Actions.closeDialog())
                                                            }} color="primary" autoFocus>
                                                        Oui
                                                    </Button>
                                                </DialogActions>
                                            </React.Fragment>
                                             )
                                         }))}}
                                >
                                    <Icon>delete</Icon>
                                </IconButton>
                            </div>
                        )
                    }
                ]}
                defaultPageSize={10}
                noDataText="No Ville found"
            />
        </FuseAnimate>
    );
}

export default VillesList;
