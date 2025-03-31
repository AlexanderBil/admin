export default class PaginationData {
  constructor({ per_page = 1, total_entries = 0, page = 0, total_pages = 1 }) {
    this.page = page;
    this.pageSize = per_page;
    this.totalEntries = total_entries;
    this.totalPages = total_pages
  }
}