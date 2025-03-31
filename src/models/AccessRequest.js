export default class AccessRequest {
    constructor(data = {}) {
      this.id = data.id || null;
      this.email = data.email || '';
      this.role = data.role || '';
      this.subRole = data.subRole || '';
      this.status = data.status || '';
      this.comment = data.comment || '';
      this.created = data.created || null;
      this.product = data.product || '';
      this.ip = data.ip || '';
    }
  }
  