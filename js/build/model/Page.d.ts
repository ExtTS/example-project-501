declare namespace App.model {
    var Page: App.model.Page;
    interface Page extends Ext.app.ViewModel.Def {
        loadByIdAndModule?: (id: string | number, module: string, cb: (mmodel: App.model.Page) => void) => void;
    }
}
