<template>
    <div class="pa-4" style="border: 1px solid rgba(255, 255, 255, 0.5);">
        <v-card flat color="primary">
            <v-card-title class="text-h6 font-weight-bold pb-2">
                Recent News: {{ symbol }}
            </v-card-title>

            <v-row dense>
                <v-col v-for="(item, index) in news" :key="index" cols="12" sm="6" class="pb-4">
                    <div class="news-item d-flex flex-column"
                        style="border-bottom: 1px solid #ccc; padding-bottom: 16px;">
                        <div class="d-flex justify-space-between align-start">
                            <!-- Title + Meta -->
                            <div class="pe-2">
                                <a :href="item.Article_url" target="_blank" class="font-weight-medium text-body-1"
                                    style="text-decoration: none;">
                                    {{ item.Title }}
                                </a>
                                <div class="text-caption mt-1">
                                    {{ item.Publisher_name }} • {{ formatDate(item.published_utc) }}
                                </div>
                                <div class="text-body-2 mt-2">
                                    {{ item.Description }}
                                </div>
                                <v-divider class="my-1"></v-divider>
                                <div v-if="item.Insights?.length" class="mt-2 d-flex align-start sentiment-box">
                                    <v-icon v-if="item.Insights[0].sentiment === 'positive'" color="green" size="18"
                                        class="mt-1 me-1">mdi-arrow-up-bold</v-icon>

                                    <v-icon v-else-if="item.Insights[0].sentiment === 'negative'" color="red" size="18"
                                        class="mt-1 me-1">mdi-arrow-down-bold</v-icon>

                                    <v-icon v-else color="grey" size="18" class="mt-1 me-1">mdi-minus</v-icon>

                                    <div class="text-caption sentiment-text">
                                        {{ item.Insights[0].sentiment_reasoning }}
                                    </div>
                                </div>
                            </div>

                            <!-- Publisher logo -->
                            <v-avatar size="80" v-if="item.Publisher_logo_url" style="background-color: white;"
                                rounded="0">
                                <img :src="item.Publisher_logo_url" :alt="item.Publisher_name" />
                            </v-avatar>
                        </div>
                    </div>
                </v-col>
            </v-row>
        </v-card>
    </div>
</template>



<style scoped>
@import '../../css/liveStocksTable.css';
</style>


<script>
export default {
    props: {
        symbol: {
            type: String,
            default: 'SPY',

        }
    },
    data() {
        return {
            news: [],
            loading: false,
            headers: [
                { text: 'Publisher', value: 'Publisher_name' },
                { text: 'Article Title', value: 'Title' },
                { text: 'Description', value: 'Description' },
                { text: 'Article Date', value: 'published_utc' },
            ],
        };
    },
    async mounted() {
        this.loadNews();

    },
    methods: {
        async loadNews() {
            try {
                const newsRes = await fetch(`/getNewsPerSymbol/${this.symbol}`);
                this.news = await newsRes.json();
                this.loading = false;
            } catch (error) {
                console.error('Error loading news:', error);
                this.loading = false;
            }
        },
        formatDate(dateStr) {
            const date = new Date(dateStr);
            return date.toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
            });
        },
    },
};

</script>
