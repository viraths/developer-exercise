import csvparser from 'csvtojson';

const getReportData = async () => {
    let populationGrowth = [];
    let co2Emissions = []; 
    const csvData = await csvparser({
        output: "csv",
        trim:true,
        // headers: ["Country Name","Country Code","Indicator Name", "Indicator Code"]
    })
    .fromFile('../../data.csv')
    .on('data', (line) => {
        if (line[2] === 'Urban population growth (annual %)') {
            populationGrowth.push(line);
            console.log('Line:', line);
        }

        if (line[2] === 'CO2 emissions (kt)') {
            co2Emissions.push(line);
        }
    });

    return [csvData, populationGrowth, co2Emissions];
};

export default getReportData;