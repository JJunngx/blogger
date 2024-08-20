import { useState, useEffect, useRef } from "react";
import useHttp from "../hook/useHttp";
import { Helmet } from "react-helmet-async";
import ListPost from "../utils/ListPost";
// import useAxios from "axios-hooks";

const Home = () => {
  const [results, setResults] = useState([]);
  // const [{ data, loading, error }, refetch] = useAxios(
  //   "http://localhost:5000/latestPosts"
  // );

  const { api } = useHttp();
  const apiRef = useRef(api);

  useEffect(() => {
    apiRef.current("get", null, "/latestPosts", setResults);
  }, []);

  return (
    <>
      <Helmet>
        <title>Home </title>
      </Helmet>

      <h1>Top Posts</h1>
      <ListPost posts={results} />
    </>
  );
};

export default Home;
