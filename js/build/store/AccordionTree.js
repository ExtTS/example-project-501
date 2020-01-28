Ext.define('App.store.AccordionTree', {
    extend: 'Ext.data.TreeStore',
    requires: [
        'App.store.AccordionTreeProxy'
    ],
    config: {
        autoLoad: false,
        nodeParam: 'id',
        // proxy: {type: 'ajax', url: 'ur is set dynamicly from Main controller throught '} 
        root: {
            expanded: true
        },
        /*
        folderSort: true,
        sorters: [{
            property: 'sequence',
            direction: 'ASC'
        }],
        */
        listeners: {
            beforeload: function (store, operation, eOpts) {
                var nodeDataValues = operation.config.node.data, operationParams = operation.config.params;
                if (typeof (nodeDataValues.i) == 'undefined' &&
                    typeof (nodeDataValues.m) == 'undefined') {
                    operationParams.id = '0';
                    operationParams.module = '';
                }
                else {
                    operationParams.id = nodeDataValues.i;
                    operationParams.module = nodeDataValues.m;
                }
                return true;
            },
            load: function (_this, records, successful, operation, node, eOpts) {
                console.log("loaded");
            }
        }
    }
});
//# sourceMappingURL=AccordionTree.js.map