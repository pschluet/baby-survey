var primaryColor = '3A77AF';
var highlightColor = 'EEC584';

function main() {
    Plotly.d3.csv("https://raw.githubusercontent.com/pschluet/baby-survey/master/data.csv", function (data) { buildPlots(data) });
};

function buildPlots(allRows) {
    Plotly.newPlot(
        'nameVsWeight', 
        createBarChartData(allRows, 'Name', 'Pounds', false, 9),
        { 
            title: 'Weight', 
            xaxis: {
                title: {
                    text: 'Weight (lbs)'
                }
            },
            height: 650
        },
        {responsive: true}
    );

    Plotly.newPlot(
        'nameVsLength', 
        createBarChartData(allRows, 'Name', 'Length', false, 20.5),
        { 
            title: 'Length',
            xaxis: {
                title: {
                    text: 'Length (in)'
                }
            },
            height: 650
        }, 
        {responsive: true}
    );
    
    Plotly.newPlot('boyGirl', createBoyGirlBarChartData(allRows),
        {
            title: 'Boy or Girl?'
        }, 
        {responsive: true}
    );

    Plotly.newPlot(
        'length', 
        createHistogramData(allRows, 'Length', {size: '0.5'}),
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
        createHistogramData(allRows, 'Pounds', {size: '0.5'}),
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
        createHistogramData(allRows, 'Date', {}),
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
        createHistogramData(allRows, 'Sleep', {start: '-0.5', size: '1'}),
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

function createBarChartData(allRows, labelCol, valueCol, sortByLabel = false, valueToHighlight = -1) {
    var data = new Array();
    var colors = new Array();

    for (var i = 0; i < allRows.length; i++) {
        row = allRows[i];
        var label = row[labelCol].includes('?') ? 'Unknown ' + i.toString() : row[labelCol];
        var value = row[valueCol]
        var color = value == valueToHighlight ? highlightColor : primaryColor

        data.push([label, value, color]);
    }

    // Sort
    data.sort((a,b) => {
        var sortCol = sortByLabel ? 0 : 1;
        return b[sortCol] - a[sortCol];
    });

    return [{
        y: data.map(item => item[0]),
        x: data.map(item => item[1]),
        type: 'bar',
        orientation: 'h',
        marker: {
            color: data.map(item => item[2])
        }
    }]

}

function createBoyGirlBarChartData(allRows) {
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