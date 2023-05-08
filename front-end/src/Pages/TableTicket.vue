<template>
  <div>
    <!-- header Page -->
    <h1 class="text-center mt-5 mb-5">Helpdesk Ticket</h1>

    <!-- filter dropdown, clear filter, show create ticket -->
    <div class="content-filter mb-5">
      <div class="content-dropdown mx-3">
        <DropdownModel
          :toggle="'-- Select Filter --'"
          :menu="filterOptions"
          @item-selected="filterSelected"
          class="mb-2"
        ></DropdownModel>
        <DropdownModel
          v-if="show_status_filter"
          :toggle="'-- Filter Status --'"
          :menu="statusOptions"
          @item-selected="filterStatuSelected"
          class="mb-2"
        ></DropdownModel>
        <div class="text-filter mt-3">
          <h6>
            Filter: {{ selectedFilter }}<br /><br />Filter Status:
            {{ selectedFilter_status }}
          </h6>
        </div>
      </div>
      <button class="mx-3" @click="clearFilter">Clear Filter</button>
      <button @click="show_create_ticket = true">Create Ticket</button>
    </div>

    <!-- create ticket -->
    <div class="content-create mb-5" v-if="show_create_ticket">
      <CreateTicket @create-status="createStatus"></CreateTicket>
    </div>

    <!-- show all ticket -->
    <div class="content-ticket mb-5">
      <div v-for="(ticket, index) in listTickets" :key="index">
        <TicketModel
          :id="ticket.ticket_id"
          :title="ticket.title"
          :description="ticket.description"
          :status="ticket.status"
          :contact="ticket.contact_id"
          :time="ticket.timestamp_modified"
          @edit-ticket="editTicket"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import CreateTicket from "@/components/CreateTicket.vue";
import TicketModel from "@/components/TicketModel.vue";
import DropdownModel from "@/components/DropdownModel.vue";

export default {
  name: "TableTicket",
  components: { CreateTicket, TicketModel, DropdownModel },
  data() {
    return {
      filterOptions: ["Last Update", "By Status", "Sort Status"],
      statusOptions: ["Pending", "Accepted", "Resolved", "Rejected"],
      listTickets: [],
      show_status_filter: false,
      show_create_ticket: false,
      selectedFilter: "",
      selectedFilter_status: "",
      selectedItem: "Test Dropdown",
    };
  },
  methods: {
    //methods for emit
    filterSelected(select_filter) {
      this.selectedFilter = select_filter;
    },
    filterStatuSelected(select_filter_status) {
      this.selectedFilter_status = select_filter_status;
    },
    clearFilter() {
      this.getTicket();
    },
    createStatus(status) {
      if (status === 201) {
        this.show_create_ticket = false;
        this.getTicket();
      } else if (status === false) {
        this.show_create_ticket = status;
      }
    },
    editTicket(edit_ticket) {
      if (edit_ticket === 200) {
        this.getTicket();
      }
    },
    //get data from API
    getTicket() {
      axios
        .get("http://localhost:3000/api/getTicket")
        .then((res) => {
          this.listTickets = res.data;
        })
        .catch((e) => console.log(e));
      this.show_status_filter = false;
      (this.selectedFilter = ""), (this.selectedFilter_status = "");
    },
    getLastUpdate() {
      axios
        .get("http://localhost:3000/api/ticketLastUpdate")
        .then((res) => {
          this.listTickets = res.data;
        })
        .catch((e) => console.log(e));
    },
    getTicketByStatus() {
      axios
        .get("http://localhost:3000/api/filterTicketByStatus", {
          params: { status: this.selectedFilter_status },
        })
        .then((res) => (this.listTickets = res.data))
        .catch((e) => console.log(e));
    },
    getSortByStatus() {
      axios
        .get("http://localhost:3000/api/ticketSortByStatus")
        .then((res) => {
          console.log(res.data);
          this.listTickets = res.data;
        })
        .catch((e) => console.log(e));
    },
  },
  mounted() {
    this.getTicket();
  },
  watch: {
    selectedFilter() {
      this.show_status_filter = false;
      if (this.selectedFilter == "Last Update") {
        this.getLastUpdate();
      } else if (this.selectedFilter == "By Status") {
        this.show_status_filter = true;
      } else if (this.selectedFilter == "Sort Status") {
        this.show_status_filter = false;
        this.getSortByStatus();
      }
    },
    selectedFilter_status() {
      this.getTicketByStatus();
    },
  },
};
</script>

<style scoped>
button {
  border: none;
  border-radius: 6px;
  padding: 1%;
}
.content-filter {
  display: flex;
  justify-content: center;
}
.content-create {
  display: flex;
  justify-content: center;
}
.content-ticket {
  width: 60%;
  margin: 0 auto;
}
</style>
