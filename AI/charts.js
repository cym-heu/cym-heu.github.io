function showSpfa() {
    var myChart = echarts.init(document.getElementById('spfaCharts'));
    let xDatas = [];
    let sDatas = [];
    for (let i = 0; i < dis.length; i++) {
        if (dis[i] != 111111) {
            xDatas.push(i);
            sDatas.push(dis[i]);
        }
    }
    // 指定图表的配置项和数据
    var option = {
        title: {
            text: '画布上点到终点距离'
        },
        tooltip: {},
        legend: {
            data: ['点']
        },
        xAxis: {
            data: xDatas
        },
        yAxis: {},
        series: [{
            name: '点',
            type: 'bar',
            data: sDatas
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}

function showAstar() {
    var myChart = echarts.init(document.getElementById('AstarCharts'));
    let xDatas = [];
    let sDatas = [];
    for (let i = 0; i < routesSize.length; i++) {
        xDatas.push(i+1);
        sDatas.push(routesSize[i])
    }
    // 指定图表的配置项和数据
    var option = {
        title: {
            text: '各个路径长短比较'
        },
        tooltip: {},
        legend: {
            data: ['路径']
        },
        xAxis: {
            data: xDatas
        },
        yAxis: {},
        series: [{
            name: '点',
            type: 'bar',
            data: sDatas
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}