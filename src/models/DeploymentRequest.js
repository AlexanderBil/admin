export default class DeploymentRequest {
  constructor(data = {}) {
    this.id = data.id || null;
    this.contentId = data.contentId || null;
    this.status = data.status || '';
    this.submitterAccount = data.submitterAccount || null;
    this.destination = data.destination || null;
    this.created = data.created || null;
    this.reviewerAccount = data.reviewerAccount || null;
    this.updated = data.updated || null;
    this.details = data.details || '';
    this.deploymentAllowed = data.deploymentAllowed || '';
  }
}
