import React from 'react';
import {Paper, Button, Input, Icon, Typography} from '@material-ui/core';
import {ThemeProvider} from '@material-ui/styles';
import {FuseAnimate} from '@fuse';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import * as Actions from '../store/actions';

function FocusProduitsHeader(props)
{
    const dispatch = useDispatch();
    const mainTheme = useSelector(({fuse}) => fuse.settings.mainTheme);
    return (
        <div className="flex flex-1 w-full items-center justify-between">

            <div className="flex items-center">
                <FuseAnimate animation="transition.expandIn" delay={300}>
                    <Icon className="text-32 mr-0 sm:mr-12">inbox</Icon>
                </FuseAnimate>
                <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                    <Typography className="hidden sm:flex" variant="h6">Focus produits</Typography>
                </FuseAnimate>
            </div>

        </div>
    );
}

export default FocusProduitsHeader;
