import React from 'react';
import { IconButton, Icon, Typography, Checkbox, ListItem, Chip } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import red from '@material-ui/core/colors/red';
import amber from '@material-ui/core/colors/amber';
import clsx from 'clsx';
import _ from '@lodash';
import moment from 'moment';
import 'moment/locale/fr';
import { NavLinkAdapter} from '@fuse';
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
    const classes = useStyles(props);
    return (
        <ListItem
            className={clsx(classes.todoItem, "border-solid border-b-1 py-16  px-0 sm:px-8")}
            dense={true}
            component={NavLinkAdapter}
            to={`/demandes-achat/${props.demande.id}-${props.demande.slug}`}
            button
        >



            <div className="flex flex-1 flex-col relative overflow-hidden pl-8">

                <Typography
                    variant="subtitle1"
                    className="todo-title truncate"
                    color={"inherit"}
                >
                [ RFQ-{props.demande.reference} ] {props.demande.titre} 
                </Typography>
              

                <Typography
                    color="textSecondary"
                    className="todo-notes truncate"
                >
                 {_.truncate(props.demande.description.replace(/<(?:.|\n)*?>/gm, ''), {'length': 180})}
                </Typography>

                <div className={clsx(classes.labels, "flex mt-8")}>
                    <Chip
                        icon={<Icon className="text-16 mr-0">location_on</Icon>}
                        label={props.demande.ville+', '+props.demande.pays}
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
                        label={moment(props.demande.created).fromNow()}
                        classes={{
                            root: clsx("h-24", props.className),
                            label: "pl-4 pr-6 py-4 text-11",
                            deleteIcon: "w-16 ml-0",
                            ...props.classes
                        }}
                        variant="outlined"
                        className="mr-4"
                        onDelete={props.onDelete}
                    />
                    
                    <Chip
                        icon={<Icon className="text-16 mr-0">access_time</Icon>}
                        label={'Clôture le '+moment(props.demande.dateExpiration).format("DD-MM-YYYY à HH:mm")}
                        classes={{
                            root: clsx("h-24", props.className),
                            label: "pl-4 pr-6 py-4 text-11",
                            deleteIcon: "w-16 ml-0",
                            ...props.classes
                        }}
                        variant="outlined"
                        className="mr-4"
                        onDelete={props.onDelete}
                    />

                </div>
            </div>

            <div className="px-8">
                <IconButton >
                    <Icon>chevron_right</Icon>
                </IconButton>

            </div>
        </ListItem>
    );
}

export default DemandeAchatsListItem;
