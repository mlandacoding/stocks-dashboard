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
                            <div v-if="status" class="mb-4 text-center text-sm font-medium text-green-600">
                                {{ status }}
                            </div>
                            <form @submit.prevent="submit" class="flex flex-col gap-6 bg-white dark:bg-neutral-900 p-6 rounded-lg shadow">
                                <div class="grid gap-6">
                                    <div class="grid gap-2">
                                        <Label for="email">Email address</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            required
                                            autofocus
                                            :tabindex="1"
                                            autocomplete="email"
                                            v-model="form.email"
                                            placeholder="email@example.com"
                                        />
                                        <InputError :message="form.errors.email" />
                                    </div>
                                    <div class="grid gap-2">
                                        <div class="flex items-center justify-between">
                                            <Label for="password">Password</Label>
                                            <TextLink v-if="canResetPassword" :href="route('password.request')" class="text-sm" :tabindex="5">
                                                Forgot password?
                                            </TextLink>
                                        </div>
                                        <Input
                                            id="password"
                                            type="password"
                                            required
                                            :tabindex="2"
                                            autocomplete="current-password"
                                            v-model="form.password"
                                            placeholder="Password"
                                        />
                                        <InputError :message="form.errors.password" />
                                    </div>
                                    <div class="flex items-center justify-between" :tabindex="3">
                                        <Label for="remember" class="flex items-center space-x-3">
                                            <Checkbox id="remember" v-model="form.remember" :tabindex="4" />
                                            <span>Remember me</span>
                                        </Label>
                                    </div>
                                    <Button type="submit" class="mt-4 w-full" :tabindex="4" :disabled="form.processing">
                                        <LoaderCircle v-if="form.processing" class="h-4 w-4 animate-spin" />
                                        Log in
                                    </Button>
                                </div>
                                <div class="text-center text-sm text-muted-foreground">
                                    Don't have an account?
                                    <TextLink :href="route('register')" :tabindex="5">Sign up</TextLink>
                                </div>
                            </form>
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
</style>
