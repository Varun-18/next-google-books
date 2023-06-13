import { BookListing } from "@src/components/BookListing";
import Pagination from "@src/components/Pagination";
import Search from "@src/components/Search";
import { client } from "@src/gql";
import { GET_ALL_BOOKS } from "@src/gql/query";
import { wrapper } from "@src/store";
import { addBooks, addKeyword } from "@src/store/slice";
import axios from "axios";
import _ from "lodash";

function SearchBar({ message, books }) {
  return (
    <div className="p-10">
      <Search />
      <h1>
        {message
          ? `Showing you the result for "${message}"`
          : "You've searched no books"}
      </h1>
      {_.size(books) > 0 ? <BookListing books={books} /> : "null"}
      <div className="mx-auto w-fit">
        <Pagination name={message} />
      </div>
    </div>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const values = store.getState().mainReducer;
    console.log(context);
    const { name, pageID } = context.query;
    console.log(name, "ssrp");
    if (!name) {
      return {
        props: {
          message: values.keyword,
          book: [],
        },
      };
    }

    // console.log(context.query, "********* QUERY *********");

    const { data } = await client.query({
      query: GET_ALL_BOOKS,
      variables: {
        input: name,
        pageID: parseInt(pageID),
        filterParam: undefined,
      },
    });

    console.log("**** DISPATCH TRIGGRED IN GET-SERVER-PROPS ****");
    if (data) {
      store.dispatch(addKeyword(name));
      store.dispatch(addBooks(data.books));
    }
    // const freshData = store.getState();
    return {
      props: {
        message: name,
        books: data.books,
      },
    };
  }
);

export default wrapper.withRedux(SearchBar);
