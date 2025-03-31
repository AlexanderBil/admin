export default class Invitation {
    constructor(data = {}) {
      this.email = data.email || '';
      this.createdByEmail = data.createdBy.email || '';
      this.role = data.role || '';
      this.code = data.code || '';
      this.subRole = data.subRole || '';
      this.status = data.status || '';
      this.comment = data.comment || '';
      this.created = data.created || null;
      this.consumed = data.consumed || null;
      this.createdBy = data.createdBy || null;
      this.silently = data.silently || false;
      this.algoAmount = data.algoAmount || null;
      this.assetAmount = data.assetAmount || null;
      this.thumbnailUrl = data.createdBy.thumbnailUrl || '';
      this.firstName = data.createdBy.first || '';
      this.lastName = data.createdBy.last || '';
      this.fullName = `${this.firstName} ${this.lastName}`;
    }
  }
  