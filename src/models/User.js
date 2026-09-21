const Absence = require('./Absence')
const Availability = require('./Availability')
const Task = require('./Task')

class User {
  constructor(name, role, branch) {
    this.name = name
    this.role = role
    this.branch = branch
    this.availableBranches = []
    this.tasks = []
    this.availabilities = []
    this.absences = []
  }

  createUser(name, role, branch) {
    if (this.role === 'admin') {
      const newUser = new User(name, role, branch)
      branch.users.push(newUser)
      return newUser
    }

    console.log('You do not have permission to create a user.')
    return null
  }

  createTask(title, description, startTime, endTime, priority, selectedBranch) {
    if (this.role === 'admin' || (this.role === 'branchManager' && this.branch === selectedBranch)) {
      const newTask = new Task(title, description, startTime, endTime, priority, selectedBranch, this)
      selectedBranch.tasks.push(newTask)
      return newTask
    }

    console.log('You do not have permission to create a task for this branch.')
    return null
  }

  assignTask(selectedTask, selectedUser) {
    const isAdmin = this.role === 'admin'

    const isBranchManager =
      this.role === 'branchManager' && this.branch === selectedUser.branch && this.branch === selectedTask.branch

    if (!isAdmin && !isBranchManager) {
      console.log('You do not have permission to assign this task.')
      return false
    }

    selectedTask.assignedTo = selectedUser

    if (!selectedUser.tasks.includes(selectedTask)) {
      selectedUser.tasks.push(selectedTask)
    }

    return true
  }

  completeTask(selectedTask) {
    if (selectedTask.assignedTo === this) {
      selectedTask.status = 'completed'
    }
  }

  addAvailability(date, startTime, endTime, branches) {
    const newAvailability = new Availability(this, date, startTime, endTime, branches)
    this.availabilities.push(newAvailability)
    return newAvailability
  }

  addAbsence(type, startDate, endDate, reason) {
    const newAbsence = new Absence(this, type, startDate, endDate, reason)
    this.absences.push(newAbsence)
    return newAbsence
  }
}

module.exports = User
