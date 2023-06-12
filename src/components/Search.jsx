import { Button, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function Search() {
  const [search, setSearch] = useState();
  const router = useRouter();
  //   const [searchParams, setSearchParams] = useSearchParams();

  const searchBook = (e) => {
    console.log(search);
    // setSearchParams({ name: search });
    // router.push("/book");
    router.replace({ query: { ...router.query, name: search } });
    e.preventDefault();
  };
    
  return (
    <div>
      <form onSubmit={(e) => searchBook(e)}>
        <TextField
          label="search books"
          type="text"
          variant="outlined"
          onChange={(event) => setSearch(event.target.value)}
        />
        <Button type="submit">submit</Button>
      </form>
    </div>
  );
}
