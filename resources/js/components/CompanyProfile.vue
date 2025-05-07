<template>
    <div>
      <h1>Company Profile: {{ symbol.toUpperCase() }}</h1>
      <div v-if="company">
        <p>Name: {{ company.name }}</p>
        <p>Industry: {{ company.industry }}</p>
      </div>
      <div v-else>
        Loading...
      </div>
    </div>
  </template>

  <script>
  import axios from 'axios';

  export default {
    props: {
      symbol: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        company: null,
        company_name: null
      };
    },
    mounted() {
      this.fetchCompany();
    },
    methods: {
      async fetchCompany() {
        // const res = await axios.get(`/api/company/${this.symbol}`);
        // this.company = res.data;
      },
    },
  };
  </script>
