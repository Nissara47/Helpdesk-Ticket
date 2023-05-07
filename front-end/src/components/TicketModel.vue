<template>
  <div>
    <div class="card mb-3">
      <div class="card-header">
        <b-icon :class="statusClass" icon="circle-fill"></b-icon
        >{{ " " + status }}
        <b-icon type="button" @click="showEditTicket" icon="pencil"></b-icon>
      </div>
      <div class="card-body">
        <h5 class="card-title">{{ title }}</h5>
        <p class="card-text">
          {{ description }}<br /><br />
          {{
            "Assign To: " +
            getFullName(contact) +
            " | Last Update: " +
            getTimeString(time)
          }}
        </p>
      </div>
    </div>
    <div v-if="editTicket">
      <EditTicket
        @close-popup="closeEditTicket"
        :id="id"
        :title="title"
        :description="description"
        :status="status"
        :contact="getFullName(contact)"
        @edit-status="editStatus"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import EditTicket from "./EditTicket.vue";

export default {
  name: "TicketModel",
  components: { EditTicket },
  props: ["id", "title", "description", "status", "contact", "time"],
  data() {
    return {
      editTicket: false,
      contactOptions: [],
    };
  },
  methods: {
    showEditTicket() {
      this.editTicket = true;
    },
    closeEditTicket(close_status) {
      this.editTicket = close_status;
    },
    editStatus(edit_status) {
      this.$emit("edit-ticket", edit_status);
    },
    getTimeString(timestamp) {
      if (timestamp !== null) {
        const date = new Date(timestamp);
        return date.toLocaleString();
      }
      return "-";
    },
    getContact() {
      axios
        .get("http://localhost:3000/api/getContact")
        .then((res) => (this.contactOptions = res.data))
        .catch((e) => console.log(e));
    },
    getFullName(contact_id) {
      const contact = this.contactOptions.find(
        (c) => c.contact_id === contact_id
      );
      if (contact) {
        return `${contact.contact_firstname} ${contact.contact_lastname}`;
      }
    },
  },
  computed: {
    statusClass() {
      return {
        "bi-circle-fill status-pending": this.status === "Pending",
        "bi-circle-fill status-accepted": this.status === "Accepted",
        "bi-circle-fill status-resolved": this.status === "Resolved",
        "bi-circle-fill status-rejected": this.status === "Rejected",
      };
    },
  },
  mounted() {
    this.getContact();
  },
};
</script>

<style scoped>
.bi-circle-fill.status-accepted {
  color: green;
}
.bi-circle-fill.status-resolved {
  color: orange;
}
.bi-circle-fill.status-pending {
  color: blue;
}
.bi-circle-fill.status-rejected {
  color: red;
}
</style>
