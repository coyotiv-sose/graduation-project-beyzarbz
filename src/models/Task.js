const TASK_STATUSES = require('../constants/task-statuses')

class Task {
  constructor(title, description, startTime, endTime, priority, branch, createdBy) {
    this.title = title
    this.description = description
    this.startTime = startTime
    this.endTime = endTime
    this.priority = priority
    this.branch = branch
    this.createdBy = createdBy

    this.status = TASK_STATUSES.PENDING
    this.assignedTo = null
  }
}

module.exports = Task
