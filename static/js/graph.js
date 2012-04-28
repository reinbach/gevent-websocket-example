$(function() { 
    // Open up a connection to our server 
    var ws = new WebSocket("ws://localhost:9999/"); 
    // Save our plot placeholder 
    var $placeholder = $('#placeholder'); 
    // Maximum # of data points to plot 
    var datalen = 100; 
    // This will be the plot object 
    var plot = null; 
    // Set up some options on our data series 
    var series = { 
        label: "Value", 
        lines: { 
            show: true, 
            fill: true 
        }, 
        points: { 
            show:true 
        }, 
        data: [] 
    }; 
    // What do we do when we get a message? 
    ws.onmessage = function(evt) { 
        var d = $.parseJSON(evt.data); 
        series.data.push([d.x, d.y]); 
        // Keep the data series a manageable length 
        while (series.data.length > datalen) { 
            series.data.shift(); 
        } 
        if(plot) { 
            // Create the plot if it's not there already 
            plot.setData([series]); 
            plot.setupGrid(); 
            plot.draw(); 
        } else if(series.data.length > 10) { 
            // Update the plot 
            plot = $.plot($placeholder, [series], { 
                xaxis:{ 
                    mode: "time", 
                    timeformat: "%H:%M:%S", 
                    minTickSize: [2, "second"], 
                }, 
                yaxis: { 
                    min: 0, 
                    max: 5 
                } 
            }); 
            plot.draw(); 
        } 
    } 
    // Just update our conn_status field with the connection status 
    ws.onopen = function(evt) { 
        $('#conn_status').html('<b>Connected</b>'); 
    } 
    ws.onerror = function(evt) { 
        $('#conn_status').html('<b>Error</b>'); 
    } 
    ws.onclose = function(evt) { 
        $('#conn_status').html('<b>Closed</b>'); 
    } 
}); 