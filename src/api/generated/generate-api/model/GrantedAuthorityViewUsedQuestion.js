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
 * The GrantedAuthorityViewUsedQuestion model module.
 * @module model/GrantedAuthorityViewUsedQuestion
 * @version v1
 */
class GrantedAuthorityViewUsedQuestion {
    /**
     * Constructs a new <code>GrantedAuthorityViewUsedQuestion</code>.
     * @alias module:model/GrantedAuthorityViewUsedQuestion
     */
    constructor() { 
        
        GrantedAuthorityViewUsedQuestion.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>GrantedAuthorityViewUsedQuestion</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/GrantedAuthorityViewUsedQuestion} obj Optional instance to populate.
     * @return {module:model/GrantedAuthorityViewUsedQuestion} The populated <code>GrantedAuthorityViewUsedQuestion</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new GrantedAuthorityViewUsedQuestion();

            if (data.hasOwnProperty('authority')) {
                obj['authority'] = ApiClient.convertToType(data['authority'], 'String');
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>GrantedAuthorityViewUsedQuestion</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>GrantedAuthorityViewUsedQuestion</code>.
     */
    static validateJSON(data) {
        // ensure the json data is a string
        if (data['authority'] && !(typeof data['authority'] === 'string' || data['authority'] instanceof String)) {
            throw new Error("Expected the field `authority` to be a primitive type in the JSON string but got " + data['authority']);
        }

        return true;
    }


}



/**
 * @member {String} authority
 */
GrantedAuthorityViewUsedQuestion.prototype['authority'] = undefined;






export default GrantedAuthorityViewUsedQuestion;
