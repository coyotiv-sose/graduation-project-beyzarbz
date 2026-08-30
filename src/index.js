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
  tasks: [],
}

console.log(branch.tasks.length === 0)
console.log(`The branch name is ${branch.name} and its address is ${branch.address}.`)

class User {
  constructor(name, role, branch) {
    this.name = name
    this.role = role
    this.branch = branch
    this.tasks = []
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

const admin = new User('Admin', 'admin', null)
const beyza = new User('Beyza', 'branchManager', branch)
const kevin = new User('Kevin', 'employee', branch)

console.log(admin instanceof User)
console.log(admin.role === 'admin')
console.log(admin.branch === null)
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
  admin
)

admin.createTask(
  'Staff Meeting',
  'Hold a staff meeting to discuss upcoming events and tasks.',
  '10:00',
  '11:00',
  'high',
  branch
)

console.log(
  'Branch tasks:',
  branch.tasks.map(task => task.title)
)

beyza.createTask(
  'Inventory Check',
  'Check the inventory for stock levels and expiration dates.',
  '09:00',
  '10:00',
  'medium',
  branch
)

console.log(
  'Branch tasks after Beyza created a task:',
  branch.tasks.map(task => task.title)
)

kevin.createTask('Clean Tables', 'Clean all tables in the dining area.', '11:00', '12:00', 'low', branch)

console.log(
  'Branch tasks after Kevin tried to create a task:',
  branch.tasks.map(task => task.title)
)
