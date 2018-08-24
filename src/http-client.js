import axios from 'axios';


var HTTP = null;


export function initHTTPClient(apiURI) {
    HTTP = {
        cli: axios.create(),
        entrypoint: apiURI,
    }
}


export function apiRequest(methodName, allParams) {
    return HTTP.cli.post(HTTP.entrypoint, {
        jsonrpc: "2.0",
        id: 0,
        method: methodName,
        params: allParams,
    })
}
