//Запуск без Docker
const API_BASE_URL = 'http://localhost:8081';
//Запуск с помощью Docker
// const API_BASE_URL = '/api/files/';

class ApiServiceFileManager {
    constructor() {
        this.isRefreshing = false;
        this.failedRequests = [];
    }

    async request(url, options = {}) {

        const config = {
            ...options
        };

        let response = await fetch(`${API_BASE_URL}${url}`, config);

        //Если токен истек, пытаемся обновить его и повторить запрос
        if (response.status === 401 && !url.includes('/auth/refresh')) {
            return this.handleUnauthorized(response, url, config);
        }

        return response;
    }

    async handleUnauthorized(originalResponse, url, originalConfig) {
        if (this.isRefreshing) {
            //Если уже идет процесс обновления токена, ждем его завершения
            return new Promise((resolve) => {
                this.failedRequests.push({resolve});
            }).then(() => this.request(url, originalConfig));
        }

        this.isRefreshing = true;

        try {
            const newToken = await this.refreshToken();

            //Обнолвяем токен в localStorage
            const user = JSON.parse(localStorage.getItem('user'));
            user.accessToken = newToken;
            localStorage.setItem('user', JSON.stringify(user));

            const newConfig = {
                ...originalConfig,
                headers: {
                    ...originalConfig.headers,
                    'Authorization': `Bearer ${newToken}`
                }
            };

            //Повторяем оригинальный запрос с обновленным токеном
            const newResponse = await fetch(`${API_BASE_URL}${url}`, newConfig)

            //Разрешаем все ожидающие запросы
            this.failedRequests.forEach((promise) => promise.resolve());
            this.failedRequests = [];

            return newResponse;
        } catch (error) {
            // Если refresh тоже failed, то делаем logout
            this.failedRequests.forEach((promise) => promise.resolve());
            this.failedRequests = [];

            localStorage.removeItem('user');
            window.location.href = '/login';
            throw error;
        } finally {
            this.isRefreshing = false;
        }
    }

    async refreshToken() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user?.refreshToken) {
            throw new Error('No refresh token available');
        }

        const response = await fetch(`${API_BASE_URL}/api/v1/auth/refresh-token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({refreshToken: user?.refreshToken})
        });

        if (!response.ok) {
            throw new Error('Refresh token failed');
        }

        const data = await response.json();
        return data.accessToken;
    }

    //Вспомогательные методы для разных HTTP методов
    async get(url) {
        return this.request(url, {method: 'GET'});
    }

    async post(url, body, isFormData = false) {
        let headers = {};

        if (!isFormData) {
            headers['Content-Type'] = 'application/json';
        }

        const config = {
            method: 'POST',
            headers,
            body: isFormData ? body : JSON.stringify(body)
        };

        return this.request(url, config);
    }

    async put(url, body, isFormData = false) {
        let headers = {};

        if (!isFormData) {
            headers['Content-Type'] = 'application/json';
        }

        const config = {
            method: 'PUT',
            headers,
            body: isFormData ? body : JSON.stringify(body)
        };

        return this.request(url, config);
    }

    async delete(url) {
        return this.request(url, {method: 'DELETE'});
    }
}

export const apiServiceFileManager = new ApiServiceFileManager();