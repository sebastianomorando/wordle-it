import ReactDOM from "react-dom";
import { Provider } from "./state";
import App from "./App";
import "./Snackbar";

const app = document.getElementById("app");
ReactDOM.render(
        <Provider>
                <App />
        </Provider>,
    app);