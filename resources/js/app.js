import './bootstrap';
import { createApp } from 'vue';
import TasksComponent from './components/TasksComponent.vue';

createApp({})
    .component('TasksComponent', TasksComponent)
    .mount('#app')
