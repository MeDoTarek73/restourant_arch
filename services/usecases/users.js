let repo = new(require('../../database/repositories/users'))();
let encrypt = require('../../helpers/encryption');
let errorHandler = require('../../helpers/error-handler');
const jwt = require('jsonwebtoken');
module.exports = class users {
    async filter(_obj) {
        try {
            let _res = await repo.filter(_obj, "-updatedAt -createdAt -password -__v");
            return { status: 200, data: _res };
        } catch (_err) {
            console.log(`[${new Date().toISOString()}] (Error in filter users) ${_err.message}`); // server logs
            return errorHandler.handleErrors(_err); // error handling
        }
    }
    async filterByCuisines(_key) {
        try {
            let _res = await repo.filterAggregation(_key);
            return { status: 200, data: _res };
        } catch (_err) {
            console.log(`[${new Date().toISOString()}] (Error in filter users) ${_err.message}`); // server logs
            return errorHandler.handleErrors(_err); // error handling
        }
    }
    async list() {
        try {
            let _res = await repo.list({}, "-updatedAt -createdAt -password -__v");
            return { status: 200, data: _res };
        } catch (_err) {
            console.log(`[${new Date().toISOString()}] (Error in list users) ${_err.message}`); // server logs
            return errorHandler.handleErrors(_err); // error handling
        }
    }
    async create(_obj) {
        try {
            if (!_obj.password)
                throw { status: 400, message: "Some required fileds is missing" };
            let _res = await repo.create(_obj);
            return { status: 201, data: _res };
        } catch (_err) {
            console.log(`[${new Date().toISOString()}] (Error in create user) ${_err.message}`); // server logs
            return errorHandler.handleErrors(_err); // error handling
        }
    }
    async update(_id, _obj) {
        try {
            let _res = await repo.update({ _id: _id }, _obj, "-updatedAt -createdAt -password -__v");
            if (_res)
                return { status: 200, data: _res };
            else
                throw { status: 404, message: "Account is not exisit" };
        } catch (_err) {
            console.log(`[${new Date().toISOString()}] (Error in update user) ${_err.message}`); // server logs
            return errorHandler.handleErrors(_err); // error handling
        }
    }
    async findOne(_id) {
        try {
            let _res = await repo.findOne({ _id: _id }, "-updatedAt -createdAt -password -__v");
            if (_res)
                return { status: 200, data: _res };
            else
                throw { status: 404, message: "Account is not exisit" };
        } catch (_err) {
            console.log(`[${new Date().toISOString()}] (Error in find one user) ${_err.message}`); // server logs
            return errorHandler.handleErrors(_err); // error handling
        }
    }
    async deleteById(_id) {
        try {
            let _res = await repo.delete({ _id: _id });
            if (_res)
                return { status: 200, data: "Account deleted successfuly" };
            else
                throw { status: 404, message: "There's no account with this email" };
        } catch (_err) {
            console.log(`[${new Date().toISOString()}] (Error in delete user) ${_err.message}`); // server logs
            return errorHandler.handleErrors(_err); // error handling
        }
    }
    async login(_obj) {
        try {
            const { email, password } = _obj;
            let _user = await repo.findOne({ email: email.toLowerCase() }, "-updatedAt -createdAt -password -__v");
            if (_user) {
                if (_user.password && !encrypt.comparePassword(password, _user.password))
                    throw { status: 401, message: "Email or password is incorrect" };
                let access_token = jwt.sign(JSON.parse(JSON.stringify(_user)), process.env.PRIVATEKEY, { expiresIn: '24h' });
                return { status: 200, data: { access_token } };
            } else {
                throw { status: 404, message: "There's no account registered with this email" };
            }
        } catch (_err) {
            console.log(`[${new Date().toISOString()}] (Error in login user) ${_err.message}`); // server logs
            return errorHandler.handleErrors(_err); // error handling
        }
    }
}