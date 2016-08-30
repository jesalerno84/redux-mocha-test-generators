'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.shouldDispatchCorrectActionsWhenSuccessfulAsync = exports.shouldCreateActionWithCorrectPayload = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _reduxMockStore = require('redux-mock-store');

var _reduxMockStore2 = _interopRequireDefault(_reduxMockStore);

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _assertions = require('./assertions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var middlewares = [_reduxThunk2.default];
var mockStore = (0, _reduxMockStore2.default)(middlewares);

/**
 * Test that an action creator returns the correct payload
 * @param {function} describe - mocha describe function
 * @param {function} it - mocha it describe function
 * @param {bool} shouldWrapInDescribe - should the method create a describe wrapper
 * @param {function} actionCreator - the action creator to test
 * @param {string} actionType - the string type of the action
 * @param {array} actionCreatorArgs - the args that will be passed into the actionCreator
 * @param {object} payload - an object containing the non-type properties the actionCreator should returns
 * @param {string} message - the message for the assertion 
 */
var shouldCreateActionWithCorrectPayload = exports.shouldCreateActionWithCorrectPayload = function shouldCreateActionWithCorrectPayload(describe, it, shouldWrapInDescribe, actionCreator, actionType, actionCreatorArgs, payload, message) {
    if (!describe) {
        throw new Error('describe is required');
    }

    if (!it) {
        throw new Error('it is required');
    }

    if (!actionCreator) {
        throw new Error('actionCreator is required');
    }

    if (!actionType) {
        throw new Error('actionType is required');
    }

    var shouldMessage = message ? message : 'should create an action with type ' + actionType;

    wrapInDescribeBlock(describe, it, shouldWrapInDescribe, actionCreator.name, shouldMessage, function () {
        var expectedAction = _extends({
            type: actionType
        }, payload);

        var result = actionCreator.apply(undefined, actionCreatorArgs);

        (0, _assertions.assertShouldDeepEqual)(result, expectedAction);
    });
};

/**
 * Test that an async action creator calls the correct actions.  The async method should be mocked 
 * and should return a resolved Promise.
 * @param {function} describe - mocha describe function
 * @param {function} it - mocha it describe function
 * @param {bool} shouldWrapInDescribe - should the method create a describe wrapper
 * @param {function} asyncActionCreator - the action creator to test
 * @param {function} asyncMethod - the async method that the action calls
 * @param {object} expectedActions - the actions expected to be called
 * @param {string} message - the message for the assertion 
 */
var shouldDispatchCorrectActionsWhenSuccessfulAsync = exports.shouldDispatchCorrectActionsWhenSuccessfulAsync = function shouldDispatchCorrectActionsWhenSuccessfulAsync(describe, it, shouldWrapInDescribe, asyncActionCreator, expectedActions, message) {
    if (!describe) {
        throw new Error('describe is required');
    }

    if (!it) {
        throw new Error('it is required');
    }

    if (!asyncActionCreator) {
        throw new Error('asyncActionCreator is required');
    }

    var shouldMessage = message ? message : 'should create the appropriate actions when successful';

    wrapInDescribeBlock(describe, it, shouldWrapInDescribe, asyncActionCreator.name, shouldMessage, function () {
        var store = mockStore();

        return store.dispatch(asyncActionCreator()).then(function () {
            (0, _assertions.assertShouldDeepEqual)(store.getActions(), expectedActions);
        });
    });
};

/**
 * Wrap a test in describe block
 * @param {function} describe - mocha describe function
 * @param {function} it - mocha it describe function
 * @param {bool} shouldWrap - should wrap in describe block
 * @param {string} describeMessage - the message for the describe block
 * @param {string} itMessage - the message for the it block
 * @param {function} itCallback - the callback for the it
 */
var wrapInDescribeBlock = function wrapInDescribeBlock(describe, it, shouldWrap, describeMessage, itMessage, itCallback) {
    if (shouldWrap) {
        describe(describeMessage, function () {
            wrapInItBlock(it, itMessage, itCallback);
        });
    } else {
        wrapInItBlock(it, itMessage, itCallback);
    }
};

/**
 * Wrap a test in an it block
 * @param {function} describe - mocha describe function
 * @param {function} it - mocha it describe function
 * @param {string} message - the message for the it block
 * @param {function} callback - the callback for the it
 */
var wrapInItBlock = function wrapInItBlock(it, message, callback) {
    it(message, callback);
};