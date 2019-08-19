const menuList = [
    {
        title: 'Home',
        key: '/admin/home'
    },
    {
        title: 'UI',
        key: '/admin/ui',
        children: [
            {
                title: 'Button',
                key: '/admin/ui/buttons',
            },
            {
                title: 'Modal',
                key: '/admin/ui/modals',
            },
            {
                title: 'Loading',
                key: '/admin/ui/loadings',
            },
            {
                title: 'Notification',
                key: '/admin/ui/notification',
            },
            {
                title: 'Gloabal Message',
                key: '/admin/ui/messages',
            },
            {
                title: 'Tab',
                key: '/admin/ui/tabs',
            },
            {
                title: 'Photo gallery',
                key: '/admin/ui/gallery',
            },
            {
                title: 'Carousel',
                key: '/admin/ui/carousel',
            }
        ]
    },
    {
        title: 'Form',
        key: '/admin/form',
        children: [
            {
                title: 'Login',
                key: '/admin/form/login',
            },
            {
                title: 'Registration',
                key: '/admin/form/reg',
            }
        ]
    },
    {
        title: 'Table',
        key: '/admin/table',
        children: [
            {
                title: 'Basic table',
                key: '/admin/table/basic',
            },
            {
                title: 'Advanced table',
                key: '/admin/table/high',
            }
        ]
    },
    {
        title: 'Richtext',
        key: '/admin/rich'
    },
    {
        title: 'City management',
        key: '/admin/city'
    },
    {
        title: 'Order management',
        key: '/admin/order',
        btnList: [
            {
                title: 'Order detail',
                key: 'detail'
            },
            {
                title: 'Finish order',
                key: 'finish'
            }
        ]
    },
    {
        title: 'User manageent',
        key: '/admin/user'
    },
    {
        title: 'Map',
        key: '/admin/bikeMap'
    },
    {
        title: 'Chart',
        key: '/admin/charts',
        children: [
            {
                title: 'Bar',
                key: '/admin/charts/bar'
            },
            {
                title: 'Pie',
                key: '/admin/charts/pie'
            },
            {
                title: 'Line',
                key: '/admin/charts/line'
            },
        ]
    },
    {
        title: 'Permission',
        key: '/admin/permission'
    },
];
export default menuList;