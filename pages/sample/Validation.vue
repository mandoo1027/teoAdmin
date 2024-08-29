<template>
  <v-app>
    <v-container>
      <v-form ref="form" v-model="valid">
        <v-text-field label="Your Name" v-model="name" :rules="nameRules" required></v-text-field>

        <v-text-field
          label="Your Email"
          v-model="email"
          :rules="emailRules"
          required
        ></v-text-field>

        <v-text-field
          label="Only Numbers"
          v-model="phoneNumber"
          :rules="numberRules"
          @input="handleInput"
          required
        ></v-text-field>

        <v-btn @click="submit">Submit</v-btn>
      </v-form>
    </v-container>
  </v-app>
</template>

<script setup>
const valid = ref(false)
const form = ref(null)
const name = ref('')
const email = ref('')
const phoneNumber = ref('')

const nameRules = [
  (v) => !!v || 'Name is required',
  (v) => (v && v.length >= 3) || 'Name must be at least 3 characters',
]

const emailRules = [
  (v) => !!v || 'E-mail is required',
  (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
]
const numberRules = [
  (v) => !!v || 'number is required',
  (v) => /^\d+$/.test(v) || 'Only numbers are allowed',
]

const handleInput = (e) => {
  phoneNumber.value = e.target.value.replace(/\D/g, '')
}
const submit = () => {
  $utils.validate(form.value).then((result) => {
    if (!result) {
      console.log('유효성 체크하세요!')
    } else {
      alert('저장완료')
    }
  })
}
</script>