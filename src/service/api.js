import axios from "axios";

const api = {
  filterCases(callback, filter, loadingCb) {
    loadingCb(true);
    axios
      .get("/api/case")
      .then(response => {
        callback(response.data);
        loadingCb(false);
      })
      .catch(error => {
        loadingCb(false);
      });
  }
};

export default api;
