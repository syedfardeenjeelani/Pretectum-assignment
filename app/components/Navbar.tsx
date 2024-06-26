"use client";
import React, { useEffect, useState, useMemo } from "react";
import { Input, Form, message, Select, Button, Row, Col } from "antd";
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
    <Form className="w-95% max-w-[95%] mx-auto p-4">
      <Row gutter={[16, 16]} justify="center">
        <Col  sm={12} md={6} lg={5}>
          <Input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search"
          />
        </Col>
        <Col  sm={12} md={6} lg={5}>
          <Select
            value={brandFilter}
            onChange={setBrandFilter}
            style={{ width: '95%' }}
            placeholder="Brand"
          >
            <Option value="">All Brands</Option>
            {brands.map(brand => (
              <Option key={brand} value={brand}>{brand}</Option>
            ))}
          </Select>
        </Col>
        <Col sm={12} md={6} lg={5}>
          <Select
            value={typeFilter}
            onChange={setTypeFilter}
            style={{ width: '95%' }}
            placeholder="Type"
          >
            <Option value="">All Types</Option>
            {types.map(type => (
              <Option key={type} value={type}>{type}</Option>
            ))}
          </Select>
        </Col>
        <Col sm={12} md={6} lg={5}>
          <Button onClick={handleClear} style={{ width: '95%' }}>Clear Filters</Button>
        </Col>
      </Row>
    </Form>
  );
};
