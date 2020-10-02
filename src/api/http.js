import * as constants from '../constants';

export const base = constants.API_CMS;

export const get = (url, params, errorMessage = 'GET error - no description available') => {
    console.log(base + url);
    return window
        .fetch(base + url + params, getHeader())
        .then((response) => processJsonResponse(response, errorMessage));
};

export const post = (url, content, errorMessage = 'POST error - no description available') => {
    return window
        .fetch(base + url, postHeader(content))
        .then((response) => processJsonResponse(response, errorMessage));
};

const getHeader = () => ({
    headers: {}
});

const postHeader = (content) => contentHeader('POST', content);

const contentHeader = (method, content) => ({
    method,
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(content)
});

const buildErrorResponse = (json, baseMessage) => {
    let message = baseMessage;
    if (json.message) {
        message += ` - ${json.message}`;
    }

    if (json.additionalMessages && json.additionalMessages.length > 0) {
        message += ` - ${json.additionalMessages[0]}`;
    }
    return new Error(message);
};

const extractJson = (response) => {
    const contentType = response.headers.get('content-type');
    const isJson = contentType && contentType.includes('application/json');
    if (!isJson) {
        throw new Error(`Expected JSON content but received ${contentType}`);
    }
    return response.json();
};

const processJsonResponse = (response, errorMessage) => {
    return extractJson(response).then((json) => {
        if (!response.ok) {
            throw buildErrorResponse(json, errorMessage);
        }
        return json;
    });
};
