package com.example.todolist.repository

import org.springframework.data.repository.CrudRepository

interface TodoRepository : CrudRepository<Todo,Long>