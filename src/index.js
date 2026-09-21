const ROLES = require('./constants/roles')
const Branch = require('./models/Branch')
const User = require('./models/User')

console.log('Gastro Ops')

// I have three main objekts : Branches, Users , Tasks

const branch = new Branch('Kennys Vienna', 'Vienna Austria')

const admin = new User('Admin', ROLES.ADMIN, null)

const beyza = admin.createUser('Beyza', ROLES.BRANCH_MANAGER, branch)
const kevin = admin.createUser('Kevin', ROLES.EMPLOYEE, branch)

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
