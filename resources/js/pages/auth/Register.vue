<script setup lang="ts">
import InputError from '@/components/other/InputError.vue';
import TextLink from '@/components/other/TextLink.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Head, useForm } from '@inertiajs/vue3';
import { LoaderCircle } from 'lucide-vue-next';
import Navbar from '@/components/Navbar.vue';
import Sidebar from '@/components/Sidebar.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import { ref } from 'vue';

const form = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
});

const drawer = ref(false);
const handleDrawerToggle = () => {
    drawer.value = !drawer.value;
};

const submit = () => {
    form.post(route('register'), {
        onFinish: () => form.reset('password', 'password_confirmation'),
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
                            <Head title="Register" />
                            <v-card style="background:#0c1427; color:#fff; border:2px solid #fff;" class="pa-6 rounded-lg shadow">
                                <v-card-title class="text-center text-h5 mb-4">Create an account</v-card-title>
                                <v-form @submit.prevent="submit" class="d-flex flex-column gap-4">
                                    <v-text-field
                                        v-model="form.name"
                                        label="Name"
                                        type="text"
                                        required
                                        autofocus
                                        :tabindex="1"
                                        autocomplete="name"
                                        :error-messages="form.errors.name"
                                        color="primary"
                                        variant="underlined"
                                        class="white--text"
                                        style="color:#fff;"
                                    />
                                    <v-text-field
                                        v-model="form.email"
                                        label="Email address"
                                        type="email"
                                        required
                                        :tabindex="2"
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
                                        :tabindex="3"
                                        autocomplete="new-password"
                                        :error-messages="form.errors.password"
                                        color="primary"
                                        variant="underlined"
                                        class="white--text"
                                        style="color:#fff;"
                                    />
                                    <v-text-field
                                        v-model="form.password_confirmation"
                                        label="Confirm password"
                                        type="password"
                                        required
                                        :tabindex="4"
                                        autocomplete="new-password"
                                        :error-messages="form.errors.password_confirmation"
                                        color="primary"
                                        variant="underlined"
                                        class="white--text"
                                        style="color:#fff;"
                                    />
                                    <v-btn type="submit" color="primary" class="mt-2 w-full" tabindex="5" :loading="form.processing" block>
                                        <LoaderCircle v-if="form.processing" class="h-4 w-4 animate-spin mr-2" />
                                        Create account
                                    </v-btn>
                                </v-form>
                                <div class="text-center text-sm mt-4">
                                    <span class="text-muted-foreground">Already have an account?</span>
                                    <TextLink :href="route('login')" class="text-blue-300 ml-1" :tabindex="6">Log in</TextLink>
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
