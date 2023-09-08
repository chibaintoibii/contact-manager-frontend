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

  <div class="container mt-3" v-if="!loading && !errorMessage">
    <div class="row">
      <div class="col-md-4">
        <form>
          <div class="mb-2">
            <input
                v-model="contact.name"
                type="text"
                placeholder="Name"
                class="form-control"

            />
          </div>
          <div class="mb-2">
            <input
                v-model="contact.imageURL"
                type="text"
                placeholder="Photo URL"
                class="form-control"
            />
          </div>
          <div class="mb-2">
            <input
                v-model="contact.email"
                type="text"
                placeholder="Email address"
                class="form-control"
            />
          </div>
          <div class="mb-2">
            <input
                v-model="contact.phoneNumber"
                type="text"
                placeholder="Phone number"
                class="form-control"
            />
          </div>
          <div class="mb-2">
            <select class="form-control" v-if="groups.length > 0" v-model="contact.groupId">
              <option value="" disabled>Select Group</option>
              <option :value="group.id" v-for="group in groups" :key="group.id">{{group.name}}</option>
            </select>
          </div>
          <div class="mb-2">
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
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHNuzc-m5DtdEyhfS6JdDYc29T0DoWHMoVog&usqp=CAU"
             alt=""
             class="contact-img"
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
    updateContact() {

    }
  }
}
</script>

<style scoped>

</style>