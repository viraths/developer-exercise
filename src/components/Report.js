import React from 'react';

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
            error: ''
        };
    }
    getReportData() {
        fetch('/report')
            .then(res => res.json())
            .then(res => this.setState(res));
    }

    componentWillMount() {
        this.getReportData();
    }

    render() {
        const title = <h1>ABX - Developer Exercise</h1>;
        if (this.state.error) {
            return (
                <div>
                    {title}
                    <h3>Unexpected Error, Please try again later</h3>
                </div>
            );
        }
        return (
            <div>
                {title}
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
