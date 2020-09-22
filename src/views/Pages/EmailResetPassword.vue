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
    <b-container class="mt--8 pb-8">

      <!-- Error alert -->
    <b-alert v-if="error" show variant="danger">
        <span class="alert-icon"><i class="ni ni-bell-55"></i></span>
        <span class="alert-text"><strong>Danger!</strong> {{error}}</span>
      </b-alert>

      <!-- Table -->
      <b-row class="justify-content-center">
        <b-col lg="6" md="8" >
          <b-card no-body class="bg-secondary border-0">
            <b-card-header class="bg-transparent pb-3">
              <div class="text-muted text-center mt-2 mb-2"><small>Enter Email</small></div>
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
                  <div class="text-center">
                    <b-button type="submit" variant="primary" class="mt-1">Send</b-button>
                  </div>
                </b-form>
              </validation-observer>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </b-container>

    <!--Notice modal-->
    <modal :show.sync="modals.notice"
          modal-classes="modal-success"
          modal-content-classes="bg-gradient-success">
      <h4 slot="header" class="modal-title"></h4>

      <div class="text-center">
        <h4 class="heading mb-3">CORREO ENVIADO!</h4>
        <i class="ni ni-email-83 ni-3x mb-4"></i>

        <p class="mb-2"><strong>Hemos enviado el correo de recuperacion de contraseña al siguiente direccion electronica:</strong></p>
        <p class="">{{ model.email }}</p>
        <p class="mb-0"><strong>Por favor, revisa tu correo!</strong></p>
      </div>

      <template slot="footer">
        <!-- <base-button type="white">Ok, Got it</base-button> -->
        <base-button type="link" class="text-white ml-auto" @click="modals.notice = false">Close</base-button>
      </template>

    </modal>
  </div>
</template>
<script>
import { json } from 'd3';
const ENDPOINT_EMAIL = process.env.VUE_APP_ENDPOINT_EMAIL
  export default {
    name: 'emailreset',
    data() {
      return {
        model: {
          email: ''
        },
        modals: {
          notice: false
        },
        error: ''
      }
    },
    methods: {
      onSubmit() {
        let email = this.model
        console.log(email);
        this.$http.post(ENDPOINT_EMAIL, email)
          .then(res => {
            if(res.status === 200) {
              this.error = ''
              this.modals.notice = true

            }
            console.log(res);
          })
          .catch(error => {
            this.error = error.response.data.error
            console.log(error.response.data.error);
          });
    }
    }
  };
</script>
<style></style>
