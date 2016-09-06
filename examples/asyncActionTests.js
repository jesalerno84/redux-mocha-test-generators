/*global require, describe, it */
require('chai').should();
import sinon from 'sinon';

import {
    shouldDispatchCorrectActions
} from '../lib/reduxMochaTestGenerators';

const mockService = {
    testService: sinon.stub()
};

const proxyquire = require('proxyquire').noCallThru();
const {
    RECEIVE,
    RECEIVE_ERROR,
    REQUEST,
    callService
} = proxyquire('./asyncActions',
    {
        './services': mockService
    }
);

describe('asyncActions', () => {

    describe('callService', () => {
        const result = 'asdf';
        shouldDispatchCorrectActions(
            describe, it,
            false,
            callService,
            [
                { type: REQUEST },
                { type: RECEIVE, result }
            ],
            true,
            () => {
                mockService.testService.returns(new Promise(resolve => resolve(result)));
            });
        
        const error = new Error('asdf');
        shouldDispatchCorrectActions(
            describe, it,
            false, 
            callService, 
            [ 
                {type: REQUEST},
                {type: RECEIVE_ERROR, error} 
            ],
            false,
            () => {
                mockService.testService.returns(new Promise((resolve, reject) => reject(error)));
            });


    });
});
