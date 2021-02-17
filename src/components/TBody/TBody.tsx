import { DataType } from "../Table/Table";

interface Props {
    pages: DataType[][], 
    page: number, 
    setSelectedRow: React.Dispatch<any>
}

const TBody = ({pages, page, setSelectedRow}:Props) => {
  return (
    <>
      {pages &&
        pages[page] &&
        pages[page].map(
          ({ id, firstName, lastName, email, phone, address, description }:any) => {
            return (
              <tr
                key={id + firstName + lastName + email + phone}
                onClick={() =>
                  setSelectedRow({
                    id,
                    firstName,
                    lastName,
                    email,
                    phone,
                    address,
                    description,
                  })
                }
                className="tbody__tr"
              >
                <td>{id}</td>
                <td>{firstName}</td>
                <td>{lastName}</td>
                <td>{email}</td>
                <td>{phone}</td>
                <td>
                  {address.streetAddress}, {address.city}, {address.state},{" "}
                  {address.zip}{" "}
                </td>
                <td>{description}</td>
              </tr>
            );
          }
        )}
    </>
  );
};

export default TBody;
