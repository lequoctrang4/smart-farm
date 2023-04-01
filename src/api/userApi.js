import axios from "axios";

export const signIn = async(formValue) => {

    try {
      // make axios post request
      const res = await axios({
        method: "post",
        url: `http://localhost:3001/user/signIn`,
        data: formValue,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });
      return res.data;
    } catch(error) {
        return error.response.data;
    }
  }
export const signUp = async(formValue) => {

    try {
      // make axios post request
      const res = await axios({
        method: "post",
        url: `http://localhost:3001/user/signUp`,
        data: formValue,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });
      return res.data;
    } catch(error) {
        return error.response.data;
    }
  }

export const getProfile = async(token) => {

    try {
      // make axios post request
      const res = await axios({
        method: "get",
        url: `http://localhost:3001/user/getProfile`,
        headers: {Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch(error) {
        return error.response.data;
    }
  }
export const editProfile = async(token, formValue) => {

    try {
      // make axios post request
      const res = await axios({
        method: "patch",
        url: `http://localhost:3001/user/editProfile`,
        data: formValue,
        headers: {Authorization: `Bearer ${token}`,
                  'content-type': 'application/x-www-form-urlencoded' }
      });
      return res.data;
    } catch(error) {
        return error.response.data;
    }
  }
export const setAvatar = async(token, formValue) => {

    try {
      // make axios post request
      const res = await axios({
        method: "patch",
        url: `http://localhost:3001/user/setAvatar`,
        data: formValue,
        headers: {Authorization: `Bearer ${token}`,
                  "Content-Type": "multipart/form-data" }
      });
      return res.data;
    } catch(error) {
        return error.response.data;
    }
  }

  export const getAvatar = async(token) => {
    try {
      // make axios post request
      const res = await axios({
        method: "get",
        url: `http://localhost:3001/user/getAvatar`,
        headers: {Authorization: `Bearer ${token}`}
      });
      return res.data;
    } catch(error) {
        return error.response.data;
    }
  }
export const changePassword = async(token, formValue) => {
    try {
      // make axios post request
      const res = await axios({
        method: "post",
        url: `http://localhost:3001/user/changePassword`,
        data: formValue,
        headers: {Authorization: `Bearer ${token}`,
                  'content-type': 'application/x-www-form-urlencoded' }
      });
      return res.data;
    } catch(error) {
        return error.response.data;
    }
  }

export const forgetPassword = async(formValue) => {
    try {
      // make axios post request
      const res = await axios({
        method: "post",
        url: `http://localhost:3001/user/forgetPassword`,
        data: formValue,
        headers: {'content-type': 'application/x-www-form-urlencoded' }
      });
      return res.data;
    } catch(error) {
        return error.response.data;
    }
  }
export const getAllControlEquip = async() => {

    try {
      // make axios post request
      const res = await axios({
        method: "get",
        url: `http://localhost:3001/device/getAllControlEquip`,
      });
      return res.data;
    } catch(error) {
        return error.response.data;
    }
  }
