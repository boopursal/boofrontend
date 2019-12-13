import { parametresConfigs } from "./parametres/parametresConfigs";
import { utilisateursConfigs } from "./utilisateurs/utilisateursConfigs";
import { demandeConfigs } from "./demande_achat/demandeConfigs";
import { abonnementsConfigs } from "./abonnements/abonnementsConfigs";

export const administrateurConfigs = [
    ...parametresConfigs,
    ...utilisateursConfigs,
    ...abonnementsConfigs,
    demandeConfigs
];
