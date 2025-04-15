<template>
    <MainLayout>
        <TasksComponent></TasksComponent>
    </MainLayout>
  </template>

  <script setup>

  import MainLayout from '@/layouts/MainLayout.vue';
  import TasksComponent from '@/components/TasksComponent.vue';
  defineProps({
    message: String
  })

  </script>
