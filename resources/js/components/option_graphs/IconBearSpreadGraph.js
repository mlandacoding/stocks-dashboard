export const bearSpreadSeries = [
    {
        name: 'Payoff',
        data: [30, 25, 20, 15, 10, 5, 0, 0, 0], // Example data for visual representation
    },
];

export const bearSpreadOptions = {
    chart: {
        id: 'bear-spread-payoff',
        toolbar: { show: false },
        zoom: { enabled: false },
        background: 'transparent',
    },
    xaxis: {
        categories: [90, 95, 100, 105, 110, 115, 120, 125, 130],
        title: { text: 'Asset Price', style: { color: '#fff' } },
        labels: { show: false },
    },
    yaxis: {
        title: { text: 'Profit / Loss', style: { color: '#fff' } },
        labels: { show: false },
    },
    grid: {
        borderColor: '#2c365a',
        row: { colors: ['#222b45', 'transparent'], opacity: 0.1 },
    },
    stroke: {
        curve: 'straight',
        width: 3,
        colors: ['#ff4560'],
    },
    tooltip: {
        enabled: false,
    },
    markers: {
        size: 5,
        colors: ['#ff4560'],
        strokeColors: '#fff',
        strokeWidth: 2,
    },
    fill: {
        type: 'gradient',
        gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.4,
            opacityTo: 0,
            stops: [0, 100],
            colorStops: [
                [
                    {
                        offset: 0,
                        color: '#ff4560',
                        opacity: 0.4,
                    },
                    {
                        offset: 100,
                        color: '#ff4560',
                        opacity: 0,
                    },
                ],
            ],
        },
    },
    dataLabels: {
        enabled: false,
    },
};
