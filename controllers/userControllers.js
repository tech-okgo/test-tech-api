const bcrypt = require("bcrypt")
const Users = require("../users")
const fs = require('fs')
const { v4: uuidv4 } = require('uuid')
const {userCreateSchema, userUpdateSchema} = require("../schema/userSchema")

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!.@#$%^&*])(?=.{8,})/


// GET ALL USER //
exports.getUsers = async (req, res, next) => {
    try {
        // const users = await models.User.find()
        return res.status(200).json(Users)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

// GET USER //
exports.getUser = async (req, res, next) => {
    try {
        // const user = await models.User.findOne({ _id: req.params.id })
        let user = Users.find((u) => u.id === req.params.id)
        if (!user)
            return res.status(404).json({ error: 'Utilisateur introuvable.' })
        
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

// CREATE USER //
exports.createUser = async (req, res, next) => {
    try {
        let user = req.body
        user.id = uuidv4()
        const { error } = userCreateSchema.validate(user)
        if (error) {
            return res.status(400).json({ error: error.details[0].message.split('"').join('') })
        }
        if (user.email) {
            if (!EMAIL_REGEX.test(user.email))
                return res.status(400).json({ error: 'Email incorrect.' })
            
            const emailExists = Users.find((u) => u.email === user.email)
            if (emailExists)
                return res.status(400).json({ error: 'Adresse email déjà existante.' })
        }
        if (user.password) {
            if (!PASSWORD_REGEX.test(user.password))
                return res.status(401).json({ error: 'Minimum: 1 majuscule, 1 minuscule, 1 chiffre, 1 caractère (!.@#$%^&*)' })
            
                user.password = await bcrypt.hash(user.password, 10)
        }
        Users.push(user)
        fs.writeFileSync('./users.js', `module.exports = ${JSON.stringify(Users, null, 2)};`, 'utf-8');
        return res.status(201).json(user)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

// UPDATE USER //
exports.updateUser = async (req, res, next) => {
    try {
        let user = Users.find((u) => u.id === req.params.id)
        if (!user)
            return res.status(404).json({ error: 'Utilisateur introuvable.' })

        let updates = req.body
        const { error } = userUpdateSchema.validate(updates)
        if (error) {
            return res.status(400).json({ error: error.details[0].message.split('"').join('') })
        }
        
        if (updates.email && updates.email !== user.email) {
            if (!EMAIL_REGEX.test(updates.email))
                return res.status(400).json({ error: 'Email incorrect.' })
            
            const emailExists = Users.find((u) => u.email === user.email)
            if (emailExists)
                return res.status(400).json({ error: 'Adresse email déjà existante.' })
        }
        
        if (updates.password) {
            if (!PASSWORD_REGEX.test(updates.password))
                return res.status(401).json({ error: 'Minimum: 1 majuscule, 1 minuscule, 1 chiffre, 1 caractère (!.@#$%^&*)' })
            
            updates.password = await bcrypt.hash(updates.password, 10)
        }
        
        user = updates
        fs.writeFileSync('./users.js', `module.exports = ${JSON.stringify(Users, null, 2)};`, 'utf-8');
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

// DELETE USER //
exports.deleteUser = async (req, res, next) => {
    try {
        const user = Users.findIndex((u) => u.id === req.params.id)
        if (user === -1)
            return res.status(404).json({ error: 'Utilisateur introuvable.' })

        Users.splice(user, 1)
        fs.writeFileSync('./users.js', `module.exports = ${JSON.stringify(Users, null, 2)};`, 'utf-8');
        return res.status(200).json({ message: 'Utilisateur supprimé.' })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}
