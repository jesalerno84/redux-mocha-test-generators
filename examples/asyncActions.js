import {
    testService
} from './services';

export const REQUEST = 'REQUEST';
export const request = () => {
    return { type: REQUEST }; 
};

export const RECEIVE = 'RECEIVE';
export const receive = result => { 
    return { type: RECEIVE, result }; 
};

export const RECEIVE_ERROR = 'RECEIVE_ERROR';
export const receiveError = error => { 
    return { type: RECEIVE_ERROR, error }; 
};

export const REQUEST_WITH_ARGS = 'REQUEST_WITH_ARGS';
export const requestWithArgs = () => {
    return { type: REQUEST_WITH_ARGS }; 
};

export const RECEIVE_WITH_ARGS = 'RECEIVE_WITH_ARGS';
export const receiveWithArgs = (resultWithArgs, trueOrFalse) => { 
    return { type: RECEIVE_WITH_ARGS, resultWithArgs, trueOrFalse }; 
};

export const RECEIVE_ERROR_WITH_ARGS = 'RECEIVE_ERROR_WITH_ARGS';
export const receiveErrorWithArgs = errorWithArgs => { 
    return { type: RECEIVE_ERROR_WITH_ARGS, errorWithArgs }; 
};

export const callService = () => {
    return dispatch => {
        dispatch(request());

        return new Promise((resolve, reject) => { 
            testService(true)
                .then(result => {
                    dispatch(receive(result));
                    resolve(result);
                })
                .catch(error => {
                    dispatch(receiveError(error));
                    reject(error);
                });
        });
    };
};

export const callServiceWithArgs = trueOrFalse => {
    return dispatch => {
        dispatch(requestWithArgs());

        return new Promise((resolve, reject) => { 
            testService(trueOrFalse)
                .then(result => {
                    dispatch(receiveWithArgs(result, trueOrFalse));
                    resolve(result);
                })
                .catch(error => {
                    dispatch(receiveErrorWithArgs(error));
                    reject(error);
                });
        });
    };
};