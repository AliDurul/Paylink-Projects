import TopPageNavigation from '@/app/components/TopPageNavigation'
import React from 'react'
import TasklistMain from './components/TaskListMain'

const TodoListPage = () => {
  return (
    <div>
      <TopPageNavigation main={{ title: 'Dashboard', url: '/' }} subTitle={{ title: 'Todo Lists', url: 'todo-list' }} />

      <TasklistMain />

    </div>
  )
}

export default TodoListPage