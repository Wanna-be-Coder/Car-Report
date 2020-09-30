import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Button } from "@material-ui/core";

export default function SearchBar({
  searchDataList,
  getCarData,
  handleSearch,
}) {
  // const handleChange = (e) => {
  //   console.log(e.target.value);
  // };

  const onTagsChange = (event, values) => {
    // this.setState(
    //   {
    //     tags: values,
    //   },
    //   () => {
    //     // This will output an array of objects
    //     // given by Autocompelte options property.
    //     console.log(this.state.tags);
    //   }
    // );
    console.log(values);
    if (values !== null) {
      handleSearch(values);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={{ margin: "10px" }}>
        <Autocomplete
          id='combo-box-demo'
          options={searchDataList}
          getOptionLabel={(searchDataList) => searchDataList.title}
          onChange={onTagsChange}
          style={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label='Search Country' variant='outlined' />
          )}
        />
      </div>

      <div style={{ margin: "10px" }}>
        <Button variant='contained' color='primary' onClick={getCarData}>
          Reset
        </Button>
      </div>
    </div>
  );
}
