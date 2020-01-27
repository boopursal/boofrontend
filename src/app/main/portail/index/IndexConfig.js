import Index from './Index';

export const IndexConfig = {
    settings: {
        layout: {
            style : 'layout3',
            config: {
                mode   : 'container',
                navbar        : {
                    display: false
                },
                toolbar       : {
                    display: true
                },
                footer : {
                    display: true,
                    style  : 'static'
                },
                leftSidePanel : {
                    display: false
                },
                rightSidePanel: {
                    display: false
                }
            }
        },
        theme           : {
            main   : 'greeny',
        },
    },
   
    routes  : [
        {
            path     : '/',
            component: Index
        }
    ]
};

