let model = require("../core/restaurants");
module.exports = class restaurantsRepo {
    async list(_findObj = {}, _projection = "") {
        try {
            let _res = await model.find(_findObj, _projection);
            return _res;
        } catch (_err) {
            throw _err;
        }
    }
    async findOne(_findObj, _projection = "") {
        try {
            let _res = await model.findOne(_findObj, _projection);
            return _res;
        } catch (_err) {
            throw _err;
        }
    }
    async create(_obj) {
        try {
            let newObj = new model(_obj);
            await newObj.save();
            return "Restaurant created successfuly";
        } catch (_err) {
            throw _err;
        }
    }
    async update(_findObj, _obj, _poject = "") {
        try {
            let _res = await model.findOneAndUpdate(_findObj, _obj, { projection: _poject, new: true })
            return _res;
        } catch (_err) {
            throw _err;
        }
    }
    async delete(_findObj) {
        try {
            let _res = await model.findOneAndRemove(_findObj)
            return _res;
        } catch (_err) {
            throw _err;
        }
    }
}