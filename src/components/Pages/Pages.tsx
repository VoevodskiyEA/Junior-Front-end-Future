import { DataType } from "../Table/Table";

interface Props {
  pages: DataType[][];
  setPage: React.Dispatch<React.SetStateAction<number>>;
  page: number
}

const Pages = ({ pages, setPage, page }: Props) => {
  return (
    <div className="pages">
      <div className="pages__wrapper">
        {pages.map((_item: any, index: number) => {
          return (
            <button key={index} onClick={() => setPage(index)} className={`pages__wrapper__button  ${page === index ? "current-page" : ""}`}>
              {index + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Pages;
