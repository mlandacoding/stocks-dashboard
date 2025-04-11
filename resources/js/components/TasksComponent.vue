<template>
    <div>
        <h1 class="text-2xl font-bold mb-4 text-center">To-Do App</h1>
        <ul class="space-y-4">
            <li v-for="task in tasks" :key="task.id" class="flex justify-between items-center bg-gray-50 p-4 rounded shadow-sm">
                <div class="flex items-center">
                    <input type="checkbox" v-model="task.completed" @change="updateTask(task)" class="mr-2">
                    <span :class="{'line-through text-gray-500': task.completed}" class="text-lg">{{ task.name }}</span>
                </div>
                <button @click="deleteTask(task)" class="text-red-600 hover:text-red-800 font-semibold">Delete</button>
            </li>
        </ul>
        <div class="mt-6 flex gap-x-6 justify-center items-center ">
            <input
                v-model="newTask"
                @keyup.enter="addTask"
                placeholder="Add a new task"
                class="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            />
             <button @click="addTask"  class="w-32 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">Add Task</button>
        </div>

        <div class="p-6 bg-white rounded-xl shadow-md max-w-md mx-auto text-center">
            <h2 class="text-2xl font-bold mb-4">📈 Live Stock Ticker</h2>
            <div v-if="symbol && price">
                <p class="text-xl">Symbol: <span class="font-semibold">{{ symbol }}</span></p>
                <p class="text-xl">Price: <span class="font-semibold text-green-600">${{ price }}</span></p>
            </div>
            <p v-else class="text-gray-500">Waiting for updates...</p>
        </div>

    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

var symbol = ref(null)
var price = ref(null)
// Reactive variables
const tasks = ref([]);
const newTask = ref('');

// Fetch tasks on component mount
const fetchTasks = () => {
    axios.get('/tasks/all').then((response) => {
        tasks.value = response.data.tasks;
    });
};

// Add a new task
const addTask = () => {
    if (newTask.value.trim()) {
        axios.post('/tasks', { name: newTask.value }).then(() => {
            newTask.value = '';
        });
    }
};

// Update task (complete/uncomplete)
const updateTask = (task) => {
    axios.put(`/tasks/${task.id}`, { title: task.title, completed: task.completed });
};

// Delete a task
const deleteTask = (task) => {
    axios.delete(`/tasks/${task.id}`);
};

// Listen for real-time updates
const setupListeners = () => {
    window.Echo.channel('stocks')
        .listen('StockPriceUpdated', (event) => {
            console.log(event.symbol, event.price);
            symbol.value = event.symbol;
            price.value = event.price;

        })
    window.Echo.channel('tasks')
        .listen('TaskAdded', (event) => {
            tasks.value.push(event.task);
        })

        .listen('TaskUpdated', (event) => {
            const task = tasks.value.find((t) => t.id === event.task.id);
            if (task) {
                task.completed = event.task.completed;
            }
        })
        .listen('TaskDeleted', (event) => {
            tasks.value = tasks.value.filter((t) => t.id !== event.id);
        });
};

// Initialize on component mount
onMounted(() => {
    fetchTasks();
    setupListeners();
});
</script>
