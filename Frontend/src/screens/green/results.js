import React, { useEffect } from "react";
import { View } from "react-native";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import axios from "axios";

const Results = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/results/");
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (data) {
      Highcharts.chart("container", {
        chart: {
          type: "pie",
        },
        title: {
          text: "Carbon Emissions",
        },
        series: [
          {
            name: "Emissions",
            data: [
              ["Transportation", data.transportation_emissions],
              ["Electricity", data.electricity_emissions],
              ["Diet", data.diet_emissions],
              ["Waste", data.waste_emissions],
              ["Screentime", data.screentime_emission],
            ],
          },
        ],
      });
    }
  }, [data]);

  return <View style={{ height: 500 }}>
    <div id="container"></div>
  </View>;
};

export default Results;