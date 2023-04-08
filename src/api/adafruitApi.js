import axios from "axios";
require("dotenv").config({ path: require("find-config")(".env") });

export const SetStatus = async (feed_name, status) => {
  try {
    // make axios post request
    const res = await axios({
      method: "post",
      url: `https://io.adafruit.com/api/v2/${procces.env.UserName}/feeds/${feed_name}/data`,
      data: { value: status },
      headers: {
        "Content-Type": "application/json",
        "X-AIO-Key": process.env.X_AIO_KEY,
      },
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};
