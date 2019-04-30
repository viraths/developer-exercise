import csvparser from 'csvtojson';

const getReportData = async () => {
    const csvData = await csvparser({
        output: "csv",
        trim:true,
        // headers: ["Country Name","Country Code","Indicator Name", "Indicator Code"]
    }).fromFile('../../data.csv');
};