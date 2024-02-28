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
import ResponseDTOWithdrawalRequestWithdrawRequestView from '../model/ResponseDTOWithdrawalRequestWithdrawRequestView';
import WithdrawTransactionRequestWithdrawRequestView from '../model/WithdrawTransactionRequestWithdrawRequestView';
import WithdrawalRequestWithdrawRequestView from '../model/WithdrawalRequestWithdrawRequestView';

/**
* WithdrawRequestController service.
* @module api/WithdrawRequestControllerApi
* @version v1
*/
export default class WithdrawRequestControllerApi {

    /**
    * Constructs a new WithdrawRequestControllerApi. 
    * @alias module:api/WithdrawRequestControllerApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instance} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }


    /**
     * Callback function to receive the result of the findAllById operation.
     * @callback module:api/WithdrawRequestControllerApi~findAllByIdCallback
     * @param {String} error Error message, if any.
     * @param {module:model/WithdrawalRequestWithdrawRequestView} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Number} id 
     * @param {module:api/WithdrawRequestControllerApi~findAllByIdCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/WithdrawalRequestWithdrawRequestView}
     */
    findAllById(id, callback) {
      let postBody = null;
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling findAllById");
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
      let returnType = WithdrawalRequestWithdrawRequestView;
      return this.apiClient.callApi(
        '/api/v1/withdraw-request/by-id', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the findAllByTeacherId operation.
     * @callback module:api/WithdrawRequestControllerApi~findAllByTeacherIdCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/WithdrawalRequestWithdrawRequestView>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Number} teacherId 
     * @param {module:api/WithdrawRequestControllerApi~findAllByTeacherIdCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/WithdrawalRequestWithdrawRequestView>}
     */
    findAllByTeacherId(teacherId, callback) {
      let postBody = null;
      // verify the required parameter 'teacherId' is set
      if (teacherId === undefined || teacherId === null) {
        throw new Error("Missing the required parameter 'teacherId' when calling findAllByTeacherId");
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
      let returnType = [WithdrawalRequestWithdrawRequestView];
      return this.apiClient.callApi(
        '/api/v1/withdraw-request/by-teacher', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the withdrawTransaction operation.
     * @callback module:api/WithdrawRequestControllerApi~withdrawTransactionCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ResponseDTOWithdrawalRequestWithdrawRequestView} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {module:model/WithdrawTransactionRequestWithdrawRequestView} withdrawTransactionRequestWithdrawRequestView 
     * @param {module:api/WithdrawRequestControllerApi~withdrawTransactionCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ResponseDTOWithdrawalRequestWithdrawRequestView}
     */
    withdrawTransaction(withdrawTransactionRequestWithdrawRequestView, callback) {
      let postBody = withdrawTransactionRequestWithdrawRequestView;
      // verify the required parameter 'withdrawTransactionRequestWithdrawRequestView' is set
      if (withdrawTransactionRequestWithdrawRequestView === undefined || withdrawTransactionRequestWithdrawRequestView === null) {
        throw new Error("Missing the required parameter 'withdrawTransactionRequestWithdrawRequestView' when calling withdrawTransaction");
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
      let returnType = ResponseDTOWithdrawalRequestWithdrawRequestView;
      return this.apiClient.callApi(
        '/api/v1/withdraw-request/withdraw-trasaction', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }


}