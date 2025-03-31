export default class Content {
  constructor(data = {}) {
    this.acquisition = data.acquisition || '';
    this.adOption = data.adOption || '';
    this.authorPrimaryRole = data.authorPrimaryRole || '';
    this.classification = data.classification || '';
    this.contentId = data.contentId || null;
    this.created = data.created || null;
    this.currency = data.currency || '';
    this.healthCheckDate = data.healthCheckDate || null;
    this.healthCheckStatus = data.healthCheckStatus || '';
    this.id = data.id || null;
    this.imageUrl = data.imageUrl || '';
    this.price = data.price || null;
    this.pricePolicy = data.pricePolicy || '';
    this.primaryLocale = data.primaryLocale || '';
    this.published = data.published || null;
    this.originallyPublished = data.originallyPublished || null;
    this.status = data.status || '';
    this.title = data.title || '';
    this.email = data.createdBy.email || '';
    this.first = data.createdBy.first || '';
    this.last = data.createdBy.last || '';
    this.guid = data.createdBy.guid || '';
    this.createdById = data.createdBy.id || null;
    this.fullName = `${this.first} ${this.last}`;
    this.nft = data.nft;
    this.passport = data.passport || null;
  }
}
