<template>
  <div>
    <Navbar />
    <div class="lg:max-w-6xl mx-auto lg:mt-20 mt-10">
      <div class="my-4 text-gray-700 font-semibold text-xl">Grafik Polling</div>
      <div v-show="loading" class="animate-pulse w-full">
        <div class="h-44 bg-gray-200"></div>
      </div>
      <bar-chart
        v-if="loaded"
        :chartData="polling_statistic"
        :options="options"
      />
    </div>
  </div>
</template>

<script>
import BarChart from "@/components/BarChart.vue";
import Navbar from "@/components/Navbar";
import { api_url } from "../config/api";
import axios from "axios";
export default {
  name: "Bar",
  components: {
    BarChart,
    Navbar,
  },
  data() {
    return {
      order_statistics: null,
      loaded: false,
      loading: false,
      candidate: [],
      polling_statistic: null,
      start_date: "",
      end_date: "",
      //
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
              gridLines: {
                display: true,
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                display: false,
              },
            },
          ],
        },
        legend: {
          display: true,
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  mounted() {
    this.totalAdminTransactions();
  },
  methods: {
    async totalAdminTransactions() {
      this.loaded = false;
      this.loading = true;
      let now = new Date();
      let firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
      let lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      let start_date = this.formatDate(firstDay);
      let end_date = this.formatDate(lastDay);

      let query_params = {
        start_date: start_date,
        end_date: end_date,
      };

      try {
        const response = await axios.get(
          `${api_url}/api/v1/polling/get-polling`,
          { params: query_params }
        );
        console.log("hasil", response);
        this.polling_statistic = {
          labels: response.data.data.map((item) => item.pengguna),
          datasets: [
            {
              label: "Total Polling Kandidat",
              borderWidth: 1,
              borderColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
              ],
              backgroundColor: [
                "rgba(255,99,132,1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
              ],
              pointBorderColor: "#2554FF",
              data: response.data.data.map((item) => item.total),
            },
          ],
        };
        this.loaded = true;
        this.loading = false;
      } catch (error) {
        console.log(error);
      }
    },
    formatDate(date) {
      var d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [year, month, day].join("-");
    },
  },
};
</script>
