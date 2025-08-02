import axios from 'axios';

const axiosInstance = axios.create({
	baseURL: 'https://api.ratanjyoti.in',
	withCredentials: true, // ✅ Automatically send cookies (access/refresh)
	headers: {
		'Content-Type': 'application/json',
	},
});

// No need to attach Authorization header manually anymore
// Axios will send the access token from the cookie automatically (if the backend reads from cookie)

axiosInstance.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;

		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			try {
				// ✅ Request refresh from cookie (no refresh token in body!)
				await axios.post(
					'https://api.ratanjyoti.in/auth/refresh/',
					{},
					{ withCredentials: true }
				);

				// Retry the original request
				return axiosInstance(originalRequest);
			} catch (refreshError) {
				// Refresh failed — redirect to login
				window.location.href = '/pages/login/simple';
				return Promise.reject(refreshError);
			}
		}

		return Promise.reject(error);
	}
);

export default axiosInstance;
