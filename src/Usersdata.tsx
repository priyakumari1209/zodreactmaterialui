import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Skeleton,
} from "@mui/material";
import { useUsers } from "./users/services/queries";

const users = [
  { id: 1, name: "David", email: "james@gmail.com", gender: "Male", states: "California, Texas", skills: "Productive, Creative" },
  { id: 2, name: "Robert", email: "Robert@gmail.com", gender: "Female", states: "Florida", skills: "Productive, Creative" },
  { id: 3, name: "John", email: "john@gmail.com", gender: "Male", states: "California", skills: "Productive, Creative" },
  { id: 4, name: "Priya", email: "mishrapriya15987@gmail.com", gender: "Female", states: "Kerala", skills: "Problem solver, Agile" },
  { id: 5, name: "Priya", email: "mishrapriya15876@gmail.com", gender: "Female", states: "Tamil Nadu", skills: "Problem solver, Agile" },
];

const UsersPage: React.FC = () => {
  const navigate = useNavigate();
  const {data, isLoading, isError} = useUsers();
  const handleViewDetails = (id: number) => {
    navigate(`/user/${id}`);
  };

  const handleEdit = (id: number) => {
    navigate(`/edit/${id}`);
  };

  if(isError) return <Typography>Something went wrong, try agian later</Typography>
  
  return (
    <div>
      <h1>Users Page</h1>
      <p>This page displays user data.</p>
      <Button variant="contained" onClick={() => navigate("/create")}>
        Go Back to Create Page
      </Button>

      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="users table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>States</TableCell>
              <TableCell>Skills</TableCell>
              <TableCell>Actions</TableCell> 
            </TableRow>
          </TableHead>
          <TableBody>
             {isLoading && Array.from({length: 7}).map((_, index) => {
              return <TableRow key={index}>
              <TableCell><Skeleton variant="rounded" height={30} /></TableCell>
              <TableCell><Skeleton variant="rounded" height={30} /></TableCell>
              <TableCell><Skeleton variant="rounded" height={30} /></TableCell>
              <TableCell><Skeleton variant="rounded" height={30} /></TableCell>
              <TableCell><Skeleton variant="rounded" height={30} /></TableCell>
              <TableCell><Skeleton variant="rounded" height={30} /></TableCell>
              <TableCell><Skeleton variant="rounded" height={30} /></TableCell>
              </TableRow>
            })}
            {data?.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.gender}</TableCell>
                <TableCell>{user.states}</TableCell>
                <TableCell>{user.skills}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleViewDetails(user.id)}
                  >
                    View Details
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleEdit(user.id)}
                    sx={{ marginLeft: 1 }}
                  >
                    Edit
                  </Button>
                </TableCell> 
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default UsersPage;
