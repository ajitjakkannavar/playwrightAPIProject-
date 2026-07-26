const { faker } = require('@faker-js/faker')
function generateUser(customData = {}) {
    return {
        name: faker.person.fullName(),
        username: faker.internet.username(),
        email: faker.internet.email(),
        address: {
            street: faker.location.streetAddress(),
            city: faker.location.city(),
            zipcode: faker.location.zipCode()
        },
        phone: faker.phone.number(),
        website: faker.internet.domainName(),
        company: {
            name: faker.company.name(),
        },
        ...customData



    }

}
module.exports = generateUser;