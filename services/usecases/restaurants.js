let repo = new(require('../../database/repositories/restaurants'))();
let errorHandler = require('../../helpers/error-handler');
let elkServices = new(require('../../gateway/elk'))();
module.exports = class restaurants {
    async list() {
        try {
            let _res = await repo.list({}, "-updatedAt -createdAt -__v");
            return { status: 200, data: _res };
        } catch (_err) {
            console.log(`[${new Date().toISOString()}] (Error in list restaurant) ${_err.message}`); // server logs
            return errorHandler.handleErrors(_err); // error handling
        }
    }
    async search(_keyword) {
        try {
            let _res = await elkServices.search(_keyword);
            return { status: 200, data: _res };
        } catch (_err) {
            console.log(`[${new Date().toISOString()}] (Error in list restaurant) ${_err.message}`); // server logs
            return errorHandler.handleErrors(_err); // error handling
        }
    }
    async create(_obj) {
        try {
            let _res = await repo.create(_obj);
            elkServices.indexDocuments(_obj);
            return { status: 201, data: _res };
        } catch (_err) {
            console.log(`[${new Date().toISOString()}] (Error in create restaurant) ${_err.message}`); // server logs
            return errorHandler.handleErrors(_err); // error handling
        }
    }
    async update(_id, _obj) {
        try {
            let _res = await repo.update({ _id: _id }, _obj, "-updatedAt -createdAt -__v");
            if (_res)
                return { status: 200, data: _res };
            else
                throw { status: 404, message: "restaurant is not exsist" };
        } catch (_err) {
            console.log(`[${new Date().toISOString()}] (Error in update restaurant) ${_err.message}`); // server logs
            return errorHandler.handleErrors(_err); // error handling
        }
    }
    async findOne(_key) {
        try {
            let _findObj = { $or: [{ _id: _key }, { unique_name: _key }] }
            let _res = await repo.findOne(_findObj, "-updatedAt -createdAt -__v");
            if (_res)
                return { status: 200, data: _res };
            else
                throw { status: 404, message: "restaurant is not exsist" };
        } catch (_err) {
            console.log(`[${new Date().toISOString()}] (Error in find one restaurant) ${_err.message}`); // server logs
            return errorHandler.handleErrors(_err); // error handling
        }
    }
    async deleteById(_id) {
        try {
            let _res = await repo.delete({ _id: _id });
            if (_res)
                return { status: 200, data: "restaurant deleted successfuly" };
            else
                throw { status: 404, message: "restaurant is not exsist" };
        } catch (_err) {
            console.log(`[${new Date().toISOString()}] (Error in delete restaurant) ${_err.message}`); // server logs
            return errorHandler.handleErrors(_err); // error handling
        }
    }
}