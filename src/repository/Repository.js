const database = require("./config/Database");

class Repository {

    constructor(table) {
        this._model = database(table);
    }

    findAll() {
        return this._model.select();
    }

    findById(id) {
        return this._model.where("id", id);
    }

    remove(id) {
        return this._model.where("id", id).del();
    }

    update(id, datasModifieds) {
        return this._model.where("id", id).update(datasModifieds);
    }

    create(newRegister) {
        return this._model.insert(newRegister);
    }

    getModel() {
        return this._model;
    }
}