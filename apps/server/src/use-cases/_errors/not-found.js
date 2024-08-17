export class NotFoundError extends Error {
  constructor(message) {
    super(message || 'Not found.')
    this.name = 'NotFoundError'
  }
}
