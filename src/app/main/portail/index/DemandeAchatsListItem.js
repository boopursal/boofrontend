import React from 'react';
import { IconButton, Icon, Typography, Checkbox, ListItem, Chip } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import red from '@material-ui/core/colors/red';
import amber from '@material-ui/core/colors/amber';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import _ from '@lodash';
//import * as Actions from './store/actions';
import DaChip from './DaChip';
import moment from 'moment';
import 'moment/locale/fr';
const useStyles = makeStyles({
    todoItem: {
        '&.completed': {
            background: 'rgba(0,0,0,0.03)',
            '& .todo-title, & .todo-notes': {
                textDecoration: 'line-through'
            }
        }
    }
});

function DemandeAchatsListItem(props) {
    const dispatch = useDispatch();
    const classes = useStyles(props);

    return (
        <ListItem
            className={clsx(classes.todoItem, "border-solid border-b-1 py-16  px-0 sm:px-8")}
            onClick={(ev) => {
                ev.preventDefault();
                // dispatch(Actions.openEditTodoDialog(props.todo));
            }}
            dense
            button
        >



            <div className="flex flex-1 flex-col relative overflow-hidden pl-8">

                <Typography
                    variant="subtitle1"
                    className="todo-title truncate"
                    color={"inherit"}
                >
                    RFQ-20-2020
                </Typography>

                <Typography
                    color="textSecondary"
                    className="todo-notes truncate"
                >
                    Petite discription ici
                </Typography>

                <div className={clsx(classes.labels, "flex mt-8")}>
                    <Chip
                        icon={<Icon className="text-16 mr-0">location_on</Icon>}
                        label="Casablanca, Maroc"
                        classes={{
                            root: clsx("h-24", props.className),
                            label: "pl-4 pr-6 py-4 text-11",
                            deleteIcon: "w-16 ml-0",
                            ...props.classes
                        }}
                        className="mr-4"
                        variant="outlined"
                        onDelete={props.onDelete}
                    />
                    <Chip
                        icon={<Icon className="text-16 mr-0">access_time</Icon>}
                        label={moment("2019-11-30 23:03:00").fromNow()}
                        classes={{
                            root: clsx("h-24", props.className),
                            label: "pl-4 pr-6 py-4 text-11",
                            deleteIcon: "w-16 ml-0",
                            ...props.classes
                        }}
                        variant="outlined"
                        onDelete={props.onDelete}
                    />

                </div>
            </div>

            <div className="px-8">
                <IconButton onClick={(ev) => {
                    ev.preventDefault();
                    ev.stopPropagation();
                    //  dispatch(Actions.toggleImportant(props.todo))
                }}>

                    <Icon>chevron_right</Icon>
                </IconButton>

            </div>
        </ListItem>
    );
}

export default DemandeAchatsListItem;
