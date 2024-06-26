"use client";
import React, { useEffect, useRef, useState } from "react";
import { Input, Form, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { InputRef } from "antd/lib/input";
import data from "../data/vehicle_data - Copy.json";
import { setVehicles, filterVehicles } from "../redux/vehicleSlice";

export const Navbar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const vehicles = useSelector(
    (state: RootState) => state.vehicles.vehicleData
  );
  const inputValue = useRef<InputRef | null>(null);
  const [noResults, setNoResults] = useState(false);

  const handleSubmit = () => {
    if (inputValue.current) {
      const searchValue = inputValue.current.input?.value;
      if (searchValue) {
        const filteredVehicles = data.filter((vehicle) =>
          vehicle.Name.toLowerCase().includes(searchValue.toLowerCase())
        );
        if (filteredVehicles.length === 0) {
          setNoResults(true);
          message.info("No matching vehicles found of this name, please look for a name from the below data");
          dispatch(setVehicles(data));
        } else {
          setNoResults(false);
          dispatch(filterVehicles(searchValue));
        }
      } else {
        setNoResults(false);
        dispatch(setVehicles(data));
      }
    }
  };

  useEffect(() => {
    dispatch(setVehicles(data));
  }, [dispatch]);

  return (
    <Form style={{ display: "flex", justifyContent: 'center', marginTop:10 }} onFinish={handleSubmit} className="w-full">
      <Form.Item label="Search" name="search">
        <Input
          ref={inputValue}
          placeholder="Search"
          style={{ maxWidth: 600 }}
          className="mb-4 w-[50%] mx-auto"
          onChange={() => setNoResults(false)}
        />
      </Form.Item>
    </Form>
  );
};