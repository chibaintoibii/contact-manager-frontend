<template>
  <section class="vh-100">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12 col-md-8 col-lg-6 col-xl-5">
          <div class="card" style="border-radius: 1rem;">
            <div class="card-body p-5">

              <div class="mb-md-5 mt-md-4 pb-5">

                <h2 class="fw-bold mb-2 text-center">Create an account</h2>

                <div class="form-outline form-white mb-4">
                  <label
                    class="form-label h5"
                    for="email">Email <span class="text-danger">*</span>
                  </label>
                  <input
                      type="email"
                      id="email"
                      class="form-control form-control-lg"
                      :class="{'is-invalid': this.invalidEmailMessage.length > 0}"
                      v-model="email"
                  />
                </div>
                <div class="invalid-feedback">
                  {{ this.invalidEmailMessage }}
                </div>
                <div class="form-outline form-white mb-4 position-relative">
                  <label class="form-label h5" for="password">Password <span class="text-danger">*</span></label>
                  <input
                      :type="passwordFieldType"
                      id="password"
                      class="form-control form-control-lg"
                      :class="{'is-invalid': invalidPasswordMessage.length > 0}"
                      v-model="password"
                  />
                  <span
                      class="position-absolute top-50 end-0 p-1 px-2 pe-auto">
                    <i @click="changeVisibilityPassword" style="cursor: pointer;" :class="{'fas fa-eye-slash': !hiddenPassword, 'fas fa-eye': hiddenPassword}"></i>
                  </span>
                </div>
                <div class="invalid-feedback">
                  {{ invalidPasswordMessage }}
                </div>
                <div class="form-outline form-white mb-2 position-relative">
                  <label class="form-label h5" for="password">Confirm your password <span class="text-danger">*</span></label>
                  <input
                      :type="confirmationPasswordFieldType"
                      id="password"
                      class="form-control form-control-lg"
                      :class="{'is-invalid': missMatchError}"
                      v-model="passwordConfirmation"
                  />
                  <span
                      class="position-absolute top-50 end-0 p-1 px-2 pe-auto">
                    <i @click="changeVisibilityRepeatablePassword" style="cursor: pointer;" :class="{'fas fa-eye-slash': !hiddenRepeatablePassword, 'fas fa-eye': hiddenRepeatablePassword}"></i>
                  </span>
                </div>
                <div v-if="missMatchError" class="text-danger mb-4">Password mismatch</div>
                <button @click="register" class="btn btn-primary btn-lg px-5 w-100 mt-4" type="submit">REGISTER</button>
              </div>
              <div>
                <p class="">Have already an account? <router-link to="/auth/login" class="fw-bold text-decoration-none">Login here</router-link></p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import {IUser} from "@/interfaces/IUser";
import authService from "@/services/auth.service";
export default {
  data() {
    return {
      hiddenPassword: true,
      hiddenRepeatablePassword: true,
      passwordFieldType: 'password',
      confirmationPasswordFieldType: 'password',
      email: '',
      password: '',
      passwordConfirmation: '',
      missMatchError: false,
      invalidEmailMessage: '',
      invalidPasswordMessage: ''
    }
  },
  watch: {
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
    changeVisibilityRepeatablePassword() {
      this.hiddenRepeatablePassword =!this.hiddenRepeatablePassword;
      this.confirmationPasswordFieldType = (this.confirmationPasswordFieldType == 'password' ? 'text' : "password");
    },
    async register() {
      this.missMatchError = this.password !== this.passwordConfirmation;
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
        if(this.missMatchError) {
          return;
        }
        let user: IUser = {
          email: this.email,
          password: this.password
        }
        let response = await authService.register(user);
        const token = response.data.accessToken;
        localStorage.setItem('token', `${token}`);
        this.$router.push('/contacts', {replace: true});
        console.log(response.data);
      } catch (e) {

      }
    }
  }
}
</script>

<style scoped>

</style>