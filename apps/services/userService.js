const { ObjectId } = require('mongodb');
var config = require("./../../config/setting.json");
class UserService{
    databaseConnection = require('./../database/database');
    user = require('./../model/user');
    client;
    metroDatabase;
    userCollection;
    constructor(){
        this.client = this.databaseConnection.getMongoClient();
        this.metroDatabase =  this.client.db(config.mongodb.database);
        this.userCollection = this.metroDatabase.collection("users");
    }
    async getUserList() {
        const cursor = await this.userCollection.find({}, {}).skip(0).limit(100);
        return await cursor.toArray();
    }
    async deleteUser(id){
        return await this.userCollection.deleteOne({"_id": new ObjectId(id) });
    }
}
module.exports = UserService;
