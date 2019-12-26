import { demandeConfigs } from "./demande_achat/demandeConfigs";
import { produitConfigs } from "./gestion_produit/produitConfigs";
import { ProfileConfigs } from "./profile/ProfileConfigs";
import { consultationConfigs } from "./mes_consultations/consultationConfigs";
import { PersonnelsAppConfig } from "./personnel/PersonnelsAppConfig";
import { AbonnementsConfigs } from "./abonnoment/AbonnementsConfigs";
import { DashboardAppConfig } from "./dashboard/DashboardAppConfig";


export const fournisseurConfigs = [
    demandeConfigs,
    produitConfigs,
    ProfileConfigs,
    consultationConfigs,
    PersonnelsAppConfig,
    DashboardAppConfig,
    ...AbonnementsConfigs
];
