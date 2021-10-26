let repo = new(require('../../database/repositories/cuisines'))();
let errorHandler = require('../../helpers/error-handler');
module.exports = class cuisines {
    async list() {
        try {
            let _res = await repo.list({}, "-updatedAt -createdAt -__v");
            return { status: 200, data: _res };
        } catch (_err) {
            console.log(`[${new Date().toISOString()}] (Error in list cuisine) ${_err.message}`); // server logs 
            return errorHandler.handleErrors(_err); // error handling
        }
    }
    async create(_obj) {
        try {
            let _res = await repo.create(_obj);
            return { status: 200, data: _res };
        } catch (_err) {
            console.log(`[${new Date().toISOString()}] (Error in create cuisine) ${_err.message}`); // server logs
            return errorHandler.handleErrors(_err); // error handling
        }
    }
    async update(_id, _obj) {
        try {
            let _res = await repo.update({ _id: _id }, _obj, "-updatedAt -createdAt -__v");
            if (_res)
                return { status: 200, data: _res };
            else
                throw { status: 404, message: "cuisine is not exsist" };
        } catch (_err) {
            console.log(`[${new Date().toISOString()}] (Error in update cuisine) ${_err.message}`); // server logs
            return errorHandler.handleErrors(_err); // error handling
        }
    }
    async findOne(_id) {
        try {
            let _res = await repo.findOne({ _id: _id }, "-updatedAt -createdAt -__v");
            if (_res)
                return { status: 200, data: _res };
            else
                throw { status: 404, message: "cuisine is not exsist" };
        } catch (_err) {
            console.log(`[${new Date().toISOString()}] (Error in find one cuisine) ${_err.message}`); // server logs
            return errorHandler.handleErrors(_err); // error handling
        }
    }
    async deleteById(_id) {
        try {
            let _res = await repo.delete({ _id: _id });
            if (_res)
                return { status: 200, data: "cuisine deleted successfuly" };
            else
                throw { status: 404, message: "cuisine is not exsist" };
        } catch (_err) {
            console.log(`[${new Date().toISOString()}] (Error in delete cuisine) ${_err.message}`); // server logs
            return errorHandler.handleErrors(_err); // error handling
        }
    }
}