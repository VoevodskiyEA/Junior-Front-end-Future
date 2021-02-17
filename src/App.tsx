import "./scss/App.scss";
import { transitions, positions, Provider as AlertProvider } from "react-alert";


import AlertTemplate from "./components/AlertTemplate/AlertTemplate";

import Table from "./components/Table/Table";

const options: any = {
  position: positions.BOTTOM_RIGHT,
  timeout: 1500,
  offset: "30px",
  transition: transitions.SCALE,
  type: "error",
};

const Wrapper = () => (
  <AlertProvider template={AlertTemplate} {...options}>
    <App />
  </AlertProvider>
);

function App() {
  return (
    <>
      <Table />
    </>
  );
}

export default Wrapper;
