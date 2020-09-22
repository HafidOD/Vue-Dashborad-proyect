<template>
  <div>
    <!-- Header -->
    <div class="header bg-gradient-primary py-7 py-lg-8 pt-lg-7">
      <div class="separator separator-bottom separator-skew zindex-100">
        <svg x="0" y="0" viewBox="0 0 2560 100" preserveAspectRatio="none" version="1.1"
             xmlns="http://www.w3.org/2000/svg">
          <polygon class="fill-default" points="2560 0 2560 100 0 100"></polygon>
        </svg>
      </div>
    </div>

    <!--Notice modal-->
    <modal :show.sync="modals.notice"
          modal-classes="modal-success"
          modal-content-classes="bg-gradient-success">
      <h4 slot="header" class="modal-title"></h4>

      <div class="text-center">
        <h4 class="heading mb-3">LA CONTRASEÑA SE HA ACTUALIZADO!</h4>
        <i class="ni ni-satisfied ni-3x mb-4"></i>

        <p class="mb-2"><strong>La contraseña ha sido actualizada, ya puedes iniciar sesión</strong></p>
      </div>

      <template slot="footer">
        <!-- <base-button type="white">Ok, Got it</base-button> -->
        <base-button type="link" class="ml-auto" @click="modals.notice = false" >
          <router-link class="text-white" to="/login" replace>Ok, Go to login</router-link>
        </base-button>
      </template>

    </modal>

    <!-- Page content -->
    <b-container class="mt--8 pb-5">
      <!-- Table -->
      <b-row class="justify-content-center">
        <b-col lg="6" md="8" >
          <b-card no-body class="bg-secondary border-0">
            <b-card-header class="bg-transparent pb-3">
              <div class="text-muted text-center mt-2 mb-2"><small>Enter new password</small></div>
            </b-card-header>

            <b-card-body class="px-lg-5 py-lg-5">
              <validation-observer v-slot="{handleSubmit}" ref="formValidator">
                <b-form role="form" @submit.prevent="handleSubmit(onSubmit)">

                  <base-input alternative
                              class="mb-3"
                              prepend-icon="ni ni-lock-circle-open"
                              placeholder="Password"
                              type="password"
                              name="password"
                              :rules="{required: true, min: 6}"
                              v-model="model.password">
                  </base-input>

                  <base-input alternative
                              class="mb-3"
                              prepend-icon="ni ni-lock-circle-open"
                              placeholder="Confirm Password"
                              type="password"
                              name="confirmPassword"
                              :rules="{required: true, min: 6}"
                              v-model="model.confirmPassword">
                  </base-input>
                  <!-- <div class="text-muted font-italic"><small>password strength: <span
                    class="text-success font-weight-700">strong</span></small></div> -->

                  <div class="text-center">
                    <b-button type="submit" variant="primary" class="mt-3">Save</b-button>
                  </div>
                </b-form>
              </validation-observer>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
const ENDPOINT_RECOVER_PASSWORD = process.env.VUE_APP_ENDPOINT_RECOVER_PASSWORD
  export default {
    name: 'resetpassword',
    created() {
      this.tokenQuery = this.$route.query.token
      // console.log(this.$route.query.token);
    },
    data() {
      return {
        model: {
          password: '',
          confirmPassword: ''
        },modals: {
          notice: false
        },
        tokenQuery: '',
        error: ''
      }
    },
    methods: {
      onSubmit() {
        if(this.model.password === this.model.confirmPassword && this.tokenQuery){
          let newPassword = { password: this.model.password }
          this.error = ''
                this.modals.notice = true
          this.$http.post(ENDPOINT_RECOVER_PASSWORD, newPassword,{
            headers: {
            'password-token': this.tokenQuery
          }
                    })
            .then(res => {
              if(res.status == 200){
                this.error = ''
                this.modals.notice = true
              }
            })
            .catch(error =>{
              console.error(error);
            })
          // alert("son iguales")
        } else {
          alert("contraseñas no coinciden")
        }
        console.log(this.model);
      }
    }

  };
</script>
<style></style>
