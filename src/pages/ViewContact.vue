<template>
  <div class="container mt-3">
    <div class="row">
      <div class="col">
        <p class="h3 text-primary fw-bold">View Contact</p>
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

  <div class="container" v-if="!errorMessage && !loading">
    <div class="row align-items-center justify-content-center">
      <div class="col-md-3">
        <img
            :src="contact.imageURL || `https://www.hotelbooqi.com/wp-content/uploads/2021/12/128-1280406_view-user-icon-png-user-circle-icon-png.png`"
            alt=""
            class="contact-img-big"
        />
      </div>
      <div class="col-md-6">
        <ul class="list-group">
          <li class="list-group-item">Name: <span class="fw-bold">{{contact.name}}</span></li>
          <li class="list-group-item">Phone Number: <span class="fw-bold">{{contact.phoneNumber}}</span></li>
          <li class="list-group-item">Email: <span class="fw-bold">{{contact.email}}</span></li>
          <li class="list-group-item">Group: <span class="fw-bold">{{group.name}}</span></li>
        </ul>
      </div>
    </div>
    <div class="row mt-4">
      <div class="col">
        <router-link to="/" class="btn btn-primary"><i class="fa fa-arrow-alt-circle-left"></i> Back</router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {contactsService} from "@/services/contacts.service";
import Loader from "@/components/Loader.vue";
import {groupsService} from "@/services/groups.service";

export default {
  name: 'ViewContact',
  components: {Loader},
  data() {
    return {
      contactId: this.$route.params.id,
      loading: false,
      errorMessage: null,
      contact: {
        name: '',
        imageURL: '',
        groupId: '',
        email: '',
        phoneNumber: ''
      },
      group: {
        name: ''
      }
    };
  },
  async created() {
    try {
      this.loading = true;
      let response = await contactsService.getOneContact(this.contactId);
      this.contact = response.data;
      let groupResponse = await groupsService.getOneGroup(response.data.groupId);
      this.group = groupResponse.data;

      this.loading = false;
    } catch (e) {
      console.log(e);
      this.errorMessage = e.message;
      this.loading = false;
    }
  }
}
</script>

<style scoped>

</style>