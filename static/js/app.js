// from data.js
var tableData = data;

// Adding initial Table Data to the html page
var tbody = d3.select("tbody");

data.forEach(function(line) {
    var row = tbody.append('tr');
    
    Object.entries(line).forEach(function([key, value]) {
        row.append('td').text(value);
    });
});

var optionsButton = d3.select("#more-filters-btn");
var optionsList = ['city', 'state', 'country', 'shape'];

// giving the option of more filters
optionsButton.on("click", function() {
    d3.event.preventDefault();
    var filters = d3.select(".list-group-item");
    
    // adding more filters
    if (optionsButton.text() == 'More Filters') {
        optionsList.forEach(function(x) {
            var newLabel = filters.append('label');
            newLabel.attr('for', x);
            newLabel.text(`Enter a ${x}`);
    
            var newInput = filters.append('input');
            newInput.attr('class', 'form-control text-center');
            newInput.attr('id', x);
            newInput.attr('type', 'text');
        })
        optionsButton.text('Fewer Filters');
    }

    else if (optionsButton.text() == 'Fewer Filters') {
        filters.selectAll('label').remove();
        filters.selectAll('input').remove();
        
        var newLabel = filters.append('label');
        newLabel.attr('for', 'date');
        newLabel.text('Enter a Date');

        var newInput = filters.append('input');
        newInput.attr('class', 'form-control text-center');
        newInput.attr('id', 'datetime');
        newInput.attr('type', 'text');
        newInput.attr('placeholder', '1/1/2010');
        optionsButton.text('More Filters');
    }
    
    
    

})



// Filter section
var submit = d3.select("#filter-btn");


submit.on("click", function() {

    d3.event.preventDefault();
    
    function dateTest(x) {
        return x.datetime == dateFilterInput;
    }
    
    function cityTest (x) {
        return x.city == cityFilterInput;
    };

    function stateTest (x) {
        return x.state == stateFilterInput;
    };

    function countryTest (x) {
        return x.country == countryFilterInput;
    };

    function shapeTest (x) {
        return x.shape ==  shapeFilterInput;
    };


    var filterResults = tableData;

    var dateFilterElement = d3.select("#datetime");
    var dateFilterInput = dateFilterElement.property("value");

    if (optionsButton.text() == 'Fewer Filters') {
        var cityFilterElement = d3.select("#city");
        var cityFilterInput = cityFilterElement.property("value");

        var stateFilterElement = d3.select("#state");
        var stateFilterInput = stateFilterElement.property("value");

        var countryFilterElement = d3.select("#country");
        var countryFilterInput = countryFilterElement.property("value");

        var shapeFilterElement = d3.select("#shape");
        var shapeFilterInput = shapeFilterElement.property("value");

        if (!(dateFilterInput == '')) {
            filterResults = tableData.filter(dateTest);
        };
    
        if (!(cityFilterInput == '')) {
            filterResults = filterResults.filter(cityTest);
        };
    
        if (!(stateFilterInput == '')) {
            filterResults = filterResults.filter(stateTest);
        };
    
        if (!(countryFilterInput == '')) {
            filterResults = filterResults.filter(countryTest);
        };
    
        if (!(shapeFilterInput == '')) {
            filterResults = filterResults.filter(shapeTest);
        };
    }

    else if (optionsButton.text() == 'More Filters') {
        filterResults = filterResults.filter(dateTest);
    };

    
    tbody.selectAll('tr').remove();

    filterResults.forEach(function(line) {
        var row = tbody.append('tr');

        Object.entries(line).forEach(function([key, value]) {
            row.append('td').text(value);
        });
    });
});




