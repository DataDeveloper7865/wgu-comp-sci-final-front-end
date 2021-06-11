import React from 'react';
import { GithubOutlined } from '@ant-design/icons';

function Home() {


    return (
        <div class="body-content">
           <div>
                <h1>S&P 500 Stock Analyzer</h1>
            </div>
            

            <p style={{marginTop: '25px'}}>
                Please view the tab above to view descriptive statics about the app.
            </p>
            <p style={{marginTop: '25px'}}>
                Please view the tab above to view prescriptive statics about the app.
            </p>
            <p style={{marginTop: '25px'}}>
                Please click on the github link on the left to view the front-end source code.
            </p>
            <p style={{marginTop: '25px'}}>
                Please click on the github link on the right to view the front-end source code.
            </p>

            <div>
                <a href="https://github.com/DataDeveloper7865/wgu-comp-sci-final-front-end" >
                    <GithubOutlined style={{marginRight: '50px', fontSize: '200%', color: 'black'}}/>
                </a>
                <a href="https://github.com/DataDeveloper7865/wgu-comp-sci-final-back-end" >
                    <GithubOutlined style={{marginRight: '50px', fontSize: '200%', color: 'black'}}/>
                </a>
            </div>
        </div>
    ) 
}

export default Home;