<template>
  <NavigationBar />
  <div class="w-100 d-flex justify-content-center p-5">
    <form class="w-25">
      <div class="mb-3">
        <h3 class="text-center p-2">Modify your informations</h3>
        <fieldset disabled>
          <input
            type="text"
            name="email"
            class="form-control border-secondary"
            aria-describedby="emailHelp"
            v-model="email"
          />
          <div id="emailHelp" class="form-text">
            You cannot change your email.
          </div>
        </fieldset>
      </div>
      <div class="mb-3">
        <input
          type="password"
          id="password"
          class="form-control border-secondary"
          placeholder="Password"
          v-model="password"
        />
        <div id="passwordHelp" class="form-text">
          Please enter your password to confirm.
        </div>
        <div class="mb-3">
          <input
            type="text"
            class="form-control border-secondary"
            placeholder="First Name"
            v-model="fname"
          />
        </div>
        <div class="mb-3">
          <input
            type="text"
            class="form-control border-secondary"
            placeholder="Last Name"
            v-model="lname"
          />
        </div>
        <div class="mb-3">
          <input
            type="date"
            class="form-control border-secondary"
            v-model="birth"
          />
        </div>
        <div class="mb-3">
          <input
            type="text"
            class="form-control border-secondary"
            placeholder="phoneNumber"
            v-model="phone"
          />
        </div>
        <div>
          <button
            type="button"
            v-on:click="update"
            class="btn btn-primary text-center"
          >
            Update informations
          </button>
          <img
            src="../assets/img/serpentlogo.png"
            alt="Bootstrap"
            width="70"
            height="70"
            class="text-center p-2"
          />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import NavigationBar from "../components/NavigationBar.vue";
import router from "../router";

export default {
  data() {
    return {
      id: Number,
      email: "",
      password: "",
      lname: "",
      fname: "",
      birth: new Date().toISOString().split("T")[0],
      phone: "",
    };
  },
  components: { NavigationBar },
  beforeMount() {
    let client = JSON.parse(localStorage.getItem("client"));
    this.email = client.email;
    this.lname = client.surname;
    this.fname = client.name;
    this.birth = client.birth;
    this.phone = client.phone;
    this.id = client.id;
  },
  methods: {
    async update() {
      if (!this.password) {
        document.getElementById("password").classList.add("border-danger");
      } else {
        let client = {
          email: this.email,
          password: this.password,
          surname: this.lname,
          name: this.fname,
          birth: this.birth,
          phone: this.phone,
          id: this.id,
        };

        let options = {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(client),
        };

        console.log("tututu:");
        //changing user in db
        await fetch("/api/users/" + this.id, options)
          .then((response) => response.json())
          .catch((err) => console.error(err));

        localStorage.clear();
        this.$router.push({ name: "login" });
      }
    },
  },
};
</script>
