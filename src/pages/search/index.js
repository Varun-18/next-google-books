import Search from "@src/components/Search";

export default function SearchBar({ book }) {
  return (
    <>
      <Search />

      {book[0]?.id}
    </>
  );
}

export const getServerSideProps = ({ query }) => {
  console.log(query, "*******");
  if (!query?.name) {
    return {
      props: {
        book: [],
      },
    };
  }

  return {
    props: {
      book: [
        {
          id: 1,
        },
      ],
    },
  };
};
