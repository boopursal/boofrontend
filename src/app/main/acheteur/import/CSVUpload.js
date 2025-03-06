import React, { useState, useEffect } from 'react';
import agent from 'agent';
//import { Upload, HelpCircle } from 'lucide-react';
import jwtService from 'app/services/jwtService';

const CSVUpload = () => {
    const [file, setFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [csvData, setCsvData] = useState(null);
    const [savedFournisseurs, setSavedFournisseurs] = useState([]);
    const [importedFournisseurs, setImportedFournisseurs] = useState([]);

    useEffect(() => {
        if (!jwtService.getAccessToken()) {
            window.location.href = '/login';
            return;
        }
        loadFournisseurs();
        loadImportedFournisseurs();
    }, []);

    const onFileChange = (event) => {
        const selectedFile = event.target.files[0];
        
        if (!selectedFile) {
            alert('Aucun fichier sélectionné');
            return;
        }

        const fileExtension = selectedFile.name.split('.').pop().toLowerCase();
        if (fileExtension !== 'csv') {
            alert('Veuillez sélectionner un fichier avec l\'extension .csv');
            event.target.value = '';
            return;
        }

        if (selectedFile.size > 5 * 1024 * 1024) {
            alert('Le fichier est trop volumineux. Taille maximum : 5MB');
            event.target.value = '';
            return;
        }
        
        setFile(selectedFile);

        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target.result;
            const lines = content.split('\n');
            const headers = lines[0].trim().split(/[,;]/);
            
            const data = lines.slice(1).filter(line => line.trim()).map(line => {
                const values = line.trim().split(/[,;]/);
                return headers.reduce((obj, header, index) => {
                    const value = values[index] ? values[index].trim() : '';
                    obj[header.trim()] = value;
                    return obj;
                }, {});
            });

            setCsvData(data);
        };
        reader.readAsText(selectedFile);
    };

    const onFileUpload = () => {
        // Vérification du token JWT
        const accessToken = jwtService.getAccessToken();
        console.log('Token JWT:', accessToken); // Affiche le token JWT dans la console
        
        if (!accessToken) {
            alert('Veuillez vous connecter pour utiliser cette fonctionnalité');
            window.location.href = '/login'; // Redirige vers la page de connexion si aucun token
            return;
        }
    
        // Vérification que le fichier a bien été sélectionné
        if (!file) {
            alert('Veuillez sélectionner un fichier CSV avant de télécharger.');
            return;
        }
    
        setIsUploading(true); // Indiquer que l'upload est en cours
    
        const formData = new FormData();
        formData.append('file', file); // Ajoute le fichier dans FormData
    
        // Envoi de la requête POST pour importer le fichier
        agent.request({
            method: 'POST',
            url: '/api/fournisseurs/import', // L'URL de l'API d'import
            data: formData,
            headers: {
                'Authorization': `Bearer ${accessToken}`, // Ajout du token JWT dans l'en-tête Authorization
                'Content-Type': 'multipart/form-data' // Type de contenu pour l'upload de fichier
            }
        })
        .then(response => {
            // Vérification de la réponse
            if (response.data && response.data.data) {
                // Met à jour l'état des fournisseurs importés
                setImportedFournisseurs(response.data.data);
                alert('Fichier CSV importé avec succès !');
            } else {
                alert('Aucun fournisseur importé.'); // Si aucun fournisseur n'est importé
            }
        })
        .catch(error => {
            // Gestion des erreurs
            console.error('Erreur lors de l\'importation:', error);
    
            // Si l'erreur est due à l'authentification (par exemple, token expiré), rediriger vers la page de connexion
            if (error.response && error.response.status === 401) {
                alert('Session expirée ou non authentifiée. Veuillez vous reconnecter.');
                window.location.href = '/login'; // Redirige vers la page de connexion si le token est expiré
            } else if (error.response && error.response.data && error.response.data.error) {
                // Afficher l'erreur reçue du serveur (si disponible)
                alert(`Erreur: ${error.response.data.error}`);
            } else {
                // Si une autre erreur se produit, afficher un message générique
                alert('Erreur lors de l\'importation, veuillez réessayer plus tard.');
            }
        })
        .finally(() => {
            setIsUploading(false); // Désactive l'état de téléchargement
        });
    };
    
    const loadFournisseurs = () => {
        if (!jwtService.getAccessToken()) return;

        agent.request({
            method: 'GET',
            url: '/api/fournisseurs/list',
            headers: {
                'Authorization': `Bearer ${jwtService.getAccessToken()}`
            }
        })
        .then((response) => {
            if (response.data) {
                setSavedFournisseurs(response.data);
            } else {
                console.warn('Aucune donnée reçue de l\'API');
                setSavedFournisseurs([]);
            }
        })
        .catch((error) => {
            console.error('Erreur lors du chargement des fournisseurs:', error);
            setSavedFournisseurs([]);
        });
    };

    const loadImportedFournisseurs = () => {
        agent.request({
            method: 'GET',
            url: '/api/fournisseurs/import/list',
            headers: {
                'Authorization': `Bearer ${jwtService.getAccessToken()}`
            }
        })
        .then((response) => {
            if (response.data && response.data.data) {
                const formattedData = response.data.data.map(item => ({
                    id: item.id,
                    nom: item.nom,
                    email: item.email,
                    tempPassword: item.tempPassword
                }));
                setImportedFournisseurs(formattedData);
            }
        })
        .catch((error) => {
            console.error('Erreur lors du chargement des fournisseurs importés:', error);
        });
    };

    const downloadExample = () => {
        const csvContent = `Civilite;Nom;Prenom;Adresse;Telephone;Email
M.;Dupont;Jean;123 rue Example;0123456789;jean.dupont@example.com
Mme;Martin;Marie;456 avenue Test;0987654321;marie.martin@example.com`;

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "exemple_import_fournisseurs.csv";
        link.click();
        URL.revokeObjectURL(link.href);
    };

    return (
        <div className="flex flex-col items-center bg-gray-50 pt-8">
            <div className="w-full max-w-2xl space-y-6">
                <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Import de Fournisseurs</h2>
                    <p className="text-gray-600 text-lg">Importez votre liste de fournisseurs au format CSV</p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-md">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center 
                                  hover:border-gray-400 hover:bg-gray-50 transition-all duration-300">
                        <input
                            type="file"
                            accept=".csv"
                            onChange={onFileChange}
                            className="hidden"
                            id="csvFile"
                            disabled={isUploading}
                        />
                        <label
                            htmlFor="csvFile"
                            className={`cursor-pointer flex flex-col items-center ${isUploading ? 'opacity-50' : ''}`}
                        >
                            <div className="bg-gray-100 p-4 rounded-full mb-4">
                                <Upload className="w-8 h-8 text-gray-600" />
                            </div>
                            <span className="text-xl font-medium text-gray-700 mb-2">
                                {isUploading ? 'Importation en cours...' : 'Déposez votre fichier CSV ici'}
                            </span>
                            <span className="text-base text-gray-500">
                                ou <span className="text-blue-600 hover:text-blue-700 underline font-medium">parcourez vos fichiers</span>
                            </span>
                        </label>

                        {file && (
                            <div className="flex items-center justify-center space-x-2 mt-4">
                                <div className="bg-gray-100 px-4 py-2 rounded-full text-gray-700 border border-gray-200 font-medium">
                                    {file.name}
                                </div>
                            </div>
                        )}

                        <button 
                            onClick={onFileUpload}
                            disabled={isUploading || !file}
                            className="mt-4 inline-flex items-center px-6 py-3 bg-blue-600 
                                     text-xl font-bold text-gray-800 hover:bg-blue-700 hover:text-blue
                                     disabled:opacity-50 transition-all duration-300 font-medium 
                                     shadow-sm hover:shadow-md group text-lg"
                        >
                            {isUploading ? (
                                <>
                                    <span className="animate-spin mr-2">⚬</span>
                                    Importation...
                                </>
                            ) : (
                                <>
                                    Importer
                                    <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-md">
                    <div className="flex items-start space-x-4">
                        <div className="bg-gray-100 p-3 rounded-lg">
                            <HelpCircle className="text-gray-600 w-5 h-5" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">
                                Format du fichier CSV
                            </h3>
                            <div className="space-y-4">
                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                    <h4 className="font-semibold text-gray-700 mb-3">En-têtes requis</h4>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="px-4 py-2 bg-white rounded-full text-base font-medium text-gray-700 shadow-sm">Civilite</span>
                                        <span className="px-4 py-2 bg-white rounded-full text-base font-medium text-gray-700 shadow-sm">Nom</span>
                                        <span className="px-4 py-2 bg-white rounded-full text-base font-medium text-gray-700 shadow-sm">Prenom</span>
                                        <span className="px-4 py-2 bg-white rounded-full text-base font-medium text-gray-700 shadow-sm">Adresse</span>
                                        <span className="px-4 py-2 bg-white rounded-full text-base font-medium text-gray-700 shadow-sm">Telephone</span>
                                        <span className="px-4 py-2 bg-white rounded-full text-base font-medium text-gray-700 shadow-sm">Email</span>
                                    </div>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mt-4">
                                    <h4 className="font-semibold text-gray-700 mb-3">Exemple de format</h4>
                                    <div className="bg-white p-3 rounded-lg font-mono text-sm">
                                        Civilite;Nom;Prenom;Adresse;Telephone;Email<br/>
                                        M.;Dupont;Jean;123 rue Example;0123456789;jean.dupont@example.com<br/>
                                        Mme;Martin;Marie;456 avenue Test;0987654321;marie.martin@example.com
                                    </div>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mt-4">
                                    <h4 className="font-semibold text-gray-700 mb-3">Notes importantes</h4>
                                    <ul className="space-y-2 text-base text-gray-600">
                                        <li className="flex items-center">
                                            <span className="mr-2 text-gray-400">•</span>
                                            Civilite : Utiliser "M." ou "Mme"
                                        </li>
                                        <li className="flex items-center">
                                            <span className="mr-2 text-gray-400">•</span>
                                            Email : Doit être unique et valide
                                        </li>
                                        <li className="flex items-center">
                                            <span className="mr-2 text-gray-400">•</span>
                                            Téléphone : Format international recommandé (+XXX)
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {csvData && csvData.length > 0 && (
                    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-md">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">
                            Aperçu des données ({csvData.length} lignes)
                        </h3>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        {Object.keys(csvData[0]).map((header, index) => (
                                            <th
                                                key={index}
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                {header}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {csvData.slice(0, 5).map((row, rowIndex) => (
                                        <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                            {Object.values(row).map((value, cellIndex) => (
                                                <td
                                                    key={cellIndex}
                                                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                                                >
                                                    {value}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {csvData.length > 5 && (
                                <div className="mt-2 text-sm text-gray-500 text-center">
                                    ... et {csvData.length - 5} autres lignes
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {importedFournisseurs.length > 0 && (
                    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-md mt-6 w-full max-w-2xl">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">
                            Fournisseurs importés ({importedFournisseurs.length})
                        </h3>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nom</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mot de passe temporaire</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {importedFournisseurs.map((fournisseur, index) => (
                                        <tr key={fournisseur.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{fournisseur.nom}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{fournisseur.email}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <span className="font-mono bg-gray-100 px-2 py-1 rounded">
                                                    {fournisseur.tempPassword}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                            <p className="text-yellow-800">
                                <strong>Important :</strong> Veuillez communiquer ces informations de connexion aux fournisseurs. 
                                Ils devront changer leur mot de passe lors de leur première connexion.
                            </p>
                        </div>
                    </div>
                )}

                <button
                    onClick={downloadExample}
                    className="mt-2 text-blue-600 hover:text-blue-800 underline"
                >
                    Télécharger un fichier d'exemple
                </button>
            </div>
        </div>
    );
};

export default CSVUpload;
