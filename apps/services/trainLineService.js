const { ObjectId } = require('mongodb');
var config = require("./../../config/setting.json");
class TrainLineService{
    databaseConnection = require('./../database/database');
    trainLine = require('./../model/trainLine');
    client;
    metroDatabase;
    trainLineCollection;
    constructor(){
        this.client = this.databaseConnection.getMongoClient();
        this.metroDatabase =  this.client.db(config.mongodb.database);
        this.trainLineCollection = this.metroDatabase.collection("trainLine");
    }
    async getTrainLineList() {
        const cursor = await this.trainLineCollection.find({}, {}).skip(0).limit(100);
        return await cursor.toArray();
    }
    async getTrainLineById(id){
        return await this.trainLineCollection.findOne({"_id": new ObjectId(id) },{});
    }
    async insertTrainLine(trainLine){
        return await this.trainLineCollection.insertOne(trainLine);
    }
    async updateTrainLine(trainLine){
        return await this.trainLineCollection.updateOne({"_id": new ObjectId(trainLine._id) }, {$set: trainLine});
    }
    async deleteTrainLine(id){
        return await this.trainLineCollection.deleteOne({"_id": new ObjectId(id) });
    }
}
module.exports = TrainLineService;
