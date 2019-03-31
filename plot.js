function main() {
    Plotly.d3.csv("https://raw.githubusercontent.com/pschluet/baby-survey/master/data.csv", function (data) { buildPlots(data) });
};

function buildPlots(allRows) {
    
    var fontSize = 20;
    
    Plotly.newPlot('boyGirl', createBarChartData(allRows),
        { title: 'Boy or Girl?', font: {size: fontSize} }, {responsive: true});

    Plotly.newPlot(
        'length', 
        createHistogramData(allRows, 'Length', {size: '0.5'}),
        { 
            title: 'Length',
            xaxis: {
                title: {
                    text: 'Length (in)'
                }
            },
            font: {size: fontSize} 
        },
        {responsive: true}
    );

    Plotly.newPlot(
        'weight', 
        createHistogramData(allRows, 'Pounds', {size: '0.5'}),
        { 
            title: 'Weight',
            xaxis: {
                title: {
                    text: 'Weight (lbs)'
                }
            },
            font: {size: fontSize} 
        }, 
        {responsive: true}
    );

    Plotly.newPlot(
        'birthDate', 
        createHistogramData(allRows, 'Date', {}),
        { 
            title: 'Birth Date',
            xaxis: {
                title: {
                    text: 'Date'
                }
            }, 
            font: {size: fontSize} 
        }, 
        {responsive: true}
    );

    Plotly.newPlot(
        'sleep', 
        createHistogramData(allRows, 'Sleep', {start: '-0.5', size: '1'}),
        { 
            title: 'How Much Sleep Will Paul Get?',
            xaxis: {
                title: {
                    text: 'Sleep (minutes)'
                }
            }, 
            font: {size: fontSize}  
        }, 
        {responsive: true}
    );
}

function createBarChartData(allRows) {
    var boyCount = 0, girlCount = 0;

    for (var i = 0; i < allRows.length; i++) {
        row = allRows[i];

        if (row['Sex'] == 'boy') boyCount++; else girlCount++;
    }

    return [{
        x: ['Boy', 'Girl'],
        y: [boyCount, girlCount],
        type: 'bar'
    }]
}

function createHistogramData(allRows, columnName, xbins) {
    var data = []
    for (var i = 0; i < allRows.length; i++) {
        row = allRows[i];
        var dataItem = row[columnName]
        data.push(dataItem)
    }

    if (columnName == "Date") {
        data.sort((a,b) => new Date(a).getTime() - new Date(b).getTime() )
        data = data.map((a) => a.replace('/19',''))
    }

    return [{
        x: data,
        type: 'histogram',
        xbins: xbins
    }]
}

main();