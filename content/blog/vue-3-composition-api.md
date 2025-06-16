---
title: 'Getting Started with Vue 3 Composition API'
description: 'Learn how to use the new Composition API in Vue 3 to write more maintainable and reusable components.'
date: '2024-03-15'
tags: ['Vue.js', 'JavaScript', 'Frontend']
readTime: 8
views: 1234
comments: 15
---

# Getting Started with Vue 3 Composition API

The Vue 3 Composition API represents a significant evolution in how we write Vue.js applications. This new approach offers better code organization, improved TypeScript support, and enhanced reusability. In this article, we'll explore the fundamentals and build a practical example.

## What is the Composition API?

The Composition API is an alternative to the traditional Options API that allows you to organize component logic by feature rather than by option type. Instead of separating data, methods, and computed properties, you can group related logic together.

### Key Benefits

- **Better Logic Reuse**: Extract and reuse stateful logic across components
- **Improved TypeScript Support**: Better type inference and IDE support  
- **Flexible Code Organization**: Group related functionality together
- **Tree-shaking Friendly**: Only import what you need

## Basic Setup

Let's start with a simple counter component using the Composition API:

```vue
<template>
  <div>
    <p>Count: {{ count }}</p>
    <button @click="increment">Increment</button>
    <button @click="decrement">Decrement</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const count = ref(0)

const increment = () => {
  count.value++
}

const decrement = () => {
  count.value--
}
</script>
```

## Reactive References

The `ref()` function creates reactive references to primitive values:

```javascript
import { ref } from 'vue'

const count = ref(0)
const message = ref('Hello')
const isVisible = ref(true)

// Access the value using .value
console.log(count.value) // 0
count.value = 10
```

## Reactive Objects

For objects and arrays, use `reactive()`:

```javascript
import { reactive } from 'vue'

const state = reactive({
  user: {
    name: 'John',
    email: 'john@example.com'
  },
  todos: []
})

// No need for .value with reactive objects
state.user.name = 'Jane'
state.todos.push({ id: 1, text: 'Learn Vue 3' })
```

## Computed Properties

Computed properties work similarly but use the `computed()` function:

```javascript
import { ref, computed } from 'vue'

const firstName = ref('John')
const lastName = ref('Doe')

const fullName = computed(() => {
  return `${firstName.value} ${lastName.value}`
})

// With getter and setter
const fullNameWritable = computed({
  get() {
    return `${firstName.value} ${lastName.value}`
  },
  set(value) {
    [firstName.value, lastName.value] = value.split(' ')
  }
})
```

## Watchers

Watch for changes in reactive data:

```javascript
import { ref, watch, watchEffect } from 'vue'

const count = ref(0)

// Watch a specific ref
watch(count, (newValue, oldValue) => {
  console.log(`Count changed from ${oldValue} to ${newValue}`)
})

// Watch multiple sources
watch([count, message], ([newCount, newMessage], [oldCount, oldMessage]) => {
  // Handle changes
})

// Immediate effect
watchEffect(() => {
  console.log(`Count is: ${count.value}`)
})
```

## Lifecycle Hooks

Lifecycle hooks are imported as functions:

```javascript
import { onMounted, onUpdated, onUnmounted } from 'vue'

onMounted(() => {
  console.log('Component mounted')
})

onUpdated(() => {
  console.log('Component updated')
})

onUnmounted(() => {
  console.log('Component unmounted')
})
```

## Practical Example: Todo List

Let's build a complete todo list component:

```vue
<template>
  <div class="todo-app">
    <h1>Todo List</h1>
    
    <form @submit.prevent="addTodo">
      <input
        v-model="newTodo"
        placeholder="Add a new todo..."
        required
      >
      <button type="submit">Add</button>
    </form>

    <ul>
      <li 
        v-for="todo in filteredTodos" 
        :key="todo.id"
        :class="{ completed: todo.completed }"
      >
        <input
          type="checkbox"
          v-model="todo.completed"
        >
        <span>{{ todo.text }}</span>
        <button @click="removeTodo(todo.id)">Remove</button>
      </li>
    </ul>

    <div class="filters">
      <button
        v-for="filter in filters"
        :key="filter"
        @click="currentFilter = filter"
        :class="{ active: currentFilter === filter }"
      >
        {{ filter }}
      </button>
    </div>

    <p>{{ completedCount }} of {{ todos.length }} completed</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const newTodo = ref('')
const currentFilter = ref('All')
const todos = ref([])

const filters = ['All', 'Active', 'Completed']

const addTodo = () => {
  if (newTodo.value.trim()) {
    todos.value.push({
      id: Date.now(),
      text: newTodo.value.trim(),
      completed: false
    })
    newTodo.value = ''
  }
}

const removeTodo = (id) => {
  const index = todos.value.findIndex(todo => todo.id === id)
  if (index > -1) {
    todos.value.splice(index, 1)
  }
}

const filteredTodos = computed(() => {
  switch (currentFilter.value) {
    case 'Active':
      return todos.value.filter(todo => !todo.completed)
    case 'Completed':
      return todos.value.filter(todo => todo.completed)
    default:
      return todos.value
  }
})

const completedCount = computed(() => {
  return todos.value.filter(todo => todo.completed).length
})
</script>

<style scoped>
.completed {
  text-decoration: line-through;
  opacity: 0.6;
}

.active {
  background-color: #007bff;
  color: white;
}
</style>
```

## Composable Functions

One of the biggest advantages is creating reusable composable functions:

```javascript
// composables/useCounter.js
import { ref } from 'vue'

export function useCounter(initialValue = 0) {
  const count = ref(initialValue)

  const increment = () => count.value++
  const decrement = () => count.value--
  const reset = () => count.value = initialValue

  return {
    count,
    increment,
    decrement,
    reset
  }
}

// Usage in component
import { useCounter } from './composables/useCounter'

const { count, increment, decrement, reset } = useCounter(10)
```

## Conclusion

The Vue 3 Composition API provides a more flexible and powerful way to organize component logic. While it has a learning curve, the benefits in terms of code reusability, maintainability, and TypeScript support make it worth the investment.

Key takeaways:
- Use `ref()` for primitive values and `reactive()` for objects
- Group related logic together for better organization
- Create composable functions for reusable logic
- The Composition API works alongside the Options API

Start small by converting simple components and gradually adopt the Composition API across your Vue 3 applications.