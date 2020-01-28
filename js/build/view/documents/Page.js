Ext.define('App.view.documents.Page', {
    extend: 'App.view.layout.MainTab',
    items: [
        {
            xtype: 'form',
            trackResetOnLoad: true,
            /*viewModel: {
                type: 'Ext.app.ViewModel'
            },*/
            defaultType: 'textfield',
            items: [
                {
                    fieldLabel: 'Address',
                    name: 'Address',
                    //bind: '{Address}',
                    allowBlank: false
                },
                {
                    fieldLabel: 'Title',
                    name: 'Title',
                    //bind: '{Title}',
                    allowBlank: false
                }
            ],
        }
    ]
});
//# sourceMappingURL=Page.js.map