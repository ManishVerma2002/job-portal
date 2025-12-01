
const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    return hashed;
}

const comparePassword = async (plainPassword, hashedPassword) =>{
    return bcrypt.compare(plainPassword, hashPassword);
}

module.exports = {
  hashPassword,
  comparePassword,
};