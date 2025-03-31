export default class NftSponsorship {
  constructor(data = {}) {
    this.acquisitionModel = data.acquisitionModel || '';
    this.amount = data.amount || null;
    this.contentId = data.contentId || null;
    this.id = data.id || null;
    this.created = data.created || null;
    this.currency = data.currency || '';
    this.depositWallet = data.depositWallet || '';
    this.description = data.description || '';
    this.email = data.email || '';
    this.ip = data.ip || '';
    this.name = data.name || '';
    this.sourceUrl = data.sourceUrl || '';
    this.transactionId = data.transactionId || '';
    this.updated = data.updated || null;
    this.status = data.status || '';
    this.statusContent = data.content.status || '';
    this.title = data.content.contentLocales.en.title || '';
    this.classification = data.content.classification || '';
    this.blockchain = data.content.nft.system || '';
    this.tokenId = data.content.nft.tokenId || '';
    this.smartContract = data.content.nft.smartContract || '';
    this.imageUrl = data.content.imageUrl || '';
    this.wallet = data.wallet || '';
    this.dealTransactionId = data.dealTransactionId || '';
    this.promoCode = data.promoCode || '';
    this.promoCodePartner = data.promoCodePartner || '';
    this.updatedByFirstName = data.updatedBy?.first || null;
    this.updatedByLastName = data.updatedBy?.last || null;
    this.updatedByEmail = data.updatedBy?.username || null;
    this.accountEmail = data.account?.username || null;
    this.accountUserName = data.account?.first || null;
    this.attributes = data.attributes || null;
    this.sourcePartner = data.sourcePartner?.name || '';
    this.updatedBy =
      this.updatedByFirstName && this.updatedByLastName
        ? `${this.updatedByFirstName} ${this.updatedByLastName}`
        : this.updatedByFirstName
          ? this.updatedByFirstName
          : null;
  }
}
