<template >
    <div style="border: 1px solid rgba(255, 255, 255, 0.5); padding-bottom: .5em;">
        <v-card-title v-if="news" class="d-flex align-center pe-2">
            News for [{{ symbol }}]
            <v-spacer></v-spacer>
        </v-card-title>

        <v-data-table :headers="headers" :items="news" density="compact" :items-per-page="10"
            class="custom-table" :hover=true>


            <template v-slot:bottom>
            </template>
        </v-data-table>
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
            loading: false
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
    },
};

</script>
