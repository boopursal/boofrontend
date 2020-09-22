import React from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    table: {
        minWidth: 700,
    },

}));

const TAX_RATE = 0.2;
function Recapitulatif(props) {

    const { selected, handleGetMontantPerMonth } = props;
    const classes = useStyles();

    function financial(x) {

        return parseFloat(x).toLocaleString(
            'fr',
            { minimumFractionDigits: 2 }
        );
    }

    const invoiceMonthPrice = handleGetMontantPerMonth(selected.duree);
    const invoiceSubtotal = invoiceMonthPrice * selected.duree.name;
    const invoiceTaxes = TAX_RATE * invoiceSubtotal;
    const invoiceTotal = invoiceTaxes + invoiceSubtotal;

    return (
        <div className="md:px-44 mt-16">
            <Table className={classes.table} aria-label="spanning table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center" colSpan={3}>
                            Details
                        </TableCell>
                        <TableCell align="right">Prix</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>PACK</TableCell>
                        <TableCell align="right">Durée</TableCell>
                        <TableCell align="right">Prix par mois</TableCell>
                        <TableCell align="right">Somme</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow >
                        <TableCell>{selected.offre.name}</TableCell>
                        <TableCell align="right">{`${selected.duree.name} mois`}</TableCell>
                        <TableCell align="right">
                            {selected.duree.remise ? <span className='line-through text-xs text-red'>{selected.currency === 'MAD' ? financial(selected.offre.prixMad) : financial(selected.offre.prixEur)}</span> : ''}
                            {` ${financial(invoiceMonthPrice)}`}</TableCell>
                        <TableCell align="right">{`${financial(invoiceSubtotal)}`}</TableCell>
                    </TableRow>
                    {
                        selected.currency === 'MAD' ?
                            <>
                                <TableRow>
                                    <TableCell rowSpan={3} />
                                    <TableCell colSpan={2}>Total HT</TableCell>
                                    <TableCell align="right">{`${financial(invoiceSubtotal)}`}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>TVA</TableCell>
                                    <TableCell align="right">{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
                                    <TableCell align="right">{`${financial(invoiceTaxes)}`}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell colSpan={2}>Total TTC</TableCell>
                                    <TableCell align="right">{`${financial(invoiceTotal)} MAD`}</TableCell>
                                </TableRow>
                            </> :
                            <TableRow>
                                <TableCell rowSpan={3} />

                                <TableCell colSpan={2}>Total</TableCell>
                                <TableCell align="right">{`${financial(invoiceSubtotal)} $`}</TableCell>
                            </TableRow>
                    }

                </TableBody>
            </Table>

        </div>
    );
}

export default Recapitulatif;