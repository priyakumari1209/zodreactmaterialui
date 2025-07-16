import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { TextField, Button, Box, Typography } from "@mui/material";


const schema = z.object({
  title: z.string().min(6, "Title must be at least 6 characters"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  content: z.string().min(7, "Content must be at least 7 characters"),
});

const PostForm = ({ variant = "create" }) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const createBlogMutation = PostCreatePage(); 
  const editBlogMutation = BlogEdit();  

  const onSubmit: SubmitHandler<z.infer<typeof schema>> = (data) => {
    if (variant === "create") {
      createBlogMutation.mutate(data, {
        onSuccess: () => {
          navigate("/post-create");
        },
      });
    } else {
      editBlogMutation.mutate(data, {
        onSuccess: () => {
          navigate("/post-create");
        },
      });
    }
  };

  return (
    <Box sx={{ maxWidth: 1000 }}>
      <Typography variant="h5" gutterBottom style={{ textAlign: "center" }}>
        Post Create
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          fullWidth
          size="small"
          label="Title"
          {...register("title")}
          margin="normal"
          error={!!errors.title}
          helperText={errors.title?.message}
        />
        <TextField
          fullWidth
          size="small"
          label="Description"
          {...register("description")}
          margin="normal"
          multiline
          rows={3}
          error={!!errors.description}
          helperText={errors.description?.message}
        />
        <TextField
          fullWidth
          size="small"
          label="Content"
          {...register("content")}
          margin="normal"
          error={!!errors.content}
          helperText={errors.content?.message}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default PostForm;
