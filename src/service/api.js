import axios from "axios";

const buildQueryFilter = filter => {
  const terms = [];
  if (filter.searchTerm && filter.searchTerm.length > 0) {
    terms.push(`${filter.searchBy}=${filter.searchTerm}`);
  }
  return terms.length > 0 ? `?${terms.join("&")}` : "";
};

const printError = (error, addMessage) => {
  const errorData = error.response ? error.response.data : error;
  if (errorData.parameterViolations) {
    errorData.parameterViolations.forEach(violation => {
      if (violation) addMessage(violation.message, { variant: "error" });
      else addMessage("That's weird!", { variant: "error" });
    });
  } else {
    addMessage(errorData, { variant: "error" });
  }
};

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
        printError(error.message, addMessage);
      });
  },

  save(caseObj, updateCb, loadingCb, addMessage) {
    loadingCb(true);
    if (caseObj.id) {
      axios
        .put("/api/case", caseObj)
        .then(response => {
          updateCb(response.data, false);
          loadingCb(false);
        })
        .catch(error => {
          console.log(error);
          loadingCb(false);
          printError(error, addMessage);
        });
    } else {
      axios
        .post("/api/case", caseObj)
        .then(response => {
          updateCb(response.data, true);
          loadingCb(false);
        })
        .catch(error => {
          loadingCb(false);
          printError(error, addMessage);
        });
    }
  },

  delete(id, loadingCb, doSearch, addMessage) {
    loadingCb(true);
    axios.delete("/api/case/" + id)
      .then(response => {
        loadingCb(false)
        if (response) {
          doSearch()
        } else {
          printError("Error on delete", addMessage)
        }
      })
      .catch(error => {
        loadingCb(false);
        printError(error, addMessage);
      });
  },

  batch(file, loadingCb, doSearch, addMessage) {
    loadingCb(true)
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", file.name);
    axios.post("/api/case/batch", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    .then(response => {
      loadingCb(false);
      doSearch();
    })
    .catch(error => {
      loadingCb(false);
      printError(error, addMessage);
    })
  }
};

export default api;
