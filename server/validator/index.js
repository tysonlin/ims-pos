const { HttpNotFound, ClientError } = require('./errors');
const { validCharacters, onlyNumbers } = require('./regex');
const logger = require('../log');

module.exports = {
    checkNotFound: (err_msg, data) => {
        return new Promise( (resolve) => {
            if(!data) { // data is null
                const message =   err_msg || 'Data not found';
                throw new HttpNotFound(message);
            }
            resolve(data);
        } );
    },
    checkValidStrings: (err_msg, data) => {
        return new Promise( (resolve) => {
            var valid = true;
            if(!data) { // data is null
                valid = false;;
            }
            else{
                for(var i in data){
                    logger.debug(`checkValidStrings: data[${data[i]}] type ${typeof(data[i])}`);
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
    validateIdInput: (data) => {
        return new Promise( resolve => {
            var valid = true;
            if(!data) { // data is null
                valid = false;;
            }
            else{
                for(var i in data){
                    const num = data[i];
                    logger.debug(`checkIdInput: num [${num}]`);
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