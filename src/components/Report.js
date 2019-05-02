import React from 'react';
import { API_ENDPOINT } from '../constants';

class Report extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            populationGrowth: {
                country: '',
                averageGrowth: ''
            },
            co2Emission: {
                year: '',
                highestEmission: ''
            },
            populationGrowthData: [],
            co2EmissionData: []
        };
    }
    getReportData() {
        fetch('/report')
            .then(res => res.json())
            .then(res => {console.log(res);this.setState(res)});
    }

    componentWillMount() {
        this.getReportData();
    }

    render() {

        console.log('Population', this.state.populationGrowthData);
        console.log('Emission', this.state.co2EmissionData);
        return (
            <div>
                <h1>ABX - Developer exercis (getting there)</h1>
                <h3>The country with the higest average of "Urban population growth (annual %)" between 1980 and 1990</h3>
                <table>
                    <tbody>
                        <tr><td colSpan="2">The country with the higest average of "Urban population growth (annual %)" between 1980 and 1990</td></tr>
                        <tr>
                            <td>Country:</td>
                            <td>{this.state.populationGrowth.country}</td>
                        </tr>
                        <tr>
                            <td>Average:</td>
                            <td>{this.state.populationGrowth.averageGrowth}</td>
                        </tr>
                        <tr><td colSpan="2"></td></tr>
                        <tr><td colSpan="2">The year with the highest "CO2 emissions (kt)"</td></tr>
                        <tr>
                            <td>Country:</td>
                            <td>{this.state.co2Emission.year}</td>
                        </tr>
                        <tr>
                            <td>Average:</td>
                            <td>{this.state.co2Emission.highestEmission}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Report;
