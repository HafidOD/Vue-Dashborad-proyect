<template>
  <div>
    <!-- Header -->
    <div class="header bg-gradient-info py-7 py-lg-6 pt-lg-9">
      <b-container>
        <div class="header-body text-center mb-9">
          <b-row class="justify-content-center">
            <b-col xl="5" lg="6" md="6" class="px-5">
              <h1 class="text-light">Ooops!</h1>
              <p class="text-lead text-white mb-4">Page not found. Don't worry though, we have plenty of other pages to explore</p>

              <router-link to="/dashboard" class="font-weight-bold text-white mt-5">Back to dashboard</router-link>
            </b-col>
          </b-row>
        </div>
      </b-container>
      <div class="separator separator-bottom separator-skew zindex-100">
        <svg x="0" y="0" viewBox="0 0 2560 100" preserveAspectRatio="none" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <polygon class="fill-default" points="2560 0 2560 100 0 100"></polygon>
        </svg>
      </div>
    </div>
    <!-- Page content -->

  </div>
</template>

<script>
export default {
  name: 'not-found',
};
</script>
