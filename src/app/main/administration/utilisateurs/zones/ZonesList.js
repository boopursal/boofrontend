import React, {useEffect, useState} from 'react';
import { Icon, IconButton, Typography, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Avatar} from '@material-ui/core';
import {FuseUtils, FuseAnimate} from '@fuse';
import {useDispatch, useSelector} from 'react-redux';
import Tooltip from '@material-ui/core/Tooltip'
import ReactTable from "react-table";
import * as Actions from './store/actions';
//import AdminsMultiSelectMenu from './AdminsMultiSelectMenu';
import moment from 'moment';
import _ from '@lodash';
import { withStyles } from '@material-ui/core/styles';


function ZonesList(props)
{
    const dispatch = useDispatch();
    const Zones = useSelector(({zonesApp}) => zonesApp.zones.entities);
    
    //const selectedZonesIds = useSelector(({zonesApp}) => zonesApp.zones.selectedzonesIds);
    const searchText = useSelector(({zonesApp}) => zonesApp.zones.searchText);
    
    const [filteredData, setFilteredData] = useState(null);
    
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

        if ( Zones )
        {
            setFilteredData(getFilteredArray(Zones, searchText));
        }
    }, [Zones, searchText]);

   

    if ( !filteredData )
    {
        return null;
    }

    if ( filteredData.length === 0 )
    {
        return (
            <div className="flex flex-1 items-center justify-center h-full">
                <Typography color="textSecondary" variant="h5">
                    Il n'y a pas d'Admins commerciales!
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
                                dispatch(Actions.openEditZonesDialog(rowInfo.original));
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
                                    event.target.checked ? dispatch(Actions.selectAllZones()) : dispatch(Actions.deSelectAllZones());
                                }}
                                checked={selectedZonesIds.length === Object.keys(Zones).length && selectedZonesIds.length > 0}
                                indeterminate={selectedZonesIds.length !== Object.keys(Zones).length && selectedZonesIds.length > 0}
                            />
                        ),
                        accessor : "",
                        Cell     : row => {
                            return (<Checkbox
                                    onClick={(event) => {
                                        event.stopPropagation();
                                    }}
                                    checked={selectedZonesIds.includes(row.value.id)}
                                    onChange={() => dispatch(Actions.toggleInSelectedZones(row.value.id))}
                                />
                            )
                        },
                        className: "justify-center",
                        sortable : false,
                        width    : 64
                    },
                    {
                        Header   : () => (
                            selectedZonesIds.length > 0 && (
                                <ZonesMultiSelectMenu/>
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
                        width    : 64,
                    },
                    {
                        Header   : "",
                        Cell     : row => 

                            row.original.avatar ?
                            <Avatar className="mr-8" alt={row.original.firstName} src={FuseUtils.getUrl()+row.original.avatar.url}/>
                            : 
                            <Avatar className="mr-8" alt={row.original.firstName} src="assets/images/avatars/images.png"/>
                        
                        ,
                        className: "justify-center",
                        width    : 64,
                        sortable : false
                    },
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
                        Header    : "Nbr.Pays",
                        className : "font-bold",
                        Cell  : row => (
                            <div className="flex items-center">
                               <HtmlTooltip
                                    title={
                                    <React.Fragment>
                                        
                                        {
                                            Object.keys(row.original.pays).length === 0 ? 'Il n\'y aucun pays' : 
                                            <ul> 
                                            { 
                                                _.map(row.original.pays, function(value, key) {
                                                return <li key={key}> {value.name} </li>;
                                                })
                                            }
                                          </ul>
                                        }
                                       
                                    </React.Fragment>
                                    }
                                >
                                    <Button onClick={(ev)=>{ev.stopPropagation();}} >
                                        {Object.keys(row.original.pays).length}
                                    </Button>
                                </HtmlTooltip>
                               
                            </div>
                        )
                    }, 
                    {
                        Header    : "Statut",
                        Cell  : row => 
                        
                        row.original.isactif ?
                        (
                            <Tooltip title="Activé">
                                <IconButton className="text-green text-20"   onClick={(ev)=>{
                                    ev.stopPropagation();
                                    dispatch(Actions.activeAccount(row.original,false))
                                    
                                }}><Icon>check_circle</Icon>
                                </IconButton>
                            </Tooltip>
                        ) :
                        (
                            <Tooltip title="Désactivé">
                                <IconButton className="text-red text-20"   onClick={(ev)=>{
                                    ev.stopPropagation();
                                    dispatch(Actions.activeAccount(row.original,true));
                                }}><Icon>remove_circle</Icon>
                                </IconButton>
                            </Tooltip>
                        ) 
                       
                    },         
                                 
                    {
                        Header: "",
                        width : 64,
                        Cell  : row => (
                            <div className="flex items-center">
                               
                                <IconButton
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
                                                                dispatch(Actions.removeZone(row.original));
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
                noDataText="No Admin commercials found"
            />
        </FuseAnimate>
    );
}

export default ZonesList;
