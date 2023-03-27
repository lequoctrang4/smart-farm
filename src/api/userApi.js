import axios from "axios";

export const logIn = async(formValue) => {

    try {
      // make axios post request
      const res = await axios({
        method: "post",
        url: `http://localhost:3001/user/login`,
        data: formValue,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });
      return res.data;
    } catch(error) {
        return error.response.data;
    }
  }
export const logIn2 = async(formValue) => {

    try {
      // make axios post request
      const res = await axios({
        method: "post",
        url: `http://localhost:3001/user/login`,
        data: formValue,
        headers: { "Content-Type": "multipart/form-data" },
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
