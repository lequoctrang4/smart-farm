import axios from "axios";
export const getAllUsers = async() => {
    try {
      const res = await axios({
        method: "get",
        url: "http://localhost:3001",
      });
      return res.data;
    } catch(error) {
        return error.response.data;
    }
   
  }

  export const getAllPets = async() => {

    try {
      const res = await axios({
        method: "get",
        url: "http://js-post-api.herokuapp.com/api/posts?_limit=10&_page=1",
      });
      return res.data;
    } catch(error) {
        return error.response.data;
    }
    
   
  }