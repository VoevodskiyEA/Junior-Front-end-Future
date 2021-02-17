import { useEffect } from "react";
import MaskedInput from "react-text-mask";
import { useFormik } from "formik";
import { useAlert } from "react-alert";
import axios from "axios";

import * as Yup from "yup";
interface Props {
  addRow: Boolean;
}
const phoneNumberMask = [
  "(",
  /[1-9]/,
  /\d/,
  /\d/,
  ")",
  " ",
  /\d/,
  /\d/,
  /\d/,
  "-",
  /\d/,
  /\d/,
  /\d/,
  /\d/,
];
const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

const NewRow = ({ addRow }: Props) => {
  const alert = useAlert();
  let schema = Yup.object().shape({
    id: Yup.number().required("Id required").positive().integer(),
    firstName: Yup.string().required("First name required"),
    lastName: Yup.string().required("Last name required"),
    email: Yup.string().email().required("Email required"),
    phone: Yup.string()
      .required("Phone required")
      .matches(phoneRegExp, "Phone number is not valid"),
    address: Yup.object({
      streetAddress: Yup.string().required("Street address required"),
      city: Yup.string().required("City required"),
      state: Yup.string().required("State required"),
      zip: Yup.string().required("Zip required"),
    }),
    description: Yup.string().required("Description required"),
  });

  const formik = useFormik({
    initialValues: {
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: {
        streetAddress: "",
        city: "",
        state: "",
        zip: "",
      },
      description: "",
    },
    onSubmit: (values) => {
      axios
        .post("/threats/upload", values)
        .then((response) => {
          alert.success("Data sended");
        })
        .catch((error) => {
          alert.error("Could not send data to this API");
        });
    },
    validationSchema: schema,
  });

  useEffect(() => {
    {
      formik.validateForm();
    }
  }, []);

  return (
    <div className="new-row">
      <form
        className={`new-row__form  ${addRow ? "" : "display-none"}`}
        onSubmit={formik.handleSubmit}
      >
        <div className="new-row__form__group">
          <div className="new-row__form__group__item">
            <label htmlFor="id">Id</label>
            <input
              id="id"
              name="id"
              type="number"
              onChange={formik.handleChange}
              value={formik.values.id}
              placeholder="Enter id"
            />
          </div>
          <div className="new-row__form__group__item">
            <label htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.firstName}
              placeholder="Enter first name"
            />
          </div>
          <div className="new-row__form__group__item">
            <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.lastName}
              placeholder="Enter last name"
            />
          </div>
          <div className="new-row__form__group__item">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.email}
              placeholder="Enter email address"
            />
          </div>
          <div className="new-row__form__group__item">
            <label htmlFor="phone">Phone Number</label>
            <MaskedInput
              mask={phoneNumberMask}
              id="phone"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.phone}
              placeholder="Enter phone number"
            />
          </div>
        </div>
        <div className="new-row__form__group">
          <div className="new-row__form__group__item">
            <label htmlFor="streetAddress">Street Address</label>
            <input
              id="streetAddress"
              name="address.streetAddress"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.address.streetAddress}
              placeholder="Enter street address"
            />
          </div>
          <div className="new-row__form__group__item">
            <label htmlFor="city">City</label>
            <input
              id="city"
              name="address.city"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.address.city}
              placeholder="Enter city"
            />
          </div>
          <div className="new-row__form__group__item">
            <label htmlFor="state">State</label>
            <input
              id="state"
              name="address.state"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.address.state}
              placeholder="Enter state"
            />
          </div>
          <div className="new-row__form__group__item">
            <label htmlFor="zip">Zip</label>
            <input
              id="zip"
              name="address.zip"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.address.zip}
              placeholder="Enter zip"
            />
          </div>

          <div className="new-row__form__group__item">
            <label htmlFor="description">Description</label>
            <input
              id="description"
              name="description"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.description}
              placeholder="Enter description"
            />
          </div>
        </div>
        <div className="new-row__form__submit">
          <button
            className="new-row__form__submit__button"
            type="submit"
            onClick={() => {
              if (Object.values(formik.errors)[0]) {
                if (typeof Object.values(formik.errors)[0] === "object") {
                  alert.error(
                    `${
                      formik.errors.address?.streetAddress ||
                      formik.errors.address?.city ||
                      formik.errors.address?.state ||
                      formik.errors.address?.zip
                    }`
                  );
                } else {
                  alert.error(`${Object.values(formik.errors)[0]}`);
                }
              }
            }}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewRow;
