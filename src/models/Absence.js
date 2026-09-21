class Absence {
  constructor(user, type, startDate, endDate, reason) {
    this.user = user
    this.type = type
    this.startDate = startDate
    this.endDate = endDate
    this.reason = reason
    this.status = 'pending'
  }
}

module.exports = Absence
