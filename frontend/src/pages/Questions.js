import { useContext, useEffect, useState, useRef, useDebugValue } from "react";
import useHttp from "../hook/useHttp";
import SearchKeywordContext from "../context/SearchKeyword";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Helmet } from "react-helmet-async";
import ListPost from "../utils/ListPost";

const Question = () => {
  const [searchResults, setSearchResults] = useState({
    totalCount: null,
    posts: [],
  });
  const [currentPage, setCurrentPage] = useState(1);
  useDebugValue(currentPage);
  const itemsPerPage = 10;
  const { api, loading } = useHttp();

  const { keyword } = useContext(SearchKeywordContext);
  const apiRef = useRef(api);

  useEffect(() => {
    apiRef.current(
      "get",
      null,
      `/getPosts?currentPage=${currentPage}&itemsPerPage=${itemsPerPage}`,
      setSearchResults
    );
  }, [currentPage]);

  useEffect(() => {
    if (keyword) {
      apiRef.current(
        "get",
        null,
        `/search?keyword=${keyword}&itemsPerPage=${itemsPerPage}&currentPage=${currentPage}`,
        setSearchResults
      );
    }
  }, [currentPage, keyword]);

  if (searchResults.posts.length === 0)
    return <div>không tìm thấy kết quả</div>;
  return (
    <div className="mt-5">
      <Helmet>
        <title>All Question</title>
      </Helmet>
      <h1>All Posts</h1>
      <ListPost posts={searchResults.posts} />
      <Stack spacing={2} alignItems="center" className="mt-2">
        <Pagination
          count={Math.ceil(searchResults.totalCount / itemsPerPage)}
          color="primary"
          page={currentPage}
          onChange={(event, page) => setCurrentPage(page)}
        />
      </Stack>
    </div>
  );
};

export default Question;
