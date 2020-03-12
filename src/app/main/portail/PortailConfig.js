import { IndexConfig } from './index/IndexConfig';
import { ProduitConfig } from './produit/ProduitConfig';
import { FournisseurConfig } from './fournisseur/FournisseurConfig';
import { demandeAchatConfig } from './demande-achat/demandeAchatConfig';
import { newsConfig } from './news/newsConfig';

export const PortailConfig = [
       ProduitConfig,    
       FournisseurConfig,    
       IndexConfig,
       demandeAchatConfig,
       newsConfig
];
