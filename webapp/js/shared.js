

function loadStatsDefault (id, serie) {
    Highcharts.chart(id, {
         chart: {
                zoomType: 'x'
            },
        title: {
            text: 'Economía temporal',
            x: -20 //center
        },
        xAxis: {
            type: 'datetime'
        },
        yAxis: {
            title: {
                text: 'Saldo (€)'
            },
            plotLines: [{
                value: 0,
                width: 2,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: '€'
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [serie]
    });
}