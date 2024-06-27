"use client";
import React, { useEffect, useState, useMemo } from "react";
import { Input, Form, message, Select, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import data from "../data/vehicle_data - Copy.json";
import { setVehicles } from "../redux/vehicleSlice";

const { Option } = Select;

export const Navbar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const vehicles = useSelector((state: RootState) => state.vehicles.vehicleData);
  const [searchValue, setSearchValue] = useState('');
  const [brandFilter, setBrandFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [noResults, setNoResults] = useState(false);

  const brands = useMemo(() => Array.from(new Set(data.map(vehicle => vehicle.Manufacturer))), []);
  const types = useMemo(() => Array.from(new Set(data.map(vehicle => vehicle.Type))), []);

  const handleFilter = () => {
    const filteredVehicles = data.filter(vehicle => 
      vehicle.Name.toLowerCase().includes(searchValue.toLowerCase()) &&
      (!brandFilter || vehicle.Manufacturer.toLowerCase() === brandFilter.toLowerCase()) &&
      (!typeFilter || vehicle.Type.toLowerCase() === typeFilter.toLowerCase())
    );

    if (filteredVehicles.length === 0) {
      setNoResults(true);
      message.info("No matching vehicles found. Please adjust your search criteria.");
    } else {
      setNoResults(false);
      const sortedVehicles = [...filteredVehicles].sort((a, b) => 
        sortBy === 'name' ? a.Name.localeCompare(b.Name) :
        sortBy === 'date' ? new Date(a["Manufacturing Date"]).getTime() - new Date(b["Manufacturing Date"]).getTime() :
        0
      );
      dispatch(setVehicles(sortedVehicles));
    }
  };

  const handleClear = () => {
    setSearchValue('');
    setBrandFilter('');
    setTypeFilter('');
    setSortBy('');
    dispatch(setVehicles(data));
    setNoResults(false);
  };

  useEffect(() => {
    handleFilter();
  }, [searchValue, brandFilter, typeFilter, sortBy]);

  useEffect(() => {
    dispatch(setVehicles(data));
  }, [dispatch]);

  return (
    <Form className="w-full flex flex-col items-center mt-2">
      <div className="w-full flex flex-wrap gap-2 justify-center mb-2">
        <Input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search here"
          className="w-full  sm:w-48"
        />
        <Select
          value={brandFilter}
          onChange={setBrandFilter}
          className="w-full sm:w-36"
          placeholder="Brand"
        >
          <Option value="">All Brands</Option>
          {brands.map(brand => (
            <Option key={brand} value={brand}>{brand}</Option>
          ))}
        </Select>
        <Select
          value={typeFilter}
          onChange={setTypeFilter}
          className="w-full sm:w-36"
          placeholder="Type"
        >
          <Option value="">All Types</Option>
          {types.map(type => (
            <Option key={type} value={type}>{type}</Option>
          ))}
        </Select>
        <Select
          value={sortBy}
          onChange={setSortBy}
          className="w-full sm:w-36"
          placeholder="Sort By"
        >
          <Option value="">No Sorting</Option>
          <Option value="name">Name</Option>
          <Option value="date">Manufacturing Date</Option>
        </Select>
        <Button className="w-full sm:w-auto" onClick={handleClear}>Clear Filters</Button>
      </div>
    </Form>
  );
};
