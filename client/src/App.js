import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import BusRouteDetail from "./components/BusRouteDetail";
import Home from "./components/Home";

function App() {
  const [routeDetail, setRouteDetail] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editRouteForm, setEditRouteForm] = useState(false);

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/routes"
            exact
            element={
              <Home
                setRouteDetail={setRouteDetail}
                routeDetail={routeDetail}
                setIsModalOpen={setIsModalOpen}
                isModalOpen={isModalOpen}
                editRouteForm={editRouteForm}
                setEditRouteForm={setEditRouteForm}
              />
            }
          />
          <Route
            path="/routes/routeDetail/:id"
            exact
            element={
              <BusRouteDetail
                routeDetail={routeDetail}
                setRouteDetail={setRouteDetail}
                setIsModalOpen={setIsModalOpen}
                isModalOpen={isModalOpen}
                editRouteForm={editRouteForm}
                setEditRouteForm={setEditRouteForm}
              />
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
