let model = require("../core/users");
const mongoose = require('mongoose');
module.exports = class usersRepo {
    async filter(_findObj = {}, _projection = "") {
        try {
            let filterObj = {};
            for (const prop in _findObj) {
                if (Array.isArray(_findObj[prop]))
                    filterObj[prop] = { "$in": _findObj[prop] }
                else
                    filterObj[prop] = { "$eq": _findObj[prop] }
            }
            let _res = await model.find(filterObj, _projection);
            return _res;
        } catch (_err) {
            throw _err;
        }
    }
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
            return "User created successfuly";
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
    async filterAggregation(_key) {
        try {
            let _res = model.aggregate([{
                    "$lookup": {
                        "from": "cuisines",
                        "localField": "favourite_cuisines",
                        "foreignField": "_id",
                        "as": "favourite_cuisines"
                    }
                },
                {
                    "$lookup": {
                        "from": "restaurants",
                        "localField": "favourite_restaurants",
                        "foreignField": "_id",
                        "as": "favourite_restaurants"
                    }
                },
                {
                    "$lookup": {
                        "from": "cuisines",
                        "localField": "favourite_restaurants.cuisines",
                        "foreignField": "_id",
                        "as": "favourite_restaurants.cuisines"
                    }
                },
                {
                    $project: {
                        email: 1,
                        username: 1,
                        first_name: 1,
                        last_name: 1,
                        status: 1,
                        cuisines: { $setUnion: ["$favourite_cuisines", "$favourite_restaurants.cuisines"] },
                    }
                },
                { $unwind: "$cuisines" },
                {
                    $project: {
                        email: 1,
                        username: 1,
                        first_name: 1,
                        last_name: 1,
                        status: 1,
                        "favourite_restaurants": 1,
                        "cuisines._id": 1,
                        "cuisines.name": 1,
                        "cuisines.description": 1,
                        "cuisines.price": 1,
                        "cuisines.currency": 1,
                        "cuisines.restaurants": 1,
                    }
                },
                // { $match: { $or: [{ "cuisines._id": mongoose.Types.ObjectId(_key) }, { "cuisines.name": _key }] } }
            ])
            return _res;
        } catch (_err) {
            throw _err;
        }
    }
}