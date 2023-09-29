<template>
  <Navbar/>
  <div class="container mt-3">
    <div class="row">
      <div class="col-md-5">
        <p class="h3 fw-bold">
          <span class="me-4 text-primary">Contacts List </span>
          <router-link to="/contacts/add" class="btn btn-primary text-sm"><i class="fa fa-plus"></i> New</router-link>
        </p>
      </div>
      <div class="col-md-4">
        <form>
          <div class="row">
            <div class="col-8">
              <input type="text" placeholder="Enter name" class="form-control"/>
            </div>
            <div class="col-4">
              <button class="btn btn-primary text-light"><i class="fas fa-magnifying-glass"></i> Search</button>
            </div>
          </div>
        </form>
      </div>

      <div class="col-md-3">
        <div class="dropdown">
          <button class="btn btn-success dropdown-toggle w-50" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="fa fa-filter"></i> Filter
          </button>
          <ul class="dropdown-menu">
            <li>
              <router-link to="/" class="dropdown-item active">All Contacts</router-link>
            </li> <li><hr class="dropdown-divider"></li>
            <li v-for="group in groups" :key="group.id">
              <router-link to="/" class="dropdown-item" >{{group.name}}</router-link>
            </li>
          </ul>
        </div>

      </div>
    </div>
  </div>

<!--  Loader -->
  <div v-if="loading" class="mt-4">
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


  <div class="container my-3">
    <div class="row">
      <div class="col-md-6" v-for="contact in contacts" :key="contact.id">
        <div class="card my-2 shadow-lg list-group-item-light bg-white" >
          <div class="card-body">
            <div class="row align-items-center">
              <div class="col-sm-4">
                <img
                    :src="contact.imageURL || `https://www.hotelbooqi.com/wp-content/uploads/2021/12/128-1280406_view-user-icon-png-user-circle-icon-png.png`"
                    alt=""
                    class="contact-img"
                >
              </div>
              <div class="col-sm-7">
                <ul class="list-group bg-primary-subtle">
                  <li class="list-group-item bg-success-subtle text-dark">Name: <span class="fw-bold">{{ contact.name }}</span></li>
                  <li class="list-group-item bg-success-subtle text-dark">Email: <span class="fw-bold">{{ contact.email }}</span></li>
                  <li class="list-group-item bg-success-subtle text-dark">Phone Number: <span class="fw-bold">{{ contact.phoneNumber }}</span></li>
                </ul>
              </div>
              <div class="col-sm-1 d-flex flex-column justify-content-center align-items-center">
                <router-link :to="`/contacts/view/${contact.id}`" class="btn btn-success text-light my-1">
                  <i class="fas fa-eye"></i>
                </router-link>
                <router-link :to="`/contacts/edit/${contact.id}`" class="btn btn-primary my-1">
                  <i class="fas fa-pen"></i>
                </router-link>
                <button class="btn btn-danger my-1" @click="deleteContact(contact.id)">
                  <i class="fas fa-trash-alt"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import {contactsService} from "@/services/contacts.service";
import Loader from "@/components/Loader.vue";
import {groupsService} from "@/services/groups.service";
import Navbar from "@/App.vue";


export default {
  name: 'ContactsList',
  components: {Navbar, Loader},
  data: () => {
    return {
      loading: false,
      contacts: [],
      errorMessage: null,
      groups: [],
    }
  },
  // async mounted() {
  //   try {
  //     let res = await contactsService.getAllContacts();
  //     console.log("response", res);
  //   } catch (e) {
  //     console.log("error", e);
  //   }
  //
  // },
  async created() {
    try {
      this.loading = true;
      let response = await contactsService.getAllContacts();
      this.contacts = response.data;
      response = await groupsService.getAllGroups();
      this.groups = response.data;
      this.loading = false;
    } catch (e) {
      console.error(e);
      this.errorMessage = e.message;
      this.loading = false;
    }
  },
  methods: {
    async deleteContact(contactId: number) {
      try {
        let response = await contactsService.deleteContact(contactId);
        if(response) {
          window.location.reload();
        }
        console.log(response);
      } catch(e) {
        console.log(e);
      }
    }
  }
}
</script>

<style scoped>
.active {
  background-color: #198754 !important;
}
</style>