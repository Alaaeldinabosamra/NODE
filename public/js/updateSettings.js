// updateData
import axios from 'axios';
import { showAlert } from './alerts';

// type is either 'password' or 'data'
export const updateSettings = async (data, type) => {
  try {
    const url =
      type === 'password'
        ? 'http://localhost:3000/api/v1/users/update-password'
        : 'http://localhost:3000/api/v1/users/update-profile';
    const res = await axios({
      method: 'PATCH',
      url: url,
      data,
    });
    if (res.data.status === 'success') {
      showAlert('success', `${type.toUpperCase()} Updated successfully!`);
      window.setTimeout(() => {
        location.assign('/me');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
