const logger = require('../log');
const { ClientError } = require('./errors');
const { shouldExist } = require('../validators');
const { validUsername, validPassword, validName, validEmail } = require('./regex');

module.exports = {
    validateUserInput: (data) => {
        return new Promise( resolve => {
            if(!data || data.length != 4){
                throw new ClientError("User input data does not exist, or not complete");
            }
            else{
                const username = data[0];
                const rawPassword = data[1];
                const name = data[2];
                const email = data[3];
                if(!username || !validUsername(username)){
                    throw new ClientError("Variable 'username' is not a valid username (allow A-Z, a-z, 0-9, more than 4 characters)");
                }
                if(!rawPassword || !validPassword(rawPassword)){
                    throw new ClientError("Variable 'password' is not a valid password (allow A-Z, a-z, 0-9, special chars in [#$@!%&*?], 4-30 characters)");
                }
                if(!name || !validName(name)){
                    throw new ClientError("Variable 'name' is not a valid name (allow A-Z, a-z, spaces, special chars in ['.-], more than 2 characters)");
                }
                if(!email || !validEmail(email)){
                    throw new ClientError("Variable 'email' is not a valid email");
                }
                resolve(data);
            }
        });
    },
    validateUserLogin: (data) => {
        return new Promise( resolve => {
            if(!data || data.length != 2){
                throw new ClientError("User input data does not exist, or not complete");
            }
            else{
                const username = data[0];
                const rawPassword = data[1];
                if(!username || !validUsername(username)){
                    throw new ClientError("Variable 'username' is not a valid username (allow A-Z, a-z, 0-9, more than 4 characters)");
                }
                if(!rawPassword || !validPassword(rawPassword)){
                    throw new ClientError("Variable 'password' is not a valid password (allow A-Z, a-z, 0-9, special chars in [#$@!%&*?], 4-30 characters)");
                }
                resolve(data);
            }
        });
    },
};