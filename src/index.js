const Branch = require('./models/Branch')
const Absence = require('./models/Absence')
const Availability = require('./models/Availability')

console.log('Gastro Ops')

// I have three main objekts : Branches, Users , Tasks

// I need to be able to create a Branch
//User should belong to a Branch
//A User should have a Role

//Which information should my Branch carry ?
// I need to be able to create Users.
//Which information should my User carry ?
// I need to be able to create Tasks.
//Which information should my Task carry ?
//I need to be able to assign a Task to a User.
//An Employee should be able to complete an assigned Task.

const branch = new Branch('Kennys Vienna', 'Vienna Austria')

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
    } else {
      console.log('You do not have permission to create a user.')
      return null
    }
  }

  createTask(title, description, startTime, endTime, priority, selectedBranch) {
    if (this.role === 'admin' || (this.role === 'branchManager' && this.branch === selectedBranch)) {
      const newTask = new Task(title, description, startTime, endTime, priority, selectedBranch, this) //new Task instance is created with the provided parameters and the current user as the creator
      selectedBranch.tasks.push(newTask) //The new task is added to the tasks array of the selected branch
      return newTask //The newly created task is returned
    } else {
      console.log('You do not have permission to create a task for this branch.')
      return null
    }
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

const admin = new User('Admin', 'admin', null)

const beyza = admin.createUser('Beyza', 'branchManager', branch)
const kevin = admin.createUser('Kevin', 'employee', branch)

class Task {
  constructor(title, description, startTime, endTime, priority, branch, createdBy) {
    this.title = title
    this.description = description
    this.startTime = startTime
    this.endTime = endTime
    this.priority = priority
    this.branch = branch
    this.createdBy = createdBy

    this.status = 'pending'
    this.assignedTo = null
  }
}

const branchTask = beyza.createTask(
  'Kitchen Check',
  'Check the kitchen for cleanliness and organization.',
  '08:00',
  '09:00',
  'high',
  branch
)

const branchTask2 = admin.createTask(
  'Inventory Check',
  'Check the inventory for stock levels and expiration dates.',
  '09:00',
  '10:00',
  'medium',
  branch
)

console.log(
  'Branch tasks:',
  branch.tasks.map(task => task.title)
)

//Assigning tasks to users
const assignedByBeyza = beyza.assignTask(branchTask, kevin)
const assignedByAdmin = admin.assignTask(branchTask2, beyza)
const assignedByKevin = kevin.assignTask(branchTask, beyza)

kevin.completeTask(branchTask)

const kevinAvailability = kevin.addAvailability('2026-09-01', '08:00', '16:00', [branch])
const beyzaAvailability = beyza.addAvailability('2026-09-01', '10:00', '18:00', [branch])

const kevinAbsence = kevin.addAbsence('vacation', '2026-09-05', '2026-09-07', 'Annual leave')
const beyzaAbsence = beyza.addAbsence('sick_leave', '2026-09-10', '2026-09-12', 'Flu')

console.log(assignedByBeyza === true)
console.log(assignedByAdmin === true)
console.log(assignedByKevin === false)

console.log(branchTask.assignedTo === kevin)
console.log(kevin.tasks.includes(branchTask))
console.log(branchTask.status === 'completed')

console.log(branchTask2.assignedTo === beyza)
console.log(beyza.tasks.includes(branchTask2))
console.log(beyza.absences.includes(beyzaAbsence))
