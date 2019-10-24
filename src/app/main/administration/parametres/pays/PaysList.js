import React, {useEffect, useState} from 'react';
import { Icon, IconButton, Typography, DialogTitle, DialogContent, DialogContentText, DialogActions, Button} from '@material-ui/core';
import {FuseUtils, FuseAnimate} from '@fuse';
import {useDispatch, useSelector} from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip'
import ReactTable from "react-table";
import * as Actions from './store/actions';
//import PaysMultiSelectMenu from './PaysMultiSelectMenu';
import _ from '@lodash';
function PaysList(props)
{
    const dispatch = useDispatch();
    const pays = useSelector(({paysApp}) => paysApp.pays.entities);
   // const selectedPaysIds = useSelector(({paysApp}) => paysApp.pays.selectedPaysIds);
    const searchText = useSelector(({paysApp}) => paysApp.pays.searchText);
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
        function getFilteredArray(entities, searchText)
        {
            const arr = Object.keys(entities).map((id) => entities[id]);
            if ( searchText.length === 0 )
            {
                return arr;
            }
            return FuseUtils.filterArrayByString(arr, searchText);
        }

        if ( pays )
        {
            setFilteredData(getFilteredArray(pays, searchText));
        }
    }, [pays, searchText]);

  

    if ( !filteredData )
    {
        return null;
    }

    if ( filteredData.length === 0 )
    {
        return (
            <div className="flex flex-1 items-center justify-center h-full">
                <Typography color="textSecondary" variant="h5">
                    Il n'y a pas de pays!
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
                                dispatch(Actions.openEditPaysDialog(rowInfo.original));
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
                                    event.target.checked ? dispatch(Actions.selectAllPays()) : dispatch(Actions.deSelectAllPays());
                                }}
                                checked={selectedPaysIds.length === Object.keys(pays).length && selectedPaysIds.length > 0}
                                indeterminate={selectedPaysIds.length !== Object.keys(pays).length && selectedPaysIds.length > 0}
                            />
                        ),
                        accessor : "",
                        Cell     : row => {
                            return (<Checkbox
                                    onClick={(event) => {
                                        event.stopPropagation();
                                    }}
                                    checked={selectedPaysIds.includes(row.value.id)}
                                    onChange={() => dispatch(Actions.toggleInSelectedPays(row.value.id))}
                                />
                            )
                        },
                        className: "justify-center",
                        sortable : false,
                        width    : 64
                    },
                    {
                        Header   : () => (
                            selectedPaysIds.length > 0 && (
                                <PaysMultiSelectMenu/>
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
                        Header    : "Pays",
                        accessor  : "name",
                        filterable: true,
                    },       
                    {
                        Header    : "Nbr Villes",
                        className : "font-bold",
                        Cell  : row => (
                            <div className="flex items-center">
                               <HtmlTooltip
                                    title={
                                    <React.Fragment>
                                        
                                        {
                                            
                                            Object.keys(_.pullAllBy(row.original.villes, [{ 'del': true }], 'del')).length === 0 ? 'Il n\'y aucune ville' : 
                                            <ul> 
                                            { 
                                                _.map(_.pullAllBy(row.original.villes, [{ 'del': true }], 'del'), function(value, key) {
                                                return <li key={key}> {value.name} </li>;
                                                })
                                            }
                                          </ul>
                                        }
                                       
                                    </React.Fragment>
                                    }
                                >
                                    <Button onClick={(ev)=>{ev.stopPropagation();}} >
                                        {Object.keys(_.pullAllBy(row.original.villes, [{ 'del': true }], 'del')).length}
                                    </Button>
                                </HtmlTooltip>
                               
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
                                                                dispatch(Actions.removePays(row.original));
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
                noDataText="No pays found"
            />
        </FuseAnimate>
    );
}

export default PaysList;
