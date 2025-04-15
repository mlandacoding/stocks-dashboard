<template>
    <link href="https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css" rel="stylesheet">
    <v-card>
        <v-layout style="background: #0c1427;">
            <!-- Navbar -->
            <Navbar @toggle-drawer="handleDrawerToggle" />

            <!-- Sidebar Navigation Drawer -->
            <Sidebar :drawer="drawer" @update:drawer="handleDrawerToggle" />

            <!-- Main Content -->
            <v-main :class="{ 'content-expanded': !drawer, 'content-shrinked': drawer }">
                <v-container>
                    <!-- Row for 3 Cards -->
                    <v-row justify="center" class="mb-4">
                        <v-col cols="12" sm="4">
                            <v-card class="pa-0" color="primary" style="border: 2px solid grey;">
                                <v-container>
                                    <v-row align="center" justify="center">
                                        <v-col cols="3">
                                            <h4>BTC/USD</h4>
                                            <p style="color:aquamarine">
                                            <h3>$18,475</h3>
                                            </p>
                                            <p style="color:aquamarine">&uarr; +1.27%</p>
                                        </v-col>
                                        <v-col>
                                            <!-- <VueApexCharts :options="chartOptions" :series="series" type="line" height="150" /> -->
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card>
                        </v-col>

                        <v-col cols="12" sm="4">
                            <v-card class="pa-4" color="grey-darken-4">
                                <v-card-title>Card 2</v-card-title>
                                <v-card-text>Content for Card 2</v-card-text>
                            </v-card>
                        </v-col>

                        <v-col cols="12" sm="4">
                            <v-card class="pa-4" color="grey-darken-4">
                                <v-card-title>Card 3</v-card-title>
                                <v-card-text>Content for Card 3</v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>

                    <!-- Slot Wrapped in a Card (Spanning 11 Columns) -->
                    <v-row justify="center">
                        <v-col cols="12" sm="12">
                            <slot />
                        </v-col>
                    </v-row>
                </v-container>
            </v-main>
        </v-layout>
    </v-card>
</template>

<style scoped>
.content-expanded {
    margin-left: 0;
    transition: margin-left 0.8s ease-in-out;
}

.content-shrinked {
    margin-left: 5px;
    transition: margin-left 0.8s ease-in-out;
}
</style>

<script setup>
    import { ref } from "vue";
    import Navbar from '@/Components/Navbar.vue';
    import Sidebar from '@/components/Sidebar.vue';

    const drawer = ref(false);

    const handleDrawerToggle = (value) => {
        drawer.value = value;
    };
</script>
