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
import GrantedAuthorityPaymentHistoryView from './GrantedAuthorityPaymentHistoryView';

/**
 * The AccountPaymentHistoryView model module.
 * @module model/AccountPaymentHistoryView
 * @version v1
 */
class AccountPaymentHistoryView {
    /**
     * Constructs a new <code>AccountPaymentHistoryView</code>.
     * @alias module:model/AccountPaymentHistoryView
     */
    constructor() { 
        
        AccountPaymentHistoryView.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>AccountPaymentHistoryView</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/AccountPaymentHistoryView} obj Optional instance to populate.
     * @return {module:model/AccountPaymentHistoryView} The populated <code>AccountPaymentHistoryView</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new AccountPaymentHistoryView();

            if (data.hasOwnProperty('createdAt')) {
                obj['createdAt'] = ApiClient.convertToType(data['createdAt'], 'Date');
            }
            if (data.hasOwnProperty('updatedAt')) {
                obj['updatedAt'] = ApiClient.convertToType(data['updatedAt'], 'Date');
            }
            if (data.hasOwnProperty('deletedAt')) {
                obj['deletedAt'] = ApiClient.convertToType(data['deletedAt'], 'Date');
            }
            if (data.hasOwnProperty('id')) {
                obj['id'] = ApiClient.convertToType(data['id'], 'Number');
            }
            if (data.hasOwnProperty('username')) {
                obj['username'] = ApiClient.convertToType(data['username'], 'String');
            }
            if (data.hasOwnProperty('password')) {
                obj['password'] = ApiClient.convertToType(data['password'], 'String');
            }
            if (data.hasOwnProperty('role')) {
                obj['role'] = ApiClient.convertToType(data['role'], 'String');
            }
            if (data.hasOwnProperty('active')) {
                obj['active'] = ApiClient.convertToType(data['active'], 'Boolean');
            }
            if (data.hasOwnProperty('accountNonExpired')) {
                obj['accountNonExpired'] = ApiClient.convertToType(data['accountNonExpired'], 'Boolean');
            }
            if (data.hasOwnProperty('credentialsNonExpired')) {
                obj['credentialsNonExpired'] = ApiClient.convertToType(data['credentialsNonExpired'], 'Boolean');
            }
            if (data.hasOwnProperty('accountNonLocked')) {
                obj['accountNonLocked'] = ApiClient.convertToType(data['accountNonLocked'], 'Boolean');
            }
            if (data.hasOwnProperty('authorities')) {
                obj['authorities'] = ApiClient.convertToType(data['authorities'], [GrantedAuthorityPaymentHistoryView]);
            }
            if (data.hasOwnProperty('enabled')) {
                obj['enabled'] = ApiClient.convertToType(data['enabled'], 'Boolean');
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>AccountPaymentHistoryView</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>AccountPaymentHistoryView</code>.
     */
    static validateJSON(data) {
        // ensure the json data is a string
        if (data['username'] && !(typeof data['username'] === 'string' || data['username'] instanceof String)) {
            throw new Error("Expected the field `username` to be a primitive type in the JSON string but got " + data['username']);
        }
        // ensure the json data is a string
        if (data['password'] && !(typeof data['password'] === 'string' || data['password'] instanceof String)) {
            throw new Error("Expected the field `password` to be a primitive type in the JSON string but got " + data['password']);
        }
        // ensure the json data is a string
        if (data['role'] && !(typeof data['role'] === 'string' || data['role'] instanceof String)) {
            throw new Error("Expected the field `role` to be a primitive type in the JSON string but got " + data['role']);
        }
        if (data['authorities']) { // data not null
            // ensure the json data is an array
            if (!Array.isArray(data['authorities'])) {
                throw new Error("Expected the field `authorities` to be an array in the JSON data but got " + data['authorities']);
            }
            // validate the optional field `authorities` (array)
            for (const item of data['authorities']) {
                GrantedAuthorityPaymentHistoryView.validateJsonObject(item);
            };
        }

        return true;
    }


}



/**
 * @member {Date} createdAt
 */
AccountPaymentHistoryView.prototype['createdAt'] = undefined;

/**
 * @member {Date} updatedAt
 */
AccountPaymentHistoryView.prototype['updatedAt'] = undefined;

/**
 * @member {Date} deletedAt
 */
AccountPaymentHistoryView.prototype['deletedAt'] = undefined;

/**
 * @member {Number} id
 */
AccountPaymentHistoryView.prototype['id'] = undefined;

/**
 * @member {String} username
 */
AccountPaymentHistoryView.prototype['username'] = undefined;

/**
 * @member {String} password
 */
AccountPaymentHistoryView.prototype['password'] = undefined;

/**
 * @member {module:model/AccountPaymentHistoryView.RoleEnum} role
 */
AccountPaymentHistoryView.prototype['role'] = undefined;

/**
 * @member {Boolean} active
 */
AccountPaymentHistoryView.prototype['active'] = undefined;

/**
 * @member {Boolean} accountNonExpired
 */
AccountPaymentHistoryView.prototype['accountNonExpired'] = undefined;

/**
 * @member {Boolean} credentialsNonExpired
 */
AccountPaymentHistoryView.prototype['credentialsNonExpired'] = undefined;

/**
 * @member {Boolean} accountNonLocked
 */
AccountPaymentHistoryView.prototype['accountNonLocked'] = undefined;

/**
 * @member {Array.<module:model/GrantedAuthorityPaymentHistoryView>} authorities
 */
AccountPaymentHistoryView.prototype['authorities'] = undefined;

/**
 * @member {Boolean} enabled
 */
AccountPaymentHistoryView.prototype['enabled'] = undefined;





/**
 * Allowed values for the <code>role</code> property.
 * @enum {String}
 * @readonly
 */
AccountPaymentHistoryView['RoleEnum'] = {

    /**
     * value: "ADMIN"
     * @const
     */
    "ADMIN": "ADMIN",

    /**
     * value: "STAFF"
     * @const
     */
    "STAFF": "STAFF",

    /**
     * value: "STUDENT"
     * @const
     */
    "STUDENT": "STUDENT",

    /**
     * value: "TEACHER"
     * @const
     */
    "TEACHER": "TEACHER"
};



export default AccountPaymentHistoryView;

