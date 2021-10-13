<template>
  <div>
    <Navbar />
    <div class="lg:max-w-6xl mx-auto lg:mt-20 mt-10">
      <div class="mt-5 md:mt-0 md:col-span-2">
        <form @submit="handleSubmit">
          <div
            class="overflow-hidden sm:rounded-md border shadow rounded-md p-5"
          >
            <div class="px-4 py-5 bg-white sm:p-6">
              <div class="grid grid-cols-6 gap-6">
                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="first-name"
                    class="block text-sm font-medium text-gray-700"
                    >Nama Lengkap</label
                  >
                  <input
                    type="text"
                    v-model="name"
                    placeholder="Nama Lengkap"
                    class="mt-1 p-4 border focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>

                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="last-name"
                    class="block text-sm font-medium text-gray-700"
                    >Nama Perusahaan</label
                  >
                  <input
                    type="text"
                    v-model="company"
                    placeholder="PT..."
                    class="mt-1 p-4 border focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="state"
                    class="block text-sm font-medium text-gray-700"
                    >No Telepon</label
                  >
                  <input
                    type="text"
                    v-model="phone"
                    placeholder="081 xxx xxx"
                    class="mt-1 border p-4 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="country"
                    class="block text-sm font-medium text-gray-700"
                    >Kandidat</label
                  >
                  <select
                    id="country"
                    v-model="name_candidate"
                    placeholder="Pilih"
                    class="mt-1 p-4 border block w-full px-3 border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="">Pilih Kandidat</option>
                    <option
                      v-for="(item, index) in candidate"
                      :key="index"
                      :value="item._id"
                      >{{ item.name }}</option
                    >
                  </select>
                </div>
              </div>
            </div>
            <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                type="submit"
                class="inline-flex justify-center w-full py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <svg
                  v-show="loading"
                  class="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Simpan Polling
              </button>
            </div>
          </div>
        </form>

        <!-- notif -->
        <transition
          enter-active-class="transform transition ease-in-out duration-700 sm:duration-700"
          enter-class="translate-x-full"
          enter-to-class="translate-x-0"
          leave-active-class="transform transition ease-in-out duration-700 sm:duration-700"
          leave-class="translate-x-0"
          leave-to-class="translate-x-full"
        >
          <notification
            v-show="successNotification"
            message="Berhasil! Polling baru sudah ditambahkan!"
            @close="successNotification = false"
          ></notification>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import notification from "@/components/notification";
import Navbar from "@/components/Navbar";
import { api_url } from "../config/api";
export default {
  name: "App",
  components: {
    Navbar,
    notification,
  },
  data() {
    return {
      order_statistics: null,
      loaded: false,
      candidate: [],
      successNotification: false,
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
      loading: false,
      // field
      name: "",
      company: "",
      phone: "",
      name_candidate: "",
    };
  },
  created() {
    this.getCandidat();
  },
  methods: {
    async getCandidat() {
      const response = await axios.get(`${api_url}/api/v1/get-candidate`);
      this.candidate = response.data.data;
      console.log(response);
    },

    async handleSubmit() {
      this.loading = true;
      let data = {
        name: this.name,
        company: this.company,
        phone: this.phone,
        name_candidate: this.name_candidate,
      };

      try {
        const response = await axios.post(
          `${api_url}/api/v1/polling/posts-polling`,
          data
        );
        this.successNotification = true;

        // refresh page
        window.location.reload();
        console.log(response);
        this.loading = false;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
