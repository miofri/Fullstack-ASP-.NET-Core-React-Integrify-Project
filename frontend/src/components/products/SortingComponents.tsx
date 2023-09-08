import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import SortIcon from "@mui/icons-material/Sort";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import FilterListOffOutlinedIcon from "@mui/icons-material/FilterListOffOutlined";

import {
  handleSortByNameAscending,
  handleSortByNameDescending,
  handleSortByPriceAscending,
  handleSortByPriceDescending,
} from "./sortingFunctions";
import { Products } from "../../interface/Products";

interface SortByNameOrPriceProps {
  products: Products[];
  setProducts: React.Dispatch<React.SetStateAction<Products[]>>;
  setSortedProducts: React.Dispatch<React.SetStateAction<Products[]>>;
}

export const SortByNameOrPrice = ({
  products,
  setProducts,
  setSortedProducts,
}: SortByNameOrPriceProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleAnchorClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <IconButton onClick={handleAnchorClick}>
        <Tooltip title="Sort">
          <SortIcon />
        </Tooltip>
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem>
          <Typography
            component={"span"}
            onClick={() =>
              handleSortByNameAscending(products, setSortedProducts)
            }
          >
            Sort A-Z
          </Typography>
        </MenuItem>
        <MenuItem>
          <Typography
            component={"span"}
            onClick={() =>
              handleSortByNameDescending(products, setSortedProducts)
            }
          >
            Sort Z-A
          </Typography>
        </MenuItem>
        <MenuItem>
          <Typography
            component={"span"}
            onClick={() =>
              handleSortByPriceAscending(products, setSortedProducts)
            }
          >
            Sort by lowest price
          </Typography>
        </MenuItem>
        <MenuItem>
          <Typography
            component={"span"}
            onClick={() =>
              handleSortByPriceDescending(products, setSortedProducts)
            }
          >
            Sort by highest price
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export const SortByPriceRange = ({
  products,
  setProducts,
  setSortedProducts,
}: SortByNameOrPriceProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [filterName, setFilterName] = useState("");
  const [toggle, setToggle] = useState(true);

  const handleNameFilter = () => {
    if (filterName !== "") {
      setToggle(!toggle);
    }
  };
  // for the anchor of menu
  const handleAnchorClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const open = Boolean(anchorEl);

  useEffect(() => {
    const getFiltered = () => {
      const sorted = products.filter((product) =>
        product.name.startsWith(filterName)
      );
      setSortedProducts(sorted);
    };
    getFiltered();
  }, [toggle]);

  const noFilter = () => {
    setSortedProducts(products);
    console.log(products);
  };
  const below99 = () => {
    const newProducts = products.filter((product) => product.price < 100);
    setSortedProducts(newProducts);
    console.log(products);
  };
  const above99 = () => {
    const newProducts = products.filter(
      (product) => product.price > 99 && product.price < 500
    );
    setSortedProducts(newProducts);
    console.log(products);
  };
  const above499 = () => {
    const newProducts = products.filter(
      (product) => product.price > 499 && product.price < 999
    );
    setSortedProducts(newProducts);
  };
  const above999 = () => {
    const newProducts = products.filter((product) => product.price > 999);
    setSortedProducts(newProducts);
  };

  return (
    <>
      <IconButton onClick={handleAnchorClick}>
        <Tooltip title="Price range">
          <AttachMoneyOutlinedIcon />
        </Tooltip>
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={() => noFilter()}>No filter</MenuItem>
        <MenuItem onClick={() => below99()}>0e-99e</MenuItem>
        <MenuItem onClick={() => above99()}>100e-499e</MenuItem>
        <MenuItem onClick={() => above499()}>500e-999e</MenuItem>
        <MenuItem onClick={() => above999()}>{">"} 999e </MenuItem>
      </Menu>
      <IconButton onClick={() => noFilter()}>
        <Tooltip title="Clear filter">
          <FilterListOffOutlinedIcon />
        </Tooltip>
      </IconButton>
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <TextField
          id="inputFilter"
          label="Find item"
          defaultValue=""
          onChange={(e) => setFilterName(e.target.value)}
        />
        <Button variant="outlined" onClick={() => handleNameFilter()}>
          Go
        </Button>
      </Box>
    </>
  );
};
