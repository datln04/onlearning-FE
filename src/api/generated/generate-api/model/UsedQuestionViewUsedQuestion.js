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
import QuizViewUsedQuestion from './QuizViewUsedQuestion';
import UsedAnswerViewUsedQuestion from './UsedAnswerViewUsedQuestion';

/**
 * The UsedQuestionViewUsedQuestion model module.
 * @module model/UsedQuestionViewUsedQuestion
 * @version v1
 */
class UsedQuestionViewUsedQuestion {
    /**
     * Constructs a new <code>UsedQuestionViewUsedQuestion</code>.
     * @alias module:model/UsedQuestionViewUsedQuestion
     */
    constructor() { 
        
        UsedQuestionViewUsedQuestion.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>UsedQuestionViewUsedQuestion</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/UsedQuestionViewUsedQuestion} obj Optional instance to populate.
     * @return {module:model/UsedQuestionViewUsedQuestion} The populated <code>UsedQuestionViewUsedQuestion</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new UsedQuestionViewUsedQuestion();

            if (data.hasOwnProperty('id')) {
                obj['id'] = ApiClient.convertToType(data['id'], 'Number');
            }
            if (data.hasOwnProperty('content')) {
                obj['content'] = ApiClient.convertToType(data['content'], 'String');
            }
            if (data.hasOwnProperty('status')) {
                obj['status'] = ApiClient.convertToType(data['status'], 'Boolean');
            }
            if (data.hasOwnProperty('quiz')) {
                obj['quiz'] = QuizViewUsedQuestion.constructFromObject(data['quiz']);
            }
            if (data.hasOwnProperty('usedAnswers')) {
                obj['usedAnswers'] = ApiClient.convertToType(data['usedAnswers'], [UsedAnswerViewUsedQuestion]);
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>UsedQuestionViewUsedQuestion</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>UsedQuestionViewUsedQuestion</code>.
     */
    static validateJSON(data) {
        // ensure the json data is a string
        if (data['content'] && !(typeof data['content'] === 'string' || data['content'] instanceof String)) {
            throw new Error("Expected the field `content` to be a primitive type in the JSON string but got " + data['content']);
        }
        // validate the optional field `quiz`
        if (data['quiz']) { // data not null
          QuizViewUsedQuestion.validateJSON(data['quiz']);
        }
        if (data['usedAnswers']) { // data not null
            // ensure the json data is an array
            if (!Array.isArray(data['usedAnswers'])) {
                throw new Error("Expected the field `usedAnswers` to be an array in the JSON data but got " + data['usedAnswers']);
            }
            // validate the optional field `usedAnswers` (array)
            for (const item of data['usedAnswers']) {
                UsedAnswerViewUsedQuestion.validateJsonObject(item);
            };
        }

        return true;
    }


}



/**
 * @member {Number} id
 */
UsedQuestionViewUsedQuestion.prototype['id'] = undefined;

/**
 * @member {String} content
 */
UsedQuestionViewUsedQuestion.prototype['content'] = undefined;

/**
 * @member {Boolean} status
 */
UsedQuestionViewUsedQuestion.prototype['status'] = undefined;

/**
 * @member {module:model/QuizViewUsedQuestion} quiz
 */
UsedQuestionViewUsedQuestion.prototype['quiz'] = undefined;

/**
 * @member {Array.<module:model/UsedAnswerViewUsedQuestion>} usedAnswers
 */
UsedQuestionViewUsedQuestion.prototype['usedAnswers'] = undefined;






export default UsedQuestionViewUsedQuestion;

