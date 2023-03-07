import { RequestHandler } from "express"

import { Todo } from "../models/todo"

const TODOS: Todo[] = []

export const createTodo: RequestHandler = (req, res, next) => {
  const text = (req.body as {text: string}).text
  const newTodo = new Todo(Math.random().toString(), text)

  TODOS.push(newTodo)
  console.log(newTodo)
  res.status(201).json({message: 'Created the todo', createTodo: newTodo})
} 

export const getTodos: RequestHandler = (req, res, next) => {
  res.status(200).json({message: 'List of TODOs', todos: TODOS})
}

export const updateTodo: RequestHandler<{id: string}> = (req, res, next) => {
  const todoId = req.params.id

  const updatedText = (req.body as {text: string}).text
  const todoIndex = TODOS.findIndex(todo => todo.id === todoId)

  if (todoIndex < 0) {
    throw new Error('Could not find todo!')
  }

  TODOS[todoIndex] = new Todo(TODOS[todoIndex].id, updatedText)

  res.json({message: 'Updated', updatedTodo: TODOS[todoIndex]})
}

export const deleteTodo: RequestHandler<{id: string}> = (req, res, next) => {
  const todoId = req.params.id
  const deletedTodoIndex = TODOS.findIndex(todo => todo.id === todoId)

  res.json({deleted: TODOS[deletedTodoIndex]})
  TODOS.splice(deletedTodoIndex, 1)

}