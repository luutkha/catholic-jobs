const mongoose = require('mongoose');
const elsClient = require('../../config/els')
const _ = require('lodash');
const { omitBy, isNil } = require('lodash');
/**
* Job Roles
*/

/**
 * Job Schema
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
    console.log('%s has been saved', doc._id);
    console.log(_.omit({ ...doc._doc }, ['_id']))
    await elsClient.index({
        index: 'jobs-index',
        document: doc.transformId()

    })
    console.log('%s has been saved', doc);
});
/**
 * Methods
 */
jobSchema.method({
    transformId() {
        const transformed = {};

        delete Object.assign(transformed, this._doc, { mongooseId: this._doc._id })._id;
        console.log('test', transformed)
        return transformed;

    },
});

/**
 * Statics
 */
jobSchema.statics = {
    list({
        page = 1, perPage = 10, q = '',
        title, content,
    }) {
        const options = omitBy({ title, content }, isNil);
        return elsClient.search(
            {
                index: 'jobs-index',
                from: (page - 1) * perPage, size: perPage,
                query: Object.keys(options).length === 0 ? {
                    multi_match: {
                        query: q,
                        // fields: ['title', 'content'],
                        minimum_should_match: '50%'
                    }
                } : { match: options }
            }
        )
    },
}

/**
 * @typedef Job
 */
module.exports = mongoose.model('Job', jobSchema);
