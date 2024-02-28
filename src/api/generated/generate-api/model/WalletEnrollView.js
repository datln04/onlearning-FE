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
import AccountEnrollView from './AccountEnrollView';

/**
 * The WalletEnrollView model module.
 * @module model/WalletEnrollView
 * @version v1
 */
class WalletEnrollView {
    /**
     * Constructs a new <code>WalletEnrollView</code>.
     * @alias module:model/WalletEnrollView
     */
    constructor() { 
        
        WalletEnrollView.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>WalletEnrollView</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/WalletEnrollView} obj Optional instance to populate.
     * @return {module:model/WalletEnrollView} The populated <code>WalletEnrollView</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new WalletEnrollView();

            if (data.hasOwnProperty('amount')) {
                obj['amount'] = ApiClient.convertToType(data['amount'], 'Number');
            }
            if (data.hasOwnProperty('bankNumber')) {
                obj['bankNumber'] = ApiClient.convertToType(data['bankNumber'], 'String');
            }
            if (data.hasOwnProperty('bankName')) {
                obj['bankName'] = ApiClient.convertToType(data['bankName'], 'String');
            }
            if (data.hasOwnProperty('account')) {
                obj['account'] = AccountEnrollView.constructFromObject(data['account']);
            }
            if (data.hasOwnProperty('walletType')) {
                obj['walletType'] = ApiClient.convertToType(data['walletType'], 'String');
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>WalletEnrollView</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>WalletEnrollView</code>.
     */
    static validateJSON(data) {
        // ensure the json data is a string
        if (data['bankNumber'] && !(typeof data['bankNumber'] === 'string' || data['bankNumber'] instanceof String)) {
            throw new Error("Expected the field `bankNumber` to be a primitive type in the JSON string but got " + data['bankNumber']);
        }
        // ensure the json data is a string
        if (data['bankName'] && !(typeof data['bankName'] === 'string' || data['bankName'] instanceof String)) {
            throw new Error("Expected the field `bankName` to be a primitive type in the JSON string but got " + data['bankName']);
        }
        // validate the optional field `account`
        if (data['account']) { // data not null
          AccountEnrollView.validateJSON(data['account']);
        }
        // ensure the json data is a string
        if (data['walletType'] && !(typeof data['walletType'] === 'string' || data['walletType'] instanceof String)) {
            throw new Error("Expected the field `walletType` to be a primitive type in the JSON string but got " + data['walletType']);
        }

        return true;
    }


}



/**
 * @member {Number} amount
 */
WalletEnrollView.prototype['amount'] = undefined;

/**
 * @member {String} bankNumber
 */
WalletEnrollView.prototype['bankNumber'] = undefined;

/**
 * @member {String} bankName
 */
WalletEnrollView.prototype['bankName'] = undefined;

/**
 * @member {module:model/AccountEnrollView} account
 */
WalletEnrollView.prototype['account'] = undefined;

/**
 * @member {String} walletType
 */
WalletEnrollView.prototype['walletType'] = undefined;






export default WalletEnrollView;

