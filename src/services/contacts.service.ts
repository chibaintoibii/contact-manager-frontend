import axios from 'axios';

let axiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
    }
})
class ContactsService {
    async getAllContacts() {
        return axiosInstance.get('/contacts');
    }

    async getOneContact(id: string) {
        return axiosInstance.get(`/contacts/${id}`);
    }

    async createContact(contact: any) {
        return axiosInstance.post('/contacts', contact);
    }

    async updateContact(id: number, contact: any) {
        return axiosInstance.put(`/contacts/${id}`, contact);
    }

    async deleteContact(id: number) {
        return axiosInstance.delete(`/contacts/${id}`);
    }
}

export const contactsService = new ContactsService()