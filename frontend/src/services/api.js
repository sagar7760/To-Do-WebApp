const API_BASE_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.PROD 
    ? 'https://taskly-7bc492659ba9.herokuapp.com/api'  // Your Heroku backend URL
    : 'http://localhost:5000/api'
  );

class TodoAPI {
  constructor() {
    this.updateToken();
  }

  updateToken() {
    this.token = localStorage.getItem('token');
  }

  getHeaders() {
    // Always get fresh token from localStorage
    this.updateToken();
    return {
      'Content-Type': 'application/json',
      ...(this.token && { Authorization: `Bearer ${this.token}` })
    };
  }

  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: this.getHeaders(),
      ...options
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'API request failed');
      }
      
      return data;
    } catch (error) {
      console.error('API request error:', error);
      throw error;
    }
  }

  // Todo API methods
  async createTodo(todoData) {
    return this.request('/todos', {
      method: 'POST',
      body: JSON.stringify(todoData)
    });
  }

  async getTodos() {
    return this.request('/todos');
  }

  async getAllTodos() {
    return this.request('/todos/all');
  }

  async getCompletedTodos() {
    return this.request('/todos/completed');
  }
  async getDeletedTodos() {
    return this.request('/todos/deleted');
  }

  async updateTodo(id, todoData) {
    return this.request(`/todos/${id}`, {
      method: 'PUT',
      body: JSON.stringify(todoData)
    });
  }

  async deleteTodo(id) {
    return this.request(`/todos/delete/${id}`, {
      method: 'PUT'
    });
  }

  async restoreTodo(id) {
    return this.request(`/todos/undo/${id}`, {
      method: 'PUT'
    });
  }

  async permanentDeleteTodo(id) {
    return this.request(`/todos/${id}`, {
      method: 'DELETE'
    });
  }

  async completeTodo(id) {
    return this.request(`/todos/complete/${id}`, {
      method: 'PUT'
    });
  }

  async uncompleteTodo(id) {
    return this.request(`/todos/uncomplete/${id}`, {
      method: 'PUT'
    });
  }

  // Auth methods (for testing - you can hardcode a token temporarily)
  setToken(token) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  removeToken() {
    this.token = null;
    localStorage.removeItem('token');
  }
}

export default new TodoAPI();
