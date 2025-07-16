import axios from 'axios';
 import omit from 'lodash/omit';
 
 import { useMutation, useQueryClient } from '@tanstack/react-query';
 
 import { Schema } from '../types/schema';
 import { mapData } from '../utils/mapData';
 
 export function blogCreateUser() {
 	const queryClient = useQueryClient();
 
 	return useMutation({
 		mutationFn: async (data: Schema) => {
 			await axios.post(
 				'http://localhost:8080/posts',
 				omit(mapData(data), 'variant')
 			);
 		},
 
 		onSuccess: async () => {
 			await queryClient.invalidateQueries({ queryKey: ['blogs'] });
 			alert('Blog created!');
 		},
 	});
 }
 
 export function useEditUser() {
 	const queryClient = useQueryClient();
 	return useMutation({
 		mutationFn: async (data: Schema) => {
 			if (data.variant === 'edit') {
 				await axios.put(
 					`http://localhost:8080/posts/${data.id}`,
 					omit(mapData(data), 'variant')
 				);
 				alert('Blog edited successfully!');
 			}
 		},
 
 		onSuccess: async (_, variables) => {
 			await queryClient.invalidateQueries({ queryKey: ['blogs'] });
 
 			if (variables.variant === 'edit') {
 				await queryClient.invalidateQueries({
 					queryKey: ['blog', { id: variables.id }],
 				});
 			}
 		},
 	});
 }