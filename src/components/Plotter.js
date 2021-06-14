import React from 'react';
import Plot from 'react-plotly.js';

function Plotter() {

    return (

        <div>
            <h1>Hello World From Plot</h1>
            <Plot
            data={[
                {
                    x: [1, 2, 3],
                    y: [2, 6, 3],
                    type: 'scatter',
                    mode: 'lines+markers',
                    marker: {color: 'red'},
                },
                {type: 'bar', x: [1, 2, 3], y: [2, 5, 3]},
                ]}
                layout={ {width: '50%', height: '20%', title: 'A Fancy Plot'} }
            />
        </div>

    )

}

export default Plotter;