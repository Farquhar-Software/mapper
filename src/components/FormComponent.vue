<template>
  <div v-if="visible" class="form-container">
    <div class="form-overlay" @click="closeForm"></div>
    <div class="form-content">
      <h2>Polygon Drawing Form</h2>
      <form @submit.prevent="submitForm">
        <div class="form-section">
          <h3>Starting Coordinates</h3>
          <div class="form-group">
            <label for="lat">Starting Latitude:</label>
            <input type="text" id="lat" v-model="lat" placeholder="Enter latitude" />
          </div>
          <div class="form-group">
            <label for="long">Starting Longitude:</label>
            <input type="text" id="long" v-model="long" placeholder="Enter longitude" />
          </div>
        </div>
        <div class="form-section">
          <h3>Bearings</h3>
          <div v-for="(bearing, index) in bearings" :key="index" class="bearing">
            <label>Bearing {{ index + 1 }}:</label>
            <div class="bearing-fields">
              <select v-model="bearing.direction1" class="bearing-input direction-input">
                <option value="N">N</option>
                <option value="S">S</option>
              </select>
              <input type="number" v-model.number="bearing.degrees" placeholder="DD" class="bearing-input degrees-input" />
              <input type="number" v-model.number="bearing.minutes" placeholder="MM" class="bearing-input minutes-input" />
              <input type="number" v-model.number="bearing.seconds" placeholder="SS" class="bearing-input seconds-input" />
              <select v-model="bearing.direction2" class="bearing-input direction-input">
                <option value="E">E</option>
                <option value="W">W</option>
              </select>
              <input type="number" v-model.number="bearing.distance" placeholder="Distance" class="bearing-input distance-input" />
              <input list="units" v-model="bearing.unit" placeholder="Unit" class="bearing-input unit-input" />
              <datalist id="units">
                <option value="feet"></option>
                <option value="meters"></option>
                <option value="kilometers"></option>
                <option value="miles"></option>
              </datalist>
              <button type="button" @click="removeBearing(index)" class="remove-button">Remove</button>
            </div>
          </div>
          <button type="button" @click="addBearing" class="add-button">Add Bearing</button>
        </div>

        <div class="form-actions">
          <button type="submit" class="submit-button">Submit</button>
        </div>
      </form>
      <div v-if="submissionMessage" class="submission-message">
        {{ submissionMessage }}
      </div>
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
    const lat = ref('');
    const long = ref('');
    const bearings = ref([
      { direction1: 'N', degrees: 0, minutes: 0, seconds: 0, direction2: 'E', distance: 0, unit: '' }
    ]);
    const submissionMessage = ref('');

    const closeForm = () => {
      emit('close');
    };

    const addBearing = () => {
      bearings.value.push({ direction1: 'N', degrees: 0, minutes: 0, seconds: 0, direction2: 'E', distance: 0, unit: '' });
    };

    const removeBearing = (index) => {
      bearings.value.splice(index, 1);
    };

    const submitForm = () => {
      const formData = {
        lat: lat.value,
        long: long.value,
        bearings: bearings.value.map(b => ({
          direction1: b.direction1,
          degrees: b.degrees,
          minutes: b.minutes,
          seconds: b.seconds,
          direction2: b.direction2,
          distance: b.distance,
          unit: b.unit
        }))
      };
      console.log(formData);
      submissionMessage.value = 'Form submitted successfully!';
      closeForm();
    };

    return {
      lat,
      long,
      bearings,
      submissionMessage,
      closeForm,
      addBearing,
      removeBearing,
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
  z-index: 1001;
  justify-content: center;
  font-family: Arial, sans-serif;
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
  background: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1001;
  width: 90%;
  max-width: 800px;
}
h2 {
  margin-top: 0;
  font-size: 24px;
  color: #333;
}
.form-section {
  margin-bottom: 20px;
}
.form-section h3 {
  font-size: 18px;
  color: #555;
  margin-bottom: 10px;
}
.form-group {
  margin-bottom: 15px;
}
.form-group label {
  display: block;
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
}
.form-group input {
  width: calc(100% - 10px);
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.bearing {
  margin-bottom: 15px;
}
.bearing label {
  font-size: 14px;
  color: #666;
}
.bearing-fields {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.bearing-input {
  margin-right: 10px;
  margin-bottom: 5px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  text-align: center;
  flex: 1;
}
.direction-input {
  width: 60px;
}
.degrees-input,
.minutes-input,
.seconds-input {
  width: 50px;
}
.distance-input {
  width: 80px;
}
.unit-input {
  width: 100px;
}
.remove-button {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  flex-shrink: 0;
}
.add-button, .submit-button {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
}
.form-actions {
  display: flex;
  justify-content: flex-end;
}
.submission-message {
  margin-top: 20px;
  color: green;
  font-size: 14px;
}
</style>