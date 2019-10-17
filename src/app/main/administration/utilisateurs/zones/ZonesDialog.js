import React, {useEffect, useCallback, useRef, useState} from 'react';
import { Button, Dialog, DialogActions, DialogContent, Icon, IconButton, Typography, Toolbar, AppBar, DialogTitle, DialogContentText, InputAdornment} from '@material-ui/core';
import {useForm} from '@fuse/hooks';
import * as Actions from './store/actions';
import {useDispatch, useSelector} from 'react-redux';
import {TextFieldFormsy} from '@fuse';
import Formsy from 'formsy-react';
import _ from '@lodash';
import SelectReactFormsy from '@fuse/components/formsy/SelectReactFormsy';

const defaultFormState = {
    username    : '',
    firstName    : '',
    lastName    : '',
    adresse1: '',
    adresse2: '',
    codepostal:  null,
    phone: '',
    email: '',
    pays : null
};

function ZonesDialog(props)
{
    const dispatch = useDispatch();
    const ZonesDialog = useSelector(({zonesApp}) => zonesApp.zones.zonesDialog);
    const Pays = useSelector(({zonesApp}) => zonesApp.zones.pays);
   
    const {form, handleChange, setForm} = useForm(defaultFormState);


    const [isFormValid, setIsFormValid] = useState(false);
    const formRef = useRef(null);


    const initDialog = useCallback(
        () => {
            /**
             * Dialog type: 'edit'
             */
            if ( ZonesDialog.type === 'edit' && ZonesDialog.data )
            {
               let pays= ZonesDialog.data.pays.map(item => ({
                            value: item['@id'],
                            label: item.name
                         }));
                setForm({...ZonesDialog.data});
                setForm(_.set({...ZonesDialog.data}, 'pays', pays));
            }

            /**
             * Dialog type: 'new'
             */
            if ( ZonesDialog.type === 'new' )
            {
                setForm({
                    ...defaultFormState,
                    ...ZonesDialog.data,
                });
            }
        },
        [ZonesDialog.data, ZonesDialog.type, setForm],
    );

    useEffect(() => {
        /**
         * After Dialog Open
         */
        if ( ZonesDialog.props.open )
        {
            initDialog();
        }

    }, [ZonesDialog.props.open, initDialog]);

    

    function closeComposeDialog()
    {
        ZonesDialog.type === 'edit' ? dispatch(Actions.closeEditZonesDialog()) : dispatch(Actions.closeNewZonesDialog());
    }

    

    function handleSubmit(event)
    {
        form.codepostal=_.parseInt(form.codepostal);
      //  console.log(form)
           
        //event.preventDefault();
        if ( ZonesDialog.type === 'new' )
        {
            dispatch(Actions.addZone(form));
        }
        else
        {
            dispatch(Actions.updateZone(form));
        }
        closeComposeDialog();
    }

    function handleRemove()
    {
        
        dispatch(Actions.removeZone(form));
        dispatch(Actions.closeDialog())
        closeComposeDialog();
    }
    function handleChipChange(value, name)
    {
        //setForm(_.set({...form}, name, value.map(item => item.value)));
        setForm(_.set({...form}, name, value));
    }

    function disableButton()
    {
        setIsFormValid(false);
    }

    function enableButton()
    {
        
        setIsFormValid(true);
    }


    function handleUploadChange(e)
    {
        const file = e.target.files[0];
        if ( !file )
        {
            return;
        }
        dispatch(Actions.uploadImage(file));
        
    }

    return (
        <Dialog
            classes={{
                paper: "m-24"
            }}
            {...ZonesDialog.props}
            onClose={closeComposeDialog}
            fullWidth
            maxWidth="xs"
        >

            <AppBar position="static" elevation={1}>
                <Toolbar className="flex w-full">
                    <Typography variant="subtitle1" color="inherit">
                        {ZonesDialog.type === 'new' ? 'Nouvelle Zone' : 'Edit Zone'}
                    </Typography>
                </Toolbar>
                
            </AppBar>
            <Formsy 
            onValidSubmit={handleSubmit}
            onValid={enableButton}
            onInvalid={disableButton}
            ref={formRef}
            className="flex flex-col overflow-hidden">
                <DialogContent classes={{root: "p-24"}}>
                    
                <div className="flex">
                        
                        <TextFieldFormsy
                            className="mb-24"
                            label="Nom"
                            autoFocus
                            id="lastName"
                            name="lastName"
                            value={form.lastName}
                            onChange={handleChange}
                            variant="outlined"
                            validations={{
                                minLength: 4
                            }}
                            validationErrors={{
                                minLength: 'Min character length is 4'
                            }}
                            required
                            fullWidth
                        />
                    </div>

                    <div className="flex">
                        
                        <TextFieldFormsy
                            className="mb-24"
                            label="Prénom"
                            id="firstName"
                            name="firstName"
                            value={form.firstName}
                            onChange={handleChange}
                            variant="outlined"
                            validations={{
                                minLength: 4
                            }}
                            validationErrors={{
                                minLength: 'Min character length is 4'
                            }}
                            required
                            fullWidth
                        />
                    </div>

                    <div className="flex">
                        
                        <TextFieldFormsy
                            className="mb-24"
                            label="Adresse 1"
                            id="adresse1"
                            name="adresse1"
                            value={form.adresse1}
                            onChange={handleChange}
                            variant="outlined"
                            validations={{
                                minLength: 6
                            }}
                            validationErrors={{
                                minLength: 'Min character length is 6'
                            }}
                            required
                            fullWidth
                        />
                    </div>

                    <div className="flex">
                        
                        <TextFieldFormsy
                            className="mb-24"
                            label="Adresse 2"
                            id="adresse2"
                            name="adresse2"
                            value={form.adresse2}
                            onChange={handleChange}
                            variant="outlined"
                            validations={{
                                minLength: 4
                            }}
                            validationErrors={{
                                minLength: 'Min character length is 6'
                            }}
                            fullWidth
                        />
                    </div>

                    <div className="flex">
                        
                        <TextFieldFormsy
                            className="mb-24"
                            label="Code postal"
                            id="codepostal"
                            type="number"
                            name="codepostal"
                            value={_.toString(form.codepostal)}
                            onChange={handleChange}
                            variant="outlined"
                            validations={{
                                minLength: 4,
                                isNumeric: true,
                            }}
                            validationErrors={{
                                minLength: 'Min character length is 4',
                                isNumeric: 'Numeric value required',

                            }}
                            required
                            fullWidth
                        />
                    </div>

                    <div className="flex">
                        
                        <TextFieldFormsy
                            className="mb-24"
                            label="Téléphone"
                            id="phone"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            variant="outlined"
                            validations={{
                                minLength: 10,
                                isNumeric: true,
                            }}
                            validationErrors={{
                                minLength: 'Min character length is 10',
                                isNumeric: 'Numeric value required',
                            }}
                            required
                            fullWidth
                        />
                    </div>
                    <div className="flex">
                        
                        <TextFieldFormsy
                            className="mb-24"
                            label="E-mail"
                            id="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            variant="outlined"
                            validations="isEmail"
                            validationErrors={{
                                isEmail:"This is not a valid email"
                            }}
                            required
                            fullWidth
                        />
                    </div>

                    <div className="flex">
                        
                        <TextFieldFormsy
                            className="mb-24"
                            label="Username"
                            id="username"
                            name="username"
                            value={form.username}
                            onChange={handleChange}
                            variant="outlined"
                            validations={{
                                minLength: 6
                            }}
                            validationErrors={{
                                minLength: 'Min character length is 6'
                            }}
                            required
                            fullWidth
                        />
                    </div>
                    {ZonesDialog.type === 'new' ? 
                                    (
                                    <div>
                                    <div className="flex">
                                        
                                            <TextFieldFormsy
                                            className="mb-24"
                                            type="password"
                                            name="password"
                                            label="Mot de passe"
                                            onChange={handleChange}
                                            validations={{
                                                minLength: 6
                                            }}
                                            validationErrors={{
                                                minLength: 'Min character length is 6'
                                            }}
                                            InputProps={{
                                                endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">vpn_key</Icon></InputAdornment>
                                            }}
                                            variant="outlined"
                                            required
                                            fullWidth
                                        />
                                    </div>
                                    <div className="flex">
                                    
                                        <TextFieldFormsy
                                            className="mb-24"
                                            id="confirmpassword"
                                            type="password"
                                            name="confirmpassword"
                                            label="Confirmer mot de passe"
                                            validations="equalsField:password"
                                            onChange={handleChange}
                                            validationErrors={{
                                                equalsField: 'Passwords not identique'
                                            }}
                                            InputProps={{
                                                endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">vpn_key</Icon></InputAdornment>
                                            }}
                                            variant="outlined"
                                            fullWidth
                                        />
                                    </div> 
                                    </div>) : ''
                    }
                    <div className="flex">
                       
                        <SelectReactFormsy
                            
                            id="pays"
                            name="pays"
                            className="MuiFormControl-fullWidth MuiTextField-root mb-24"
                            value={
                                
                                    form.pays
                                    
                                
                            }
                            onChange={(value) => handleChipChange(value, 'pays')}
                            placeholder="Selectionner multiple pays"
                            textFieldProps={{
                                label          : 'Pays',
                                InputLabelProps: {
                                    shrink: true
                                },
                                variant        : 'outlined'
                            }}
                            options={Pays}
                            fullWidth
                            isMulti
                            required
                        />
                    </div>
                    <div className="flex">
                    <input
                        accept="image/*"
                        id="button-file"
                        type="file"
                        onChange={handleUploadChange}
                    />     
                    </div>

                 
                </DialogContent>

                {ZonesDialog.type === 'new' ? (
                    <DialogActions className="justify-between pl-16">
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            disabled={!isFormValid}
                        >
                            Ajouter
                        </Button>
                    </DialogActions>
                ) : (
                    <DialogActions className="justify-between pl-16">
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            disabled={!isFormValid}
                        >
                            Modifier
                        </Button>
                        <IconButton
                            onClick={()=> dispatch(Actions.openDialog({
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
                                            <Button onClick={handleRemove} color="primary" autoFocus>
                                                Oui
                                            </Button>
                                        </DialogActions>
                                    </React.Fragment>
                                     )
                                 }))}
                            
                            
                        >
                            <Icon>delete</Icon>
                        </IconButton>
                    </DialogActions>
                )}
            </Formsy>
        </Dialog>
    );
}

export default ZonesDialog;
