import React, {useEffect, useState} from 'react';
import { Icon, IconButton, Typography, DialogTitle, DialogContent, DialogContentText, DialogActions, Button} from '@material-ui/core';
import {FuseUtils, FuseAnimate} from '@fuse';
import {useDispatch, useSelector} from 'react-redux';
import ReactTable from "react-table";
import * as Actions from './store/actions';
import * as Actions2 from 'app/store/actions';
//import SousSecteursMultiSelectMenu from './SousSecteursMultiSelectMenu';
import _ from '@lodash';

function SousSecteursList(props)
{
    const dispatch = useDispatch();
    const SousSecteurs = useSelector(({sous_secteursApp}) => sous_secteursApp.sous_secteurs.entities);
    const SousSecteurs_fields = useSelector(({sous_secteursApp}) => sous_secteursApp.sous_secteurs);
    
    //const selectedSousSecteursIds = useSelector(({sous_secteursApp}) => sous_secteursApp.sous_secteurs.selectedsous_secteursIds);
    const searchText = useSelector(({sous_secteursApp}) => sous_secteursApp.sous_secteurs.searchText);
    
    const [filteredData, setFilteredData] = useState(null);
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

    useEffect(() => {
        if ( SousSecteurs_fields.executed && SousSecteurs_fields.message)
        {
            dispatch(
                Actions2.showMessage({
                    message     : SousSecteurs_fields.message,//text or html
                    autoHideDuration: 6000,//ms
                    anchorOrigin: {
                        vertical  : 'top',//top bottom
                        horizontal: 'right'//left center right
                    },
                    variant: SousSecteurs_fields.variant//success error info warning null
                }));
        }else if ( !SousSecteurs_fields.executed && SousSecteurs_fields.message){
            dispatch(
                Actions2.showMessage({
                    message     : _.map(SousSecteurs_fields.message, function(value, key) {
                        return key+': '+value;
                      }) ,//text or html
                    autoHideDuration: 6000,//ms
                    anchorOrigin: {
                        vertical  : 'top',//top bottom
                        horizontal: 'right'//left center right
                    },
                    variant: SousSecteurs_fields.variant//success error info warning null
                }));
        }
    }, [dispatch,SousSecteurs_fields.executed, SousSecteurs_fields.message,SousSecteurs_fields.variant]);

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
                        Header    : "Sous-Secteurs",
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
                                                                dispatch(Actions.removeSousSecteur(row.original));
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
                noDataText="No Sous-Secteur found"
            />
        </FuseAnimate>
    );
}

export default SousSecteursList;
