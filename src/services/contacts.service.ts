import axios from 'axios';
class ContactsService {
    private readonly API_URL = 'http://localhost:3001';
    async getAllContacts() {
        const dataURL = `${this.API_URL}/contacts`;
        return axios.get(dataURL);
    }

    async getOneContact(id: string) {
        const dataURL = `${this.API_URL}/contacts/${id}`;
        return axios.get(dataURL);
    }

    async createContact(contact: any) {
        const dataURL = `${this.API_URL}/contacts`;
        return axios.post(dataURL, contact);
    }

    async updateContact(id: number, contact: any) {
        const dataURL = `${this.API_URL}/contacts/${id}`;
        return axios.put(dataURL, contact);
    }

    async deleteContact(id: number) {
        const dataURL = `${this.API_URL}/contacts/${id}`;
        return axios.delete(dataURL);
    }
}

export const contactsService = new ContactsService()