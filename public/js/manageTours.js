import axios from 'axios';
import { showAlert } from './alerts';

export const createTour = async (data) => {
  try {
    console.log(data);
    const res = await axios({
      method: 'POST',
      url: 'http://localhost:3000/api/v1/tours',
      data,
    });
    if (res.data.status === 'success') {
      showAlert('success', `Created successfully!`);
      window.setTimeout(() => {
        location.assign('/manage-tour');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
    console.log(err);
  }
};
