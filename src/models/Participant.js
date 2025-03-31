export default class Participant {
  constructor({ account = {}, profileData = {}, wallets = [],  role = '', subRole = '', address = '', created } = {}) {
    this.id = account.id || null;
    this.thumbnailUrl = account.thumbnailUrl || '';
    this.firstName = account.first || '';
    this.lastName = account.last || '';
    this.fullName = `${this.firstName} ${this.lastName}`;
    this.email = account.username || '';
    this.role = role;
    this.subRole = subRole;
    this.created = created || null;
    this.profileData = profileData || null;
    this.wallets = wallets || null;
  }
}