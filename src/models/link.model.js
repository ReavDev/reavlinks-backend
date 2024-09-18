const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

const linkSchema = mongoose.Schema(
    {
        originalUrl: {
            type: String,
            required: true,
            trim: true,
            validate(value) {
                if (!validator.isURL(value)) {
                    throw new Error('Invalid URL');
                }
            },
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            minlength: 4,
            maxlength: 50,
        },
        password: {
            type: String,
            trim: true,
            minlength: 4,
            private: true, // Ensures the password is not returned in API responses
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        expirationDate: {
            type: Date,
        },
        clickCount: {
            type: Number,
            default: 0,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        // Add any additional fields as needed
    },
    {
        timestamps: true,
    }
);

// Add plugins that convert mongoose to json and handle pagination
linkSchema.plugin(toJSON);
linkSchema.plugin(paginate);

/**
 * Check if slug is taken
 * @param {string} slug - The link's slug
 * @param {ObjectId} [excludeLinkId] - The id of the link to be excluded
 * @returns {Promise<boolean>}
 */
linkSchema.statics.isSlugTaken = async function (slug, excludeLinkId) {
    const link = await this.findOne({ slug, _id: { $ne: excludeLinkId } });
    return !!link;
};

/**
 * Check if password matches the link's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
linkSchema.methods.isPasswordMatch = async function (password) {
    const link = this;
    if (!link.password) {
        return true; // If no password is set, allow access
    }
    return bcrypt.compare(password, link.password);
};

// Hash the password before saving if it's modified
linkSchema.pre('save', async function (next) {
    const link = this;
    if (link.isModified('password') && link.password) {
        link.password = await bcrypt.hash(link.password, 8);
    }
    next();
});

/**
 * @typedef Link
 */
const Link = mongoose.model('Link', linkSchema);

module.exports = Link;
