<template>
  <div>
    <div>
        <b-button v-b-modal.modal-prevent-closing><font-awesome-icon icon="plus-circle" /> New User</b-button>
        <font-awesome-icon icon="pen" class="icon" v-b-modal.modal-edit-user/>
        <font-awesome-icon icon="trash-alt" class="icon" @click="deleteUser"/>
        <b-button size="sm" v-b-modal.modal-tasks class="mr-2">Show Tasks</b-button>
        <b-table 
            :items="users" 
            :fields="fields" 
            striped 
            responsive="lg" 
            ref="selectableTable" 
            selectable 
            :select-mode="selectMode" 
            @row-selected="onRowSelected"
        >
            <template v-slot:cell(selected)="{ rowSelected }">
                <template v-if="rowSelected">
                        <span aria-hidden="true">&check;</span>
                        <span class="sr-only">Selected</span>
                </template>
                <template v-else>
                        <span aria-hidden="true">&nbsp;</span>
                        <span class="sr-only">Not selected</span>
                </template>
            </template>
                
        
        </b-table>
        <div class="mt-3">
            <b-modal
                id="modal-prevent-closing"
                ref="modal"
                title="Add New User"
                @hidden="resetModal"
                @ok="handleOk"
            >
                <form ref="form" @submit.stop.prevent="handleSubmit">
                    <b-form-group
                        :state="nameState"
                        label="Name"
                        label-for="name-input"
                        invalid-feedback="Name is required"
                    >
                        <b-form-input
                            id="name-input"
                            v-model="name"
                            :state="nameState"
                            required
                        ></b-form-input>
                    </b-form-group>
                </form>
            </b-modal>
        </div>
        <div class="mt-3">
            <b-modal
                id="modal-edit-user"
                ref="modal"
                title="Edit User"
                @show="showEdit"
                @hidden="resetModal"
                @ok="handleEditOk"
            >
                <form ref="form" @submit.stop.prevent="handleEditSubmit">
                    <b-form-group
                        :state="nameState"
                        label="Name"
                        label-for="name-input"
                        invalid-feedback="Name is required"
                    >
                        <b-form-input
                            id="name-input"
                            v-model="name"
                            :state="nameState"
                            required
                        ></b-form-input>
                    </b-form-group>
                </form>
            </b-modal>
        </div>
        <div class="mt-3">
            <b-modal
                id="modal-tasks"
                ref="modal"
                title="Tasks"
                @hidden="resetTaskModal"
            >
                <ListTask :userId="this.selected"></ListTask>
                <CreateTask :userId="this.selected"></CreateTask>
            </b-modal>
        </div>
    </div>
  </div>
</template>

<script>
  import CreateTask from '../components/CreateTask';
  import ListTask from '../components/ListTask';

  export default {
    data() {
      return {
        users: [],
        name: '',
        nameState: null,
        selectMode: 'single',
        selected: [],
        fields: ['selected', 'name']
      }
    },
    components: {
        CreateTask,
        ListTask
    },
    mounted: function() {
    this.fetchUsers();
  },
  methods: {
    fetchUsers() {
      this.$http
        .get("/users")
        .then(response => {
            this.users = response.data;
        })
        
    },
    onRowSelected(items) {
        this.selected = items
        console.log(this.selected)
    },
    checkFormValidity() {
        const valid = this.$refs.form.checkValidity()
        this.nameState = valid ? 'valid' : 'invalid'
        return valid
    },
    resetModal() {
        this.name = ''
        this.nameState = null
        this.fetchUsers();
    },
    resetTaskModal() {
        this.fetchUsers();
    },
    handleOk(bvModalEvt) {
        // Prevent modal from closing
        bvModalEvt.preventDefault();
        // Trigger submit handler
        this.handleSubmit();
    },
    handleEditOk(bvModalEvt) {
        bvModalEvt.preventDefault();
        this.handleEditSubmit();
    },
    handleSubmit() {
        if (!this.checkFormValidity()) {
            return
        }
        let user = {
            name: this.name
        };
        this.$http
            .post("/users", user)
            .then(response => {
                console.log("inside POST not patch")
            }).catch(error => {
                console.log(error);
            })
            this.$nextTick(() => {
                this.$refs.modal.hide()
            })
        },
    handleEditSubmit() {
        if (!this.checkFormValidity()) {
            return
        }
        let user = {
            name: this.name
        };
        this.$http
            .patch(`/users/${this.selected[0]._id}`, user)
            .then(response => {
                console.log(response.data)
                this.fetchUsers()
                this.selected = [];
            }).catch(error => {
                console.log(error);
            })
            this.$nextTick(() => {
                this.$refs.modal.hide()
            })
        },
    showEdit () {
        if (!this.selected.length) {
            alert("Please select a User to edit.")
        }
        console.log(this.selected[0]._id)
        this.resetModal();
    },
    deleteUser () {
        this.$http
            .delete(`/users/${this.selected[0]._id}`)
            .then(response => {
                this.selected = [];
                this.fetchUsers()
            }).catch(error => {
                console.log(error)
            })
    },
    getUserTasks () {
        this.$http 
            .get(`/tasks/${this.selected[0]._id}`)
            .then(response => {
                this.selected = [];
                console.log(response.data)
            }).catch(error => {
                console.log(error)
            })
    },
}}

</script>

<style scoped>
 .icon {
     text-align: right
 }
</style>