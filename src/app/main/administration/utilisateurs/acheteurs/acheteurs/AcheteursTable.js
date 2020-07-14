import React, { useEffect, useState } from 'react';
import { Icon, IconButton, Tooltip, Avatar, TextField } from '@material-ui/core';
import { FuseAnimate } from '@fuse';
import { withRouter } from 'react-router-dom';
import * as Actions from '../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import FuseUtils from '@fuse/FuseUtils';
import ReactTable from "react-table";
import _ from '@lodash';

function AcheteursTable(props) {

    const dispatch = useDispatch();
    const acheteurs = useSelector(({ acheteursAdminApp }) => acheteursAdminApp.acheteurs.data);
    const loading = useSelector(({ acheteursAdminApp }) => acheteursAdminApp.acheteurs.loading);
    const pageCount = useSelector(({ acheteursAdminApp }) => acheteursAdminApp.acheteurs.pageCount);
    const parametres = useSelector(({ acheteursAdminApp }) => acheteursAdminApp.acheteurs.parametres);

    const searchText = useSelector(({ acheteursAdminApp }) => acheteursAdminApp.acheteurs.searchText);

    const [filteredData, setFilteredData] = useState(null);

    useEffect(() => {
        function getFilteredArray(entities, searchText) {
            const arr = Object.keys(entities).map((id) => entities[id]);
            if (searchText.length === 0) {
                return arr;
            }
            return FuseUtils.filterArrayByString(arr, searchText);
        }

        if (acheteurs) {
            setFilteredData(getFilteredArray(acheteurs, searchText));
        }
    }, [acheteurs, searchText]);



    if (!filteredData) {
        return null;
    }

    //dispatch from function filter
    const run = (parametres) =>
        dispatch(Actions.setParametresData(parametres))

    //call run function
    const fn =
        _.debounce(run, 1000);

    return (
        <div className="w-full flex flex-col">


            <FuseAnimate animation="transition.slideUpIn" delay={300}>

                <ReactTable

                    className="-striped -highlight h-full sm:rounded-16 overflow-hidden"
                    getTrProps={(state, rowInfo, column) => {
                        return {
                            className: "h-64 cursor-pointer",
                            onClick: (e, handleOriginal) => {
                                if (rowInfo) {
                                    props.history.push('/users/acheteurs/' + rowInfo.original.id);
                                }
                            }
                        }
                    }}
                    getTheadProps={(state, rowInfo, column) => {
                        return {
                            className: "h-64",

                        }
                    }}

                    data={filteredData}
                    columns={[
                        {
                            Header: "",
                            Cell: row =>

                                row.original.avatar ?
                                    <Avatar className="mr-8" alt={row.original.firstName} src={FuseUtils.getUrl() + row.original.avatar.url} />
                                    : <Avatar className="mr-8" alt={row.original.firstName} src="assets/images/avatars/images.png" />

                            ,
                            className: "justify-center",
                            width: 64,
                            sortable: false
                        },
                        {
                            Header: "Société",
                            accessor: "societe",
                            filterable: true,
                            getProps: (state, rowInfo, column) => {
                                return {

                                    style: {
                                        color: rowInfo && (rowInfo.original.ville && rowInfo.original.ville.id === 113) ? 'orange' : null,
                                    },
                                };
                            },

                        },
                        {
                            Header: "Nom",
                            accessor: "lastName",
                            filterable: true,

                        },
                        {
                            Header: "Prénom",
                            accessor: "firstName",
                            filterable: true,

                        },
                        {
                            Header: "Email",
                            accessor: "email",
                            filterable: true,

                        },
                        {
                            Header: "Téléphone",
                            accessor: "phone",
                            filterable: true,

                        },
                        {
                            Header: "Date de création",
                            accessor: "created",
                            filterable: true,

                            Cell: row =>
                                moment(row.original.created).format('L')
                            ,
                            Filter: ({ filter, onChange }) =>
                                <TextField
                                    onChange={event => onChange(event.target.value)}
                                    style={{ width: "100%" }}
                                    value={filter ? filter.value : ""}
                                    type="date"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                        },
                        {
                            Header: "Statut",
                            accessor: "isactif",
                            filterable: true,

                            Cell: row =>
                                row.original.isactif ?
                                    (
                                        <Tooltip title="Activé">
                                            <IconButton className="text-green text-20" onClick={(ev) => {
                                                ev.stopPropagation();
                                                dispatch(Actions.activeAccount(row.original, false, parametres))

                                            }}><Icon>check_circle</Icon>
                                            </IconButton>
                                        </Tooltip>
                                    ) :
                                    (
                                        <Tooltip title="Désactivé">
                                            <IconButton className="text-red text-20" onClick={(ev) => {
                                                ev.stopPropagation();
                                                dispatch(Actions.activeAccount(row.original, true, parametres));
                                            }}><Icon>remove_circle</Icon>
                                            </IconButton>
                                        </Tooltip>
                                    )
                            ,
                            Filter: ({ filter, onChange }) =>
                                <select
                                    onChange={event => onChange(event.target.value)}
                                    style={{ width: "100%" }}
                                    value={filter ? filter.value : ""}
                                >
                                    <option value="">Tous</option>
                                    <option value="true">Actif</option>
                                    <option value="false">Inactif</option>
                                </select>


                        },
                    ]}
                    manual
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
                    onFilteredChange={filtered => {
                        parametres.page = 1;
                        parametres.search = filtered;
                        // _.debounce( dispatch(Actions.setParametresData(parametres)),3000)
                        fn(parametres);
                    }}
                    noDataText="No Acheteur found"
                    loadingText='Chargement...'
                    ofText='sur'
                />
            </FuseAnimate>




        </div>
    );
}

export default withRouter(AcheteursTable);
