import express from 'express';
import getReportData from '../helpers/csvProcessor';
const app = express();
const port = 3000;

app.use('/', express.static('./dist', {
  index: "index.html"
}));

app.get('/report', async (req, res) => {
  const [populationGrowthData, co2EmissionData, error] = await getReportData();
  const response = {
    populationGrowth: populationGrowthData,
    co2Emission: co2EmissionData,
    error,
  };
  return res.send(response);
});

app.listen(port, () => console.log(`App listening on port ${port}!`))