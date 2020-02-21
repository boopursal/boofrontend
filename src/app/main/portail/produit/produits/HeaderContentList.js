import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Chip, Typography, Select } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    chip: {
        margin: theme.spacing(1),
    },


}));

function HeaderContentList(props) {
    const classes = useStyles();

    return (

        <div className="flex justify-between sticky top-0 z-999 ">
            <div><Chip label="3000 Produits trouvés" color="primary" className={classes.chip} /></div>
            <div className="flex items-center justify-between ">
                <Typography className="text-13 mr-16">Résultats triés par</Typography>

                <Select
                    className="text-13"
                    native
                    // value={currentRange}
                    //  onChange={handleChangeRange}
                    inputProps={{
                        name: 'currentRange'
                    }}
                >

                    <option value='desc'>Plus récent</option>
                </Select>
            </div>
        </div>

    )
}

export default HeaderContentList;