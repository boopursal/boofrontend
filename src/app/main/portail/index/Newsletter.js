import React, { useEffect, useState } from 'react';
import MailchimpSubscribe from "react-mailchimp-subscribe";
import { Grid, Button, Icon, Paper, Typography } from '@material-ui/core';

const CustomForm = ({ status, message, onValidated }) => {
    const [timeoutError, setTimeoutError] = useState(false);
    let email;

    const submit = () => {
        if (email && email.value.indexOf("@") > -1) {
            setTimeoutError(false); // Réinitialiser l'erreur de timeout
            onValidated({ EMAIL: email.value });
            setTimeout(() => {
                if (status === "sending") {
                    setTimeoutError(true);
                }
            }, 10000); // 10 secondes
        } else {
            alert("Veuillez entrer une adresse e-mail valide.");
        }
    };

    return (
        <div style={{ display: "inline-block", width: '100%' }}>
            {timeoutError && <div style={{ color: "red" }}>Erreur : L'envoi a expiré. Veuillez réessayer.</div>}
            {status === "sending" && <div style={{ color: "blue" }}>Mail envoyé avec succès</div>}
            {status === "error" && (
                <div style={{ color: "red" }} dangerouslySetInnerHTML={{ __html: message }} />
            )}
            {status === "success" && (
                <div style={{ color: "green" }} dangerouslySetInnerHTML={{ __html: message }} />
            )}
            <Grid container spacing={2}>
                <Grid item sm={8}>
                    <Paper className="flex p-4 items-center mx-auto w-full max-w-640" elevation={1}>
                        <Icon className="mr-8 ml-8" color="action">mail_outline</Icon>
                        <input
                            className="h-28 w-full"
                            ref={node => (email = node)}
                            type="email"
                            placeholder="exemple@exemple.com"
                        />
                    </Paper>
                </Grid>
                <Grid item sm={4}>
                    <Button className="whitespace-no-wrap" color="secondary" onClick={submit} variant="contained">
                        Soumettre
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
};

export default function Newsletter() {
    const url = "https://lesachatsindustriels.us4.list-manage.com/subscribe/post?u=f32aaf1c3e01b891b2db4b37a&id=fee05cc375";
    
    return (
        <MailchimpSubscribe
            url={url}
            render={({ subscribe, status, message }) => (
                <CustomForm
                    status={status}
                    message={message}
                    onValidated={formData => subscribe(formData)}
                />
            )}
        />
    );
}
