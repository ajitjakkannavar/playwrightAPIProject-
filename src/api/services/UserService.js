class UserService {
    constructor(request) {
        this.request = request;
        this.endpoint = '/users';
    }
    async getAllUsers() {
        return await this.request.get(this.endpoint)

    }
    async getUserById(userid, schema = null) {
        const response = await this.request.get(`${this.endpoint}/${userid}`);
        const body = await response.json();

        // Validate schema if passed
        if (schema) {
            validateSchema(schema, body);
        }

        // MUST return an object containing both response and body!
        return { response, body };
    }
    async createUser(userPayLoad) {
        return await this.request.post(this.endpoint, {
            data: userPayLoad,
        })

    }
    //Delete user by ID
    async deleteUser(userid) {
        return await this.request.delete(`${this.endpoint}/${userid}`)


    }
    async updateUser(userid, updateuserpayload) {
        return await this.request.put(`${this.endpoint}/${userid}`, {
            data: updateuserpayload,
        })

    }
    async patchupdateUser(userid, partialpayload) {
        return await this.request.patch(`${this.endpoint}/${userid}`, {
            data: partialpayload,
        })

    }

}
module.exports = UserService;