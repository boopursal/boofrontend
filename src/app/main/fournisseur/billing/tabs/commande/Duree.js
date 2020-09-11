import React from 'react';
import { CircularProgress, Grid, Icon } from '@material-ui/core';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
const useStyles = makeStyles(theme => ({


    remise: {
        top: '-15px',
        left: 10,
        backgroundColor: "#ecc94b",
        color: '#7b341e'
    },

}));

function Duree(props) {

    const { durees, loading, selected, offre, currency, onChange } = props;
    console.log(currency)
    const classes = useStyles();

    function getRemise(duree) {
        if (!offre || !duree) {
            return;
        }
        if (currency === 'MAD') {
            let remise = offre.prixMad - (offre.prixMad * duree.remise / 100);
            return remise;
        }
        let remise = offre.prixEur - (offre.prixEur * duree.remise / 100);
        return remise;

    }
    if (loading) {
        return (
            <div className="flex flex-1 items-center justify-center h-200 ">
                <CircularProgress color="secondary" /> &ensp;
               Chargement ...
            </div>
        );
    }
    return (
        <div>
            <Grid container spacing={4}>
                {
                    durees && durees.map((item) => (
                        <Grid item xs={12} key={item.id} md={6}>
                            <div onClick={() => onChange(item)} className={clsx("rounded rounded-md relative flex items-center justify-center p-24 h-200 w-full border-solid border-4 cursor-pointer hover:border-blue", selected && (selected.id === item.id ? " border-blue" : " border-gray-400"))}>
                                <div className="mr-16">
                                    {
                                        selected && (selected.id === item.id ?
                                            <Icon color="secondary">radio_button_checked</Icon> :
                                            <Icon >radio_button_unchecked</Icon>
                                        )
                                    }

                                </div>
                                <div className="flex flex-col ">
                                    <div className="font-bold"> {item.name} mois</div>
                                    <div> {!item.remise ?
                                        (offre && (currency === 'MAD' ? offre.prixMad : offre.prixEur))
                                        : (getRemise(item))
                                    }</div>
                                </div>
                                {
                                    item.remise ?
                                        <div className={clsx("absolute  px-10 py-2  rounded  rounded-md", classes.remise)}>
                                            Economiser {item.remise} %
                                    </div> : ''
                                }
                            </div>

                        </Grid>
                    ))
                }
            </Grid>

        </div>
    );
}

export default Duree;