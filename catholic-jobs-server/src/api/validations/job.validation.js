const Joi = require('joi');
module.exports = {

  // GET /v1/jobs
  listJobs: {
    query: {
      page: Joi.number().min(1),
      perPage: Joi.number().min(1).max(100),
      // name: Joi.string(),
      // email: Joi.string(),
    },
  },

  // POST /v1/jobs
  createJob: {
    body: {
      title: Joi.string().required(),
      content: Joi.string().min(6).max(128).required(),
      companyId: Joi.string().max(128),
    },
  },

  // PUT /v1/jobs/:jobId
  replaceJob: {
    body: {
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(128).required(),
      name: Joi.string().max(128),
    },
    params: {
      jobId: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
    },
  },

  // PATCH /v1/jobs/:jobId
  updateJob: {
    body: {
      email: Joi.string().email(),
      password: Joi.string().min(6).max(128),
      name: Joi.string().max(128),
    },
    params: {
      jobId: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
    },
  },
};
