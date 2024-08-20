import { createContext, useState } from "react";
const SearchKeywordContext = createContext();

const SearchKeyWordProvider = ({ children }) => {
  const [keyword, setKeyword] = useState("");
  return (
    <SearchKeywordContext.Provider value={{ keyword, setKeyword }}>
      {children}
    </SearchKeywordContext.Provider>
  );
};
export default SearchKeywordContext;
export { SearchKeyWordProvider };
