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
import CourseEnrollView from './CourseEnrollView';
import ResourceEnrollView from './ResourceEnrollView';
import SyllabusEnrollView from './SyllabusEnrollView';

/**
 * The LessonEnrollView model module.
 * @module model/LessonEnrollView
 * @version v1
 */
class LessonEnrollView {
    /**
     * Constructs a new <code>LessonEnrollView</code>.
     * @alias module:model/LessonEnrollView
     */
    constructor() { 
        
        LessonEnrollView.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>LessonEnrollView</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/LessonEnrollView} obj Optional instance to populate.
     * @return {module:model/LessonEnrollView} The populated <code>LessonEnrollView</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new LessonEnrollView();

            if (data.hasOwnProperty('course')) {
                obj['course'] = CourseEnrollView.constructFromObject(data['course']);
            }
            if (data.hasOwnProperty('resources')) {
                obj['resources'] = ApiClient.convertToType(data['resources'], [ResourceEnrollView]);
            }
            if (data.hasOwnProperty('syllabuses')) {
                obj['syllabuses'] = ApiClient.convertToType(data['syllabuses'], [SyllabusEnrollView]);
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>LessonEnrollView</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>LessonEnrollView</code>.
     */
    static validateJSON(data) {
        // validate the optional field `course`
        if (data['course']) { // data not null
          CourseEnrollView.validateJSON(data['course']);
        }
        if (data['resources']) { // data not null
            // ensure the json data is an array
            if (!Array.isArray(data['resources'])) {
                throw new Error("Expected the field `resources` to be an array in the JSON data but got " + data['resources']);
            }
            // validate the optional field `resources` (array)
            for (const item of data['resources']) {
                ResourceEnrollView.validateJsonObject(item);
            };
        }
        if (data['syllabuses']) { // data not null
            // ensure the json data is an array
            if (!Array.isArray(data['syllabuses'])) {
                throw new Error("Expected the field `syllabuses` to be an array in the JSON data but got " + data['syllabuses']);
            }
            // validate the optional field `syllabuses` (array)
            for (const item of data['syllabuses']) {
                SyllabusEnrollView.validateJsonObject(item);
            };
        }

        return true;
    }


}



/**
 * @member {module:model/CourseEnrollView} course
 */
LessonEnrollView.prototype['course'] = undefined;

/**
 * @member {Array.<module:model/ResourceEnrollView>} resources
 */
LessonEnrollView.prototype['resources'] = undefined;

/**
 * @member {Array.<module:model/SyllabusEnrollView>} syllabuses
 */
LessonEnrollView.prototype['syllabuses'] = undefined;






export default LessonEnrollView;

