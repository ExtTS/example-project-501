Ext.define('App.controller.documents.Page', {
    extend: 'App.controller.MainTab',
    requires: [
        'App.model.Page',
        'App.view.documents.Page'
    ],
    init: function (cfg) {
        var _this = this;
        this.model = null;
        // načtení dat:
        App.model.Page.loadByIdAndModule(cfg.record.data.i, cfg.record.data.m, function (model) {
            _this.model = model;
            // @ts-ignore
            _this.form = _this.tabView.down('form').getForm();
            _this.form.setValues(_this.model);
            _this.form.on("dirtychange", function () {
                _this.setChanged(true);
            });
        });
    },
    save: function () {
        var values = this.form.getValues(false, false, false, true);
        console.log(values);
        this.model.setData(values);
        //this.model.save();
    },
    onLaunch: function (application) {
        // this.config
        //this.callParent(arguments);
    }
});
//# sourceMappingURL=Page.js.map