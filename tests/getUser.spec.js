const UserService = require('../src/api/services/UserService')
const { test, expect, request } = require('@playwright/test')
const getUserData = require('../src/data/factories/UserFactory')
const userSchema = require('../src/data/schemas/userSchema')
test.describe('User fetch createvalidation', () => {
    let userService;
    let userPayLoad;
    let createdUserId = 1;

    test.beforeEach(async ({ request }) => {
        userService = new UserService(request)
    })

    test('Fetch all Users', async () => {
        const response = await userService.getAllUsers()
        const body = await response.json()
        console.log(`The total number of user:${body.length}`)
        expect(await response.status()).toBe(200)
        expect(body.length).toBeGreaterThan(0)
    })

    test('create user', async () => {
        userPayLoad = getUserData()
        const response = await userService.createUser(userPayLoad)
        expect(response.status()).toBe(201)
        const body = await response.json()
        expect(body.name).toBe(userPayLoad.name)
        expect(body.email).toBe(userPayLoad.email)
        createdUserId = body.id || 1;
    })
    test('Get a user by id', async () => {
        // 1. Destructure { response, body } directly from the service method
        const { response, body } = await userService.getUserById(1, userSchema);

        // 2. No need for `await response.json()` — use `body` directly!
        console.log(`The user fetched by id: ${body.name} (${body.email})`);
        expect(response.status()).toBe(200);
        expect(body.id).toBe(1);
        expect(body).toHaveProperty('email');
    })
    test('Update User', async () => {
        const updatedName = 'Updated Name via Automation';
        const partialpayload = { name: updatedName }
        const response = await userService.patchupdateUser(createdUserId, partialpayload)
        expect(response.status()).toBe(200)
        const body = await response.json()
        expect(body.name).toBe(updatedName)
    })


    test('delete user', async () => {
        const response = await userService.deleteUser(createdUserId)
        expect(response.status()).toBe(200)
        const body = await response.json()
        console.log('Delete response', body)
    })





})