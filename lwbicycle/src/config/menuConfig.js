const menuList = [
    {
        title: 'Home',
        key: '/home'
    },
    {
        title: 'UI',
        key: '/ui',
        children: [
            {
                title: 'Button',
                key: '/ui/buttons',
            },
            {
                title: 'Modal',
                key: '/ui/modals',
            },
            {
                title: 'Loading',
                key: '/ui/loadings',
            },
            {
                title: 'Notification',
                key: '/ui/notification',
            },
            {
                title: 'Global Message',
                key: '/ui/messages',
            },
            {
                title: 'Tab',
                key: '/ui/tabs',
            },
            {
                title: 'Photo gallery',
                key: '/ui/gallery',
            },
            {
                title: 'Carousel',
                key: '/ui/carousel',
            }
        ]
    },
    {
        title: 'Menu',
        key: '/form',
        children: [
            {
                title: 'Login',
                key: '/form/login',
            },
            {
                title: 'Registration',
                key: '/form/reg',
            }
        ]
    },
    {
        title: 'Table',
        key: '/table',
        children: [
            {
                title: 'Basic table',
                key: '/table/basic',
            },
            {
                title: 'Advanced table',
                key: '/table/high',
            }
        ]
    },
    {
        title: 'Richtext',
        key: '/rich'
    },
    {
        title: 'City',
        key: '/city'
    },
    {
        title: 'Order',
        key: '/order',
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
        title: 'User',
        key: '/user'
    },
    {
        title: 'Map',
        key: '/bikeMap'
    },
    {
        title: 'Chart',
        key: '/charts',
        children: [
            {
                title: 'Bar',
                key: '/charts/bar'
            },
            {
                title: 'Pie',
                key: '/charts/pie'
            },
            {
                title: 'Line',
                key: '/charts/line'
            },
        ]
    },
    {
        title: 'Permission',
        key: '/permission'
    },
];
export default menuList;