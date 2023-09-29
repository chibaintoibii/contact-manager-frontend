<template>
  <div class="container mt-3">
    <div class="row">
      <div class="col">
        <p class="h3 text-primary fw-bold">Add Contact</p>
        <p class="fst-italic">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ultricies ut mi quis porttitor. Duis interdum venenatis dictum. Etiam quis.</p>
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
<!--            <pre>{{groups}}</pre>-->
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
                value="Create"
                @click="addContact"
            />
          </div>
        </form>

      </div>
      <div class="col-md-4">
        <img :src="contact.imageURL"
             alt=""
             class="contact-img-big"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {groupsService} from "@/services/groups.service";
import {contactsService} from "@/services/contacts.service";

export default {
  name: 'AddContact',
  data() {
    return {
      loading: false,
      errorMessage: '',
      hasValidationError: false,
      contact: {
        name: '',
        imageURL: '',
        email: '',
        groupId: '',
        phoneNumber: '',
      },
      groups: []
    };
  },
  async created() {
    try {
      this.loading = true;
      let response = await groupsService.getAllGroups();
      this.groups = response.data;
      this.loading = false;
    } catch (e) {
      this.errorMessage = e.message;
      this.loading = false;
    }
  },
  methods: {
    async addContact() {
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
        let response = await contactsService.createContact(this.contact);
        if(response) {
          return this.$router.push('/contacts', {replace: true});
        }
        else {
          return this.$router.push('/contacts/add', {replace: true});
        }
      } catch (e) {
        console.log("error in add contact", e);
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