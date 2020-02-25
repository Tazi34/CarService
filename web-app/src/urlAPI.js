
export const apiURL = "http://localhost:8080";


export function buildUrl(endpoint,pageNo,sortField,sortOrder){
    
    var url = apiURL;
    url += endpoint + "?";

    if(pageNo)
        url += `&page=${pageNo}`
    if(sortOrder && sortField)
        url += `&sort=${sortField},${sortOrder}`
    return url;
}