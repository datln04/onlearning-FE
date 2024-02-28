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

/**
 * The ProfilePaymentMethodsView model module.
 * @module model/ProfilePaymentMethodsView
 * @version v1
 */
class ProfilePaymentMethodsView {
    /**
     * Constructs a new <code>ProfilePaymentMethodsView</code>.
     * @alias module:model/ProfilePaymentMethodsView
     */
    constructor() { 
        
        ProfilePaymentMethodsView.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>ProfilePaymentMethodsView</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ProfilePaymentMethodsView} obj Optional instance to populate.
     * @return {module:model/ProfilePaymentMethodsView} The populated <code>ProfilePaymentMethodsView</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new ProfilePaymentMethodsView();

            if (data.hasOwnProperty('id')) {
                obj['id'] = ApiClient.convertToType(data['id'], 'Number');
            }
            if (data.hasOwnProperty('avatar')) {
                obj['avatar'] = ApiClient.convertToType(data['avatar'], 'String');
            }
            if (data.hasOwnProperty('phone')) {
                obj['phone'] = ApiClient.convertToType(data['phone'], 'String');
            }
            if (data.hasOwnProperty('firstName')) {
                obj['firstName'] = ApiClient.convertToType(data['firstName'], 'String');
            }
            if (data.hasOwnProperty('lastName')) {
                obj['lastName'] = ApiClient.convertToType(data['lastName'], 'String');
            }
            if (data.hasOwnProperty('email')) {
                obj['email'] = ApiClient.convertToType(data['email'], 'String');
            }
            if (data.hasOwnProperty('description')) {
                obj['description'] = ApiClient.convertToType(data['description'], 'String');
            }
            if (data.hasOwnProperty('address')) {
                obj['address'] = ApiClient.convertToType(data['address'], 'String');
            }
            if (data.hasOwnProperty('dateOfBirth')) {
                obj['dateOfBirth'] = ApiClient.convertToType(data['dateOfBirth'], 'Date');
            }
            if (data.hasOwnProperty('status')) {
                obj['status'] = ApiClient.convertToType(data['status'], 'Boolean');
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>ProfilePaymentMethodsView</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>ProfilePaymentMethodsView</code>.
     */
    static validateJSON(data) {
        // ensure the json data is a string
        if (data['avatar'] && !(typeof data['avatar'] === 'string' || data['avatar'] instanceof String)) {
            throw new Error("Expected the field `avatar` to be a primitive type in the JSON string but got " + data['avatar']);
        }
        // ensure the json data is a string
        if (data['phone'] && !(typeof data['phone'] === 'string' || data['phone'] instanceof String)) {
            throw new Error("Expected the field `phone` to be a primitive type in the JSON string but got " + data['phone']);
        }
        // ensure the json data is a string
        if (data['firstName'] && !(typeof data['firstName'] === 'string' || data['firstName'] instanceof String)) {
            throw new Error("Expected the field `firstName` to be a primitive type in the JSON string but got " + data['firstName']);
        }
        // ensure the json data is a string
        if (data['lastName'] && !(typeof data['lastName'] === 'string' || data['lastName'] instanceof String)) {
            throw new Error("Expected the field `lastName` to be a primitive type in the JSON string but got " + data['lastName']);
        }
        // ensure the json data is a string
        if (data['email'] && !(typeof data['email'] === 'string' || data['email'] instanceof String)) {
            throw new Error("Expected the field `email` to be a primitive type in the JSON string but got " + data['email']);
        }
        // ensure the json data is a string
        if (data['description'] && !(typeof data['description'] === 'string' || data['description'] instanceof String)) {
            throw new Error("Expected the field `description` to be a primitive type in the JSON string but got " + data['description']);
        }
        // ensure the json data is a string
        if (data['address'] && !(typeof data['address'] === 'string' || data['address'] instanceof String)) {
            throw new Error("Expected the field `address` to be a primitive type in the JSON string but got " + data['address']);
        }

        return true;
    }


}



/**
 * @member {Number} id
 */
ProfilePaymentMethodsView.prototype['id'] = undefined;

/**
 * @member {String} avatar
 */
ProfilePaymentMethodsView.prototype['avatar'] = undefined;

/**
 * @member {String} phone
 */
ProfilePaymentMethodsView.prototype['phone'] = undefined;

/**
 * @member {String} firstName
 */
ProfilePaymentMethodsView.prototype['firstName'] = undefined;

/**
 * @member {String} lastName
 */
ProfilePaymentMethodsView.prototype['lastName'] = undefined;

/**
 * @member {String} email
 */
ProfilePaymentMethodsView.prototype['email'] = undefined;

/**
 * @member {String} description
 */
ProfilePaymentMethodsView.prototype['description'] = undefined;

/**
 * @member {String} address
 */
ProfilePaymentMethodsView.prototype['address'] = undefined;

/**
 * @member {Date} dateOfBirth
 */
ProfilePaymentMethodsView.prototype['dateOfBirth'] = undefined;

/**
 * @member {Boolean} status
 */
ProfilePaymentMethodsView.prototype['status'] = undefined;






export default ProfilePaymentMethodsView;

