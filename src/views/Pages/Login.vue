<template>
  <div>

    <!-- Header -->
    <div class="header bg-gradient-success py-7 py-lg-8 pt-lg-7">
      <div class="separator separator-bottom separator-skew zindex-100">
        <svg x="0" y="0" viewBox="0 0 2560 100" preserveAspectRatio="none" version="1.1"
             xmlns="http://www.w3.org/2000/svg">
          <polygon class="fill-default" points="2560 0 2560 100 0 100"></polygon>
        </svg>
      </div>
    </div>

    <!-- Page content -->
    <b-container class="mt--8 pb-3">
      <b-alert v-if="error" show variant="danger">
        <span class="alert-icon"><i class="ni ni-bell-55"></i></span>
        <span class="alert-text"><strong>Danger!</strong> {{error}}</span>
      </b-alert>
      <!-- <b-alert show variant="danger">No haz iniciado sesión</b-alert> -->
      <b-row class="justify-content-center">
        <b-col lg="5" md="7">
          <b-card no-body class="bg-secondary border-0 mb-0">
            <b-card-header class="bg-transparent pb-3">
              <div class="text-muted text-center mt-1 mb-1"><small>Login</small></div>
            </b-card-header>

            <b-card-body class="px-lg-5 py-lg-5">
              <validation-observer v-slot="{handleSubmit}" ref="formValidator">
                <b-form role="form" @submit.prevent="handleSubmit(onSubmit)">
                  <base-input alternative
                              class="mb-3"
                              name="Email"
                              :rules="{required: true, email: true}"
                              prepend-icon="ni ni-email-83"
                              placeholder="Email"
                              v-model="model.email">
                  </base-input>

                  <base-input alternative
                              class="mb-3"
                              name="Password"
                              :rules="{required: true, min: 6}"
                              prepend-icon="ni ni-lock-circle-open"
                              type="password"
                              placeholder="Password"
                              v-model="model.password">
                  </base-input>

                  <!-- <b-form-checkbox v-model="model.rememberMe">Remember me</b-form-checkbox> -->
                  <div class="text-center">
                    <base-button type="primary" native-type="submit" class="my-2">Sign in</base-button>
                  </div>
                </b-form>
              </validation-observer>
            </b-card-body>
          </b-card>
          <b-row class="mt-3">
            <b-col cols="6">
              <router-link to="/emailreset" class="text-light"><small>Forgot password?</small></router-link>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
  const ENDPOINT_LOGIN = process.env.VUE_APP_ENDPOINT_PATH

  export default {
    data() {
      return {
        model: {
          email: '',
          password: '',
          rememberMe: false
        },
        error: ''
      }
    },
    methods: {
      onSubmit() {
        let user = this.model
        this.$http.post(ENDPOINT_LOGIN, user)
          .then(res => {
            console.log(res)
            localStorage.setItem('_token', res.data.token)
            // 'x-access-token': localStorage.getItem('_token')
            this.$http.defaults.headers.common['x-access-token'] = res.data.token
            this.$store.commit('setAuthTrue')
            this.$router.replace('dashboard')
          })
          .catch(error => {
            console.log(error);
            console.log(error.response.data.error)
            this.error = error.response.data.error
            // console.log(err.response.status)
          });
      }
    }
  };
</script>
