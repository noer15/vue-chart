<template>
  <div>
    <Navbar />
    <div class="lg:max-w-6xl mx-auto lg:mt-20 mt-10">
      <section class="py-1 bg-blueGray-50">
        <div class="w-full mb-12 xl:mb-0 mx-auto">
          <div
            class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded "
          >
            <div class="rounded-t mb-0 px-4 py-3 border-0">
              <div class="flex flex-wrap items-center">
                <div class="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 class="font-semibold text-base text-blueGray-700">
                    Data Polling - {{ count }}
                  </h3>
                </div>
                <div
                  class="relative w-full px-4 max-w-full flex-grow flex-1 text-right"
                >
                  <button
                    class="bg-indigo-500 p-3 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    @click="handleBackup"
                  >
                    Backup
                  </button>
                </div>
              </div>
            </div>

            <div class="block w-full overflow-x-auto">
              <table
                class="items-center bg-transparent w-full border-collapse "
              >
                <thead>
                  <tr class="bg-gray-100">
                    <th
                      class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                    >
                      Nama Lengkap
                    </th>
                    <th
                      class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                    >
                      No Telepon
                    </th>
                    <th
                      class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                    >
                      Perusahaan
                    </th>
                    <th
                      class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                    >
                      Kandidat
                    </th>
                    <th
                      class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                    >
                      Tanggal Polling
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <tr v-for="(item, index) in dataPolling" :key="index">
                    <td
                      class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 "
                    >
                      {{ item.name }}
                    </td>
                    <td
                      class="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                    >
                      {{ item.phone }}
                    </td>
                    <td
                      class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 "
                    >
                      {{ item.company }}
                    </td>
                    <td
                      class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 "
                    >
                      {{ item.candidate[0].name }}
                    </td>
                    <td
                      class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                    >
                      <i class="fas fa-arrow-up text-emerald-500 mr-4"></i>
                      {{ formatDate(item.createdAt) }}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div v-show="loading" class="animate-pulse w-full p-4">
                <div class="h-8 w-full bg-gray-200 mt-3 mb-6 rounded"></div>
                <div class="h-8 w-full bg-gray-300 mb-6 rounded"></div>
                <div class="h-8 w-full bg-gray-200 mb-6 rounded"></div>
                <div class="h-8 w-full bg-gray-300 mb-6 rounded"></div>
                <div class="h-8 w-full bg-gray-200 mb-6 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import { api_url } from "../config/api";
import axios from "axios";
export default {
  name: "Hasil",
  components: {
    Navbar,
  },
  data() {
    return {
      dataPolling: [],
      count: 0,
      loading: false,
    };
  },
  created() {
    this.getDataList();
  },
  methods: {
    async getDataList() {
      this.loading = true;
      try {
        const response = await axios.get(
          `${api_url}/api/v1/polling/get-data-polling`
        );
        this.dataPolling = response.data.data;
        this.count = response.data.data.length;
        this.loading = false;
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },
    async handleBackup() {
      try {
        const response = await axios.get(
          `${api_url}/api/v1/polling/backup-polling`
        );
        console.log(response);

        const fileDownload = require("js-file-download");
        return fileDownload(response.data, "backup-polling.csv");
      } catch (error) {
        console.log(error);
      }
    },
    formatDate(value) {
      let options = {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      };
      let date = new Date(value).toLocaleString("id-ID", options);
      return date;
    },
  },
};
</script>
