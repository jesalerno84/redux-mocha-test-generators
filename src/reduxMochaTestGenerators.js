/**
 * Test that an action creator returns the correct payload
 * @param {function} describe - mocha describe function
 * @param {function} it - mocha it describe function
 * @param {function} actionCreator - the action creator to test
 * @param {string} actionType - the string type of the action
 * @param {object} payload - an object containing the non-type properties the actionCreator should returns
 * @param {string} message - the message for the assertion 
 */
export const testActionCreatorReturnsCorrectPayload = (describe, it, actionCreator, actionType, payload, message) => {
    if (!actionCreator) {
        throw new Error('actionCreator is required');
    }

    if (!actionType) {
        throw new Error('actionType is required');
    }

    const shouldMessage = message ? message : `should create an action with type ${actionType}`;

    describe(actionCreator.name, () => {
        it(shouldMessage, () => {

        });
    });
};