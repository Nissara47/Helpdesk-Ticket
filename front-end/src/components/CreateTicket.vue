<template>
  <div class="content-create-ticket">
    <TicketModel
      :title="ticketDetail.title"
      :description="ticketDetail.description"
      :status="selectedStatus"
      :contact="selectedContact"
      :time="null"
    />
    <form>
      <div class="form-group mb-2">
        <label for="input-title">Title</label>
        <input
          type="text"
          class="form-control"
          id="input-title"
          placeholder="Enter Title"
          v-model="ticketDetail.title"
          required
        />
      </div>
      <div class="form-group mb-2">
        <label for="input-description">Description</label>
        <input
          type="text"
          class="form-control"
          id="input-description"
          placeholder="Enter Description"
          v-model="ticketDetail.description"
          required
        />
      </div>
      <div class="form-group mb-2">
        <label>Status: {{ selectedStatus }}</label>
        <DropdownModel
          :toggle="'-- Select Status --'"
          :menu="statusOptions"
          @item-selected="filterSelected"
        />
      </div>
      <div class="form-group mb-2">
        <label>Assign To: {{ fullName }}</label>
        <DropdownModel
          :toggle="'-- Select Contact --'"
          :menu="contactFullNameOptions"
          @item-selected="contactSelected"
        />
        <button type="submit" class="mt-3" @click="createTicket">Submit</button>
        <button type="submit" class="mt-3 ms-3" @click="cancleCreate">
          Cancle
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import DropdownModel from "./DropdownModel.vue";
import TicketModel from "./TicketModel.vue";

export default {
  name: "CreateTicket",
  components: { DropdownModel, TicketModel },
  data() {
    return {
      ticketDetail: [],
      contactOptions: [],
      contactFullNameOptions: [],
      selectedContact: "",
      statusOptions: ["Pending", "Accepted", "Resolved", "Rejected"],
      selectedStatus: "",
      fullName: "",
    };
  },
  methods: {
    filterSelected(select_status) {
      this.selectedStatus = select_status;
    },
    contactSelected(select_contact) {
      this.fullName = select_contact;
      const contact = this.contactOptions.find(
        (c) => c.contact_firstname + " " + c.contact_lastname === select_contact
      );
      this.selectedContact = `${contact.contact_id}`;
    },
    cancleCreate() {
      this.$emit("create-status", false);
    },
    getContact() {
      axios
        .get("http://localhost:3000/api/getContact")
        .then((res) => {
          this.contactOptions = res.data;
          for (let contact of res.data) {
            this.contactFullNameOptions.push(
              contact.contact_firstname + " " + contact.contact_lastname
            );
          }
        })
        .catch((e) => console.log(e));
    },
    createTicket() {
      if (!this.selectedStatus || !this.selectedContact) {
        alert("Create ticket incomplete!");
      } else {
        axios
          .post("http://localhost:3000/api/createTicket", {
            title: this.ticketDetail.title,
            description: this.ticketDetail.description,
            status: this.selectedStatus,
            contact_id: this.selectedContact,
          })
          .then((res) => {
            console.log(res);
            if (res.status === 201) {
              alert("Create Ticket Successful!");
              this.$emit("create-status", 201);
            }
          })
          .catch((e) => console.log(e));
      }
    },
  },
  mounted() {
    this.getContact();
  },
};
</script>

<style scoped>
.content-create-ticket {
  width: 30%;
}
button {
  border: none;
  border-radius: 6px;
  padding: 2%;
}
label {
  margin-bottom: 1%;
}
</style>
