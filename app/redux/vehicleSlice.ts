import { createSlice } from "@reduxjs/toolkit";

interface VehicleState {
  vehicleData: {
    Name: string;
    Model: string;
    Type: string;
    Manufacturer: string;
    "Manufacturing Date": string;
    Seating: number;
  }[];
}

const initialState:  VehicleState = {
  vehicleData: [],  
};                
                  
const VehicleSlice = createSlice({
  name: "vehicles",
  initialState,
  reducers: {
    setVehicles: (state, action) => {
      state.vehicleData = action.payload;
    },
    filterVehicles: (state, action) => {
      state.vehicleData = state.vehicleData.filter((e) => {
        return e.Name.toLowerCase().includes(action.payload.toLowerCase());
      });
    },
  },
});

export const { setVehicles, filterVehicles } = VehicleSlice.actions;
export default VehicleSlice.reducer;
