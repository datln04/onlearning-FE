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

import ApiClient from '../ApiClient';
import AccountCourseView from './AccountCourseView';

/**
 * The StaffCourseView model module.
 * @module model/StaffCourseView
 * @version v1
 */
class StaffCourseView {
    /**
     * Constructs a new <code>StaffCourseView</code>.
     * @alias module:model/StaffCourseView
     */
    constructor() { 
        
        StaffCourseView.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>StaffCourseView</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/StaffCourseView} obj Optional instance to populate.
     * @return {module:model/StaffCourseView} The populated <code>StaffCourseView</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new StaffCourseView();

            if (data.hasOwnProperty('staffNumber')) {
                obj['staffNumber'] = ApiClient.convertToType(data['staffNumber'], 'String');
            }
            if (data.hasOwnProperty('account')) {
                obj['account'] = AccountCourseView.constructFromObject(data['account']);
            }
            if (data.hasOwnProperty('bankName')) {
                obj['bankName'] = ApiClient.convertToType(data['bankName'], 'String');
            }
            if (data.hasOwnProperty('cardNumber')) {
                obj['cardNumber'] = ApiClient.convertToType(data['cardNumber'], 'String');
            }
            if (data.hasOwnProperty('cardHolderName')) {
                obj['cardHolderName'] = ApiClient.convertToType(data['cardHolderName'], 'String');
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>StaffCourseView</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>StaffCourseView</code>.
     */
    static validateJSON(data) {
        // ensure the json data is a string
        if (data['staffNumber'] && !(typeof data['staffNumber'] === 'string' || data['staffNumber'] instanceof String)) {
            throw new Error("Expected the field `staffNumber` to be a primitive type in the JSON string but got " + data['staffNumber']);
        }
        // validate the optional field `account`
        if (data['account']) { // data not null
          AccountCourseView.validateJSON(data['account']);
        }
        // ensure the json data is a string
        if (data['bankName'] && !(typeof data['bankName'] === 'string' || data['bankName'] instanceof String)) {
            throw new Error("Expected the field `bankName` to be a primitive type in the JSON string but got " + data['bankName']);
        }
        // ensure the json data is a string
        if (data['cardNumber'] && !(typeof data['cardNumber'] === 'string' || data['cardNumber'] instanceof String)) {
            throw new Error("Expected the field `cardNumber` to be a primitive type in the JSON string but got " + data['cardNumber']);
        }
        // ensure the json data is a string
        if (data['cardHolderName'] && !(typeof data['cardHolderName'] === 'string' || data['cardHolderName'] instanceof String)) {
            throw new Error("Expected the field `cardHolderName` to be a primitive type in the JSON string but got " + data['cardHolderName']);
        }

        return true;
    }


}



/**
 * @member {String} staffNumber
 */
StaffCourseView.prototype['staffNumber'] = undefined;

/**
 * @member {module:model/AccountCourseView} account
 */
StaffCourseView.prototype['account'] = undefined;

/**
 * @member {String} bankName
 */
StaffCourseView.prototype['bankName'] = undefined;

/**
 * @member {String} cardNumber
 */
StaffCourseView.prototype['cardNumber'] = undefined;

/**
 * @member {String} cardHolderName
 */
StaffCourseView.prototype['cardHolderName'] = undefined;






export default StaffCourseView;

