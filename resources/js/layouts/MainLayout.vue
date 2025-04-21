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
                <MarketStatus></MarketStatus>
                <v-row justify="center" class="mb-4" no-gutters>
                    <v-col cols="12" sm="4">
                        <v-card class="pa-0" color="primary">
                            <v-container>
                                <stock-card
                                    symbol="SPY"
                                />
                            </v-container>
                        </v-card>
                    </v-col>

                    <v-col cols="12" sm="4">
                        <v-card class="pa-0" color="primary">
                            <v-container>
                                <stock-card
                                    symbol="IWM"
                                />
                            </v-container>
                        </v-card>
                    </v-col>

                    <v-col cols="12" sm="4">
                        <v-card class="pa-0" color="primary">
                            <v-container>
                                <stock-card
                                    symbol="DIA"
                                />
                            </v-container>
                        </v-card>
                    </v-col>
                </v-row>
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
    import Navbar from '@/components/Navbar.vue';
    import Sidebar from '@/components/Sidebar.vue';
    import StockCard from '@/components/StockCardComponent.vue';
    import MarketStatus from "@/components/MarketStatus.vue";

    const drawer = ref(false);

    const handleDrawerToggle = (value) => {
        drawer.value = value;
    };
</script>
