module.exports = {
    validCharacters: (str) => {
        const regex = /^[a-zA-Z0-9-_\(\) ]*$/;
        return regex.test(str);
    },
    onlyNumbers: (str) => {
        const regex = /^[0-9]*$/;
        return regex.test(str);
    },
    onlyFloat: (str) => {
        const regex = /^[0-9\.]*$/;
        return regex.test(str);
    }
};