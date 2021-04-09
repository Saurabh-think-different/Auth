const Joi = require('@hapi/joi')
const bcrypt = require('bcryptjs')

const registerValidation = (data) =>{
    const schema = Joi.object({
        name: Joi.string().alphanum().min(6).max(255).required(),
        email: Joi.string().email().min(6).max(255).required(),
        password: Joi.string().min(6).required()
    })
    return schema.validate(data)
}

const loginValidation = (data) =>{
    const schema = Joi.object({
        email: Joi.string().email().min(6).max(255).required(),
        password: Joi.string().min(6).required()
    })
    return schema.validate(data)
}

const hashpassword = (pwd) => {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(pwd, salt);
    return hash
}

const checkHash = (pwdfromform,actualpwdhash) => {
    return bcrypt.compareSync(pwdfromform, actualpwdhash)
}




module.exports = {
    registerValidation,
    loginValidation,
    hashpassword,
    checkHash,
} 

