import { parametresConfigs } from "./parametres/parametresConfigs";
import { utilisateursConfigs } from "./utilisateurs/utilisateursConfigs";
import { demandeConfigs } from "./demande_achat/demandeConfigs";
import { abonnementsConfigs } from "./abonnements/abonnementsConfigs";
import { demandeDevisConfigs } from "./demandeDevis/demandeDevisConfigs";
import { produitConfigs } from "./gestion_produit/produitConfigs";

export const administrateurConfigs = [
    ...parametresConfigs,
    ...utilisateursConfigs,
    ...abonnementsConfigs,
    demandeDevisConfigs,
    demandeConfigs,
    produitConfigs
];
