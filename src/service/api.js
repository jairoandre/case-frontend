import axios from "axios";

const buildQueryFilter = (filter) => {
  const terms = [];
  if (filter.searchTerm && filter.searchTerm.length > 0) {
    terms.push(`${filter.searchBy}=${filter.searchTerm}`);
  }
  return terms.length > 0 ? `?${terms.join("&")}` : "";

}

const api = {
  filterCases(callback, filter, loadingCb, addMessage) {
    loadingCb(true);
    axios
      .get("/api/case" + buildQueryFilter(filter))
      .then(response => {
        const data = response.data.map(m => {
          m.created = new Date(m.created);
          return m;
        });
        callback(data);
        loadingCb(false);
      })
      .catch(error => {
        loadingCb(false);
      });
  },

  save(caseObj, updateCb, loadingCb, addMessage) {
    loadingCb(true);
    if (caseObj.id) {
      axios
      .put("/api/case", caseObj)
      .then(response => {
        updateCb(response.data, true);
        loadingCb(false);
      })
      .catch(error => {
        loadingCb(false);
      })
    } else {
      axios
      .post("/api/case", caseObj)
      .then(response => {
        updateCb(response.data, false);
        loadingCb(false);
      })
      .catch(error => {
        const errorData = error.response.data;
        errorData.parameterViolations.forEach(violation => addMessage(violation.message, { variant: "error" }));
        loadingCb(false);
      })
    }
  }
};

export default api;
