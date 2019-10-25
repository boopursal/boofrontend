import React, {useEffect, useState} from 'react';
import { Icon, IconButton, Typography, DialogTitle, DialogContent, DialogContentText, DialogActions, Button} from '@material-ui/core';
import {FuseUtils, FuseAnimate} from '@fuse';
import {useDispatch, useSelector} from 'react-redux';
import ReactTable from "react-table";
import * as Actions from './store/actions';
//import VillesMultiSelectMenu from './VillesMultiSelectMenu';
import _ from '@lodash';
import Tooltip from '@material-ui/core/Tooltip'
import { withStyles } from '@material-ui/core/styles';

function VillesList(props)
{
    const dispatch = useDispatch();
    const Villes = useSelector(({villesApp}) => villesApp.villes.entities);
    const pageCount = useSelector(({villesApp}) => villesApp.villes.pageCount);
    const loading = useSelector(({villesApp}) => villesApp.villes.loading);
    const parametres = useSelector(({villesApp}) => villesApp.villes.parametres);
    //const selectedVillesIds = useSelector(({villesApp}) => villesApp.villes.selectedvillesIds);
    const searchText = useSelector(({villesApp}) => villesApp.villes.searchText);
    
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
                        filterable: false,
                    },       
                    {
                        Header    : "Pays",
                        accessor  : "pays",
                        
                        Cell  : row => (
                            <div className="flex items-center">
                              { row.original.pays ? row.original.pays.name : ''}
                            </div>
                        )
                    },   
                    {
                        Header    : "Fournisseurs",
                        sortable: false,                        
                        className : "font-bold",
                        Cell  : row => (
                            <div className="flex items-center">
                               <HtmlTooltip
                                    title={
                                    <React.Fragment>
                                        
                                        {
                                            
                                            Object.keys(_.pullAllBy(row.original.fournisseurs, [{ 'del': true }], 'del')).length === 0 ? 'Il n\'y aucun fournisseurs' : 
                                            <ul> 
                                            { 
                                                _.map(_.pullAllBy(row.original.fournisseurs, [{ 'del': true }], 'del'), function(value, key) {
                                                return <li key={key}> {value.firstName+' '+value.lastName} </li>;
                                                })
                                            }
                                          </ul>
                                        }
                                       
                                    </React.Fragment>
                                    }
                                >
                                    <Button onClick={(ev)=>{ev.stopPropagation();}} >
                                        {Object.keys(_.pullAllBy(row.original.fournisseurs, [{ 'del': true }], 'del')).length}
                                    </Button>
                                </HtmlTooltip>
                               
                            </div>
                        )
                    }, 
                    {
                        Header    : "Acheteurs",
                        sortable: false,                        
                        className : "font-bold",
                        Cell  : row => (
                            <div className="flex items-center">
                               <HtmlTooltip
                                    title={
                                    <React.Fragment>
                                        
                                        {
                                            
                                            Object.keys(_.pullAllBy(row.original.acheteurs, [{ 'del': true }], 'del')).length === 0 ? 'Il n\'y aucun acheteurs' : 
                                            <ul> 
                                            { 
                                                _.map(_.pullAllBy(row.original.acheteurs, [{ 'del': true }], 'del'), function(value, key) {
                                                return <li key={key}> {value.firstName+' '+value.lastName} </li>;
                                                })
                                            }
                                          </ul>
                                        }
                                       
                                    </React.Fragment>
                                    }
                                >
                                    <Button onClick={(ev)=>{ev.stopPropagation();}} >
                                        {Object.keys(_.pullAllBy(row.original.acheteurs, [{ 'del': true }], 'del')).length}
                                    </Button>
                                </HtmlTooltip>
                               
                            </div>
                        )
                    },
                    {
                        Header    : "Commercials",
                        sortable: false,                        
                        className : "font-bold",
                        Cell  : row => (
                            <div className="flex items-center">
                               <HtmlTooltip
                                    title={
                                    <React.Fragment>
                                        
                                        {
                                            
                                            Object.keys(_.pullAllBy(row.original.commercials, [{ 'del': true }], 'del')).length === 0 ? 'Il n\'y aucun commercial' : 
                                            <ul> 
                                            { 
                                                _.map(_.pullAllBy(row.original.commercials, [{ 'del': true }], 'del'), function(value, key) {
                                                return <li key={key}> {value.firstName+' '+value.lastName} </li>;
                                                })
                                            }
                                          </ul>
                                        }
                                       
                                    </React.Fragment>
                                    }
                                >
                                    <Button onClick={(ev)=>{ev.stopPropagation();}} >
                                        {Object.keys(_.pullAllBy(row.original.commercials, [{ 'del': true }], 'del')).length}
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
                                                    {
                                                        (Object.keys(_.pullAllBy(row.original.fournisseurs, [{ 'del': true }], 'del')).length === 0 && Object.keys(_.pullAllBy(row.original.acheteurs, [{ 'del': true }], 'del')).length === 0  && Object.keys(_.pullAllBy(row.original.commercials, [{ 'del': true }], 'del')).length === 0 ) ? 
                                                        'Voulez vous vraiment supprimer cet enregistrement ?'
                                                        :
                                                        'Vous ne pouvez pas supprimer cet enregistrement, car il est en relation avec d\'autre(s) objet(s) !'
                                                    }
                                                    </DialogContentText>
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button onClick={()=> dispatch(Actions.closeDialog())} color="primary">
                                                        Non
                                                    </Button>
                                                    {
                                                        (
                                                            Object.keys(_.pullAllBy(row.original.fournisseurs, [{ 'del': true }], 'del')).length === 0 
                                                            && Object.keys(_.pullAllBy(row.original.acheteurs, [{ 'del': true }], 'del')).length === 0 
                                                            && Object.keys(_.pullAllBy(row.original.commercials, [{ 'del': true }], 'del')).length === 0 
                                                        ) 
                                                        ? 
                                                        <Button onClick={(ev) => {
                                                                    dispatch(Actions.removeVille(row.original));
                                                                    dispatch(Actions.closeDialog())
                                                                }} color="primary" autoFocus>
                                                            Oui
                                                        </Button>
                                                        :
                                                        <Button disabled  color="primary" autoFocus>
                                                            Oui
                                                        </Button>
                                                    }
                                                   
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
                manual
                pages={pageCount}
                defaultPageSize={10}
                loading={loading}
                showPageSizeOptions={false}
                onPageChange={(pageIndex) => {
                    parametres.page = pageIndex+1;
                    dispatch(Actions.setParametresData(parametres))
                }}
                
                onSortedChange={(newSorted, column, shiftKey) => {
                    parametres.page = 1;
                    parametres.filter.id=newSorted[0].id ==='pays'?'pays.id':newSorted[0].id;
                    parametres.filter.direction=newSorted[0].desc? 'desc' : 'asc' ;
                    dispatch(Actions.setParametresData(parametres))
                }}
                noDataText="No ville found"
                loadingText='Chargement...'
                ofText= 'sur'
            />
        </FuseAnimate>
    );
}

export default VillesList;
