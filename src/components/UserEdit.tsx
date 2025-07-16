
import { useParams, useLocation, useNavigate } from "react-router-dom";

import { UsersProvider } from "../users/components/UsersProvider";
import { useUser } from "../users/services/queries";


const EditUser = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  console.log(id);

  const {data} = useUser(id);
  console.log({data});
  if(data == undefined) return null;
  return  <UsersProvider type="edit" user={data}/>
  

  

  // return (
  //   <Box sx={{ padding: 3 }}>
  //     <Typography variant="h4" gutterBottom>Edit User</Typography>
  //     {formData ? (
  //       <form onSubmit={handleSubmit}>
  //         <TextField label="Name" name="name" value={formData.name} onChange={handleChange} fullWidth margin="normal" />
  //         <TextField label="Email" name="email" value={formData.email} onChange={handleChange} fullWidth margin="normal" />
  //         <TextField label="Gender" name="gender" value={formData.gender} onChange={handleChange} fullWidth margin="normal" />
  //         <TextField label="States" name="states" value={formData.states} onChange={handleChange} fullWidth margin="normal" />
  //         <TextField label="Skills" name="skills" value={formData.skills} onChange={handleChange} fullWidth margin="normal" />
  //         <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>Save Changes</Button>
  //         <Button variant="outlined" color="secondary" sx={{ marginTop: 2, marginLeft: 1 }} onClick={() => navigate("/")}>Cancel</Button>
  //       </form>
  //     ) : (
  //       <Typography variant="h6" color="error">Loading user data...</Typography>
  //     )}
  //   </Box>
  // );
};

export default EditUser;
