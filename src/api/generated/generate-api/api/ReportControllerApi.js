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
import ReportReportView from '../model/ReportReportView';
import ReportRequestReportView from '../model/ReportRequestReportView';
import ResponseDTOListReportReportView from '../model/ResponseDTOListReportReportView';

/**
* ReportController service.
* @module api/ReportControllerApi
* @version v1
*/
export default class ReportControllerApi {

    /**
    * Constructs a new ReportControllerApi. 
    * @alias module:api/ReportControllerApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instance} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }


    /**
     * Callback function to receive the result of the getAllReport operation.
     * @callback module:api/ReportControllerApi~getAllReportCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ResponseDTOListReportReportView} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {module:api/ReportControllerApi~getAllReportCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ResponseDTOListReportReportView}
     */
    getAllReport(callback) {
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
      let returnType = ResponseDTOListReportReportView;
      return this.apiClient.callApi(
        '/api/v1/report/reports', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getReportByStudent operation.
     * @callback module:api/ReportControllerApi~getReportByStudentCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ResponseDTOListReportReportView} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Number} studentId 
     * @param {module:api/ReportControllerApi~getReportByStudentCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ResponseDTOListReportReportView}
     */
    getReportByStudent(studentId, callback) {
      let postBody = null;
      // verify the required parameter 'studentId' is set
      if (studentId === undefined || studentId === null) {
        throw new Error("Missing the required parameter 'studentId' when calling getReportByStudent");
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
      let returnType = ResponseDTOListReportReportView;
      return this.apiClient.callApi(
        '/api/v1/report/by-student', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getReportByTeacher operation.
     * @callback module:api/ReportControllerApi~getReportByTeacherCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ResponseDTOListReportReportView} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Number} teacherId 
     * @param {module:api/ReportControllerApi~getReportByTeacherCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ResponseDTOListReportReportView}
     */
    getReportByTeacher(teacherId, callback) {
      let postBody = null;
      // verify the required parameter 'teacherId' is set
      if (teacherId === undefined || teacherId === null) {
        throw new Error("Missing the required parameter 'teacherId' when calling getReportByTeacher");
      }

      let pathParams = {
      };
      let queryParams = {
        'teacher_id': teacherId
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = [];
      let accepts = ['*/*'];
      let returnType = ResponseDTOListReportReportView;
      return this.apiClient.callApi(
        '/api/v1/report/by-teacher', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the saveReport operation.
     * @callback module:api/ReportControllerApi~saveReportCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ReportReportView} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {module:model/ReportRequestReportView} reportRequestReportView 
     * @param {module:api/ReportControllerApi~saveReportCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ReportReportView}
     */
    saveReport(reportRequestReportView, callback) {
      let postBody = reportRequestReportView;
      // verify the required parameter 'reportRequestReportView' is set
      if (reportRequestReportView === undefined || reportRequestReportView === null) {
        throw new Error("Missing the required parameter 'reportRequestReportView' when calling saveReport");
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
      let returnType = ReportReportView;
      return this.apiClient.callApi(
        '/api/v1/report/save', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }


}