import axios from 'axios';

export default class DeploymentRequestService {

  getContentList(data) {
    return axios.post('marketplace/contentDeployment/request/list/page', data);
  }

  reviewContent(id, action, data){
    return axios.put(`marketplace/contentDeployment/request/${id}/${action}`, data);
  }

  deploymentRequest(id){
    return axios.post(`marketplace/contentDeployment/execute/request/${id}`);
  }

  deploymentRequestView(){
    return axios.get('marketplace/contentDeployment/view');
  }
}
