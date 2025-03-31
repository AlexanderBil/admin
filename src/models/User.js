export default class User {
  constructor(record = {}) {
    this.id = record.id || null;
    this.email = record.email || '';
    this.first = record.first || '';
    this.last = record.last || '';
    this.fullName = this.getFullName(record);
    this.roles = record.roles || [];
    this.thumbnailUrl = record.thumbnailUrl || '';
  }

  getFullName({ fullName = '', first = '', last = '' }) {
    return fullName || `${first} ${last}`
  }
}