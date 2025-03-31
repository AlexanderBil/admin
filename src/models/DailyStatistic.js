export default class DailyStatistic {
  constructor(data = {}) {
    this.dateFrom = data.dateFrom || 0;
    this.dateTo = data.dateTo || 0;
    this.dealsPerDay = data.dealsPerDay || [];
    this.feesPerDay = data.feesPerDay || [];
    this.mintedNftsPerDay = data.mintedNftsPerDay || [];
    this.publishedEntitiesPerDay = data.publishedEntitiesPerDay || [];
    this.sponsorshipDealsPerDay = data.sponsorshipDealsPerDay || [];
    this.mintedPassportsPerDay = data.mintedPassportsPerDay || [];
  }
}
