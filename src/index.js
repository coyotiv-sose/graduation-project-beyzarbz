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

class Branch {
  constructor(name, address) {
    this.name = name
    this.address = address
    this.tasks = []
    this.users = []
  }
}
const branch = new Branch('Kennys Vienna', 'Vienna Austria')

class User {
  constructor(name, role, branch) {
    this.name = name
    this.role = role
    this.branch = branch
    this.tasks = []
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
    if (this.role === 'admin') {
      selectedTask.assignedTo = selectedUser
      selectedUser.tasks.push(selectedTask)
    }
    if (this.role === 'branchManager') {
      if (selectedUser.role === 'employee' || selectedUser.role === 'branchManager') {
        selectedTask.assignedTo = selectedUser
        selectedUser.tasks.push(selectedTask)
      } else {
        console.log('You do not have permission to assign tasks to this user.')
      }
    }
    if (this.role === 'employee') {
      console.log('You do not have permission to assign tasks to this user.')
    }
  }

  completeTask(selectedTask) {
    if (selectedTask.assignedTo === this) {
      selectedTask.status = 'completed'
    }
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

// I need to be able to create Tasks.

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
beyza.assignTask(branchTask, kevin)
admin.assignTask(branchTask2, beyza)
kevin.assignTask(branchTask, beyza)
kevin.completeTask(branchTask)

console.log(branch.users.length === 2)
console.log(branch.users.includes(beyza))
console.log(branch.users.includes(kevin))

console.log(branch.tasks.length === 2)
console.log(branch.tasks.includes(branchTask))
console.log(branch.tasks.includes(branchTask2))

console.log(branchTask.assignedTo === kevin)
console.log(kevin.tasks.includes(branchTask))
console.log(branchTask.status === 'completed')

console.log(branchTask2.assignedTo === beyza)
console.log(beyza.tasks.includes(branchTask2))
