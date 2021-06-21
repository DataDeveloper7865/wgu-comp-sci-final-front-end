import React from 'react';
import Plot from 'react-plotly.js';

function Plotter(props) {

    return (

        <div>
            <h1>View Descriptive Statistics for {props.companyName}</h1>
            {console.log("Data X is: ", props.dataX)}
            {console.log("Data Y is: ", props.dataY)}
            <Plot
            data={
                [
                    {
                        x: props.dataX,
                        y: props.dataY,
                        mode: 'markers',
                        type: 'scatter'
                    }
                ]
            }
                layout={ {width: '50%', height: '20%', title: props.title} }
            />
        </div>

    )

}

export default Plotter;