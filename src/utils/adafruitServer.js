import axios from "axios";
import dataModel from "../models/dataModel";
import deviceModel from "../models/deviceModel";
require("dotenv").config({ path: require("find-config")(".env") });

function setIntervalExact(func, interval) {
  var now = Date.now();
  var nextTime = now + interval;
  var delay = nextTime - now;
  setTimeout(function () {
    func();
    setIntervalExact(func, interval);
  }, delay);
}

export const setStatus = async (feed_name, status) => {
  try {
    // make axios post request
    const res = await axios({
      method: "post",
      url: `https://io.adafruit.com/api/v2/${process.env.User}/feeds/${feed_name}/data`,
      data: { value: status },
      headers: {
        "Content-Type": "application/json",
        "X-AIO-Key": process.env.XAIOKEY,
      },
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

const getData = async (feed_name) => {
  try {
    // make axios post request
    const res = await axios({
      method: "get",
      url: `https://io.adafruit.com/api/v2/${process.env.User}/feeds/${feed_name}/data/last`,
      headers: {
        "X-AIO-Key": process.env.XAIOKEY,
      },
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};


export const addDataIndatabase = () =>{
  setIntervalExact(async () => {
    try {
      const equip_feed = await deviceModel.getDataEquip();
      equip_feed.forEach(async (element) => {
        const data = await getData(element.id);
        if (data){
          if (element.auto) {
            if (element.min_action) {
              if (data.value < element.min) {
                await setStatus(element.min_action, 1);
              } else {
                await setStatus(element.min_action, 0);
              }
            } 
            if (element.max_action) {
              if (data.value > element.max) {
                await setStatus(element.max_action, 1);
              } else {
                await setStatus(element.max_action, 0);
              }
            }
          }
          else {
            if (element.min_action) await setStatus(element.min_action, 0);
            if (element.max_action) await setStatus(element.max_action, 0);
          }
          await dataModel.addData(element.id, data.value);
        }
      });
    } catch (error) {
      console.log(error.message);
    }      
  }, 30000);
}