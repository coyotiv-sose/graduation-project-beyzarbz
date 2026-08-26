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

const beyza = {
  name: 'Beyza',
  role: 'branchManager',
  branch: branch,
  tasks: [],

  assignTask(selectedTask, selectedUser) {
    selectedTask.assignedTo = selectedUser
    selectedUser.tasks.push(selectedTask)
  },
}

const kevin = {
  name: 'Kevin',
  role: 'employee',
  branch: branch,
  tasks: [],

  completeTask(selectedTask) {
    if(selectedTask.assignedTo === this)
      {
    selectedTask.status = 'completed'
      }
  },
}

// I need to be able to create Tasks.
const branchTask = {
  title: 'Kitchen Check',
  description: 'Check the kitchen for cleanliness and organization.',
  startTime: '08:00',
  endTime: '09:00',
  priority: 'high',
  status: 'pending',
  assignedTo: null,
  branch: branch,
  createdBy: beyza,
}

beyza.assignTask(branchTask, kevin)



kevin.completeTask(branchTask)

console.log(`${beyza.name} works as ${beyza.role} at ${beyza.branch.name}.`)

console.log(`${kevin.name} works as ${kevin.role} at ${kevin.branch.name} and has ${kevin.tasks.length} tasks.`)

console.log(`${branchTask.title} assigned to ${branchTask.assignedTo.name}.`)

console.log(
  `${branchTask.title} was created by ${branchTask.createdBy.name} for ${branchTask.branch.name} and is currently ${branchTask.status}.`
)

console.log(
  `Task status: ${branchTask.status}, Priority: ${branchTask.priority}, Assigned to: ${branchTask.assignedTo.name}.`
)
console.log(
  `Task details: ${branchTask.title} - ${branchTask.description}, Start Time: ${branchTask.startTime}, End Time: ${branchTask.endTime}.`
)

console.log(
  `Status of ${branchTask.title}: ${branchTask.status}. Assigned to: ${branchTask.assignedTo.name}.
  `
)
