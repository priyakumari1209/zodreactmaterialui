import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { TextField, Button, Box, Typography } from "@mui/material";

const EditUser = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(location.state || null);

  useEffect(() => {
    if (!location.state) {
      fetch("/data.json")
        .then((res) => res.json())
        .then((data) => {
          const foundUser = data.users.find((u) => u.id === parseInt(id));
          setFormData(foundUser);
        })
        .catch((err) => console.error("Error loading JSON:", err));
    }
  }, [id, location.state]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated User Data:", formData);
    alert("User Updated Successfully!");
    navigate("/");
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>Edit User</Typography>
      {formData ? (
        <form onSubmit={handleSubmit}>
          <TextField label="Name" name="name" value={formData.name} onChange={handleChange} fullWidth margin="normal" />
          <TextField label="Email" name="email" value={formData.email} onChange={handleChange} fullWidth margin="normal" />
          <TextField label="Gender" name="gender" value={formData.gender} onChange={handleChange} fullWidth margin="normal" />
          <TextField label="States" name="states" value={formData.states} onChange={handleChange} fullWidth margin="normal" />
          <TextField label="Skills" name="skills" value={formData.skills} onChange={handleChange} fullWidth margin="normal" />
          <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>Save Changes</Button>
          <Button variant="outlined" color="secondary" sx={{ marginTop: 2, marginLeft: 1 }} onClick={() => navigate("/")}>Cancel</Button>
        </form>
      ) : (
        <Typography variant="h6" color="error">Loading user data...</Typography>
      )}
    </Box>
  );
};

export default EditUser;
