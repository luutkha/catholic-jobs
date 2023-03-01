const mongoose = require('mongoose');
const elsClient = require('../../config/els')

/**
 * File Schema
 * @private
 */
const fileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: false,
        trim: true,
        // lowercase: true,
    },
    size: {
        type: Number,
        index: true,
        default: 0,

    },
    status: {
        type: [String],
        default: ['open'],
    },
    url: {
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
// fileSchema.pre('save', async function save(next) {
//     try {
//         console.log('Save job to elastic search db')
//         console.log(this)
//         return next();
//     } catch (error) {
//         return next(error);
//     }
// });
fileSchema.post('save', async function (doc) {
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
fileSchema.method({
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
 * @typedef File
 */
module.exports = mongoose.model('File', fileSchema);
