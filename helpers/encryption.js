var bcrypt = require('bcrypt');
module.exports = {
    cryptPassword: function(password) {
        return bcrypt.hashSync(password, 10);
    },
    comparePassword: async function(plainPass, hashword) {
        return bcrypt.compareSync(plainPass, hashword);
    }
};