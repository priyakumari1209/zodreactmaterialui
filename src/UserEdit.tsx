import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TextField, Button, Box, Typography } from "@mui/material";

interface User {
  id: number;
  name: string;
  email: string;
  gender: string;
  states: string;
  skills: string;
}

const EditUser: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => {
        const foundUser = data.users.find((u: User) => u.id === parseInt(id ?? "0", 10));
        if (foundUser) {
          setUser(foundUser);
        } else {
          console.error("User not found");
        }
      })
      .catch((error) => console.error("Error loading user data:", error));
  }, [id]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (user) {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (user) {
      console.log("Updated User Data:", user);
      navigate("/"); 
    }
  };

  if (!user) {
    return (
      <Box sx={{ padding: 3, textAlign: "center" }}>
        <Typography variant="h6" color="error">
          Loading user data...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 3, maxWidth: 500, margin: "auto" }}>
      <Typography variant="h4" gutterBottom>Edit User</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          value={user.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={user.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Gender"
          name="gender"
          value={user.gender}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="States"
          name="states"
          value={user.states}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Skills"
          name="skills"
          value={user.skills}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>
          Save Changes
        </Button>
        <Button
          variant="outlined"
          sx={{ marginLeft: 2, marginTop: 2 }}
          onClick={() => navigate("/")}
        >
          Cancel
        </Button>
      </form>
    </Box>
  );
};

export default EditUser;
