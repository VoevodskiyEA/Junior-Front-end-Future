interface Props {
  equal: string;
  setEqual: React.Dispatch<React.SetStateAction<string>>;
  findEqual: Function;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setAddRow: React.Dispatch<React.SetStateAction<boolean>>;
  addRow: Boolean;
}

const Search = ({ equal, setEqual, findEqual, setPage, setAddRow, addRow  }: any) => {
  return (
    <div className="search">
      <input
        type="text"
        value={equal}
        onChange={(event) => setEqual(event.target.value)}
        className="search__input"
      />
      <button
        onClick={() => {
          findEqual();
          setPage(0);
        }}
        className="search__button"
      >
        Search
      </button>
      <button className="search__new" onClick={() => setAddRow(!addRow)}>
        New row
      </button>
    </div>
  );
};

export default Search;
