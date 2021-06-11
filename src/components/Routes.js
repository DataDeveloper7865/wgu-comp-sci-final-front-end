import React from 'react';
import { Route, Switch } from 'react-router';
import PrescriptiveStats from './PrescriptiveStats';
import About from './About';
import DescriptiveStats from './DescriptiveStats';
import Home from './Home';

function Routes() {

    return (
            <Switch>
                <Route path="/About">
                    <About />
                </Route>
                <Route path="/Descriptive-Statistics">
                    <DescriptiveStats />
                </Route>
                <Route path="/Prescriptive-Statistics">
                    <PrescriptiveStats />
                </Route>
                <Route path="/">
                    <Home />
                </Route>
            </Switch>
    )

}

export default Routes;