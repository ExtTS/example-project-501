Ext.define('App.view.layout.MainTab', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.main-tab',
    config: {
        closable: true,
        title: '',
        html: 'content'
    },
    listeners: {
    //beforeclose
    //close
    },
    initComponent: function () {
        var _this = this;
        this.tbar = [{
                text: 'save',
                handler: function () {
                    _this.ctrl.save();
                }
            }];
        this.callParent(arguments);
    },
    save: function () {
        // TODO
    },
});
//# sourceMappingURL=MainTab.js.map