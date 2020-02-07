import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Card, CardActionArea, CardContent, CardActions, Button, CardMedia, Chip, Icon } from '@material-ui/core';
import ReactHtmlParser from 'react-html-parser';
import _ from '@lodash';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
    mediaNews: {
        height: 200,
    },
}));

export default function News(props) {
    const classes = useStyles();
    const { news } = props;
    const desc = ReactHtmlParser(props.new.description);
    return (
        <Card className={classes.card}>
            <CardActionArea>
                <CardMedia
                    className={classes.mediaNews}
                    image="https://source.unsplash.com/collection/9457511"
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h6" component="h6">
                        {_.capitalize(_.truncate(props.new.titre, {
                            'length': 35
                        }))}
                    </Typography>
                    
                </CardContent>
            </CardActionArea>
            <CardActions className="flex justify-between">
                <Chip
                    icon={<Icon className="text-16 mr-0">access_time</Icon>}
                    label={moment(props.new.created).fromNow()}
                    classes={{
                        root: "h-24",
                        label: "pl-4 pr-6 py-4 text-11",
                        deleteIcon: "w-16 ml-0",
                        ...props.classes
                    }}
                    variant="outlined"
                    className="mr-4"
                    onDelete={props.onDelete}
                />

                <Button size="small" color="primary" >
                    Lire la suite
                </Button>
            </CardActions>
        </Card>
    );
}

News.propTypes = {
    post: PropTypes.object,
};