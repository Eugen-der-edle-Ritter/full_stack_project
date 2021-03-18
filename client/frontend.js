import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.js'

new Vue({
    el: '#app',
    data: {
        name:'',
        age: null,
        contacts: []
    },
    methods: {
        async addUser() {
            const contact = await request('/api/contacts', 'POST', {name : this.name, age: this.age})
            console.log(contact)
            this.contacts.push(contact)
        }
    },
    async mounted() {
        const data = await fetch('/api/contacts')
        const contacts = await data.json()
        this.contacts = contacts
        console.log(contacts, 'hi')
    }
})

async function request(url, method='GET', data = null) {
    try {
        const headers = {}
        let body

        if (data) {
            headers['Content-Type'] = 'application/json'
            body = JSON.stringify(data)
        }

        const response = await fetch(url, {
            method,
            headers,
            body
        })
        return await response.json()
    } catch (e) {
        console.warn('Error', e.message)
    }
}