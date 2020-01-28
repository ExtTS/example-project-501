declare namespace App.view.layout {
    interface SideTree extends Ext.panel.Panel.Def {
		firstExpanded: boolean;
    }
}

Ext.define('App.view.layout.SideTree', <App.view.layout.SideTree | object>{
    extend: 'Ext.tree.Panel',

    requires: [
		'App.store.AccordionTree'
    ],

	config: {
		rootVisible: false,
		manageHeight: true,
		forceFit: true,
		autoScroll: true,
		scrollable: true,

		viewConfig: {
			plugins: {
				ptype: 'treeviewdragdrop',
				containerScroll: true
			}
		}
	}

	// naplněno v Main ctrl
    /*store: Ext.create('Ext.data.TreeStore', {
    		expanded: true,
    		children: [
				{ text: 'first', leaf: true },
				{ text: 'homework', leaf: true },
				{ text: 'buy lottery tickets', leaf: true },
				{ text: 'detention', leaf: true },
				{ text: 'homework', leaf: true },
				{ text: 'buy lottery tickets', leaf: true },
				{ text: 'detention', leaf: true },
				{ text: 'homework', leaf: true },
				{ text: 'buy lottery tickets', leaf: true },
				{ text: 'detention', leaf: true },
				{ text: 'homework', leaf: true },
				{ text: 'buy lottery tickets', leaf: true },
				{ text: 'detention', leaf: true },
				{ text: 'homework', leaf: true },
				{ text: 'buy lottery tickets', leaf: true },
				{ text: 'detention', leaf: true },
				{ text: 'homework', leaf: true },
				{ text: 'buy lottery tickets', leaf: true },
				{ text: 'last', leaf: true },
    		]
    	}
    }),*/

});
