import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:8080/api/v1/'
})

export default instance

// const API_BASE_URL = 'http://localhost:8080/api/v1/';
//
// // Создаем экземпляр axios
// const api = axios.create({
//     baseURL: API_BASE_URL,
// });
//
// // Переменные для управления очередью запросов
// let isRefreshing = false;
// let failedRequests = [];
//
// // Request interceptor - добавляет токен к каждому запросу
// api.interceptors.request.use(
//     (config) => {
//         const user = JSON.parse(localStorage.getItem('user'));
//
//         if (user?.accessToken) {
//             config.headers.Authorization = `Bearer ${user.accessToken}`;
//         }
//
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );
//
// // Response interceptor - обрабатывает 401 ошибки
// api.interceptors.response.use(
//     (response) => {
//         return response;
//     },
//     async (error) => {
//         const originalRequest = error.config;
//
//         // Если ошибка 401 и это не запрос на refresh
//         if (error.response?.status === 401 &&
//             !originalRequest.url.includes('/auth/refresh') &&
//             !originalRequest._retry) {
//
//             // Помечаем запрос как уже обработанный
//             originalRequest._retry = true;
//
//             // Если уже идет процесс обновления токена
//             if (isRefreshing) {
//                 return new Promise((resolve, reject) => {
//                     failedRequests.push({ resolve, reject });
//                 })
//                     .then(() => {
//                         // После обновления токена повторяем оригинальный запрос
//                         return api(originalRequest);
//                     })
//                     .catch((err) => {
//                         return Promise.reject(err);
//                     });
//             }
//
//             isRefreshing = true;
//
//             try {
//                 // Пытаемся обновить токен
//                 const newToken = await refreshToken();
//
//                 // Обновляем токен в localStorage
//                 const user = JSON.parse(localStorage.getItem('user'));
//                 user.accessToken = newToken;
//                 localStorage.setItem('user', JSON.stringify(user));
//
//                 // Обновляем заголовок Authorization для повторного запроса
//                 originalRequest.headers.Authorization = `Bearer ${newToken}`;
//
//                 // "Будим" все ожидающие запросы
//                 failedRequests.forEach(({ resolve }) => resolve());
//                 failedRequests = [];
//
//                 // Повторяем оригинальный запрос с новым токеном
//                 return api(originalRequest);
//
//             } catch (refreshError) {
//                 // Если обновление токена не удалось
//                 failedRequests.forEach(({ reject }) => reject(refreshError));
//                 failedRequests = [];
//
//                 // Делаем logout
//                 localStorage.removeItem('user');
//                 window.location.href = '/login';
//
//                 return Promise.reject(refreshError);
//             } finally {
//                 isRefreshing = false;
//             }
//         }
//
//         return Promise.reject(error);
//     }
// );
//
// // Функция для обновления токена
// async function refreshToken() {
//     try {
//         const user = JSON.parse(localStorage.getItem('user'));
//
//         if (!user?.refreshToken) {
//             throw new Error('No refresh token available');
//         }
//
//         const response = await axios.post(
//             `${API_BASE_URL}/auth/refresh-token`,
//             { refreshToken: user.refreshToken },
//             {
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//             }
//         );
//
//         if (response.data.accessToken) {
//             return response.data.accessToken;
//         } else {
//             throw new Error('No access token in response');
//         }
//
//     } catch (error) {
//         console.error('Refresh token failed:', error);
//         throw error;
//     }
// }
//
// // Вспомогательные методы для удобства
// export const apiServiceAxios = {
//     // GET запрос
//     get: (url, config = {}, authNecessary) => api.get(url, config),
//
//     // POST запрос
//     post: (url, data, config = {}) => api.post(url, data, config),
//
//     // PUT запрос
//     put: (url, data, config = {}) => api.put(url, data, config),
//
//     // DELETE запрос
//     delete: (url, config = {}) => api.delete(url, config),
//
//     // PATCH запрос
//     patch: (url, data, config = {}) => api.patch(url, data, config),
//
//     // Для прямого доступа к axios instance
//     axios: api
// };
//
// export default api;