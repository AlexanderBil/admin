export default class FiatPayment {
  constructor(data = {}) {
    this.id = data.id || null;
    this.entityId = data.entityId || null;
    this.description = data.description || null;
    this.fee = data.fee || null;
    this.thumbnailUrl = data.account.thumbnailUrl || '';
    this.created = data.created || null;
    this.email = data.account.email || '';
    this.first = data.account.first || '';
    this.last = data.account.last || '';
    this.amount = data.amount || null;
    this.code = data.code || '';
    this.currency = data.currency || '';
    this.paymentId = data.paymentId || '';
    this.scenarioType = data.scenarioType || '';
    this.status = data.status || '';
    this.totalAmount = data.totalAmount || null;
    this.transactionId = data.transactionId || '';
  }
}
