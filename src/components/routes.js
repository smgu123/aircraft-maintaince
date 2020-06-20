import React from 'react';

const maintainer = React.lazy(() => import('./Maintainer'));
const Admin = React.lazy(() => import('./Admin'));


const routes = [
    { path: '/Maintainer', exact: true, name: 'Maintainer' },
    { path: '/Admin', name: 'Admin'},
    // { path: '/theme', exact: true, name: 'Theme', component: Colors },
];

export default routes;