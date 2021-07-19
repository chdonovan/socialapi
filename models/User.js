const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true   
        },
        email: {
            type: String,
            required: true,
            unique: true
            // match: '/\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/i'
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

// Virtual Friend Count
UserSchema.virtual('friendcount').get(function() {
    return this.friends.reduce((total, user) => total +1, 0);
});

// create user models
const User = model('User', UserSchema);

module.exports = User;