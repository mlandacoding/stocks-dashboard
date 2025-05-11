<template>
    <v-card color="primary" style="border: 1px solid rgba(255, 255, 255, 0.5);">
        <apexchart v-if="series.length" :type="chartType" height="448" :options="chartOptions" :series="series" />
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
        metric: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        chartType:{
            type: String,
            default: 'line'
        }
    },
    setup(props) {
        const series = ref([]);
        const chartOptions = ref({});
        const timeframe = ref();

        const label = ref();

        onMounted(async () => {
            try {

                let response = await axios.get(`/getMetricsForLastFive/${props.symbol}?metrics=${props.metric}`);
                let data = response.data['metrics'];

                if (data.length === 0) {
                    const other_metrics = ['gross_profit', 'liabilities_and_equity'];

                    for (const other_metric of other_metrics) {
                        response = await axios.get(`/getMetricsForLastFive/${props.symbol}?metrics=${other_metric}`);
                        data = response.data['metrics'];

                        if (data.length !== 0) {
                            break;
                        }
                    }
                }


                timeframe.value = response.data['timeframe'];
                const keys = Object.keys(data);
                label.value = data[keys[0]][0]['label'];

                const categories = data[keys[0]].map(entry =>
                    new Date(entry.filing_date).toLocaleDateString()
                );

                const MetricData = data[keys[0]].map(entry =>
                    parseFloat(entry.value)
                );

                series.value = [
                    {
                        name: label.value,
                        data: MetricData,
                    }
                ];

                chartOptions.value = {
                    chart: {
                        height: 400,
                        type: props.chartType,
                        toolbar: { show: false },
                        zoom: { enabled: false },
                    },
                    title: {
                        text: label.value,
                        align: 'left',
                        margin: 10,
                        offsetX: 10,
                        offsetY: 10,
                        floating: false,
                        style: {
                        fontSize:  '16px',
                        fontWeight:  'bold',
                        color:  'white'
                        },
                    },
                    fill: {
                        colors: ['#5E75E8']
                    },
                    stroke: {
                        width: 3,
                    },
                    dataLabels: {
                        enabled: true,
                        enabledOnSeries: [1],
                    },
                    plotOptions: {
                        bar: {
                            borderRadius: 10,
                            dataLabels: {
                            position: 'top',
                            },
                        }
                    },
                    dataLabels: {
                        enabled: true,
                        offsetY: -20,
                        style: {
                            fontSize: '12px',
                            colors: ["white"]
                        }
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
                        type: 'category'
                    },
                    yaxis: [
                        {
                            labels: {
                                show: false,
                            },
                            axisTicks: {
                                show: false,
                            },
                        }
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
            timeframe,
            label
        };
    },
});
</script>
