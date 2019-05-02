# ABX Developer Exercise

## Instructions

1. Fork the repository.
2. Create a script or application that generates outputs to the following from data.csv:

	2a. The country with the highest average "Urban population growth (annual %)" between 1980 and 1990. Exclude countries where any data entry for this time range is missing.

	2b. The year with the highest "CO2 emissions (kt)", averaged across each country for which data is available.
3. Display the results to the user, however you choose to do so.
4. Create a pull request with your solution.

Note: There is no right or wrong way to achieve this. Please provide instructions on how to run your solution. Please use Docker where appropriate for access to dependencies (Databases, runtimes etc).

If you'd prefer not have this repo public on your Github, feel free to clone it into a private repo with your provider of choice. Give alex.revell@abx.com view permissions when you are complete.


## Solution

### How to run locally

Step I - Setup the repo locally and install docker
* git clone https://github.com/viraths/developer-exercise.git
* Please follow [this gudie](https://docs.docker.com/install/) to install docker. (Ignore if you have docker installed already).

Step II - Run the application

```
cd path/to/repository
docker build . --no-cache -t abx_developer_exercise:latest

docker run -d -p 3000:3000 --name abx_developer_exercise abx_developer_exercise:latest
```

Visit [this page](http://localhost:3000/) to see the solution
