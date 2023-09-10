import * as api from './api.js';


const endpoints = {
    recent: '/data/games?sortBy=_createdOn%20desc&distinct=category',
    motors: '/data/motorcycles?sortBy=_createdOn%20desc',
    create: '/data/motorcycles/',
    byId: '/data/motorcycles/',
    del: '/data/motorcycles/',
    update: '/data/motorcycles/',
}

export async function getRecent() {
    return api.get(endpoints.recent);
}

export async function getAll() {
    return api.get(endpoints.motors);
}

export async function create(data) {
    return api.post(endpoints.create, data)
}

export async function getById(id) {
    return api.get(endpoints.byId + id)
}

export async function deleteById(id) {
    return api.del(endpoints.deleteById + id)
}

export async function update(id, data) {
    return api.put(endpoints.update + id, data)
}