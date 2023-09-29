import axios from 'axios';

let axiosInstance = axios.create({
    baseURL: `http://localhost:3000`,
})

class GroupsService {
    getAllGroups() {
        return axiosInstance.get('/groups');
    }

    getOneGroup(groupId: string) {
        return axiosInstance.get(`/groups/${groupId}`);
    }

    getGroupContacts(groupId: number) {
        return axiosInstance.get(`/groups/${groupId}/contacts`);
    }

    addGroup(group: any) {
        return axiosInstance.post(`/groups`, group);
    }

    updateGroup(groupId: number, group: any) {
        return axiosInstance.put(`/groups/${groupId}`, group);
    }

    deleteGroup(groupId: number) {
        return axiosInstance.delete(`/groups/${groupId}`);
    }
}

export const groupsService = new GroupsService();
