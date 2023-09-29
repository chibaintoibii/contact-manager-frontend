<template>
  <section class="vh-100 gradient-custom">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12 col-md-8 col-lg-6 col-xl-5">
          <div class="card" style="border-radius: 1rem;">
            <div class="card-body p-5">
              <div class="mb-md-5 mt-md-4 pb-5">

                <h2 class="fw-bold mb-2 text-center">Login</h2>

                <div class="form-outline form-white mb-4">
                  <label class="form-label h5" for="email">Email <span class="text-danger">*</span></label>
                  <input
                      type="email"
                      id="email"
                      class="form-control form-control-lg"
                      :class="{'is-invalid': this.invalidEmailMessage.length > 0}"
                      placeholder="Enter your email address"
                      v-model="email"
                  />
                  <div class="invalid-feedback">
                    {{ this.invalidEmailMessage }}
                  </div>
                </div>

                <div class="form-outline form-white mb-3 position-relative">
                  <label class="form-label h5" for="password">Password <span class="text-danger">*</span></label>
                  <input
                      :type="passwordFieldType"
                      id="password"
                      :class="{'is-invalid': invalidPasswordMessage.length > 0}"
                      class="form-control form-control-lg"
                      placeholder="Enter your password"
                      v-model="password"
                  />
                  <span class="position-absolute top-50 end-0 p-1 px-2">
                    <i @click="changeVisibilityPassword" style="cursor: pointer;" :class="{'fas fa-eye-slash': !hiddenPassword, 'fas fa-eye': hiddenPassword}"></i>
                  </span>
                </div>
                <div class="invalid-feedback">
                  {{ invalidPasswordMessage }}
                </div>
                <div v-if="apiError" class="text-danger h5">{{apiError}}</div>
                <button @click="login" class="btn btn-primary btn-lg px-5 w-100" type="submit">SIGN IN</button>
              </div>
              <div>
                <p class="">Don't have an account? <router-link to="/auth/register" class="fw-bold text-decoration-none">Sign Up</router-link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import authService from "@/services/auth.service";
import {IUser} from "@/interfaces/IUser";

export default {
  data() {
    return {
      hiddenPassword: true,
      passwordFieldType: 'password',
      email: '',
      password: '',
      invalidEmailMessage: '',
      invalidPasswordMessage: '',
      apiError: null
    }
  },
  watch: {
    apiError() {
        setTimeout(() => {
          this.apiError = null;
        }, 5000);
    },
    email(value: string) {
      if(value.length < 6 || value.length > 30) {
        this.invalidEmailMessage = 'Email must be between 6 and 30 characters';
      }
      else {
        this.invalidEmailMessage = '';
      }
    },
    password(value: string) {
      if(value.length < 6 || value.length > 30) {
        this.invalidPasswordMessage = 'Password must be between 6 and 30 characters';
      }
      else {
        this.invalidPasswordMessage = '';
      }
    },
  },
  methods: {
    changeVisibilityPassword() {
      this.hiddenPassword = !this.hiddenPassword;
      this.passwordFieldType = (this.passwordFieldType == 'password') ? 'text' : 'password';
    },
    async login() {
      if(this.email.length < 6 || this.email.length > 30) {
        this.invalidEmailMessage = 'Email must be between 6 and 30 characters';
      }
      else {
        this.invalidEmailMessage = '';
      }
      if(this.password.length < 6 || this.password.length > 30) {
        this.invalidPasswordMessage = 'Password must be between 6 and 30 characters';
      }
      else {
        this.invalidPasswordMessage = '';
      }
      if(this.invalidEmailMessage.length > 0 || this.invalidPasswordMessage.length > 0) {
        return;
      }
      try {
        let user: IUser = {
          email: this.email,
          password: this.password
        }
        console.log('user from dsgsdgds');
        let response = await authService.login(user);
        console.log(response.data);
        const token = response.data.accessToken;
        localStorage.setItem('token', `${token}`);
        this.$router.push('/contacts', {replace: true});
      } catch (e) {
        console.log(e);
        // this.apiError = e?.response?.data?.message;
      }
    }
  }
}
</script>

<style scoped>

</style>