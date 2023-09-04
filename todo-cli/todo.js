/* eslint-disable no-undef */

const todoList = () => {
  all = []
  const add = (todoItem) => {
    all.push(todoItem)
  }
  const markAsComplete = (index) => {
    all[index].completed = true
  }

  const overdue = () => {
    const today = new Date()
    return all.filter((item) => {
      const dueDate = new Date(item.dueDate)
      return !item.completed && dueDate < today && dueDate.toISOString().split('T')[0] !== today.toISOString().split('T')[0]
    })
  }

  const dueToday = () => {
    const today = new Date()
    return all.filter((item) => {
      const dueDate = new Date(item.dueDate)
      return dueDate.toISOString().split('T')[0] === today.toISOString().split('T')[0]
    })
  }

  const dueLater = () => {
    const today = new Date()
    return all.filter((item) => {
      const dueDate = new Date(item.dueDate)
      return !item.completed && dueDate > today
    })
  }

  const toDisplayableList = (list) => {
    return list
      .map((item) => {
        const checkbox = item.completed ? '[x]' : '[ ]'
        const titleAndDate = item.dueDate !== today ? ` ${item.dueDate}` : ''
        return `${checkbox} ${item.title}${titleAndDate}`
      })
      .join('\n')
  }

  return {
    all,
    add,
    markAsComplete,
    overdue,
    dueToday,
    dueLater,
    toDisplayableList
  }
}

const todos = todoList()

const formattedDate = (d) => {
  return d.toISOString().split('T')[0]
}

const dateToday = new Date()
const today = formattedDate(dateToday)
const yesterday = formattedDate(
  new Date(new Date().setDate(dateToday.getDate() - 1))
)
const tomorrow = formattedDate(
  new Date(new Date().setDate(dateToday.getDate() + 1))
)

todos.add({ title: 'Submit assignment', dueDate: yesterday, completed: false })
todos.add({ title: 'Pay rent', dueDate: today, completed: true })
todos.add({ title: 'Service Vehicle', dueDate: today, completed: false })
todos.add({ title: 'File taxes', dueDate: tomorrow, completed: false })
todos.add({ title: 'Pay electric bill', dueDate: tomorrow, completed: false })

console.log('My Todo-list\n')

console.log('Overdue')
const overdues = todos.overdue()
const formattedOverdues = todos.toDisplayableList(overdues)
console.log(formattedOverdues)
console.log('\n')

console.log('Due Today')
const itemsDueToday = todos.dueToday()
const formattedItemsDueToday = todos.toDisplayableList(itemsDueToday)
console.log(formattedItemsDueToday)
console.log('\n')

console.log('Due Later')
const itemsDueLater = todos.dueLater()
const formattedItemsDueLater = todos.toDisplayableList(itemsDueLater)
console.log(formattedItemsDueLater)
console.log('\n\n')
