import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Chip, Typography, Button, Box } from "@mui/material";

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState<any>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetch("/data.json") 
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);
        const foundUser = data.users.find((u: any) => u.id === parseInt(id ?? "0"));
        setUser(foundUser);
      })
      .catch((error) => console.error("Error loading JSON:", error));
  }, [id]);

  
  const getLabel = (id: string, list: { id: string; label: string }[]) => {
    const item = list.find((i) => i.id === id);
    return item ? item.label : "Unknown";
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>User Details</Typography>

      {user ? (
        <Box>
          <Typography variant="h6">Name: {user.name}</Typography>
          <Typography variant="body1">Email: {user.email}</Typography>

          <Typography variant="body1">
            Gender: {getLabel(user.gender, userData?.genders || [])}
          </Typography>

          <Typography variant="body1">
            States: {user.states.map((stateId: string) => getLabel(stateId, userData?.states || [])).join(", ")}
          </Typography>

          <Typography variant="body1">
            Skills: {user.skills.map((skillId: string) => getLabel(skillId, userData?.skills || [])).join(", ")}
          </Typography>

          {user.isTeacher && <Chip color="primary" label="Teacher" sx={{ marginTop: 1 }} />}

          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/")}
            sx={{ marginTop: 2 }}
          >
            Back to Users Page
          </Button>
        </Box>
      ) : (
        <Typography variant="h6" color="error">
          Loading user data...
        </Typography>
      )}
    </Box>
  );
};

export default UserDetails;
