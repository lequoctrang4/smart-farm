import axios from "axios";

export const logIn = async(formValue) => {

    try {
      // make axios post request
      const res = await axios({
        method: "post",
        url: `${process.env.HOSTBACKEND}/user/login`,
        body: formValue,
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
      });
      return res.data;
    } catch(error) {
        return error.response.data;
    }
  }