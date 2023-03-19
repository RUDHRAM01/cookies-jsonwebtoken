const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Schema = mongoose.Schema

const Student = new Schema({
    name: 'string',
    email: 'string',
    password: 'string',
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
})

Student.methods.generateAuthToken = async function () {
    console.log("calling generateAuthToken");
    try {
        const token = jwt.sign({ _id: this._id }, 'rudhramsaraswatDFGFJDIOJ');
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token;
    } catch (err) {
        console.log(err);
    }
}


Student.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
})

const StudentModel = mongoose.model('Student', Student);

module.exports = StudentModel