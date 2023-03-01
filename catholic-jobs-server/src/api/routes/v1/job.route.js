const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/job.controller');
const { LOGGED_USER, authorize } = require('../../middlewares/auth');
const { listJobs, createJob, replaceJob, updateJob } = require('../../validations/job.validation');
//TODO middleware
//TODO, validation

const router = express.Router();

/**
 * Load Job when API with JobId route parameter is hit
 */
router.param('jobId', controller.load);

router
    .route('/')
    /**
     * @api {get} v1/Jobs List Jobs
     * @apiDescription Get a list of Jobs
     * @apiVersion 1.0.0
     * @apiName ListJobs
     * @apiGroup Job
     * @apiPermission 
     *
     * @apiHeader {String} Authorization   Job's access token
     *
     * @apiParam  {Number{1-}}         [page=1]     List page
     * @apiParam  {Number{1-100}}      [perPage=1]  Jobs per page
     * @apiParam  {String}             [name]       Job's name
     * @apiParam  {String}             [email]      Job's email
     * @apiParam  {String=Job,}  [role]       Job's role
     *
     * @apiSuccess {Object[]} Jobs List of Jobs.
     *
     * @apiError (Unauthorized 401)  Unauthorized  Only authenticated Jobs can access the data
     * @apiError (Forbidden 403)     Forbidden     Only s can access the data
     */
    .get(authorize(), validate(listJobs), controller.list)
    // /**
    //  * @api {post} v1/Jobs Create Job
    //  * @apiDescription Create a new Job
    //  * @apiVersion 1.0.0
    //  * @apiName CreateJob
    //  * @apiGroup Job
    //  * @apiPermission 
    //  *
    //  * @apiHeader {String} Authorization   Job's access token
    //  *
    //  * @apiParam  {String}             email     Job's email
    //  * @apiParam  {String{6..128}}     password  Job's password
    //  * @apiParam  {String{..128}}      [name]    Job's name
    //  * @apiParam  {String=Job,}  [role]    Job's role
    //  *
    //  * @apiSuccess (Created 201) {String}  id         Job's id
    //  * @apiSuccess (Created 201) {String}  name       Job's name
    //  * @apiSuccess (Created 201) {String}  email      Job's email
    //  * @apiSuccess (Created 201) {String}  role       Job's role
    //  * @apiSuccess (Created 201) {Date}    createdAt  Timestamp
    //  *
    //  * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
    //  * @apiError (Unauthorized 401)  Unauthorized     Only authenticated Jobs can create the data
    //  * @apiError (Forbidden 403)     Forbidden        Only s can create the data
    //  */
    .post(authorize(), validate(createJob), controller.create);

router
    .route('/:jobId')
    /**
     * @api {get} v1/Jobs/:id Get Job
     * @apiDescription Get Job information
     * @apiVersion 1.0.0
     * @apiName GetJob
     * @apiGroup Job
     * @apiPermission Job
     *
     * @apiHeader {String} Authorization   Job's access token
     *
     * @apiSuccess {String}  id         Job's id
     * @apiSuccess {String}  name       Job's name
     * @apiSuccess {String}  email      Job's email
     * @apiSuccess {String}  role       Job's role
     * @apiSuccess {Date}    createdAt  Timestamp
     *
     * @apiError (Unauthorized 401) Unauthorized Only authenticated Jobs can access the data
     * @apiError (Forbidden 403)    Forbidden    Only Job with same id or s can access the data
     * @apiError (Not Found 404)    NotFound     Job does not exist
     */
    .get(authorize(), controller.get)
    /**
     * @api {put} v1/Jobs/:id Replace Job
     * @apiDescription Replace the whole Job document with a new one
     * @apiVersion 1.0.0
     * @apiName ReplaceJob
     * @apiGroup Job
     * @apiPermission Job
     *
     * @apiHeader {String} Authorization   Job's access token
     *
     * @apiParam  {String}             email     Job's email
     * @apiParam  {String{6..128}}     password  Job's password
     * @apiParam  {String{..128}}      [name]    Job's name
     * @apiParam  {String=Job,}  [role]    Job's role
     * (You must be an  to change the Job's role)
     *
     * @apiSuccess {String}  id         Job's id
     * @apiSuccess {String}  name       Job's name
     * @apiSuccess {String}  email      Job's email
     * @apiSuccess {String}  role       Job's role
     * @apiSuccess {Date}    createdAt  Timestamp
     *
     * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
     * @apiError (Unauthorized 401) Unauthorized Only authenticated Jobs can modify the data
     * @apiError (Forbidden 403)    Forbidden    Only Job with same id or s can modify the data
     * @apiError (Not Found 404)    NotFound     Job does not exist
     */
    .put(authorize(LOGGED_USER), validate(replaceJob), controller.replace)
    /**
     * @api {patch} v1/Jobs/:id Update Job
     * @apiDescription Update some fields of a Job document
     * @apiVersion 1.0.0
     * @apiName UpdateJob
     * @apiGroup Job
     * @apiPermission Job
     *
     * @apiHeader {String} Authorization   Job's access token
     *
     * @apiParam  {String}             email     Job's email
     * @apiParam  {String{6..128}}     password  Job's password
     * @apiParam  {String{..128}}      [name]    Job's name
     * @apiParam  {String=Job,}  [role]    Job's role
     * (You must be an  to change the Job's role)
     *
     * @apiSuccess {String}  id         Job's id
     * @apiSuccess {String}  name       Job's name
     * @apiSuccess {String}  email      Job's email
     * @apiSuccess {String}  role       Job's role
     * @apiSuccess {Date}    createdAt  Timestamp
     *
     * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
     * @apiError (Unauthorized 401) Unauthorized Only authenticated Jobs can modify the data
     * @apiError (Forbidden 403)    Forbidden    Only Job with same id or s can modify the data
     * @apiError (Not Found 404)    NotFound     Job does not exist
     */
    .patch(authorize(LOGGED_USER), validate(updateJob), controller.update)
    /**
     * @api {patch} v1/Jobs/:id Delete Job
     * @apiDescription Delete a Job
     * @apiVersion 1.0.0
     * @apiName DeleteJob
     * @apiGroup Job
     * @apiPermission Job
     *
     * @apiHeader {String} Authorization   Job's access token
     *
     * @apiSuccess (No Content 204)  Successfully deleted
     *
     * @apiError (Unauthorized 401) Unauthorized  Only authenticated Jobs can delete the data
     * @apiError (Forbidden 403)    Forbidden     Only Job with same id or s can delete the data
     * @apiError (Not Found 404)    NotFound      Job does not exist
     */
    .delete(authorize(LOGGED_USER), controller.remove);

module.exports = router;
