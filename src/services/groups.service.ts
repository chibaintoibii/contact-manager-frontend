import axios from 'axios';

class GroupsService {
    private readonly API_URL = 'http://localhost:3001';
    getAllGroups() {
        const dataURL = `${this.API_URL}/groups`;
        return axios.get(dataURL);
    }

    getOneGroup(groupId: string) {
        const dataURL = `${this.API_URL}/groups/${groupId}`;
        return axios.get(dataURL);
    }

    getGroupContacts(groupId: number) {
        const dataURL = `${this.API_URL}/groups/${groupId}/contacts`;
        return axios.get(dataURL);
    }

    addGroup(group: any) {
        const dataURL = `${this.API_URL}/groups`;
        return axios.post(dataURL, group);
    }

    updateGroup(groupId: number, group: any) {
        const dataURL = `${this.API_URL}/groups/${groupId}`;
        return axios.put(dataURL, group);
    }

    deleteGroup(groupId: number) {
        const dataURL = `${this.API_URL}/groups/${groupId}`;
        return axios.delete(dataURL);
    }
}

export const groupsService = new GroupsService();
