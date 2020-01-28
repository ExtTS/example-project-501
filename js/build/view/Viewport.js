Ext.define('App.view.Viewport', {
    extend: 'Ext.Viewport',
    requires: [
        'App.view.layout.MainTab',
        'App.view.layout.SideTreePanel'
    ],
    config: {
        layout: 'fit',
        style: {
            margin: '0 0 0 10px',
        }
    },
    items: {
        xtype: 'container',
        layout: 'border',
        id: 'cont',
        items: [
            {
                id: 'tabs',
                xtype: 'tabpanel',
                cls: 'main-tabs',
                region: 'center',
                items: [] // will be completed in main ctrl
            },
            {
                id: 'left',
                xtype: 'panel',
                layout: 'accordion',
                cls: 'left-accordion',
                region: 'west',
                minWidth: 50,
                maxWidth: window.innerWidth / 2,
                width: 250,
                collapsible: true,
                items: [
                /*{
                    xtype: 'side-tree-panel'
                }, {
                    xtype: 'side-tree-panel'
                }, {
                    xtype: 'side-tree-panel'
                }*/
                ]
            }
        ]
    }
});
//# sourceMappingURL=Viewport.js.map