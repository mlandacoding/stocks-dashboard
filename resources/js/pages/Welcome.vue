<template>
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

        <title>All Global Data</title>
        <meta name="description" content="We are a Financial Data repository with a focus on Public Companies and their Fundamental data.">
</head>
    <MainLayout>

    </MainLayout>
</template>



<script setup>

import MainLayout from '@/layouts/MainLayout.vue';
import LiveStocksTable from '@/components/LiveStocksTable.vue';


defineProps({
    message: String
})


</script>
