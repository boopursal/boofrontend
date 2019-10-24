import React, {useEffect, useState} from 'react';
import { Icon, IconButton, Typography, DialogTitle, DialogContent, DialogContentText, DialogActions, Button} from '@material-ui/core';
import {FuseUtils, FuseAnimate} from '@fuse';
import {useDispatch, useSelector} from 'react-redux';
import ReactTable from "react-table";
import * as Actions from './store/actions';
//import SousSecteursMultiSelectMenu from './SousSecteursMultiSelectMenu';
import _ from '@lodash';
import Tooltip from '@material-ui/core/Tooltip'
import { withStyles  } from '@material-ui/core/styles';

function SousSecteursList(props)
{
    const dispatch = useDispatch();
    const SousSecteurs = useSelector(({sous_secteursApp}) => sous_secteursApp.sous_secteurs.entities);
    const pageCount = useSelector(({sous_secteursApp}) => sous_secteursApp.sous_secteurs.pageCount);
    const loading = useSelector(({sous_secteursApp}) => sous_secteursApp.sous_secteurs.loading);
    
    //const selectedSousSecteursIds = useSelector(({sous_secteursApp}) => sous_secteursApp.sous_secteurs.selectedsous_secteursIds);
    const searchText = useSelector(({sous_secteursApp}) => sous_secteursApp.sous_secteurs.searchText);
    
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
        dispatch(Actions.getSecteurs());
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

        if ( SousSecteurs )
        {
            setFilteredData(getFilteredArray(SousSecteurs, searchText));
        }
    }, [SousSecteurs, searchText]);

 
    if ( !filteredData )
    {
        return null;
    }

    if ( filteredData.length === 0 )
    {
        return (
            <div className="flex flex-1 items-center justify-center h-full">
                <Typography color="textSecondary" variant="h5">
                    Il n'y a pas de SousSecteurs!
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
                                dispatch(Actions.openEditSousSecteursDialog(rowInfo.original));
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
                                    event.target.checked ? dispatch(Actions.selectAllSousSecteurs()) : dispatch(Actions.deSelectAllSousSecteurs());
                                }}
                                checked={selectedSousSecteursIds.length === Object.keys(SousSecteurs).length && selectedSousSecteursIds.length > 0}
                                indeterminate={selectedSousSecteursIds.length !== Object.keys(SousSecteurs).length && selectedSousSecteursIds.length > 0}
                            />
                        ),
                        accessor : "",
                        Cell     : row => {
                            return (<Checkbox
                                    onClick={(event) => {
                                        event.stopPropagation();
                                    }}
                                    checked={selectedSousSecteursIds.includes(row.value.id)}
                                    onChange={() => dispatch(Actions.toggleInSelectedSousSecteurs(row.value.id))}
                                />
                            )
                        },
                        className: "justify-center",
                        sortable : false,
                        width    : 64
                    },
                    {
                        Header   : () => (
                            selectedSousSecteursIds.length > 0 && (
                                <SousSecteursMultiSelectMenu/>
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
                        Header    : "Nom",
                        accessor  : "name",
                        filterable: true,
                    },       
                    {
                        Header    : "Secteur",
                        Cell  : row => (
                            <div className="flex items-center">
                              { row.original.secteur ? row.original.secteur.name : ''}
                            </div>
                        )
                    },  
                    {
                        Header    : "Nbr Acheteurs",
                        className : "font-bold",
                        Cell  : row => (
                            <div className="flex items-center">
                               <HtmlTooltip
                                    title={
                                    <React.Fragment>
                                        
                                        {
                                            Object.keys(_.pullAllBy(row.original.acheteurs, [{ 'del': true }], 'del')).length === 0 ? 'Il n\'y aucun Acheteur' : 
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
                        Header    : "Nbr Fournisseurs",
                        className : "font-bold",
                        Cell  : row => (
                            <div className="flex items-center">
                               <HtmlTooltip
                                    title={
                                    <React.Fragment>
                                        
                                        {
                                            Object.keys(_.pullAllBy(row.original.fournisseurs, [{ 'del': true }], 'del')).length === 0 ? 'Il n\'y aucun Fournisseur' : 
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
                                                        (Object.keys(_.pullAllBy(row.original.fournisseurs, [{ 'del': true }], 'del')).length === 0 && Object.keys(_.pullAllBy(row.original.acheteurs, [{ 'del': true }], 'del')).length === 0 ) ? 
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
                                                        (Object.keys(_.pullAllBy(row.original.fournisseurs, [{ 'del': true }], 'del')).length === 0 && Object.keys(_.pullAllBy(row.original.acheteurs, [{ 'del': true }], 'del')).length === 0 ) ? 
                                                        <Button 
                                                        onClick={(ev) => {
                                                                    dispatch(Actions.removeSousSecteur(row.original));
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
                    dispatch(Actions.getSousSecteurs(pageIndex+1))
                }}
                onFilteredChange={(filtered, column) => {
                    if(filtered[0]['value']['filterValue'])
                    dispatch(Actions.getSousSecteurs(1,filtered[0]['value']['filterValue']))
                    else{
                    dispatch(Actions.getSousSecteurs())
                        
                    }
                }}
                noDataText="No Sous-Secteur found"
            />
        </FuseAnimate>
    );
}

export default SousSecteursList;
