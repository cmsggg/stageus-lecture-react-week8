const { compareSync, genSaltSync, hashSync } = require('bcrypt');

const hashPw = (password) => {
    if (!password)
        throw new Error('password argument cannot be empty');

    const salt = genSaltSync(8);
    const hashString = hashSync(password, salt);

    return hashString;
}

const compareHash = (password, hashString) => {
    if (!password)
        return false;

    if (!hashString)
        return false;

    return compareSync(password, hashString);
}

module.exports = {
    hashPw,
    compareHash
}
