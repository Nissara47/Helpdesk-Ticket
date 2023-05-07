<template>
  <div class="modal">
    <div class="modal-content">
      <form>
        <h5 class="mb-4">Edit Ticket</h5>
        <div class="form-group mb-3">
          <label for="title">Title</label>
          <input
            type="text"
            class="form-control"
            id="title"
            required
            v-model="ticketDetail.title"
          />
        </div>
        <div class="form-group mb-3">
          <label for="title">Description</label>
          <input
            type="text"
            class="form-control"
            id="title"
            required
            v-model="ticketDetail.description"
          />
        </div>
        <div class="form-group mb-3">
          <label for="title">Status: {{ selectedStatus }}</label>
          <DropdownModel
            :toggle="'-- Select Status --'"
            :menu="statusOptions"
            @item-selected="filterSelected"
          />
        </div>
        <div class="form-group mb-4">
          <label for="title">Contact: {{ selectedContact }}</label>
          <DropdownModel
            :toggle="'-- Select Contact --'"
            :menu="contactFullNameOptions"
            @item-selected="contactSelected"
          />
        </div>
        <button type="submit" @click="updateTicket" class="btn btn-primary">
          Save
        </button>
        <button @click="closePopup" class="btn btn-secondary ms-3">
          Cancel
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import DropdownModel from "./DropdownModel.vue";

export default {
  name: "EditTicket",
  components: { DropdownModel },
  props: ["id", "title", "description", "status", "contact"],
  data() {
    return {
      ticketDetail: [],
      contactOptions: [],
      contactFullNameOptions: [],
      selectedContact: "",
      statusOptions: ["Pending", "Accepted", "Resolved", "Rejected"],
      selectedStatus: "",
    };
  },
  methods: {
    closePopup() {
      this.$emit("close-popup", false);
    },
    filterSelected(status_select) {
      this.selectedStatus = status_select;
    },
    contactSelected(contact_select) {
      this.selectedContact = contact_select;
    },
    contactFullName(select_contact) {
      const contact = this.contactOptions.find(
        (c) => c.contact_firstname + " " + c.contact_lastname === select_contact
      );
      return `${contact.contact_id}`;
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
    updateTicket() {
      axios
        .put("http://localhost:3000/api/updateTicket", {
          ticket_id: this.id,
          title: this.ticketDetail.title,
          description: this.ticketDetail.description,
          status: this.selectedStatus,
          contact_id: this.contactFullName(this.selectedContact),
        })
        .then((res) => {
          {
            if (res.status === 200) {
                alert("Edit Ticket Success!")
                this.closePopup();
                this.$emit("edit-status", 200);
            }
          }
        })
        .catch((e) => console.log(e));
    },
  },
  mounted() {
    this.ticketDetail.title = this.title;
    this.ticketDetail.description = this.description;
    this.selectedStatus = this.status;
    this.selectedContact = this.contact;
    this.getContact();
  },
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-content {
  border: none;
  background-color: rgb(165, 165, 165);
  padding: 20px;
  border-radius: 5px;
  width: 30%;
}
label {
    margin-bottom: 1%;
}
</style>
