<script setup lang="ts">
import InputError from '@/components/other/InputError.vue';
import TextLink from '@/components/other/TextLink.vue';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Head, useForm } from '@inertiajs/vue3';
import { LoaderCircle } from 'lucide-vue-next';
import Navbar from '@/components/Navbar.vue';
import Sidebar from '@/components/Sidebar.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import { ref } from 'vue';

defineProps<{
    status?: string;
    canResetPassword: boolean;
}>();

const form = useForm({
    email: '',
    password: '',
    remember: false,
});

const drawer = ref(false);
const handleDrawerToggle = () => {
    drawer.value = !drawer.value;
};

const submit = () => {
    form.post(route('login'), {
        onFinish: () => form.reset('password'),
    });
};
</script>

<template>
    <link href="https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css" rel="stylesheet">
    <v-sheet class="custom-width-wrapper">
        <v-layout style="background: #0c1427; min-height: 100vh;">
            <Navbar @toggle-drawer="handleDrawerToggle" />
            <Sidebar :drawer="drawer" @update:drawer="handleDrawerToggle" />
            <v-main :class="{ 'content-expanded': !drawer, 'content-shrinked': drawer }">
                <v-container fluid class="pa-0 d-flex align-center justify-center" style="min-height: 80vh;">
                    <v-row justify="center" align="center" class="w-100">
                        <v-col cols="12" sm="6" md="4">
                            <Head title="Log in" />
                            <v-card style="background:#0c1427; color:#fff; border:2px solid #fff;" class="pa-6 rounded-lg shadow">
                                <v-card-title class="text-center text-h5 mb-4">Log in to your account</v-card-title>
                                <div v-if="status" class="mb-4 text-center text-sm font-medium text-green-400">
                                    {{ status }}
                                </div>
                                <v-form @submit.prevent="submit" class="d-flex flex-column gap-4">
                                    <v-text-field
                                        v-model="form.email"
                                        label="Email address"
                                        type="email"
                                        required
                                        autofocus
                                        :tabindex="1"
                                        autocomplete="email"
                                        :error-messages="form.errors.email"
                                        color="primary"
                                        variant="underlined"
                                        class="white--text"
                                        style="color:#fff;"
                                    />
                                    <v-text-field
                                        v-model="form.password"
                                        label="Password"
                                        type="password"
                                        required
                                        :tabindex="2"
                                        autocomplete="current-password"
                                        :error-messages="form.errors.password"
                                        color="primary"
                                        variant="underlined"
                                        class="white--text"
                                        style="color:#fff;"
                                    >
                                        <template #append>
                                            <TextLink v-if="canResetPassword" :href="route('password.request')" class="text-sm text-blue-300 ml-2" :tabindex="5">
                                                Forgot password?
                                            </TextLink>
                                        </template>
                                    </v-text-field>
                                    <v-checkbox
                                        v-model="form.remember"
                                        label="Remember me"
                                        :tabindex="3"
                                        color="primary"
                                        class="white--text"
                                        style="color:#fff;"
                                    />
                                    <v-btn type="submit" color="primary" class="mt-2 w-full" :tabindex="4" :loading="form.processing" block>
                                        <LoaderCircle v-if="form.processing" class="h-4 w-4 animate-spin mr-2" />
                                        Log in
                                    </v-btn>
                                </v-form>
                                <div class="text-center text-sm mt-4">
                                    <span class="text-muted-foreground">Don't have an account?</span>
                                    <TextLink :href="route('register')" :tabindex="5" class="text-blue-300 ml-1">Sign up</TextLink>
                                </div>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-container>
                <FooterComponent />
            </v-main>
        </v-layout>
    </v-sheet>
</template>

<style scoped>
.custom-width-wrapper {
    width: 100%;
    max-width: 100%;
}
.white--text input, .white--text label, .white--text .v-label {
    color: #fff !important;
}
</style>
