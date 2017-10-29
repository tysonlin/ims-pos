const { HttpNotFound, ClientError } = require('./errors');
const { validCharacters, onlyNumbers } = require('./regex');
const logger = require('../log');

module.exports = {
    shouldExist: (err_msg, data) => {
        return new Promise( (resolve) => {
            if(!data || data.length == 0) { // data is null or empty set
                const message =   err_msg || 'Data not found';
                throw new HttpNotFound(message);
            }
            resolve(data);
        } );
    },
    shouldNotExist: (err_msg, data) => {
        return new Promise( (resolve) => {
            logger.debug(`shouldNotExist: data [${data}] len [${data.length}] `);
            if(data && data.length > 0) { // data is not null and set has more then one entry
                const message =   err_msg || 'Data should not exist';
                throw new ClientError(message);
            }
            resolve(data);
        } );
    },
    shouldBeValidStrings: (err_msg, data) => {
        return new Promise( (resolve) => {
            var valid = true;
            if(!data) { // data is null
                valid = false;;
            }
            else{
                for(var i in data){
                    logger.debug(`shouldBeValidStrings: data[${data[i]}] type ${typeof(data[i])}`);
                    if(!data[i] || data[i] === '' || !validCharacters(data[i])){
                        valid = false;
                        break;
                    }
                }
            }
    
            if(!valid){
                const message =  err_msg || 'Invalid string parameter: empty input, or contain illegal characters';
                throw new ClientError(message);
            }
            else{
                resolve(data);
            }
        });
    },
    shouldBeValidIds: (data) => {
        return new Promise( resolve => {
            var valid = true;
            if(!data) { // data is null
                valid = false;;
            }
            else{
                for(var i in data){
                    const num = data[i];
                    logger.debug(`shouldBeValidId: num [${num}]`);
                    if(!num || !onlyNumbers(num) || parseInt(num) < 0) {
                        valid = false;
                        break;
                    }
                }
            }
            if(!valid){
                const message =  'Invalid Id parameters: is empty, not a number, or negative';
                throw new ClientError(message);
            }
            else{
                resolve(data);
            }
        });
    }
};