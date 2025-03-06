import React from 'react';
import CSVUpload from './CSVUpload';
import { authRoles } from 'app/auth';

const ImportConfigs = () => {
    return (
        <div className="import-container">
            <CSVUpload />
        </div>
    );
};

// Configuration de la route
ImportConfigs.settings = {
    layout: {}
};

ImportConfigs.auth = authRoles.acheteur;

// Export simple sans HOC
export default ImportConfigs;
