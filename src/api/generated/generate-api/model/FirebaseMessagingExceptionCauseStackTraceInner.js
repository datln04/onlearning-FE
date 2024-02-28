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
 * The FirebaseMessagingExceptionCauseStackTraceInner model module.
 * @module model/FirebaseMessagingExceptionCauseStackTraceInner
 * @version v1
 */
class FirebaseMessagingExceptionCauseStackTraceInner {
    /**
     * Constructs a new <code>FirebaseMessagingExceptionCauseStackTraceInner</code>.
     * @alias module:model/FirebaseMessagingExceptionCauseStackTraceInner
     */
    constructor() { 
        
        FirebaseMessagingExceptionCauseStackTraceInner.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>FirebaseMessagingExceptionCauseStackTraceInner</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/FirebaseMessagingExceptionCauseStackTraceInner} obj Optional instance to populate.
     * @return {module:model/FirebaseMessagingExceptionCauseStackTraceInner} The populated <code>FirebaseMessagingExceptionCauseStackTraceInner</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new FirebaseMessagingExceptionCauseStackTraceInner();

            if (data.hasOwnProperty('classLoaderName')) {
                obj['classLoaderName'] = ApiClient.convertToType(data['classLoaderName'], 'String');
            }
            if (data.hasOwnProperty('moduleName')) {
                obj['moduleName'] = ApiClient.convertToType(data['moduleName'], 'String');
            }
            if (data.hasOwnProperty('moduleVersion')) {
                obj['moduleVersion'] = ApiClient.convertToType(data['moduleVersion'], 'String');
            }
            if (data.hasOwnProperty('methodName')) {
                obj['methodName'] = ApiClient.convertToType(data['methodName'], 'String');
            }
            if (data.hasOwnProperty('fileName')) {
                obj['fileName'] = ApiClient.convertToType(data['fileName'], 'String');
            }
            if (data.hasOwnProperty('lineNumber')) {
                obj['lineNumber'] = ApiClient.convertToType(data['lineNumber'], 'Number');
            }
            if (data.hasOwnProperty('nativeMethod')) {
                obj['nativeMethod'] = ApiClient.convertToType(data['nativeMethod'], 'Boolean');
            }
            if (data.hasOwnProperty('className')) {
                obj['className'] = ApiClient.convertToType(data['className'], 'String');
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>FirebaseMessagingExceptionCauseStackTraceInner</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>FirebaseMessagingExceptionCauseStackTraceInner</code>.
     */
    static validateJSON(data) {
        // ensure the json data is a string
        if (data['classLoaderName'] && !(typeof data['classLoaderName'] === 'string' || data['classLoaderName'] instanceof String)) {
            throw new Error("Expected the field `classLoaderName` to be a primitive type in the JSON string but got " + data['classLoaderName']);
        }
        // ensure the json data is a string
        if (data['moduleName'] && !(typeof data['moduleName'] === 'string' || data['moduleName'] instanceof String)) {
            throw new Error("Expected the field `moduleName` to be a primitive type in the JSON string but got " + data['moduleName']);
        }
        // ensure the json data is a string
        if (data['moduleVersion'] && !(typeof data['moduleVersion'] === 'string' || data['moduleVersion'] instanceof String)) {
            throw new Error("Expected the field `moduleVersion` to be a primitive type in the JSON string but got " + data['moduleVersion']);
        }
        // ensure the json data is a string
        if (data['methodName'] && !(typeof data['methodName'] === 'string' || data['methodName'] instanceof String)) {
            throw new Error("Expected the field `methodName` to be a primitive type in the JSON string but got " + data['methodName']);
        }
        // ensure the json data is a string
        if (data['fileName'] && !(typeof data['fileName'] === 'string' || data['fileName'] instanceof String)) {
            throw new Error("Expected the field `fileName` to be a primitive type in the JSON string but got " + data['fileName']);
        }
        // ensure the json data is a string
        if (data['className'] && !(typeof data['className'] === 'string' || data['className'] instanceof String)) {
            throw new Error("Expected the field `className` to be a primitive type in the JSON string but got " + data['className']);
        }

        return true;
    }


}



/**
 * @member {String} classLoaderName
 */
FirebaseMessagingExceptionCauseStackTraceInner.prototype['classLoaderName'] = undefined;

/**
 * @member {String} moduleName
 */
FirebaseMessagingExceptionCauseStackTraceInner.prototype['moduleName'] = undefined;

/**
 * @member {String} moduleVersion
 */
FirebaseMessagingExceptionCauseStackTraceInner.prototype['moduleVersion'] = undefined;

/**
 * @member {String} methodName
 */
FirebaseMessagingExceptionCauseStackTraceInner.prototype['methodName'] = undefined;

/**
 * @member {String} fileName
 */
FirebaseMessagingExceptionCauseStackTraceInner.prototype['fileName'] = undefined;

/**
 * @member {Number} lineNumber
 */
FirebaseMessagingExceptionCauseStackTraceInner.prototype['lineNumber'] = undefined;

/**
 * @member {Boolean} nativeMethod
 */
FirebaseMessagingExceptionCauseStackTraceInner.prototype['nativeMethod'] = undefined;

/**
 * @member {String} className
 */
FirebaseMessagingExceptionCauseStackTraceInner.prototype['className'] = undefined;






export default FirebaseMessagingExceptionCauseStackTraceInner;
