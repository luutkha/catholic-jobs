const mongoose = require('mongoose');
const httpStatus = require('http-status');
const { omitBy, isNil } = require('lodash');
const moment = require('moment-timezone');
const uuidv4 = require('uuid/v4');
const APIError = require('../errors/api-error');
const elsClient = require('../../config/els')
/**
* User Roles
*/
const roles = ['user', 'admin'];

/**
 * User Schema
 * @private
 */
const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: false,
        trim: true,
        // lowercase: true,
    },
    content: {
        type: String,
        maxlength: 128,
        index: true,
        trim: true,
    },
    status: {
        type: [String],
        default: ['open'],
    },
    companyId: {
        type: String,
        trim: true,
    },
}, {
    timestamps: true,
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */
// jobSchema.pre('save', async function save(next) {
//     try {
//         console.log('Save job to elastic search db')
//         console.log(this)
//         return next();
//     } catch (error) {
//         return next(error);
//     }
// });
jobSchema.post('save', async function (doc) {
    console.log('Pre save document to ELS:')
    await elsClient.index({
        index: 'job-index',
        document: doc
      })
    console.log('%s has been saved', doc);
  });
/**
 * Methods
 */
jobSchema.method({
    transform() {
        const transformed = {};
        const fields = ['id', 'name', 'email', 'picture', 'role', 'createdAt'];

        fields.forEach((field) => {
            transformed[field] = this[field];
        });

        return transformed;
    },
});

/**
 * Statics
 */
jobSchema.statics = {

    roles,

    /**
     * Get user
     *
     * @param {ObjectId} id - The objectId of user.
     * @returns {Promise<User, APIError>}
     */
    async get(id) {
        let user;

        if (mongoose.Types.ObjectId.isValid(id)) {
            user = await this.findById(id).exec();
        }
        if (user) {
            return user;
        }

        throw new APIError({
            message: 'User does not exist',
            status: httpStatus.NOT_FOUND,
        });
    },

    /**
     * Find user by email and tries to generate a JWT token
     *
     * @param {ObjectId} id - The objectId of user.
     * @returns {Promise<User, APIError>}
     */
    async findAndGenerateToken(options) {
        const { email, password, refreshObject } = options;
        if (!email) throw new APIError({ message: 'An email is required to generate a token' });

        const user = await this.findOne({ email }).exec();
        const err = {
            status: httpStatus.UNAUTHORIZED,
            isPublic: true,
        };
        if (password) {
            if (user && await user.passwordMatches(password)) {
                return { user, accessToken: user.token() };
            }
            err.message = 'Incorrect email or password';
        } else if (refreshObject && refreshObject.userEmail === email) {
            if (moment(refreshObject.expires).isBefore()) {
                err.message = 'Invalid refresh token.';
            } else {
                return { user, accessToken: user.token() };
            }
        } else {
            err.message = 'Incorrect email or refreshToken';
        }
        throw new APIError(err);
    },

    /**
     * List users in descending order of 'createdAt' timestamp.
     *
     * @param {number} skip - Number of users to be skipped.
     * @param {number} limit - Limit number of users to be returned.
     * @returns {Promise<User[]>}
     */
    list({
        page = 1, perPage = 30, name, email, role,
    }) {
        const options = omitBy({ name, email, role }, isNil);

        return this.find(options)
            .sort({ createdAt: -1 })
            .skip(perPage * (page - 1))
            .limit(perPage)
            .exec();
    },

    /**
     * Return new validation error
     * if error is a mongoose duplicate key error
     *
     * @param {Error} error
     * @returns {Error|APIError}
     */
    checkDuplicateEmail(error) {
        if (error.name === 'MongoError' && error.code === 11000) {
            return new APIError({
                message: 'Validation Error',
                errors: [{
                    field: 'email',
                    location: 'body',
                    messages: ['"email" already exists'],
                }],
                status: httpStatus.CONFLICT,
                isPublic: true,
                stack: error.stack,
            });
        }
        return error;
    },

    async oAuthLogin({
        service, id, email, name, picture,
    }) {
        const user = await this.findOne({ $or: [{ [`services.${service}`]: id }, { email }] });
        if (user) {
            user.services[service] = id;
            if (!user.name) user.name = name;
            if (!user.picture) user.picture = picture;
            return user.save();
        }
        const password = uuidv4();
        return this.create({
            services: { [service]: id }, email, password, name, picture,
        });
    },
};

/**
 * @typedef User
 */
module.exports = mongoose.model('User', jobSchema);
