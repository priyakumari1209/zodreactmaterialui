import { FormProvider, useForm } from 'react-hook-form';
 
 import { DevTool } from '@hookform/devtools';
 import { zodResolver } from '@hookform/resolvers/zod';
 
 import { defaultValues, Schema, schema } from '../types/schema';
 import { Users } from './Users';
 
 type UsersProviderProps = {
	type: 'create' | 'edit',
	user?: Schema;
 }
 

 export function UsersProvider({type,user}: UsersProviderProps) {
 	const methods = useForm<Schema>({
 		mode: 'all',
 		resolver: zodResolver(schema),
 		defaultValues: user != undefined ? user : defaultValues,
 	});
	console.log(methods.formState.errors);
	
 	return (
 		<FormProvider {...methods}>
 		<Users type={type}/>
 			<DevTool control={methods.control} />
 		</FormProvider>
 	);
}