import "./style.css";
import ReactDOM from "react-dom/client";
import App from "./App";
import { MotionConfig } from "framer-motion";
import { framerMotionConfig } from "./configMotion";

const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(
  <>
    <MotionConfig transition={{ ...framerMotionConfig }}>
      <App />
    </MotionConfig>
  </>
);
