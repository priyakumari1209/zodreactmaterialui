import { FormProvider, useForm } from 'react-hook-form';
 
 import { DevTool } from '@hookform/devtools';
 import { zodResolver } from '@hookform/resolvers/zod';
 
 import { defaultValues, Schema, schema } from '../types/schema';
 import { Users } from './Users';
 
 export function UsersProvider() {
 	const methods = useForm<Schema>({
 		mode: 'all',
 		resolver: zodResolver(schema),
 		defaultValues,
 	});
	console.log(methods.formState.errors);
	
 	return (
 		<FormProvider {...methods}>
 			<Users type='create'/>
 			<DevTool control={methods.control} />
 		</FormProvider>
 	);
 }