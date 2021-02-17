import { useState, useEffect } from "react";
import { useAlert } from "react-alert";

import Pages from "../Pages/Pages";
import SelectedRow from "../SelectedRow/SelectedRow";
import THead from "../THead/THead";
import TBody from "../TBody/TBody";
import NewRow from "../NewRow/NewRow";
import Search from "../Search/Search";
import axios from "axios";

interface Props {}

export const DataHeader = [
  "id",
  "firstName",
  "lastName",
  "email",
  "phone",
  "address",
  "description",
];

export interface DataType {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: {
    streetAddress: string;
    city: string;
    state: string;
    zip: string;
  };
  description: string;
}

const Table = (props: Props) => {
  const alert = useAlert();
  const pagesCapacity = 50;
  let pages: Array<Array<DataType>> = [];

  type tSort =
    | "id"
    | "idRev"
    | "firstName"
    | "firstNameRev"
    | "lastName"
    | "lastNameRev"
    | "email"
    | "emailRev"
    | "phone"
    | "phoneRev"
    | "address"
    | "addressRev"
    | "description"
    | "descriptionRev"
    | "undef";
  type tSortArrayType =
    | "id"
    | "firstName"
    | "lastName"
    | "email"
    | "phone"
    | "description";

  const [uploadedData, setUploadedData] = useState<Array<DataType>>([]);
  const [filteredData, setFilteredData] = useState<Array<DataType>>([]);
  const [sort, setSort] = useState<tSort>("undef");
  const [page, setPage] = useState(0);
  const [equal, setEqual] = useState("");
  const [selectedRow, setSelectedRow] = useState<any>();
  const [addRow, setAddRow] = useState(false);
  const [dataExist, setDataExist] = useState(true);

  useEffect(() => {
    let isMounted = true;
    alert.info("Data is loading...");
    axios
      .get(
        "http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}"
      )
      .then((response: any) => {
        if (isMounted) {
          setUploadedData(response.data);
          setFilteredData(response.data);
          alert.success("Data is loaded");
        }
      })
      .catch(() => {
        alert.error("Loading Error");
        setDataExist(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  if (uploadedData) {
    for (let i = 0; i < Math.ceil(filteredData?.length / pagesCapacity); i++) {
      pages[i] = filteredData.slice(
        i * pagesCapacity,
        i * pagesCapacity + pagesCapacity
      );
    }
  }

  function makeSort(typeSort: tSort) {
    setSort(typeSort);
    let sortArray: any = typeSort.split("Rev");
    let sortArrayType: tSortArrayType = sortArray[0];
    if (sortArray.length === 1) {
      setUploadedData([
        ...filteredData.sort(function (first: any, second: any) {
          if (typeof first[sortArrayType] === "object") {
            if (
              JSON.stringify(first[sortArrayType]) <=
              JSON.stringify(second[sortArrayType])
            ) {
              return -1;
            } else if (
              JSON.stringify(first[sortArrayType]) >=
              JSON.stringify(second[sortArrayType])
            ) {
              return 1;
            }
          } else {
            if (first[sortArrayType] <= second[sortArrayType]) {
              return -1;
            } else if (first[sortArrayType] >= second[sortArrayType]) {
              return 1;
            }
          }
          return 0;
        }),
      ]);
    } else if (sortArray.length === 2) {
      setUploadedData([
        ...filteredData.sort(function (first: any, second: any) {
          if (typeof first[sortArrayType] === "object") {
            if (
              JSON.stringify(first[sortArrayType]) >=
              JSON.stringify(second[sortArrayType])
            ) {
              return -1;
            } else if (
              JSON.stringify(first[sortArrayType]) <=
              JSON.stringify(second[sortArrayType])
            ) {
              return 1;
            }
          } else {
            if (first[sortArrayType] >= second[sortArrayType]) {
              return -1;
            } else if (first[sortArrayType] <= second[sortArrayType]) {
              return 1;
            }
          }
          return 0;
        }),
      ]);
    }
  }

  function findEqual() {
    function testingFilter(item: any) {
      if (typeof item === "object") {
        let result = false;
        for (let i = 0; i < Array.from(Object.values(item)).length; i++) {
          if (
            JSON.stringify(Array.from(Object.values(item))[i]).includes(equal)
          ) {
            result = true;
          }
        }
        return result;
      } else {
        if (JSON.stringify(item).includes(equal)) {
          return true;
        } else {
          return false;
        }
      }
    }
    setFilteredData(uploadedData.filter(testingFilter));
  }

  function refreshPage() {
    window.location.reload();
  }

  return (
    <>
      {dataExist ? (
        <div className="table-task">
          <Search
            equal={equal}
            setEqual={setEqual}
            findEqual={findEqual}
            setPage={setPage}
            setAddRow={setAddRow}
            addRow={addRow}
          />
          <NewRow addRow={addRow} />
          <div className="table-task__wrapper">
            <table className="table-task__wrapper__table">
              <thead className="table-task__wrapper__table__thead">
                <THead sort={sort} makeSort={makeSort} />
              </thead>
              <tbody>
                {/* Есть дубликаты id */}
                {JSON.stringify(filteredData) !== JSON.stringify([]) ? (
                  <TBody
                    pages={pages}
                    page={page}
                    setSelectedRow={setSelectedRow}
                  />
                ) : (
                  <tr>
                    <td colSpan={DataHeader.length}>
                      Data is loading, please wait
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <Pages pages={pages} setPage={setPage} page={page} />
          {selectedRow ? (
            <SelectedRow selectedRow={selectedRow} />
          ) : (
            <div className="selected-row"> </div>
          )}
        </div>
      ) : (
        <div className="error">
          Connot dowload data. The data is corrupted. Try to{" "}
          <span onClick={() => refreshPage()}>refresh page</span>
        </div>
      )}
    </>
  );
};

export default Table;
