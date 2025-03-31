export default class SummaryStatistic {
  constructor(data = {}) {
    this.totalActiveContent = data.totalActiveContent || 0;
    this.totalNft = data.totalNft || 0;
    this.totalDeals = data.totalDeals || 0;
    this.totalSponsorshipDeals = data.totalSponsorshipDeals || 0;
    this.totalPassport = data.totalPassport || 0;
    this.sumDeals = data.sumDeals || 0;
    this.sumFees = data.sumFees || 0;
    this.activeEntities = data.activeEntities || [];
    this.mintedNfts = data.mintedNfts || [];
    this.mintedPassports = data.mintedPassports || [];
    this.deals = data.deals || [];
    this.sponsorshipDeals = data.sponsorshipDeals || [];
    this.fees = data.fees || [];
  }
}
