module.exports = {
    validCharacters: (str) => {
        const charRegex = /^[a-zA-Z0-9-_\(\) ]+$/;
        return charRegex.test(str);
    },
    onlyNumbers: (str) => {
        const numRegex = /^[0-9]+$/;
        return numRegex.test(str);
    },
    onlyFloat: (str) => {
        const floatRegex = /^[0-9\.]+$/;
        return floatRegex.test(str);
    },
    validUsername: (str) => {
        const usernameRegex = /^[a-zA-Z0-9]{4,}$/;
        return usernameRegex.test(str);
    },
    validPassword: (str) => {
        const passwordRegex = /^[a-zA-Z0-9#$@!%&*?]{4,30}$/;
        return passwordRegex.test(str);
    },
    validEmail: (str) => {
        // http://emailregex.com/
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailRegex.test(str);
    },
    validName: (str) => {
        const nameRegex = /^[A-Za-z-'. ]{2,}$/;
        return nameRegex.test(str);
    }
};