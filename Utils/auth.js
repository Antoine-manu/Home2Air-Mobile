const HOST = 'http://192.168.1.237:6500/';
const fetchWithTimeout = (resource, options, timeout = 5000) => {
	return Promise.race([
		fetch(resource, options),
		new Promise((_, reject) =>
			setTimeout(() => reject(new Error('Request timed out')), timeout)
		)
	]);
};

export default async function fetchRoute(route, method, params) {
	const url = new URL(route, HOST);

	try {
		const response = await fetchWithTimeout(url.toString(), {
			method: `${method}`,
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(params)
		});

		if (!response.ok) {
			const errorMessage = await response.text();
			console.error(
				`HTTP error: ${response.status} ${response.statusText}, Message: ${errorMessage}`
			);
			throw new Error(`HTTP error: ${response.status} ${response.statusText}`);
		}

		return response.json();
	} catch (error) {
		console.error('Error while fetching:', error);
		throw error;
	}
}
