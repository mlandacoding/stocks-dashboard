<template>
    <MainLayout>
        <LiveStocksTable></LiveStocksTable>
    </MainLayout>
  </template>

  <script setup>

  import MainLayout from '@/layouts/MainLayout.vue';
  import LiveStocksTable from '@/components/LiveStocksTable.vue';
  defineProps({
    message: String
  })

  </script>
