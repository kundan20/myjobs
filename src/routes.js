import loadable from '@loadable/component'

export const  routes = [
    {
        path: '/',
        component: loadable(() => import('./components/Home'))
    },
    {
        path: '/login',
        component: loadable(() => import('./components/Authentication'))
    },
    {
        path: '/post-job',
        component: loadable(() => import('./components/Job'))
    },
    {
        path: '/jobs',
        component: loadable(() => import('./components/AllJobs'))
    }
]
export  default routes