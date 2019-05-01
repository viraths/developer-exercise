const express = require('express');
const app = express();
const port = 3000;
import getReportData from '../src/helper/csvProcessor';

const populationGrowth = {
  country: 'SriLanka',
  averageGrowth: '100'
};

const co2Emission = {
  year: '1999',
  highestEmission: '24'
};

const response = {
  populationGrowth,
  co2Emission
};

const { csvData, populationGrowthData, co2EmissionData} = async () => await getReportData();

app.use('/', express.static('./dist', {
  index: "index.html"
}));

app.get('/report', (req, res) => {
  return res.send(response);
});

app.listen(port, () => console.log(`App listening on port ${port}!`))