import React, {useEffect, useState} from 'react';
import { Icon, IconButton, Typography, DialogTitle, DialogContent, DialogContentText, DialogActions, Button} from '@material-ui/core';
import {FuseUtils, FuseAnimate} from '@fuse';
import {useDispatch, useSelector} from 'react-redux';
import ReactTable from "react-table";
import * as Actions from './store/actions';
//import PersonnelsMultiSelectMenu from './PersonnelsMultiSelectMenu';
import moment from 'moment';
function PersonnelsList(props)
{
    const dispatch = useDispatch();
    const personnels = useSelector(({personnelsApp}) => personnelsApp.personnels.entities);
    const user = useSelector(({auth}) => auth.user);
   // const selectedPersonnelsIds = useSelector(({personnelsApp}) => personnelsApp.personnels.selectedPersonnelsIds);
    const searchText = useSelector(({personnelsApp}) => personnelsApp.personnels.searchText);
    
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

        if ( personnels )
        {
            setFilteredData(getFilteredArray(personnels, searchText));
        }
    }, [personnels, searchText]);

    

    if ( !filteredData )
    {
        return null;
    }

    if ( filteredData.length === 0 )
    {
        return (
            <div className="flex flex-1 items-center justify-center h-full">
                <Typography color="textSecondary" variant="h5">
                    Il n'y a pas de personnels!
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
                                dispatch(Actions.openEditPersonnelsDialog(rowInfo.original));
                            }
                        }
                    }
                }}
                data={filteredData}
                columns={[
                   
                   
                   
                    {
                        Header    : "Nom",
                        accessor  : "lastName",
                        filterable: true,
                    },       
                    {
                        Header    : "Prénom",
                        accessor  : "firstName",
                        filterable: true,
                    }, 
                    {
                        Header    : "Email",
                        accessor  : "email",
                        filterable: true,
                    }, 
                    {
                        Header    : "Téléphone",
                        accessor  : "phone",
                        filterable: true,
                    }, 
                    {
                        Header    : "Date de création",
                        Cell  : row => 
                            moment(row.original.created).format('L')
                            
                        
                    }, 
                        
                    {
                        Header: "",
                        width : 64,
                        Cell  : row => (
                            <div className="flex items-center">
                               
                                <IconButton  className="text-red text-20" 
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
                                                                dispatch(Actions.removePersonnel(row.original,user.id));
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
                noDataText="No personnels found"
            />
        </FuseAnimate>
    );
}

export default PersonnelsList;
