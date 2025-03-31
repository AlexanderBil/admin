export default class SendFunds {
    constructor(data = {}) {
      this.senderAccount = data.sender?.account || null;
      this.receiverAccount = data.receiver.account || null;
      this.address = data.receiver.address || '';
      this.algo = data.algo || null;
      this.asset = data.asset || null;
      this.comment = data.comment || '';
      this.created = data.created || null;
      this.comment = data.comment || '';
      this.eventId = data.eventId || '';
      this.orderId = data.orderId || '';
      this.orderStatus = data.orderStatus || '';
      this.orderType = data.orderType || '';
      this.assetOptIn = data.assetOptIn || null;
    }
  }
  