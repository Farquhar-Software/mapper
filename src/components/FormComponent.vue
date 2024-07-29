<template>
    <div v-if="visible" class="form-container">
      <div class="form-overlay" @click="closeForm"></div>
      <div class="form-content">
        <h2>Form Title</h2>
        <form @submit.prevent="submitForm">
          <div>
            <label for="input1">Input 1:</label>
            <input type="text" id="input1" v-model="input1" />
          </div>
          <div>
            <label for="input2">Input 2:</label>
            <input type="text" id="input2" v-model="input2" />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    name: 'FormComponent',
    props: {
      visible: {
        type: Boolean,
        required: true
      }
    },
    setup(props, { emit }) {
      const input1 = ref('');
      const input2 = ref('');
  
      const closeForm = () => {
        emit('close');
      };
  
      const submitForm = () => {
        console.log({ input1: input1.value, input2: input2.value });
        closeForm();
      };
  
      return {
        input1,
        input2,
        closeForm,
        submitForm
      };
    }
  };
  </script>
  
  <style scoped>
  .form-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .form-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
  }
  .form-content {
    position: relative;
    background: white;
    padding: 20px;
    border-radius: 8px;
    z-index: 1001;
  }
  </style>