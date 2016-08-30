const should = require('chai').should();
import sinon from 'sinon';

const mockAssertions = {
    assertShouldDeepEqual: sinon.stub()
};

const proxyquire = require('proxyquire').noCallThru();
const {
    shouldCreateActionWithCorrectPayload,
    shouldDispatchCorrectActionsWhenSuccessfulAsync
} = proxyquire('../src/reduxMochaTestGenerators',
    {
        './assertions': mockAssertions
    }
);

const fakeGlobal = {};

describe('reduxMochaTestGenerators', () => {
    describe('shouldCreateActionWithCorrectPayload', () => {
        beforeEach(() => {
            fakeGlobal.describe = (message, fn) => {
                fn();
            };

            fakeGlobal.it = (message, fn) => {
                fn();
            }
        });
        it('should throw an error if no describe is passed in', () => {
            (() => {
                shouldCreateActionWithCorrectPayload();
            }).should.throw('describe is required');
        });
        it('should throw an error if no it is passed in', () => {
            (() => {
                shouldCreateActionWithCorrectPayload(fakeGlobal.describe);
            }).should.throw('it is required');
        });
        it('should throw an error if no action is passed in', () => {
            (() => {
                shouldCreateActionWithCorrectPayload(fakeGlobal.describe, fakeGlobal.it, true);
            }).should.throw('actionCreator is required');
        });

        it('should throw an error if no actionType is passed in', () => {
            const actionCreator = () => { };
            (() => {
                shouldCreateActionWithCorrectPayload(fakeGlobal.describe, fakeGlobal.it, true, actionCreator);
            }).should.throw('actionType is required');
        });

        it('should call \'describe\' with the actionCreator name passed if shouldWrapInDescribe is true', () => {
            const someActionCreator = () => {
                return {};
            };
            const someActionType = 'SOME_ACTION';

            const spy = sinon.spy(fakeGlobal, 'describe');

            shouldCreateActionWithCorrectPayload(fakeGlobal.describe, fakeGlobal.it, true, someActionCreator, someActionType);

            spy.callCount.should.deep.equal(1);
            spy.args[0][0].should.deep.equal('someActionCreator');
        });

        it('should not call \'describe\' with the actionCreator name passed if shouldWrapInDescribe is false', () => {
            const someActionCreator = () => {
                return {};
            };
            const someActionType = 'SOME_ACTION';

            const spy = sinon.spy(fakeGlobal, 'describe');

            shouldCreateActionWithCorrectPayload(fakeGlobal.describe, fakeGlobal.it, false, someActionCreator, someActionType);

            spy.callCount.should.deep.equal(0);
        });

        it('should call \'it\' with default message if none passed in', () => {
            const someActionCreator = () => {
                return {};
            };
            const someActionType = 'SOME_ACTION';
            const message = 'should create an action with type SOME_ACTION';

            const spy = sinon.spy(fakeGlobal, 'it');

            shouldCreateActionWithCorrectPayload(fakeGlobal.describe, fakeGlobal.it, true, someActionCreator, someActionType);

            spy.callCount.should.deep.equal(1);
            spy.args[0][0].should.deep.equal(message);
        });

        it('should call \'it\' with passed in message', () => {
            const someActionCreator = () => {
                return {};
            };
            const someActionType = 'SOME_ACTION';
            const message = 'should definitely create an action with type SOME_ACTION';

            const spy = sinon.spy(fakeGlobal, 'it');

            shouldCreateActionWithCorrectPayload(fakeGlobal.describe, fakeGlobal.it, true, someActionCreator, someActionType, [], {}, message);

            spy.callCount.should.deep.equal(1);
            spy.args[0][0].should.deep.equal(message);
        });

        it('should call assertShouldDeepEqual with the correct result and expected action with no arguments or payload', () => {
            const someActionType = 'SOME_ACTION';
            const result = {
                type: someActionType
            };

            const expectedAction = {
                type: someActionType
            };

            const someActionCreator = () => {
                return result;
            };
            const message = 'should definitely create an action with type SOME_ACTION';

            shouldCreateActionWithCorrectPayload(fakeGlobal.describe, fakeGlobal.it, true, someActionCreator, someActionType, [], {}, message);

            mockAssertions.assertShouldDeepEqual.calledWithExactly(result, expectedAction);
        });

        it('should call assertShouldDeepEqual with the correct result and expected action with arguments and payload', () => {
            const args = [
                'someValue'
            ];

            const payload = {
                val: args[0]
            };

            const someActionType = 'SOME_ACTION';
            const result = {
                type: someActionType,
                val: args[0]
            };

            const expectedAction = {
                type: someActionType
            };

            const someActionCreator = () => {
                return result;
            };
            const message = 'should definitely create an action with type SOME_ACTION';

            shouldCreateActionWithCorrectPayload(fakeGlobal.describe, fakeGlobal.it, true, someActionCreator, someActionType, args, payload, message);

            mockAssertions.assertShouldDeepEqual.calledWithExactly(result, expectedAction);
        });
    });

    describe('shouldDispatchCorrectActionsWhenSuccessfulAsync', () => {
        beforeEach(() => {
            fakeGlobal.describe = (message, fn) => {
                fn();
            };

            fakeGlobal.it = (message, fn) => {
                fn();
            }
        });
        it('should throw an error if no describe is passed in', () => {
            (() => {
                shouldDispatchCorrectActionsWhenSuccessfulAsync();
            }).should.throw('describe is required');
        });
        it('should throw an error if no it is passed in', () => {
            (() => {
                shouldDispatchCorrectActionsWhenSuccessfulAsync(fakeGlobal.describe);
            }).should.throw('it is required');
        });
        it('should throw an error if no asyncActionCreator is passed in', () => {
            (() => {
                shouldDispatchCorrectActionsWhenSuccessfulAsync(fakeGlobal.describe, fakeGlobal.it);
            }).should.throw('asyncActionCreator is required');
        });

        it('should call \'describe\' with the actionCreator name passed and shouldWrapInDescribe is true', () => {
            const asyncMethod = () => {
                return new Promise(resolve => resolve());
            };

            const someAsyncActionCreator = () => {
                return dispatch => {
                    return asyncMethod();
                };
            };

            const spy = sinon.spy(fakeGlobal, 'describe');

            shouldDispatchCorrectActionsWhenSuccessfulAsync(fakeGlobal.describe, fakeGlobal.it, true, someAsyncActionCreator);

            spy.callCount.should.deep.equal(1);
            spy.args[0][0].should.deep.equal('someAsyncActionCreator');
        });

        
        it('should not call \'describe\' with the actionCreator name passed and shouldWrapInDescribe is false', () => {
            const asyncMethod = () => {
                return new Promise(resolve => resolve());
            };

            const someAsyncActionCreator = () => {
                return dispatch => {
                    return asyncMethod();
                };
            };

            const spy = sinon.spy(fakeGlobal, 'describe');

            shouldDispatchCorrectActionsWhenSuccessfulAsync(fakeGlobal.describe, fakeGlobal.it, false, someAsyncActionCreator);

            spy.callCount.should.deep.equal(0);
        });

        it('should call \'it\' with default message if none passed in', () => {
            const asyncMethod = () => {
                return new Promise(resolve => resolve());
            };

            const someAsyncActionCreator = () => {
                return dispatch => {
                    return asyncMethod();
                };
            };

            const message = 'should create the appropriate actions when successful';

            const spy = sinon.spy(fakeGlobal, 'it');

            shouldDispatchCorrectActionsWhenSuccessfulAsync(fakeGlobal.describe, fakeGlobal.it, true, someAsyncActionCreator);

            spy.callCount.should.deep.equal(1);
            spy.args[0][0].should.deep.equal(message);
        });
    });
});