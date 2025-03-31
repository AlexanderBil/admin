import axios from 'axios';

export default class FiatPaymentsService {
  getPaymentsList(data) {
    return axios.post('/marketplace/fiat_payments/list/page', data);
  }

  getPaymentsData(){
    return axios.get('/marketplace/fiat_payments/view');
  }
}
