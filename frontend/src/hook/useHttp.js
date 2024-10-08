import { useState } from "react";
import axios from "axios";
const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState();
  const url_http = "https://blogger-3l52.onrender.com";
  const api = async (method, data, link, getdata, token) => {
    setLoading(true);
    try {
      // const res = await axios[method](
      //   `http://localhost:5000${link}`,
      //   {
      //     headers: { authorization: `Bearer ${token}` },
      //   },
      //   data
      // );
      let res;
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      if (method === "get") {
        res = await axios(`${url_http}${link}`, {
          headers,
        });
      } else {
        res = await axios[method](`${url_http}${link}`, data, {
          headers,
        });
      }
      getdata && getdata(res.data);
      method !== "get" && setSuccess(res.data);
    } catch (error) {
      console.log(error);
      setError(error?.res?.data);
    }

    setLoading(false);
  };

  return { api, loading, error, success };
};
export default useHttp;
