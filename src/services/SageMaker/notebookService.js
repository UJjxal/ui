import http from "../httpService";
import { PYTHON_API_ROOT } from "../../../src/config";

const apiEndpoint = PYTHON_API_ROOT;

// notebook list
export function getList(name, token,role=null) {
  let url = http.get(`${apiEndpoint}sagemakernotebooklist/${name}/${token}`);
  if(role!=null){
    url = http.get(`${apiEndpoint}sagemakernotebooklist/${name}/${token}/${role}`);
  }
  return url;
}

export function listGitRepo(name, token) {
  return http.get(`${apiEndpoint}listGitRepo/${name}/${token}`);
}

export function listInstance(token) {
  return http.get(`${apiEndpoint}sagemakerInstanceList/${token}`);
}

// start notebook instance
export function startInstance(name,token,role=null) {
  let url = http.get(`${apiEndpoint}startInstance/${name}/${token}`);
  if(role!=null){
    url = http.get(`${apiEndpoint}startInstance/${name}/${token}/${role}`);
  }
  return url;
}

export function stopInstance(name,token,role=null) {
  let url = http.get(`${apiEndpoint}stopInstance/${name}/${token}`);
  if(role!=null){
    url = http.get(`${apiEndpoint}stopInstance/${name}/${token}/${role}`);
  }
  return url;
}

export function deleteInstance(name,token,role=null) {
  let url = http.get(`${apiEndpoint}deleteInstance/${name}/${token}`);
  if(role!=null){
    url = http.get(`${apiEndpoint}deleteInstance/${name}/${token}/${role}`);
  }
  return url;
}

export function createPreassignedUrl(name,token,role=null) {
  let url = http.get(`${apiEndpoint}createPreassignedUrl/${name}/${token}`);
  if(role!=null){
    url = http.get(`${apiEndpoint}createPreassignedUrl/${name}/${token}/${role}`);
  }
  return url;
}

export function createGitSecret(token, data) {
  //const {name,username,password} = data;
  //return http.get(`${apiEndpoint}createsecret/${token}`);
  const bodyFormData = { ...data};
  const url = `${apiEndpoint}creatparameter/${token}`

  return http.post(url,bodyFormData).then((result) => {
      //console.log("saveModelResp121", result);
      return result;
  });
}

export function updateInstance(token, data) {
  const bodyFormData = { ...data};
  const url = `${apiEndpoint}updateNotebookInstance/${token}`

  return http.post(url,bodyFormData).then((result) => {
      return result;
  });

}
