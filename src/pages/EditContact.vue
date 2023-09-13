<template>
  <div class="container mt-3">
    <div class="row">
      <div class="col">
        <p class="h3 text-primary fw-bold">Edit Contact</p>
        <p class="fst-italic">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut a tellus vitae quam viverra porta eget non risus. Suspendisse potenti. Suspendisse et erat turpis. Ut tempor, velit non aliquam tincidunt.
        </p>
      </div>
    </div>
  </div>

  <!--  Loader -->
  <div v-if="loading">
    <Loader/>
  </div>

  <!--  Error message-->
  <div v-if="!loading && errorMessage">
    <div class="container mt-3">
      <div class="row">
        <div class="col">
          <p class="h3 text-danger fw-bold text-center">
            {{errorMessage}}
          </p>
        </div>
      </div>
    </div>
  </div>

  <div class="container mt-3">
    <div class="row">
      <div class="col-md-4">
        <form @submit.prevent="">
          <div class="mb-2">
            <label class="form-label" for="name">Name <span class="text-danger">*</span> </label>
            <input
                id="name"
                v-model="contact.name"
                type="text"
                placeholder="Enter name"
                class="form-control"
                :class="{'is-invalid': hasValidationError && !contact.name}"
            />
            <div class="validation-error" v-if="hasValidationError && !contact.name">
              Please enter a valid name
            </div>
          </div>
          <div class="mb-2">
            <label class="form-label" for="phoneNumber">Phone Number <span class="text-danger">*</span> </label>
            <input
                id="phoneNumber"
                v-model="contact.phoneNumber"
                type="text"
                placeholder="Enter phone number"
                class="form-control"
                :class="{'is-invalid': hasValidationError && !contact.phoneNumber}"
            />
            <div class="validation-error" v-if="hasValidationError && !contact.phoneNumber">
              Please enter a valid phone number
            </div>
          </div>
          <div class="mb-2 ">
            <label class="form-label" >Groups <span class="text-danger">*</span> </label>
            <select
                class="form-control"
                v-model="contact.groupId"
                v-if="groups.length > 0"
                :class="{'is-invalid': hasValidationError && !contact.groupId}"
            >
              <option value="" disabled>Select Group</option>
              <option v-for="group of groups" :key="group.id" :value="group.id">{{group.name}}</option>
            </select>
            <div class="validation-error" v-if="hasValidationError && !contact.groupId">
              Please select a group
            </div>
          </div>
          <div class="mb-2">
            <label class="form-label" for="imageURL">Image URL </label>
            <input
                id="imageURL"
                v-model="contact.imageURL"
                type="text"
                placeholder="Enter image URL"
                class="form-control"
            />
          </div>
          <div class="mb-2">
            <label class="form-label" for="email">Email</label>

            <input
                id="email"
                v-model="contact.email"
                type="text"
                placeholder="Enter email address"
                class="form-control"
            />
          </div>

          <div class="my-3" >
            <input
                type="submit"
                class="btn btn-primary"
                value="Update"
                @click="updateContact"
            />
          </div>
        </form>

      </div>
      <div class="col-md-4">
        <img :src="contact.imageURL || `https://www.hotelbooqi.com/wp-content/uploads/2021/12/128-1280406_view-user-icon-png-user-circle-icon-png.png`"
             alt=""
             class="contact-img-big"
        />
      </div>
    </div>
  </div>

</template>

<script lang="ts">
import Loader from "@/components/Loader.vue";
import {contactsService} from "@/services/contacts.service";
import {groupsService} from "@/services/groups.service";

export default {
  name: 'EditContact',
  components: {Loader},
  data(){
    return {
      contactId: this.$route.params.id,
      hasValidationError: false,
      contact: {
        name: '',
        imageURL: '',
        groupId: '',
        email: '',
        phoneNumber: ''
      },
      loading: false,
      errorMessage: null,
      groups: [],
    };
  },
  async created() {
    try {
      this.loading = true;
      let response = await contactsService.getOneContact(this.contactId);
      this.contact = response.data;
      let groupsResponse = await groupsService.getAllGroups();
      this.groups = groupsResponse.data;
      this.loading = false;
    }catch (error) {
      this.errorMessage = error.message;
      this.loading = false;
    }
  },
  methods: {
    async updateContact() {
      if(!this.contact.name) {
        this.hasValidationError = true
        return;
      }
      else if(!this.contact.phoneNumber) {
        this.hasValidationError = true
        return;
      }
      else if(!this.contact.groupId) {
        this.hasValidationError = true
        return;
      }
      else this.hasValidationError = false;
      try {
        let response = await contactsService.updateContact(this.contactId, this.contact);
        return this.$router.push('/');
      } catch(error) {
        console.log(error.message);
      }
    }
  }
}
</script>

<style scoped>
.validation-error {
  color: red;
}
</style>