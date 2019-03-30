function main() {
    Plotly.d3.csv("https://raw.githubusercontent.com/pschluet/baby-survey/master/data.csv", function (data) { buildPlots(data) });
};

function buildPlots(allRows) {

    console.log(allRows);
    
    Plotly.newPlot('boyGirl', createBarChartData(allRows),
        { title: 'Boy or Girl?' }, {responsive: true});

    Plotly.newPlot(
        'length', 
        createHistogramData(allRows, 'Length'),
        { 
            title: 'Length',
            xaxis: {
                title: {
                    text: 'Length (in)'
                }
            } 
        },
        {responsive: true}
    );

    Plotly.newPlot(
        'weight', 
        createHistogramData(allRows, 'Pounds'),
        { 
            title: 'Weight',
            xaxis: {
                title: {
                    text: 'Weight (lbs)'
                }
            } 
        }, 
        {responsive: true}
    );

    Plotly.newPlot(
        'birthDate', 
        createHistogramData(allRows, 'Date'),
        { 
            title: 'Birth Date',
            xaxis: {
                title: {
                    text: 'Date'
                }
            } 
        }, 
        {responsive: true}
    );

    Plotly.newPlot(
        'sleep', 
        createHistogramData(allRows, 'Sleep'),
        { 
            title: 'How Much Sleep Will Paul Get?',
            xaxis: {
                title: {
                    text: 'Sleep (minutes)'
                }
            } 
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

function createHistogramData(allRows, columnName) {
    var data = []
    for (var i = 0; i < allRows.length; i++) {
        row = allRows[i];
        data.push(row[columnName])
    }

    return [{
        x: data,
        type: 'histogram'
    }]
}

main();