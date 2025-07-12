import React from "react";
import { Button } from "./button";
import { Input } from "./input";

const Search = ({ handleSearch }) => {
  return (
    <form
      onSubmit={handleSearch}
      className="flex w-full items-center md:max-w-sm"
    >
      <Input
        className="rounded-r-none border-r-0"
        name="search"
        type="search"
        placeholder="Search"
      />
      <Button className="rounded-s-none" type="submit">
        Search
      </Button>
    </form>
  );
};

export default Search;
