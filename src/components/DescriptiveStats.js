import React, { useState, useEffect } from 'react';
import LoadingSpinner from '../common/LoadingSpinner';
import Plot from 'react-plotly.js';
import { Menu, Dropdown, Button, Space } from 'antd';

const companySymbols = ['XOM', 'AAPL', 'MSFT', 'AMZN', 'GOOG', 'FB', 'TSLA', 'V', 'NVDA', 'JNJ']
const visualOptions = ['Bar Chart', 'Scatter Plot', 'Line Chart']

function DescriptiveStats() {
    const [basicFinancials, setBasicFinancials] = useState([])

    const [currCompany, setCurrCompany] = useState('XOM')

    const [currChart, setCurrChart] = useState('XOM')

    const [currChartType, setCurrChartType] = useState('scatter')

    const [currChartMode, setCurrChartMode] = useState('markers')

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

    let VisTypeMenu = (
        <Menu>
            {visualOptions.map(chart => 
                <Menu.Item key={chart}>
                    <li onClick={e => setChartType(e)}>
                        {chart}
                    </li>
                    {console.log(chart)}
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

    function setCompanyClick(e) {
        let company = e.target.childNodes[0].data
        console.log(e.target.childNodes[0].data, 'item clicked!')
        //bar chart
        //line chart
        //
        setCurrCompany(company)
    }

    function setChartType(e) {
        let chart = e.target.childNodes[0].data
        console.log(e.target.childNodes[0].data, 'item clicked!')
        if (chart === 'Bar Chart') {
            console.log("Bar Chart Clicked!")
            setCurrChartType('bar')
            setCurrChartMode('')
        } else if (chart === 'Scatter Plot') {
            setCurrChartType('scatter')
            setCurrChartMode('markers')
            console.log("Scatter Plot Clicked")
        } else if (chart === 'Line Chart') {
            setCurrChartType('scatter')
            setCurrChartMode('')
            console.log("Line Chart Clicked")
        }
        //bar chart
        //line chart
        //
        // setCurrChart(chart)
    }


    if (basicFinancials.length === 0) return <LoadingSpinner />;

    return (

        <div>
            <h1>Descriptive Statistics For {basicFinancials.symbol}</h1>
            <p>Note: You must click on text in dropdown to retrieve data from server</p>
            <div style={{marginBottom: '20px', marginRight: '20px'}}>
                <Space direction="vertical">
                    <Space wrap>
                        <Dropdown overlay={companyMenu} placement="bottomRight">
                            <Button> Select Company Data - Click on Text Below </Button>
                           
                        </Dropdown>
                    </Space>
                </Space>
            </div>

            <div style={{marginBottom: '20px'}}>
                <Space direction="vertical">
                    <Space wrap>
                        <Dropdown overlay={VisTypeMenu} placement="bottomRight">
                            <Button> Select Chart Type - Click on Text Below </Button>
                        </Dropdown>
                    </Space>
                </Space>
            </div>
            {/* Cash Ratio */}
            <Plot data={[{x: basicFinancials.series.annual.cashRatio.map(el => el.period),
                    y: basicFinancials.series.annual.cashRatio.map(el => el.v),
                    mode: currChartMode,
                    type: currChartType
                    }]}
                layout={ {width: '400px', height: '200px', title: `Cash Ratio for ${basicFinancials.symbol}`} }
            />
            {/* Current Ratio */}
            <Plot data={[{x: basicFinancials.series.annual.currentRatio.map(el => el.period),
                    y: basicFinancials.series.annual.currentRatio.map(el => el.v),
                    mode: currChartMode,
                    type: currChartType
                    }]}
                layout={ {width: '400px', height: '20px', title: `Current Ratio for ${basicFinancials.symbol}`} }
            />
            {/* Ebit Per Share*/}
            <Plot data={[{x: basicFinancials.series.annual.ebitPerShare.map(el => el.period),
                    y: basicFinancials.series.annual.ebitPerShare.map(el => el.v),
                    mode: currChartMode,
                    type: currChartType
                    }]}
                layout={ {width: '400px', height: '20px', title: `Ebit Per Share for ${basicFinancials.symbol}`} }
            />
            {/* EPS*/}
            <Plot data={[{x: basicFinancials.series.annual.eps.map(el => el.period),
                    y: basicFinancials.series.annual.eps.map(el => el.v),
                    mode: currChartMode,
                    type: currChartType
                    }]}
                layout={ {width: '400px', height: '20px', title: `EPS for ${basicFinancials.symbol}`} }
            />
            {/* Gross Margin */}
            <Plot data={[{x: basicFinancials.series.annual.grossMargin.map(el => el.period),
                    y: basicFinancials.series.annual.grossMargin.map(el => el.v),
                    mode: currChartMode,
                    type: currChartType
                    }]}
                layout={ {width: '400px', height: '20px', title: `Gross Margin for ${basicFinancials.symbol}`} }
            />
            {/* long-term Debt / TotalAsset */}
            <Plot data={[{x: basicFinancials.series.annual.longtermDebtTotalAsset.map(el => el.period),
                    y: basicFinancials.series.annual.longtermDebtTotalAsset.map(el => el.v),
                    mode: currChartMode,
                    type: currChartType
                    }]}
                layout={ {width: '400px', height: '20px', title: `Long Term Debt / Total Asset for ${basicFinancials.symbol}`} }
            />
            {/* long-term Debt / TotalCapital */}
            <Plot data={[{x: basicFinancials.series.annual.longtermDebtTotalCapital.map(el => el.period),
                    y: basicFinancials.series.annual.longtermDebtTotalCapital.map(el => el.v),
                    mode: currChartMode,
                    type: currChartType
                    }]}
                layout={ {width: '400px', height: '20px', title: `Long Term Debt / Total Capital for ${basicFinancials.symbol}`} }
            />
            {/* long-term Debt / TotalEquity */}
            <Plot data={[{x: basicFinancials.series.annual.longtermDebtTotalEquity.map(el => el.period),
                    y: basicFinancials.series.annual.longtermDebtTotalEquity.map(el => el.v),
                    mode: currChartMode,
                    type: currChartType
                    }]}
                layout={ {width: '400px', height: '20px', title: `Long Term Debt / Total Equity for ${basicFinancials.symbol}`} }
            />
            {/* netDebt To TotalCapital */}
            <Plot data={[{x: basicFinancials.series.annual.netDebtToTotalCapital.map(el => el.period),
                    y: basicFinancials.series.annual.netDebtToTotalCapital.map(el => el.v),
                    mode: currChartMode,
                    type: currChartType
                    }]}
                layout={ {width: '400px', height: '20px', title: `Net Debt / Total Capital for ${basicFinancials.symbol}`} }
            />
            {/* netDebt To Total Equity */}
            <Plot data={[{x: basicFinancials.series.annual.netDebtToTotalEquity.map(el => el.period),
                    y: basicFinancials.series.annual.netDebtToTotalEquity.map(el => el.v),
                    mode: currChartMode,
                    type: currChartType
                    }]}
                layout={ {width: '400px', height: '20px', title: `Net Debt / Total Equity for ${basicFinancials.symbol}`} }
            />
            {/* netMargin */}
            <Plot data={[{x: basicFinancials.series.annual.netMargin.map(el => el.period),
                    y: basicFinancials.series.annual.netMargin.map(el => el.v),
                    mode: currChartMode,
                    type: currChartType
                    }]}
                layout={ {width: '400px', height: '20px', title: `Net Margin for ${basicFinancials.symbol}`} }
            />
            {/* operating Margin */}
            <Plot data={[{x: basicFinancials.series.annual.operatingMargin.map(el => el.period),
                    y: basicFinancials.series.annual.operatingMargin.map(el => el.v),
                    mode: currChartMode,
                    type: currChartType
                    }]}
                layout={ {width: '400px', height: '20px', title: `Operating Margin for ${basicFinancials.symbol}`} }
            />
            {/* pretax Margin */}
            <Plot data={[{x: basicFinancials.series.annual.pretaxMargin.map(el => el.period),
                    y: basicFinancials.series.annual.pretaxMargin.map(el => el.v),
                    mode: currChartMode,
                    type: currChartType
                    }]}
                layout={ {width: '400px', height: '20px', title: `Pre-Tax Margin for ${basicFinancials.symbol}`} }
            />
            {/* Sales Per Share */}
            <Plot data={[{x: basicFinancials.series.annual.salesPerShare.map(el => el.period),
                    y: basicFinancials.series.annual.salesPerShare.map(el => el.v),
                    mode: currChartMode,
                    type: currChartType
                    }]}
                layout={ {width: '400px', height: '20px', title: `Sales Per Share for ${basicFinancials.symbol}`} }
            />
            {/* SGA To Sale */}
            <Plot data={[{x: basicFinancials.series.annual.sgaToSale.map(el => el.period),
                    y: basicFinancials.series.annual.sgaToSale.map(el => el.v),
                    mode: currChartMode,
                    type: currChartType
                    }]}
                layout={ {width: '400px', height: '20px', title: `SGA To Sale for ${basicFinancials.symbol}`} }
            />
            {/* Total Debt To Equity  */}
            <Plot data={[{x: basicFinancials.series.annual.totalDebtToEquity.map(el => el.period),
                    y: basicFinancials.series.annual.totalDebtToEquity.map(el => el.v),
                    mode: currChartMode,
                    type: currChartType
                    }]}
                layout={ {width: '400px', height: '20px', title: `Total Debt To Equity for ${basicFinancials.symbol}`} }
            />
            {/* Total Debt To Total Asset */}
            <Plot data={[{x: basicFinancials.series.annual.totalDebtToTotalAsset.map(el => el.period),
                    y: basicFinancials.series.annual.totalDebtToTotalAsset.map(el => el.v),
                    mode: currChartMode,
                    type: currChartType
                    }]}
                layout={ {width: '400px', height: '20px', title: `Total Debt To Total Asset for ${basicFinancials.symbol}`} }
            />
            {/* Total Debt To Total Capital */}
            <Plot data={[{x: basicFinancials.series.annual.totalDebtToTotalCapital.map(el => el.period),
                    y: basicFinancials.series.annual.totalDebtToTotalCapital.map(el => el.v),
                    mode: currChartMode,
                    type: currChartType
                    }]}
                layout={ {width: '400px', height: '20px', title: `Total Debt To Total Capital for ${basicFinancials.symbol}`} }
            />
            {/* Total Ratio */}
            <Plot data={[{x: basicFinancials.series.annual.totalRatio.map(el => el.period),
                    y: basicFinancials.series.annual.totalRatio.map(el => el.v),
                    mode: currChartMode,
                    type: currChartType
                    }]}
                layout={ {width: '400px', height: '20px', title: `Total Ratio for ${basicFinancials.symbol}`} }
            />

        </div>
    )

}

export default DescriptiveStats;