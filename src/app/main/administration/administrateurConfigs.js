import { parametresConfigs } from "./parametres/parametresConfigs";
import { utilisateursConfigs } from "./utilisateurs/utilisateursConfigs";
import { demandeConfigs } from "./demande_achat/demandeConfigs";

export const administrateurConfigs = [
    ...parametresConfigs,
    ...utilisateursConfigs,
    demandeConfigs
];
