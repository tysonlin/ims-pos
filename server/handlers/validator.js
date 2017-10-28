const { HttpNotFound } = require('./errors');

module.exports = {
    checkNotFound: (data) => {
        if(!data) { // data is null
            throw new HttpNotFound('Data not found');
        }
        return Promise.resolve(data);
    }
};