declare namespace App.controller.documents {
	interface Page extends App.controller.MainTab {
		model: App.model.Page;
		form: Ext.form.Basic;
		init (cfg: object): void;
		save (): never;
	}
}

Ext.define('App.controller.documents.Page', <App.controller.documents.Page>{
	extend: 'App.controller.MainTab',
	requires: [
		'App.model.Page',
		'App.view.documents.Page'
	],
	init: function (cfg: any) {
		this.model = null;
    	// načtení dat:
		App.model.Page.loadByIdAndModule(
			cfg.record.data.i, 
			cfg.record.data.m, 
			(model:App.model.Page) => {
				this.model = model;
				
				// @ts-ignore
				this.form = this.tabView.down('form').getForm();
				this.form.setValues(this.model);

				this.form.on(
					"dirtychange",
					() => {
						this.setChanged(true);
					}
				);

			}
		)
	},

	save: function () {
		var values:object = this.form.getValues(false, false, false, true) as object;
		console.log(values);
		this.model.setData(values);
		//this.model.save();
	},

    onLaunch: function (application: Ext.app.Application) {
    	// this.config

    	//this.callParent(arguments);
    }
});
