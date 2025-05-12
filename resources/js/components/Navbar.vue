<script setup>
import { ref, onMounted } from "vue";
import { useDisplay } from 'vuetify';
import axios from "axios";

const drawer = ref(false);
const emit = defineEmits(["toggle-drawer"]);
const updateDrawer = () => {
    drawer.value = !drawer.value;
    emit("toggle-drawer", drawer.value);
};

const showSearch = ref(false);
const symbols = ref([]);
const search = ref(null);

const { mdAndUp } = useDisplay();

const menuProps = {
  contentClass: 'primary-dropdown'
};

// Fetch symbols on mount
onMounted(async () => {
    try {
        const response = await axios.get("/active-assets-with_companyname");
        const data = response.data.symbols;
        // Convert to array of objects for v-autocomplete
        symbols.value = Object.entries(data).map(([symbol, name]) => ({
            title: name,
            value: symbol
        }));
    } catch (error) {
        console.error("Failed to load active assets", error);
    }
});

// Handle selection
const goToProfile = (symbol) => {
    if (symbol) {
        window.location.href = `/company_profile/${symbol.value}`;
        search.value = null;
        showSearch.value = false;
    }
};
</script>



<template>
    <v-app-bar color="primary" class="outlined-navbar" style="border-bottom: .5px solid #17223f;">
        <v-app-bar-nav-icon variant="text" @click="updateDrawer"></v-app-bar-nav-icon>

        <v-toolbar-title>
            <div style="display: flex; align-items: center;">
                <img src="https://agdsvgs.s3.us-east-2.amazonaws.com/logo-icon.svg"
                    style="width:35px; margin-right: 5px;" />
                <img src="https://agdsvgs.s3.us-east-2.amazonaws.com/logo-text.svg"
                    style="width:100px; margin-right: 5px;" />
            </div>
        </v-toolbar-title>

        <template v-if="mdAndUp">
            <v-btn icon="mdi-magnify" variant="text" @click="showSearch = !showSearch"></v-btn>
            <v-autocomplete
                v-if="showSearch"
                v-model="search"
                :items="symbols"
                item-title="title"
                item-value="value"
                label="Search companies"
                hide-details
                density="compact"
                clearable
                solo
                flat
                :menu-props="menuProps"
                style="max-width: 400px; margin-left: 16px;"
                @update:model-value="goToProfile"
                return-object
            >
                <template #item="{ props, item }">
                    <!-- Override default rendering completely -->
                    <v-list-item v-bind="props" :title="null" >
                        <template #title>
                            <div class="d-flex align-center">
                                <span>{{ item.props.title }}</span>
                                <span style="color: #5E75E8; margin-left: 6px;">[{{ item.props.value }}]</span>
                            </div>
                        </template>
                    </v-list-item>
                </template>

                <template #selection="{ item }">
                    <div class="d-flex align-center">
                        <span>{{ item.title }}</span>
                        <span style="color: #5E75E8; margin-left: 6px;">[{{ item.value }}]</span>
                    </div>
                </template>
            </v-autocomplete>
        </template>
    </v-app-bar>
</template>

<style>
.primary-dropdown {
    background-color: #0c1427 !important;
}
.primary-dropdown .v-list {
    background-color: #0c1427 !important;
}
.primary-dropdown .v-list-item--active {
    background-color: rgba(94, 117, 232, 0.15) !important;
}
.primary-dropdown .v-list-item:hover {
    background-color: rgba(94, 117, 232, 0.1) !important;
}
</style>
