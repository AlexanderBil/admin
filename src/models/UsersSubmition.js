export default class UsersSubmition {
  constructor(data = {}) {
    this.created = data.created || null;
    this.email = data.email || '';
    this.event = data.event || '';
    this.id = data.id || null;
    this.ip = data.ip || '';
    this.name = data.name || '';
    this.resource = data.resource || '';
    this.status = data.status || '';
    this.comment = data.comment || '';
    this.updated = data.updated || '';
    this.firstName = data.updatedBy?.first || '';
    this.lastName = data.updatedBy?.last || '';
    this.fullName = `${this.firstName} ${this.lastName}`;
  }
}
