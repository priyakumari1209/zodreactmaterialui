import { Fragment, useEffect } from 'react';
import { SubmitHandler, useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import { Button, Container, Stack, Typography } from '@mui/material';
import { RHFAutocomplete } from '../../components/RHFAutocomplete';
import { RHFCheckbox } from '../../components/RHFCheckbox';
import { RHFDateRangePicker } from '../../components/RHFDateRangePicker';
import { RHFDateTimePicker } from '../../components/RHFDateTimePicker';
import { RHFRadioGroup } from '../../components/RHFRadioGroup';
import { RHFSlider } from '../../components/RHFSlider';
import { RHFSwitch } from '../../components/RHFSwitch';
import { RHFTextField } from '../../components/RHFTextField';
import { RHFToggleButtonGroup } from '../../components/RHFToggleButtonGroup';
import { useCreateUser, useEditUser } from '../services/mutations';
import { useGenders, useLanguages, useSkills, useStates, useUser, useUsers } from '../services/queries';
import { defaultValues, Schema } from '../types/schema';
import { useNavigate } from 'react-router-dom';

export function Users({ type }: { type: 'create' | 'edit' }) {
  const navigate = useNavigate(); 
  const statesQuery = useStates();
  const languagesQuery = useLanguages();
  const gendersQuery = useGenders();
  const skillsQuery = useSkills();
  const usersQuery = useUsers();
  const { watch, control, unregister, reset, setValue, handleSubmit } = useFormContext<Schema>();

  const id = useWatch({ control, name: 'id' });
  const variant = useWatch({ control, name: 'variant' });
  const userQuery = useUser(id);

  useEffect(() => {
    if (userQuery.data) {
      reset(userQuery.data);
    }
  }, [reset, userQuery.data]);

  const isTeacher = useWatch({ control, name: 'isTeacher' });

  const { append, fields, remove, replace } = useFieldArray({
    control,
    name: 'students',
  });

  const createUserMutation = useCreateUser();
  const editUserMutation = useEditUser();

  const onSubmit: SubmitHandler<Schema> = (data) => {
    if (variant === 'create') {
      createUserMutation.mutate(data, {
        onSuccess: () => {
          navigate('/'); 
        },
      });
    } else {
      editUserMutation.mutate(data, {
        onSuccess: () => {
          navigate('/'); 
        },
      });
    }
  };

  return (
    <Container maxWidth="sm" component="form" onSubmit={handleSubmit(onSubmit)}>
      <Stack sx={{ flexDirection: 'row', gap: 2 }}>
        <Stack sx={{ gap: 2 }}>
          <RHFTextField<Schema> name="name" label="Name" />
          <RHFTextField<Schema> name="email" label="Email" />
          <RHFAutocomplete<Schema> name="states" label="States" options={statesQuery.data} />
          <RHFToggleButtonGroup<Schema> name="languagesSpoken" options={languagesQuery.data || []} />
          <RHFRadioGroup<Schema> name="gender" options={gendersQuery.data} label="Gender" />
          <RHFCheckbox<Schema> name="skills" options={skillsQuery.data} label="Skills" />
          <RHFDateTimePicker<Schema> name="registrationDateAndTime" label="Registration Date & Time" />
          <Typography>Former Employment Period:</Typography>
          <RHFDateRangePicker<Schema> name="formerEmploymentPeriod" />
          <RHFSlider<Schema> name="salaryRange" label="Salary Range" />
          <RHFSwitch<Schema> name="isTeacher" label="Are you a teacher?" />

          {isTeacher && (
            <Button onClick={() => append({ name: '' })} type="button">
              Add new student
            </Button>
          )}

          {fields.map((field, index) => (
            <Fragment key={field.id}>
              <RHFTextField<Schema> name={`students.${index}.name`} label="Name" />
              <Button color="error" onClick={() => remove(index)} type="button">
                Remove
              </Button>
            </Fragment>
          ))}

          <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Button color={type === 'create' ? 'primary' : 'secondary'} variant="contained" type="submit">
              {type === 'create' ? 'Create' : 'Update'}
            </Button>
            <Button onClick={() => reset(defaultValues)}>Reset</Button>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
}
