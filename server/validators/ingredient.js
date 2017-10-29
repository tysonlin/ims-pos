const logger = require('../log');
const { ClientError } = require('./errors');
const { validCharacters, onlyNumbers, onlyFloat } = require('./regex');

module.exports = {
    validateIngredientInput: (data) => {
        return new Promise( resolve => {
            if(!data){
                throw new ClientError("Input data does not exist");
            }
            else{
                const name = data[0];
                const unitPrice = data[1];
                const stock = data[2];
                logger.debug(`Ingredient input: name[${name}] unitPrice[${unitPrice}] stock[${stock}]`);
                if(!name || name === '' || !validCharacters(name)){
                    throw new ClientError("Variable 'name' is empty, or does not exist, or contains illegal characters");
                }
                if( (!unitPrice && unitPrice != 0) || !onlyFloat(unitPrice) || parseFloat(unitPrice) < 0){
                    throw new ClientError("Variable 'unitPrice' is empty, or not a float, or a negative number");
                }
                if( (!stock && stock != 0) || !onlyNumbers(stock) || parseInt(stock) < 0){
                    throw new ClientError("Variable 'stock' is empty, or not an integer, or a negative number");
                }
                resolve(data);
            }
        });
    }
};