import { useParams, useNavigate } from 'react-router-dom';
import { useUser } from './users/services/queries';
import { Chip, Typography, Button } from '@mui/material';

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: user } = useUser(id);

  return (
    <div>
      <h1>User Details</h1>
      <p>Displaying details for user: {id}</p>
      <Typography>Email: {user?.email}</Typography>
      {user?.isTeacher && <Chip color='primary' label="Teacher" />}
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate('/')}
        sx={{ marginTop: 48,
            margin: 48,
            

            textAlign: 'center' 
         }}
      >
        Back to Users Page
      </Button>
    </div>
  );
};

export default UserDetails;
