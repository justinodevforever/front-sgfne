import "./lessons.css";
import { Provider } from "react-redux";
import { connect } from "react-redux";
import store from "../../store";

function Lesson(id) {
  return (
    <Provider store={store}>
      <div className="container-r">
        <h1>{id}</h1>
      </div>
    </Provider>
  );
}

export default Lesson;
