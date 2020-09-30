import React, { useState, useEffect } from "react";
import Table from "../dummy/CarTable";
import Pie from "./Pie";
import axios from "axios";
import SearchBar from "../dummy/SearchBar";
import { CircularProgress, Button } from "@material-ui/core";

function Car() {
  const [allData, setAllData] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const [searchDataList, setSearchDataList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleSearch = async (d) => {
    setIsLoading(true);
    console.log(d);
    const car = await axios.post("/api/carsearch", {
      searchData: d.title,
    });
    console.log(car);
    setAllData(car.data);
    getgraphData(car.data);
    setIsLoading(false);
  };

  const handleUpload = ({ target }) => {
    let files = target.files;
    console.log(files);
    const file = files[0];
    const formData = new FormData();
    formData.append("file", file, file.name);
    postFile(formData);
  };

  const postFile = async (formData) => {
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    const postedData = await axios.post("/api/sendCSV", formData, config);
    console.log(postedData);
    getCarData();
  };

  const getCarData = async () => {
    setIsLoading(true);
    const car = await axios.get("/api/car");
    setAllData(car.data);
    getgraphData(car.data);
    getSearchListData(car.data);
    setIsLoading(false);
  };

  const getgraphData = async (data) => {
    let newDataCheck = [];

    const newData = await data.map((data, index) => {
      if (newDataCheck.length === 0) {
        let randomColor = Math.floor(Math.random() * 16777215).toString(16);
        newDataCheck.push({
          title: data.manufacturer,
          value: 1,
          color: `#${randomColor}`,
        });
      } else {
        for (let i = 0; i < newDataCheck.length; i++) {
          // newDataCheck.forEach((newData, index) => {
          let isFound = false;
          if (data.manufacturer === newDataCheck[i].title) {
            newDataCheck[i] = {
              title: data.manufacturer,
              value: newDataCheck[i].value + 1,
              color: newDataCheck[i].color,
            };
            isFound = true;
          }
          if (isFound) {
            break;
          }

          if (i + 1 === newDataCheck.length) {
            let randomColor = Math.floor(Math.random() * 16777215).toString(16);
            newDataCheck.push({
              title: data.manufacturer,
              value: 0,
              color: `#${randomColor}`,
            });
          }

          console.log(newDataCheck);
        }
      }

      return { title: data.manufacturer, value: 100, color: `red` };
    });
    setGraphData(newDataCheck);
    return newData;
  };

  const getSearchListData = async (data) => {
    let newDataCheck = [];

    const newData = await data.map((data, index) => {
      if (newDataCheck.length === 0) {
        let randomColor = Math.floor(Math.random() * 16777215).toString(16);
        newDataCheck.push({
          title: data.prodcnt,
          value: 1,
          color: `#${randomColor}`,
        });
      } else {
        for (let i = 0; i < newDataCheck.length; i++) {
          // newDataCheck.forEach((newData, index) => {
          let isFound = false;
          if (data.prodcnt === newDataCheck[i].title) {
            newDataCheck[i] = {
              title: data.prodcnt,
              value: newDataCheck[i].value + 1,
              color: newDataCheck[i].color,
            };
            isFound = true;
          }
          if (isFound) {
            break;
          }

          if (i + 1 === newDataCheck.length) {
            let randomColor = Math.floor(Math.random() * 16777215).toString(16);
            newDataCheck.push({
              title: data.prodcnt,
              value: 0,
              color: `#${randomColor}`,
            });
          }

          console.log(newDataCheck);
        }
      }

      return { title: data.prodcnt, value: 100, color: `red` };
    });
    setSearchDataList(newDataCheck);
    return newData;
  };

  useEffect(() => {
    const getCarData = async () => {
      setIsLoading(true);
      const car = await axios.get("/api/car");
      setAllData(car.data);
      getgraphData(car.data);
      getSearchListData(car.data);
      setIsLoading(false);
    };
    getCarData();
  }, []);

  return (
    <div>
      <Pie data={graphData} />
      <SearchBar
        searchDataList={searchDataList}
        getCarData={getCarData}
        handleSearch={handleSearch}
      />
      {isLoading ? (
        <div style={{ textAlign: "center" }}>
          <CircularProgress />
        </div>
      ) : (
        <Table allData={allData} />
      )}
      <input
        id='contained-button-file'
        accept='.csv'
        multiple
        type='file'
        style={{ display: "none" }}
        onChange={handleUpload}
      />
      <label htmlFor='contained-button-file'>
        <Button variant='contained' color='primary' component='span'>
          Upload CSV
        </Button>
      </label>
    </div>
  );
}

export default Car;
