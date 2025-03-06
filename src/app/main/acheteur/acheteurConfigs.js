import { demandeConfigs } from "./demande_achat/demandeConfigs";
import { BlackListesAppConfig } from "./black_liste/BlackListesAppConfig";
import { ProfileConfigs } from "./profile/ProfileConfigs";
import { DashboardAppConfig } from "./dashboard/DashboardAppConfig";
//import AcheteursPage from './AcheteursPage';
import ImportConfigs from "./import/ImportConfigs";
import { TeamsAppConfig } from "./Directeur_achat/TeamsAppConfig";
import { childsConfigs } from "./childs/childsConfigs";
import { FacturationAppConfig } from "./facturation/FacturationAppConfig";
import { authRoles } from 'app/auth';

// Créer la configuration des routes d'acheteur
const AcheteurConfigsObject = {
    settings: {
        layout: {}
    },
    auth: authRoles.acheteur,
    routes: [
        {
            path: '/ac/import',
            component: ImportConfigs
        },
        ...demandeConfigs.routes,
        ...BlackListesAppConfig.routes,
        ...ProfileConfigs.routes,
        ...TeamsAppConfig.routes,
        ...childsConfigs.routes,
        ...DashboardAppConfig.routes,
        ...FacturationAppConfig.routes

    ]
};

// Exporter la configuration sous forme de tableau comme attendu par routesConfig.js
export const acheteurConfigs = [
    AcheteurConfigsObject,
    demandeConfigs,
    BlackListesAppConfig,
    ProfileConfigs,
    TeamsAppConfig,
    childsConfigs,
    DashboardAppConfig,
    FacturationAppConfig
];
