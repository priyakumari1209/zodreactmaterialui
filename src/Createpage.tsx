import React from "react";
import { useNavigate } from "react-router-dom";

import { UsersProvider } from "./users/components/UsersProvider";

const Createpage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Users Data</h1>
      <p>This page displays Create page.</p>
      <button onClick={() => navigate("/")}>Go to Users Page</button>
      <UsersProvider type="create"/>
    </div>
  );
};

export default Createpage;
