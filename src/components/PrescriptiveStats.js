import React, { useState, useEffect } from 'react';
import LoadingSpinner from '../common/LoadingSpinner';
import Plot from 'react-plotly.js';
import { Menu, Dropdown, Button, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const axisOptions = ['cashRatio', 'currentRatio', 'ebitPerShare', 'eps', 'grossMargin', 'longtermDebtTotalAsset',
        'longtermDebtTotalCapital', 'longtermDebtTotalEquity', 'netDebtToTotalCapital', 'netDebtToTotalEquity',
        'netMargin', 'operatingMargin', 'pretaxMargin', 'salesPerShare', 'sgaToSale', 'totalDebtToEquity',
        'totalDebtToTotalAsset', 'totalDebtToTotalCapital', 'totalRatio']

const companySymbols = ['XOM', 'AAPL', 'MSFT', 'AMZN', 'GOOG', 'FB', 'TSLA', 'V', 'NVDA', 'JNJ']

function PrescriptiveStats() {
    
    const [basicFinancials, setBasicFinancials] = useState([])
    const [currCompany, setCurrCompany] = useState('XOM')
    
    const [currXAxisSelection, setCurrXAxisSelection] = useState('cashRatio')
    const [currYAxisSelection, setCurrYAxisSelection] = useState('currentRatio')
    
    let companyMenu = (
        <Menu>
            {companySymbols.map(company => 
                <Menu.Item key={company}>
                    <li onClick={e => setCompanyClick(e)}>
                        {company}
                    </li>
                    {console.log(company)}
                </Menu.Item>
           
            )}
        </Menu>
    )

    let axisXMenu = (
        <Menu>
            {axisOptions.map(option => 
                <Menu.Item key={option}>
                    <li onClick={e => setXAxisClick(e)}>
                        {option.toString()}
                    </li>
                    {console.log(option)}
                </Menu.Item>
           
            )}
        </Menu>
    )

    let axisYMenu = (
        <Menu>
            {axisOptions.map(option => 
                <Menu.Item key={option}>
                    <li onClick={e => setYAxisClick(e)}>
                        {option.toString()}
                    </li>
                    {console.log(option)}
                </Menu.Item>
           
            )}
        </Menu>
    )

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(
              `https://finnhub.io/api/v1/stock/metric?symbol=${currCompany}&token=c335ok2ad3ifq944562g&metric=all`
            );
            console.log("Went to the API")
            const data = await response.json();
            console.log(data);
            setBasicFinancials(data)
          } catch (error) {
            console.log(error.message);
          }
        };
    
        fetchData();
      }, [currCompany]);

    function setXAxisClick(e) {
        let XAxis = e.target.childNodes[0].data
        console.log(e.target.childNodes[0].data, 'item clicked!')
        setCurrXAxisSelection(XAxis)
    }

    function setYAxisClick(e) {
        let YAxis = e.target.childNodes[0].data
        console.log(e.target.childNodes[0].data, 'item clicked!')
        setCurrYAxisSelection(YAxis)
    }

    function setCompanyClick(e) {
        let company = e.target.childNodes[0].data
        console.log(e.target.childNodes[0].data, 'item clicked!')
        setCurrCompany(company)
    }

    if (basicFinancials.length === 0) return <LoadingSpinner />;

    return (

        <div>
            <h1>Prescriptive Analysis {basicFinancials.symbol}</h1>
            <h2> Select the tool below to see how two metrics compare for a stock</h2>
            <h3> Note: Hover to See Options</h3>
            <div style={{marginBottom: '20px'}}>
                <Space direction="vertical">
                    <Space wrap>
                        <Dropdown overlay={axisXMenu} placement="bottomLeft">
                            <Button> Select X - Axis Variable </Button>
                        </Dropdown>
                        <Dropdown overlay={axisYMenu} placement="bottomCenter">
                            <Button> Select Y - Axis Variable </Button>
                        </Dropdown>
                        <Dropdown overlay={companyMenu} placement="bottomRight">
                            <Button> Select Company Data </Button>
                        </Dropdown>
                    </Space>
                </Space>
            </div>
            {/* Main Plot */}
            <Plot data={[{x: basicFinancials.series.annual[currXAxisSelection].map(el => el.v),
                    y: basicFinancials.series.annual[currYAxisSelection].map(el => el.v),
                    mode: 'markers',
                    type: 'scatter'
                    }]}
                layout={ {width: '400px', height: '200px', title: `${currXAxisSelection} Vs ${currYAxisSelection} for ${basicFinancials.symbol}`} }
            />
        </div>
    )

}

export default PrescriptiveStats;