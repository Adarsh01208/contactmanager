import axios from "axios";

export class ContactService {

    static serverURL = `http://localhost:3001`;

    static getAllContacts() {
        let dataURL = `${this.serverURL}/contacts`;
        return axios.get(dataURL);
    }

    static getContactById(id) {
        let dataURL = `${this.serverURL}/contacts/${id}`;
        return axios.get(dataURL);
    }

    static getGroups() {
        let dataURL = `${this.serverURL}/groups`;
        return axios.get(dataURL);
    }

    static getGroup(contacts) {
        let group = contacts.group;
        let dataURL = `${this.serverURL}/groups/${group}`;
        return axios.get(dataURL);
    }

    static createContact(contact) {
        let dataURL = `${this.serverURL}/contacts`;
        return axios.post(dataURL, contact);
    }

    static updateContact(contact, id) {
        let dataURL = `${this.serverURL}/contacts/${id}`;
        return axios.put(dataURL, contact);
    }

    static deleteContact(id) {
        let dataURL = `${this.serverURL}/contacts/${id}`;
        return axios.delete(dataURL);
    }
}