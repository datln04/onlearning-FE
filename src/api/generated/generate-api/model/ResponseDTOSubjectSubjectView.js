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
import SubjectSubjectView from './SubjectSubjectView';

/**
 * The ResponseDTOSubjectSubjectView model module.
 * @module model/ResponseDTOSubjectSubjectView
 * @version v1
 */
class ResponseDTOSubjectSubjectView {
    /**
     * Constructs a new <code>ResponseDTOSubjectSubjectView</code>.
     * @alias module:model/ResponseDTOSubjectSubjectView
     */
    constructor() { 
        
        ResponseDTOSubjectSubjectView.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>ResponseDTOSubjectSubjectView</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ResponseDTOSubjectSubjectView} obj Optional instance to populate.
     * @return {module:model/ResponseDTOSubjectSubjectView} The populated <code>ResponseDTOSubjectSubjectView</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new ResponseDTOSubjectSubjectView();

            if (data.hasOwnProperty('code')) {
                obj['code'] = ApiClient.convertToType(data['code'], 'Number');
            }
            if (data.hasOwnProperty('message')) {
                obj['message'] = ApiClient.convertToType(data['message'], 'String');
            }
            if (data.hasOwnProperty('responseObject')) {
                obj['responseObject'] = SubjectSubjectView.constructFromObject(data['responseObject']);
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>ResponseDTOSubjectSubjectView</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>ResponseDTOSubjectSubjectView</code>.
     */
    static validateJSON(data) {
        // ensure the json data is a string
        if (data['message'] && !(typeof data['message'] === 'string' || data['message'] instanceof String)) {
            throw new Error("Expected the field `message` to be a primitive type in the JSON string but got " + data['message']);
        }
        // validate the optional field `responseObject`
        if (data['responseObject']) { // data not null
          SubjectSubjectView.validateJSON(data['responseObject']);
        }

        return true;
    }


}



/**
 * @member {Number} code
 */
ResponseDTOSubjectSubjectView.prototype['code'] = undefined;

/**
 * @member {String} message
 */
ResponseDTOSubjectSubjectView.prototype['message'] = undefined;

/**
 * @member {module:model/SubjectSubjectView} responseObject
 */
ResponseDTOSubjectSubjectView.prototype['responseObject'] = undefined;






export default ResponseDTOSubjectSubjectView;
