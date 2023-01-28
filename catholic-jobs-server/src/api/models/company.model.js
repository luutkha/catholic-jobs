const mongoose = require('mongoose');
const elsClient = require('../../config/els')

/**
 * Company Schema
 * @private
 */
const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: false,
        trim: true,
        // lowercase: true,
    },
    size: {
        type: String,
        maxlength: 128,
        index: true,
        trim: true,
        default: ['0-100'],

    },
    status: {
        type: [String],
        default: ['open'],
    },
    address: {
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
// companySchema.pre('save', async function save(next) {
//     try {
//         console.log('Save job to elastic search db')
//         console.log(this)
//         return next();
//     } catch (error) {
//         return next(error);
//     }
// });
companySchema.post('save', async function (doc) {
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
companySchema.method({
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

/**
 * @typedef Company
 */
module.exports = mongoose.model('Company', companySchema);
