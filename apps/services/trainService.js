const { ObjectId } = require('mongodb');
var config = require("./../../config/setting.json");
class TrainService{
    databaseConnection = require('./../database/database');
    train = require('./../model/train');
    client;
    metroDatabase;
    trainCollection;
    constructor(){
        this.client = this.databaseConnection.getMongoClient();
        this.metroDatabase =  this.client.db(config.mongodb.database);
        this.trainCollection = this.metroDatabase.collection("train");
    }
    async getTrainList() {
        const cursor = await this.trainCollection.find({}, {}).skip(0).limit(100);
        return await cursor.toArray();
    }
    async getTrainListByIdTrainLine(idTrainLine) {
        const cursor = await this.trainCollection.find({"idTrainLine": idTrainLine}, {}).skip(0).limit(100);
        return await cursor.toArray();
    }
    async getTrainById(id){
        return await this.trainCollection.findOne({"_id": new ObjectId(id) },{});
    }
    async insertTrain(train){
        return await this.trainCollection.insertOne(train);
    }
    async updateTrain(train){
        return await this.trainCollection.updateOne({"_id": new ObjectId(train._id) }, {$set: train});
    }
    async deleteTrain(id){
        return await this.trainCollection.deleteOne({"_id": new ObjectId(id) });
    }
}
module.exports = TrainService;
