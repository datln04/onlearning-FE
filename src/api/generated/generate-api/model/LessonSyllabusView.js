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
import CourseSyllabusView from './CourseSyllabusView';
import ResourceSyllabusView from './ResourceSyllabusView';
import SyllabusSyllabusView from './SyllabusSyllabusView';

/**
 * The LessonSyllabusView model module.
 * @module model/LessonSyllabusView
 * @version v1
 */
class LessonSyllabusView {
    /**
     * Constructs a new <code>LessonSyllabusView</code>.
     * @alias module:model/LessonSyllabusView
     */
    constructor() { 
        
        LessonSyllabusView.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>LessonSyllabusView</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/LessonSyllabusView} obj Optional instance to populate.
     * @return {module:model/LessonSyllabusView} The populated <code>LessonSyllabusView</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new LessonSyllabusView();

            if (data.hasOwnProperty('id')) {
                obj['id'] = ApiClient.convertToType(data['id'], 'Number');
            }
            if (data.hasOwnProperty('name')) {
                obj['name'] = ApiClient.convertToType(data['name'], 'String');
            }
            if (data.hasOwnProperty('status')) {
                obj['status'] = ApiClient.convertToType(data['status'], 'String');
            }
            if (data.hasOwnProperty('description')) {
                obj['description'] = ApiClient.convertToType(data['description'], 'String');
            }
            if (data.hasOwnProperty('url')) {
                obj['url'] = ApiClient.convertToType(data['url'], 'String');
            }
            if (data.hasOwnProperty('dateTime')) {
                obj['dateTime'] = ApiClient.convertToType(data['dateTime'], 'Date');
            }
            if (data.hasOwnProperty('estimateTime')) {
                obj['estimateTime'] = ApiClient.convertToType(data['estimateTime'], 'Number');
            }
            if (data.hasOwnProperty('content')) {
                obj['content'] = ApiClient.convertToType(data['content'], 'String');
            }
            if (data.hasOwnProperty('type')) {
                obj['type'] = ApiClient.convertToType(data['type'], 'String');
            }
            if (data.hasOwnProperty('course')) {
                obj['course'] = CourseSyllabusView.constructFromObject(data['course']);
            }
            if (data.hasOwnProperty('resources')) {
                obj['resources'] = ApiClient.convertToType(data['resources'], [ResourceSyllabusView]);
            }
            if (data.hasOwnProperty('syllabuses')) {
                obj['syllabuses'] = ApiClient.convertToType(data['syllabuses'], [SyllabusSyllabusView]);
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>LessonSyllabusView</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>LessonSyllabusView</code>.
     */
    static validateJSON(data) {
        // ensure the json data is a string
        if (data['name'] && !(typeof data['name'] === 'string' || data['name'] instanceof String)) {
            throw new Error("Expected the field `name` to be a primitive type in the JSON string but got " + data['name']);
        }
        // ensure the json data is a string
        if (data['status'] && !(typeof data['status'] === 'string' || data['status'] instanceof String)) {
            throw new Error("Expected the field `status` to be a primitive type in the JSON string but got " + data['status']);
        }
        // ensure the json data is a string
        if (data['description'] && !(typeof data['description'] === 'string' || data['description'] instanceof String)) {
            throw new Error("Expected the field `description` to be a primitive type in the JSON string but got " + data['description']);
        }
        // ensure the json data is a string
        if (data['url'] && !(typeof data['url'] === 'string' || data['url'] instanceof String)) {
            throw new Error("Expected the field `url` to be a primitive type in the JSON string but got " + data['url']);
        }
        // ensure the json data is a string
        if (data['content'] && !(typeof data['content'] === 'string' || data['content'] instanceof String)) {
            throw new Error("Expected the field `content` to be a primitive type in the JSON string but got " + data['content']);
        }
        // ensure the json data is a string
        if (data['type'] && !(typeof data['type'] === 'string' || data['type'] instanceof String)) {
            throw new Error("Expected the field `type` to be a primitive type in the JSON string but got " + data['type']);
        }
        // validate the optional field `course`
        if (data['course']) { // data not null
          CourseSyllabusView.validateJSON(data['course']);
        }
        if (data['resources']) { // data not null
            // ensure the json data is an array
            if (!Array.isArray(data['resources'])) {
                throw new Error("Expected the field `resources` to be an array in the JSON data but got " + data['resources']);
            }
            // validate the optional field `resources` (array)
            for (const item of data['resources']) {
                ResourceSyllabusView.validateJsonObject(item);
            };
        }
        if (data['syllabuses']) { // data not null
            // ensure the json data is an array
            if (!Array.isArray(data['syllabuses'])) {
                throw new Error("Expected the field `syllabuses` to be an array in the JSON data but got " + data['syllabuses']);
            }
            // validate the optional field `syllabuses` (array)
            for (const item of data['syllabuses']) {
                SyllabusSyllabusView.validateJsonObject(item);
            };
        }

        return true;
    }


}



/**
 * @member {Number} id
 */
LessonSyllabusView.prototype['id'] = undefined;

/**
 * @member {String} name
 */
LessonSyllabusView.prototype['name'] = undefined;

/**
 * @member {String} status
 */
LessonSyllabusView.prototype['status'] = undefined;

/**
 * @member {String} description
 */
LessonSyllabusView.prototype['description'] = undefined;

/**
 * @member {String} url
 */
LessonSyllabusView.prototype['url'] = undefined;

/**
 * @member {Date} dateTime
 */
LessonSyllabusView.prototype['dateTime'] = undefined;

/**
 * @member {Number} estimateTime
 */
LessonSyllabusView.prototype['estimateTime'] = undefined;

/**
 * @member {String} content
 */
LessonSyllabusView.prototype['content'] = undefined;

/**
 * @member {module:model/LessonSyllabusView.TypeEnum} type
 */
LessonSyllabusView.prototype['type'] = undefined;

/**
 * @member {module:model/CourseSyllabusView} course
 */
LessonSyllabusView.prototype['course'] = undefined;

/**
 * @member {Array.<module:model/ResourceSyllabusView>} resources
 */
LessonSyllabusView.prototype['resources'] = undefined;

/**
 * @member {Array.<module:model/SyllabusSyllabusView>} syllabuses
 */
LessonSyllabusView.prototype['syllabuses'] = undefined;





/**
 * Allowed values for the <code>type</code> property.
 * @enum {String}
 * @readonly
 */
LessonSyllabusView['TypeEnum'] = {

    /**
     * value: "VIDEO"
     * @const
     */
    "VIDEO": "VIDEO",

    /**
     * value: "READING"
     * @const
     */
    "READING": "READING"
};



export default LessonSyllabusView;

