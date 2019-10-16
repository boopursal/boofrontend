import React from 'react';
import {Redirect} from 'react-router-dom';
import {FuseUtils} from '@fuse';
import {ExampleConfig} from 'app/main/example/ExampleConfig';
import _ from '@lodash';
import {authRoles} from 'app/auth';
import { LoginConfig } from '../main/login/LoginConfig';
import {pagesConfigs} from 'app/main/pages/pagesConfigs';
import { administrateurConfigs } from '../main/administration/administrateurConfigs';
function setAdminAuth(configs)
{
    return configs.map(config => _.merge({}, config, {auth: authRoles.admin}))
}
const routeConfigs = [
    ...setAdminAuth([
        ...administrateurConfigs,
        ExampleConfig,
        
    ]),
    ...pagesConfigs,
    LoginConfig
];

const routes = [
    ...FuseUtils.generateRoutesFromConfigs(routeConfigs),
    
    {
        component: () => <Redirect to="/pages/errors/error-404"/>
    }
];

export default routes;
