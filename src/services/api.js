import axios from 'axios';
import url from './url';
// === PURE FUNCTION

// logic : GET
function getAllAPIType(type) {
    return axios({
        url : `${url.server}/api/${type}`,
        method : 'GET',
    });
}
function getOneAPIType(type, id) {
    return axios({
        url : `${url.server}/api/${type}/${id}`,
        method : 'GET'
    })
}

// logic : POST
function postNewAPIType(type,value) {
    return axios({
        url : `${url.server}/api/${type}`,
        method : 'POST',
        data : value
    });
}

// logic : PUT
function putAPIType(type,id,value) {
    return axios({
        url : `${url.server}/api/${type}/${id}`,
        method : 'put',
        data : value
    });
}

// DELETE
function deleteAPIType(type,id) {
    return axios({
        url : `${url.server}/api/${type}/${id}`,
        method : 'delete'
    });
}
export {getAllAPIType, getOneAPIType, postNewAPIType, putAPIType,deleteAPIType};