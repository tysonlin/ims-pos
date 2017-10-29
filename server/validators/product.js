const logger = require('../log');
const { ClientError } = require('./errors');
const { validCharacters, onlyFloat, onlyNumbers } = require('./regex');

module.exports = {
    validateProductInput: (data) => {
        return new Promise( resolve => {
            if(!data){
                throw new ClientError("Input data does not exist");
            }
            else{
                const name = data[0];
                const price = data[1];
                const Category_id = data[2];
                logger.debug(`Product input: name[${name}] price[${price}] Category_id[${Category_id}]`);
                // logger.debug(`(!price && parseFloat(price) != 0): ${(!price && parseFloat(price) != 0)} !onlyFloat(price) ${!onlyFloat(price)} parseFloat(price) < 0 ${parseFloat(price) < 0}`);
                if(!name || name === '' || !validCharacters(name)){
                    throw new ClientError("Variable 'name' is empty, or does not exist, or contains illegal characters");
                }
                if( (!price && parseFloat(price) != 0) || !onlyFloat(price) || parseFloat(price) < 0){
                    throw new ClientError("Variable 'price' is empty, or not a number, or a negative number");
                }
                if( (!Category_id && parseInt(Category_id) != 0) || !onlyNumbers(Category_id) || parseInt(Category_id) < 0){
                    throw new ClientError("Variable 'Category_id' is empty, or not a number, or a negative number");
                }
                resolve([name, price, Category_id]);
            }
        });
    }
};