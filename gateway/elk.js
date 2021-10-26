const request = require('request');
module.exports = class elkGateway {
    search(_keyword) {
        return new Promise((resolve, reject) => {
            request({
                uri: process.env.ELK_SEARCH,
                headers: {
                    'Authorization': process.env.ELK_TOKEN,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'get',
                qs: { query: _keyword },
            }, (error, response, data) => {
                if (error) reject(error)
                else resolve(JSON.parse(data))
            })
        })
    }
    indexDocuments(_obj) {
        return new Promise((resolve, reject) => {
            delete _obj._id;
            request({
                uri: process.env.ELK_INDEX,
                headers: {
                    'Authorization': process.env.ELK_TOKEN,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'post',
                json: _obj
            }, (error, response, data) => {
                if (error) reject(error)
                else resolve(JSON.parse(data))
            })
        })
    }
};