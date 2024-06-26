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
      dispatch(setVehicles(filteredVehicles));
    }
  };

  const handleClear = () => {
    setSearchValue('');
    setBrandFilter('');
    setTypeFilter('');
    dispatch(setVehicles(data));
    setNoResults(false);
  };

  useEffect(() => {
    handleFilter();
  }, [searchValue, brandFilter, typeFilter]);

  useEffect(() => {
    dispatch(setVehicles(data));
  }, [dispatch]);

  return (
    <Form style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 10 }} className="w-full">
      <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
        <Input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search"
          style={{ width: 200 }}
        />
        <Select
          value={brandFilter}
          onChange={setBrandFilter}
          style={{ width: 150 }}
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
          style={{ width: 150 }}
          placeholder="Type"
        >
          <Option value="">All Types</Option>
          {types.map(type => (
            <Option key={type} value={type}>{type}</Option>
          ))}
        </Select>
        <Button onClick={handleClear}>Clear Filters</Button>
      </div>
    </Form>
  );
};
