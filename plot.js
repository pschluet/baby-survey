function makeplot() {
    Plotly.d3.csv("https://raw.githubusercontent.com/pschluet/baby-survey/master/data.csv", function (data) { processData(data) });
};

function processData(allRows) {

    console.log(allRows);
    var boyCount = 0, girlCount = 0;

    for (var i = 0; i < allRows.length; i++) {
        row = allRows[i];

        if (row['Sex'] == 'boy') boyCount++; else girlCount++;
    }

    x = ['boy', 'girl']
    y = [boyCount, girlCount]

    console.log('X', x, 'Y', y);
    makePlotly(x, y);
}

function makePlotly(x, y) {
    var plotDiv = document.getElementById("plot");
    var data = [{
        x: x,
        y: y,
        type: 'bar'
    }];

    Plotly.newPlot('boyGirl', data,
        { title: 'What\'s the Baby Gonna Be?' });
};
makeplot();