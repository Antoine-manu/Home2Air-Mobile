// import { param } from './config';

const HOST = 'http://192.168.1.231:6500/api/v1/';

import * as SecureStore from 'expo-secure-store';
import createAlert from "./alert";

const fetchWithTimeout = (resource, options, timeout = 5000) => {
	return Promise.race([
		fetch(resource, options),
		new Promise((_, reject) =>
			setTimeout(() => reject(new Error('Request timed out')), timeout)
		)
	]);
};

export async function fetchRoute(route, method, params, token = '') {
	const url = new URL(route, HOST);
	const headers = {
		Accept: 'application/json',
		'Content-Type': 'application/json'
	};

	if (token) {
		headers['Authorization'] = `Bearer ${token}`;
	}

	const body = params ? JSON.stringify(params) : null;

	if (method === 'GET' || !body) {
		delete headers['Content-Type'];
		delete headers['Accept'];
		body = null;
	}

	if (route === 'auth/login') {
		delete headers['Authorization'];
	}

	const fetchOptions = {
		method: method.toUpperCase(),
		headers,
		body
	};
	try {
		const response = await fetchWithTimeout(url.toString(), fetchOptions);
		if (!response.ok) {
			const errorMessage = await response.text();
			console.error(
				`HTTP error: ${response.status} ${response.statusText}, Message: ${errorMessage}`
			);
			if(response.status == 401){
				throw new Error("Les identifiants saisies sont invalides");
			}
			throw new Error(`HTTP error: ${response.status} ${response.statusText}`);
		}
		const json = await response.json();
		console.log(response.json())

		return json;
	} catch (error) {
		console.error('Error while fetching:', error.message);
		throw error;
	}
}

export async function fetchFromStorage(key) {
	return await SecureStore.getItemAsync(key);
}
