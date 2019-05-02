import csvparser from 'csvtojson';
import path from 'path';

const numberRange = (start, end) => {
    return new Array((end - start) + 1).fill().map((d, i) => i + start);
}

const checkRowCanBeIncludedInPopulationGrowthData = (row) => {
    for (const value of numberRange(1980, 1990)) {
        if (row[value] === undefined || !row[value]) {
            return false;
        }
    }

    return row['Indicator Name'] === 'Urban population growth (annual %)'
}

const generatePopulationGrowthData = async (populationData) => {
    let country = '';
    let averageGrowth = 0;
    for (const value of populationData) {
        let averageAccumulator = 0;
        for (const year of numberRange(1980, 1990)) {
            averageAccumulator += Number(value[year]);
        }

        if (averageGrowth <= averageAccumulator) {
            averageGrowth = averageAccumulator;
            country = value['Country Name'];
        }
    }

    averageGrowth = averageGrowth / 11; // number of countries between 1980 - 1990.
    return { country, averageGrowth: averageGrowth.toFixed(2) };
}

const getCo2EmissionData = (row, co2Emissions) => {
    for (const year of numberRange(1960, 2017)) {
        co2Emissions[`${year}`] = co2Emissions[year] !== undefined && co2Emissions[year] ? Number(co2Emissions[year]) : 0 + Number(row[year]);
    }

    return co2Emissions;
}

const generateCo2EmissionData = async (co2EmissionData) => {
    const highestEmission = co2EmissionData.reduce((a, b) => Math.max(a, b));
    const year = co2EmissionData.indexOf(highestEmission);

    return { year, highestEmission };
}

const getReportData = async () => {
    let populationGrowth = [];
    let co2Emissions = [];
    let error = '';
    try {
        const csvData = await csvparser({
            trim:true,
        }, { objectMode: true })
        .fromFile(path.resolve(__dirname, 'data.csv'))
        .on('data', (line) => {
            if (checkRowCanBeIncludedInPopulationGrowthData(line)) {
                populationGrowth.push(line);
            }
    
            if (line['Indicator Name'] === 'CO2 emissions (kt)') {
                co2Emissions = getCo2EmissionData(line, co2Emissions);
            }
        })
        .on('error', err => {error = err});

        const [populationStats, emissionStats] = await Promise.all([
            generatePopulationGrowthData(populationGrowth),
            generateCo2EmissionData(co2Emissions)
        ]);

        return [populationStats, emissionStats, error];
    } catch (err) {
        return [{}, {}, err];
    }
};

export default getReportData;