export function delay(timeout) {
	console.log('--timeout--', timeout);
	return new Promise((resolve) => {
		setTimeout(resolve, timeout);
	});
}