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

const branch = {
  name: 'Kennys Vienna',
  address: 'Vienna, Austria',
}

console.log(`The branch name is ${branch.name} and its address is ${branch.address}.`)

class User {
  constructor(name, role, branch) {
    this.name = name
    this.role = role
    this.branch = branch
    this.tasks = []
  }

  assignTask(selectedTask, selectedUser) {
    if (this.role === 'branchManager') {
      selectedTask.assignedTo = selectedUser
      selectedUser.tasks.push(selectedTask)
    }
  }

  completeTask(selectedTask) {
    if (selectedTask.assignedTo === this) {
      selectedTask.status = 'completed'
    }
  }
}

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

const beyza = new User('Beyza', 'branchManager', branch)
const kevin = new User('Kevin', 'employee', branch)

// I need to be able to create Tasks.

const branchTask = new Task(
  'Kitchen Check',
  'Check the kitchen for cleanliness and organization.',
  '08:00',
  '09:00',
  'high',
  branch,
  beyza
)
const branchTask2 = new Task(
  'Inventory Check',
  'Check the inventory for stock levels and expiration dates.',
  '09:00',
  '10:00',
  'medium',
  branch,
  kevin
)

beyza.assignTask(branchTask, kevin)

if (branchTask.assignedTo === null) {
  console.log('The task is not assigned to any user.')
} else {
  console.log(`${branchTask.assignedTo.name} is the assigned user of the task.`)
}
console.log(branchTask.status === 'pending')
console.log(`${branchTask.assignedTo.name} is the assigned user of the task.`)
console.log(branchTask instanceof Task)

console.log(branchTask.status === 'pending')
console.log(branchTask instanceof Task)

kevin.completeTask(branchTask)

if (branchTask.status === 'completed') {
  console.log('The task has been completed.')
} else {
  console.log('The task is still pending.')
}
console.log(branchTask.assignedTo === kevin)
console.log(branchTask instanceof Task)

kevin.assignTask(branchTask2, beyza) // This should not work since Kevin is not a branchManager

console.log(branchTask.status === 'pending')
console.log(branchTask.assignedTo === beyza)
console.log(branchTask instanceof Task)
