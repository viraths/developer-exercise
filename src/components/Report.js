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
                <div className="row-fluid">
                    <div className="span3 tiny ">
                        <div className="pricing-table-header-tiny">
                            <h2>The country with the higest average of "Urban population growth (annual %)" between 1980 and 1990</h2>
                        </div>
                        <div className="pricing-table-features">
                            <p>Country: <strong>{this.state.populationGrowth.country}</strong></p>
                            <p>Average: <strong>{this.state.populationGrowth.averageGrowth}</strong></p>
                        </div>
                    </div>
                    <div className="span3 small">
                        <div className="pricing-table-header-small">
                            <h2>The year with the highest "CO2 emissions (kt)"</h2>
                        </div>
                        <div className="pricing-table-features">
                            <p>Year: <strong>{this.state.co2Emission.year}</strong></p>
                            <p>Emission (kt): <strong>{this.state.co2Emission.highestEmission}</strong></p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Report;
