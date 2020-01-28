declare namespace App.model {
	var Page: App.model.Page;
	interface Page extends Ext.app.ViewModel.Def {
		loadByIdAndModule?: (id: string | number, module: string, cb: (mmodel:App.model.Page) => void) => void;
	}
}

Ext.define('App.model.Page', <App.model.Page>{
	extend: 'Ext.app.ViewModel',
	statics: {
		loadByIdAndModule: function (id: string | number, module: string, cb: (mmodel:App.model.Page) => void):void {
			Ext.data.JsonP.request(<Ext.Ajax.methodParams.request.Options>{
				url: 'https://trainings.tomflidr.cz/extjs/app/admin/documents/read',
				params: {
					id: id,
					module: module
				},
    			success: function (response:any, opts:object) {
    				var model:App.model.Page = Ext.create(
						'App.model.Page', response.data
					) as App.model.Page;
    				cb(model);
    			}
    		});
		},
	},
    fields: [
        { name: 'Action', type: 'string' },
		{ name: 'Active', type: 'string' },
		{ name: 'Address', type: 'string' },
		{ name: 'AddressOld', type: 'string' },
		{ name: 'Body', type: 'string' },
		{ name: 'Controller', type: 'string' },
		{ name: 'Description', type: 'string' },
		{ name: 'Id', type: 'string' },
		{ name: 'Keywords', type: 'string' },
		{ name: 'Lang', type: 'string' },
		{ name: 'LastModification', type: 'string' },
		{ name: 'Module', type: 'string' },
		{ name: 'NavigationDescription', type: 'string' },
		{ name: 'NavigationDisplaying', type: 'string' },
		{ name: 'NavigationTitle', type: 'string' },
		{ name: 'ParentId', type: 'string' },
		{ name: 'Perex', type: 'string' },
		{ name: 'Robots', type: 'string' },
		{ name: 'Sequence', type: 'string' },
		{ name: 'SitemapChangeFrequency', type: 'string' },
		{ name: 'SitemapPriority', type: 'string' },
		{ name: 'SocialMetatags', type: 'string' },
		{ name: 'SystemDescription', type: 'string' },
		{ name: 'Title', type: 'string' },
		{ name: 'Type', type: 'string' },
		{ name: 'id', type: 'string' },
    ]

    /*
    Uncomment to add validation rules
    validators: {
        age: 'presence',
        name: { type: 'length', min: 2 },
        gender: { type: 'inclusion', list: ['Male', 'Female'] },
        username: [
            { type: 'exclusion', list: ['Admin', 'Operator'] },
            { type: 'format', matcher: /([a-z]+)[0-9]{2,3}/i }
        ]
    }
    */

    /*
    Uncomment to add a rest proxy that syncs data with the back end.
    proxy: {
        type: 'rest',
        url : '/users'
    }
    */
});
