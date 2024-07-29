<template>
  <div v-if="visible" class="form-container">
    <div class="form-overlay" @click="closeForm"></div>
    <div class="form-content">
      <h2>Form Title</h2>
      <form @submit.prevent="submitForm">
        <div>
          <label for="latitudeInput">Latitude</label>
          <input type="text" id="latitudeInput" v-model="latitudeInput" />
        </div>
        <div>
          <label for="longitudeInput">Longitude</label>
          <input type="text" id="longitudeInput" v-model="longitudeInput" />
        </div>
        <div>
          <label for="distanceInput">Distance:</label>
          <input type="text" id="distanceInput" v-model="distanceInput" />
        </div>
        <div>
          <label for="unitInput">Unit</label>
          <input type="text" id="unitInput" v-model="unitInput" />
        </div>
        <div>
          <label for="directionInput">Direction</label>
          <input type="text" id="directionInput" v-model="directionInput" />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
import { convertDirectionToBearing } from '../utils';
import * as turf from '@turf/turf';
import { ref } from 'vue';

export default {
  name: 'FormComponent',
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
  },
  setup(props, { emit }) {
    const latitudeInput = ref('');
    const longitudeInput = ref('');
    const distanceInput = ref('');
    const unitInput = ref('');
    const directionInput = ref('');

    // const mockData = {
    //   direction: 'N',
    //   degrees: 90,
    //   minutes: 0,
    //   seconds: 0,
    //   cardinal: 'W',
    //   distance: 889.46,
    //   unit: 'feet',
    // };

    const closeForm = () => {
      emit('close');
    };

    const convertToGeoJSON = ({
      latitude,
      longitude,
      distance,
      unit,
      direction,
    }) => {
      const point = turf.point([longitude, latitude]);
      const options = { units: unit };
      const bearing = convertDirectionToBearing(direction);
      const destination = turf.destination(point, distance, bearing, options);
      console.log(destination);
    };

    const submitForm = () => {
      const formDataMock = {
        latitude: 32.71180328837194,
        longitude: -94.121577724154,
        distance: 889.46,
        unit: 'feet',
        direction: {
          degrees: 90,
          minutes: 0,
          seconds: 0,
          cardinal: 'W',
        },
      };
      // const formData = {
      //   latitude: latitudeInput.value,
      //   longitude: longitudeInput.value,
      //   distance: Number(distanceInput.value),
      //   unit: unitInput.value,
      //   direction: directionInput.value,
      // };
      convertToGeoJSON(formDataMock);
      closeForm();
    };

    return {
      latitudeInput,
      longitudeInput,
      distanceInput,
      unitInput,
      directionInput,
      closeForm,
      submitForm,
    };
  },
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
  z-index: 999;
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
