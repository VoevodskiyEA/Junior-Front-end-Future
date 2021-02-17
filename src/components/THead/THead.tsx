import { SelectArrows } from "@styled-icons/entypo";
import { DownArrow, UpArrow } from "@styled-icons/boxicons-solid";
import { DataHeader } from "../Table/Table";

interface Props {
  sort: tSort;
  makeSort: Function;
}

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

const THead = ({ sort, makeSort }: Props) => {
  return (
    <tr className="unselectable">
      {DataHeader.map((name: string) => {
        return (
          <th
            onClick={() => makeSort(sort === `${name}` ? name + "Rev" : name)}
            className={`thead__${name.toLowerCase()} `}
            key={name}
          >
            {name}{" "}
            {sort !== name && sort !== name + "Rev" ? (
              <SelectArrows size="20" />
            ) : sort === name ? (
              <DownArrow size="10" />
            ) : (
              <UpArrow size="10" />
            )}
          </th>
        );
      })}
    </tr>
  );
};

export default THead;
