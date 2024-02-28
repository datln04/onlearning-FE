/**
 * FPT SE OnLearn management API
 * FPT OnLearn Management API
 *
 * The version of the OpenAPI document: v1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */


import ApiClient from "../ApiClient";
import Enroll from '../model/Enroll';
import EnrollEnrollView from '../model/EnrollEnrollView';
import EnrollRequestEnrollView from '../model/EnrollRequestEnrollView';
import PaginateCourseResponse from '../model/PaginateCourseResponse';
import RefundRequestTransactionView from '../model/RefundRequestTransactionView';
import ResponseDTOTransactionTransactionView from '../model/ResponseDTOTransactionTransactionView';

/**
* EnrollController service.
* @module api/EnrollControllerApi
* @version v1
*/
export default class EnrollControllerApi {

    /**
    * Constructs a new EnrollControllerApi. 
    * @alias module:api/EnrollControllerApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instance} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }


    /**
     * Callback function to receive the result of the findAllEnrolls operation.
     * @callback module:api/EnrollControllerApi~findAllEnrollsCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/EnrollEnrollView>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {module:api/EnrollControllerApi~findAllEnrollsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/EnrollEnrollView>}
     */
    findAllEnrolls(callback) {
      let postBody = null;

      let pathParams = {
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = [];
      let accepts = ['*/*'];
      let returnType = [EnrollEnrollView];
      return this.apiClient.callApi(
        '/api/v1/enroll/enrolls', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the findEnrollByCourseId operation.
     * @callback module:api/EnrollControllerApi~findEnrollByCourseIdCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/EnrollEnrollView>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Number} courseId 
     * @param {module:api/EnrollControllerApi~findEnrollByCourseIdCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/EnrollEnrollView>}
     */
    findEnrollByCourseId(courseId, callback) {
      let postBody = null;
      // verify the required parameter 'courseId' is set
      if (courseId === undefined || courseId === null) {
        throw new Error("Missing the required parameter 'courseId' when calling findEnrollByCourseId");
      }

      let pathParams = {
      };
      let queryParams = {
        'course_id': courseId
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = [];
      let accepts = ['*/*'];
      let returnType = [EnrollEnrollView];
      return this.apiClient.callApi(
        '/api/v1/enroll/byCourseId', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the findEnrollById operation.
     * @callback module:api/EnrollControllerApi~findEnrollByIdCallback
     * @param {String} error Error message, if any.
     * @param {module:model/EnrollEnrollView} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Number} id 
     * @param {module:api/EnrollControllerApi~findEnrollByIdCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/EnrollEnrollView}
     */
    findEnrollById(id, callback) {
      let postBody = null;
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling findEnrollById");
      }

      let pathParams = {
      };
      let queryParams = {
        'id': id
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = [];
      let accepts = ['*/*'];
      let returnType = EnrollEnrollView;
      return this.apiClient.callApi(
        '/api/v1/enroll/byId', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the findEnrollByStudentId operation.
     * @callback module:api/EnrollControllerApi~findEnrollByStudentIdCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/EnrollEnrollView>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Number} studentId 
     * @param {module:api/EnrollControllerApi~findEnrollByStudentIdCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/EnrollEnrollView>}
     */
    findEnrollByStudentId(studentId, callback) {
      let postBody = null;
      // verify the required parameter 'studentId' is set
      if (studentId === undefined || studentId === null) {
        throw new Error("Missing the required parameter 'studentId' when calling findEnrollByStudentId");
      }

      let pathParams = {
      };
      let queryParams = {
        'student_id': studentId
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = [];
      let accepts = ['*/*'];
      let returnType = [EnrollEnrollView];
      return this.apiClient.callApi(
        '/api/v1/enroll/byStudentId', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the findEnrollByStudentIdAndCourse operation.
     * @callback module:api/EnrollControllerApi~findEnrollByStudentIdAndCourseCallback
     * @param {String} error Error message, if any.
     * @param {module:model/EnrollEnrollView} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Number} studentId 
     * @param {Number} courseId 
     * @param {module:api/EnrollControllerApi~findEnrollByStudentIdAndCourseCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/EnrollEnrollView}
     */
    findEnrollByStudentIdAndCourse(studentId, courseId, callback) {
      let postBody = null;
      // verify the required parameter 'studentId' is set
      if (studentId === undefined || studentId === null) {
        throw new Error("Missing the required parameter 'studentId' when calling findEnrollByStudentIdAndCourse");
      }
      // verify the required parameter 'courseId' is set
      if (courseId === undefined || courseId === null) {
        throw new Error("Missing the required parameter 'courseId' when calling findEnrollByStudentIdAndCourse");
      }

      let pathParams = {
      };
      let queryParams = {
        'student_id': studentId,
        'course_id': courseId
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = [];
      let accepts = ['*/*'];
      let returnType = EnrollEnrollView;
      return this.apiClient.callApi(
        '/api/v1/enroll/byStudentId-courseId', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getCourseEnroll operation.
     * @callback module:api/EnrollControllerApi~getCourseEnrollCallback
     * @param {String} error Error message, if any.
     * @param {module:model/PaginateCourseResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Object} opts Optional parameters
     * @param {module:model/String} opts.status 
     * @param {Number} opts.page Zero-based page index (0..N) (default to 0)
     * @param {Number} opts.size The size of the page to be returned (default to 20)
     * @param {Array.<String>} opts.sort Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     * @param {module:api/EnrollControllerApi~getCourseEnrollCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/PaginateCourseResponse}
     */
    getCourseEnroll(opts, callback) {
      opts = opts || {};
      let postBody = null;

      let pathParams = {
      };
      let queryParams = {
        'status': opts['status'],
        'page': opts['page'],
        'size': opts['size'],
        'sort': this.apiClient.buildCollectionParam(opts['sort'], 'multi')
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = [];
      let accepts = ['*/*'];
      let returnType = PaginateCourseResponse;
      return this.apiClient.callApi(
        '/api/v1/enroll/student/getCourseEnrolls', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the refundEnroll operation.
     * @callback module:api/EnrollControllerApi~refundEnrollCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ResponseDTOTransactionTransactionView} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {module:model/RefundRequestTransactionView} refundRequestTransactionView 
     * @param {module:api/EnrollControllerApi~refundEnrollCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ResponseDTOTransactionTransactionView}
     */
    refundEnroll(refundRequestTransactionView, callback) {
      let postBody = refundRequestTransactionView;
      // verify the required parameter 'refundRequestTransactionView' is set
      if (refundRequestTransactionView === undefined || refundRequestTransactionView === null) {
        throw new Error("Missing the required parameter 'refundRequestTransactionView' when calling refundEnroll");
      }

      let pathParams = {
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = ['application/json'];
      let accepts = ['*/*'];
      let returnType = ResponseDTOTransactionTransactionView;
      return this.apiClient.callApi(
        '/api/v1/enroll/refund', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the removeEnroll operation.
     * @callback module:api/EnrollControllerApi~removeEnrollCallback
     * @param {String} error Error message, if any.
     * @param {String} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Number} enrollId 
     * @param {module:api/EnrollControllerApi~removeEnrollCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link String}
     */
    removeEnroll(enrollId, callback) {
      let postBody = null;
      // verify the required parameter 'enrollId' is set
      if (enrollId === undefined || enrollId === null) {
        throw new Error("Missing the required parameter 'enrollId' when calling removeEnroll");
      }

      let pathParams = {
      };
      let queryParams = {
        'enroll_id': enrollId
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = [];
      let accepts = ['*/*'];
      let returnType = 'String';
      return this.apiClient.callApi(
        '/api/v1/enroll/remove', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the saveEnroll operation.
     * @callback module:api/EnrollControllerApi~saveEnrollCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Enroll} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {module:model/Enroll} enroll 
     * @param {module:api/EnrollControllerApi~saveEnrollCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Enroll}
     */
    saveEnroll(enroll, callback) {
      let postBody = enroll;
      // verify the required parameter 'enroll' is set
      if (enroll === undefined || enroll === null) {
        throw new Error("Missing the required parameter 'enroll' when calling saveEnroll");
      }

      let pathParams = {
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = [];
      let contentTypes = ['application/json'];
      let accepts = ['*/*'];
      let returnType = Enroll;
      return this.apiClient.callApi(
        '/api/v1/enroll/save', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the saveEnroll1 operation.
     * @callback module:api/EnrollControllerApi~saveEnroll1Callback
     * @param {String} error Error message, if any.
     * @param {Object} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {module:model/EnrollRequestEnrollView} enrollRequestEnrollView 
     * @param {module:api/EnrollControllerApi~saveEnroll1Callback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Object}
     */
    saveEnroll1(enrollRequestEnrollView, callback) {
      let postBody = enrollRequestEnrollView;
      // verify the required parameter 'enrollRequestEnrollView' is set
      if (enrollRequestEnrollView === undefined || enrollRequestEnrollView === null) {
        throw new Error("Missing the required parameter 'enrollRequestEnrollView' when calling saveEnroll1");
      }

      let pathParams = {
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = ['application/json'];
      let accepts = ['*/*'];
      let returnType = Object;
      return this.apiClient.callApi(
        '/api/v1/enroll/enroll', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }


}