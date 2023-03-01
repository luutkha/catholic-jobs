const httpStatus = require('http-status');
const { omit } = require('lodash');
const Job = require('../models/Job.model');

/**
 * Load Job and append to req.
 * @public
 */
exports.load = async (req, res, next, id) => {
    try {
        const job = await Job.get(id);
        req.locals = { job };
        return next();
    } catch (error) {
        return next(error);
    }
};

/**
 * Get Job
 * @public
 */
exports.get = (req, res) => res.json(req.locals.job);

/**
 * Create new Job
 * @public
 */
exports.create = async (req, res, next) => {
    try {
        const job = new Job(req.body);
        const savedJob = await job.save();
        res.status(httpStatus.CREATED);
        res.json(savedJob);
    } catch (error) {
        console.log(error)
    }
};

/**
 * Replace existing Job
 * @public
 */
exports.replace = async (req, res, next) => {
    try {
        const { Job } = req.locals;
        const newJob = new Job(req.body);
        const ommitRole = Job.role !== 'admin' ? 'role' : '';
        const newJobObject = omit(newJob.toObject(), '_id', ommitRole);

        await Job.updateOne(newJobObject, { override: true, upsert: true });
        const savedJob = await Job.findById(Job._id);

        res.json(savedJob.transform());
    } catch (error) {
        next(Job.checkDuplicateEmail(error));
    }
};

/**
 * Update existing Job
 * @public
 */
exports.update = (req, res, next) => {
    const ommitRole = req.locals.Job.role !== 'admin' ? 'role' : '';
    const updatedJob = omit(req.body, ommitRole);
    const Job = Object.assign(req.locals.Job, updatedJob);

    Job.save()
        .then((savedJob) => res.json(savedJob.transform()))
        .catch((e) => next(Job.checkDuplicateEmail(e)));
};

/**
 * Get Job list
 * @public
 */
exports.list = async (req, res, next) => {
    try {
        console.log('query =', req.query)
        // console.log('params =', req)
        const jobs = await Job.list(req.query);
        const transformedJobs = jobs;
        res.json(transformedJobs);
    } catch (error) {
        next(error);
    }
};

/**
 * Delete Job    
 * @public
 */
exports.remove = (req, res, next) => {
    const { job } = req.locals;

    job.remove()
        .then(() => res.status(httpStatus.NO_CONTENT).end())
        .catch((e) => next(e));
};
