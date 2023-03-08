import React from "react";
import InputBase from "@mui/material/InputBase";
import Box from "./Box";
import Stack from "./stack";
import Paper from "./Paper";

const SearchBox = ({
    onInputChange,
}) => {
  return (
    <>
      <Stack>
        <Box
          sx={{
            minWidth: 150,
            textAlign: "right",
            alignContent: "flex-end",
            borderRadius: "5px !important",
          }}
        >
          <Paper
            component="form"
            sx={{
              p: "2.5px 0",
              display: "flex",
              alignItems: "center",
              height: "35px",
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search"
              onChange={(e) => onInputChange(e.target.value)}
              inputProps={{ "aria-label": "search" }}
            />
          </Paper>
        </Box>
      </Stack>
    </>
  );
};

export default SearchBox;