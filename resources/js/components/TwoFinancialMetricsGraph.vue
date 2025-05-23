<template>
    <v-card color="primary" style="border: 1px solid rgba(255, 255, 255, 0.5);">
        <v-card-title class="d-flex" style="text-align: center; color: white;" >
            <span v-if="!title">
                {{ this.barLabel }} vs {{ this.lineLabel }}
            </span>
            <span v-else>
                {{ title }}
            </span>

        </v-card-title>

        <apexchart v-if="series.length" type="line" height="400" :options="chartOptions" :series="series" />
        <div class="text-right pr-4 pb-2">
            <small><h2>* In Millions</h2></small>
        </div>
    </v-card>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import axios from 'axios';
import VueApexCharts from 'vue3-apexcharts';

export default defineComponent({
    name: 'FinancialChart',
    components: {
        apexchart: VueApexCharts,
    },
    props: {
        symbol: {
            type: String,
            required: true,
        },
        first_metric: {
            type: String,
            required: true,
        },
        second_metric: {
            type: String,
            required: true
        },
        title: {
            type: String
        }
    },
    setup(props) {
        const series = ref([]);
        const chartOptions = ref({});

        const barLabel = ref();
        const lineLabel = ref();

        onMounted(async () => {
            try {
                const response = await axios.get(
                    `/getMetricsForLastFive/${props.symbol}?metrics=${props.first_metric},${props.second_metric}`
                );

                const data = response.data['metrics'];



                const keys = Object.keys(data);

                barLabel.value = data[keys[1]][0]['label'];
                lineLabel.value = data[keys[0]][1]['label'];

                const categories = data[keys[1]].map(entry =>
                    new Date(entry.filing_date).toLocaleDateString()
                );

                const firstMetricData = data[keys[1]].map(entry =>
                    parseFloat(entry.value)
                );

                const secondMetricData = data[keys[0]].map(entry =>
                    parseFloat(entry.value)
                );

                series.value = [
                    {
                        name: data[keys[1]][0]['label'],
                        type: 'column',
                        data: firstMetricData,
                    },
                    {

                        name: data[keys[0]][1]['label'],
                        type: 'line',
                        data: secondMetricData,
                    },
                ];

                chartOptions.value = {
                    chart: {
                        height: 400,
                        type: 'line',
                        toolbar: { show: false },
                        zoom: { enabled: false },
                    },
                    legend: {
                        labels: {
                            colors: '#FFFFFF'
                        }
                    },
                    stroke: {
                        width: [0, 3],
                    },
                    dataLabels: {
                        enabled: true,
                        enabledOnSeries: [1],
                    },
                    labels: categories,
                    grid: {
                        yaxis: {
                            lines: {
                                show: false,
                            },
                        },
                    },
                    xaxis: {
                        type: 'category',
                        labels: {
                            style: {
                                colors: '#FFFFFF',
                            },
                        },
                    },
                    yaxis: [
                        {
                            labels: {
                                show: false,
                            },
                            axisTicks: {
                                show: false,
                            },
                        },
                        {
                            opposite: true,
                            labels: {
                                show: true,
                                style: {
                                    colors: '#FFFFFF',
                                },
                            },
                            axisTicks: {
                                show: false,
                            },
                        },
                    ],
                    tooltip: {
                        x: {
                            format: 'HH:mm',
                        },
                        theme: 'dark',
                    }
                };
            } catch (error) {
                console.error('Failed to fetch metrics:', error);
            }
        });

        return {
            series,
            chartOptions,
            barLabel,
            lineLabel
        };
    },
});
</script>
