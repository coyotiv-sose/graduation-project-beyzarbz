console.log('Gastro Ops')

// I have three main objekts ; Branches, Users , Tasks

// I need to ve able to create a Branch
//User should belong to a Branch
//A User should have a Role

//WhiCH information shoul my Branch carry ?

const branch = {
  name: 'Kennys Vienna',
  address: 'Vienna, Austria',
}

console.log(`The branch name is ${branch.name} and its address is ${branch.address}.`)

// I need to be able to create Users.

const beyza = {
  name: 'Beyza',
  role: 'branchManager',
  branch: branch,
  tasks: [],
}

const kevin = {
  name: 'Kevin',
  role: 'employee',
  branch: branch,
  tasks: [],
}

console.log(`${beyza.name} works as ${beyza.role} at ${beyza.branch.name}.`)

console.log(`${kevin.name} works as ${kevin.role} at ${kevin.branch.name} and has ${kevin.tasks.length} tasks.`)

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
  created_by: beyza,
}

console.log(
  `${branchTask.title} was created by ${branchTask.created_by.name} for ${branchTask.branch.name} and is currently ${branchTask.status}.`
)

console.log(
  `Task status: ${branchTask.status}, Priority: ${branchTask.priority}, Assigned to: ${branchTask.assignedTo}.`
)
console.log(
  `Task details: ${branchTask.title} - ${branchTask.description}, Start Time: ${branchTask.startTime}, End Time: ${branchTask.endTime}.`
)
