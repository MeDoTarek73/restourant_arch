module.exports = {
    handleErrors: async function(_err) {
        if (_err.name == 'ValidationError')
            throw { status: 400, message: _err.errors[Object.keys(_err.errors)[0]].message };
        else if (_err.name === 'MongoServerError' && _err.code === 11000)
            throw { status: 400, message: `${Object.keys(_err.keyValue)[0]}: ${_err.keyValue[Object.keys(_err.keyValue)[0]]} is already in use ` };
        else if (_err.status && _err.message)
            throw _err;
        else
            throw { status: 500, message: "Something went wrong" };
    }
};