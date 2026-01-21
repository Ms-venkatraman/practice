
const models = {
    users : require('../models/user'),
}
const Respository = {
    create: async (tableName, data) => {
        console.log("signUp tableName  : =========> :: ",tableName);
        const Model = models[tableName];
        console.log("signUp Model  : =========> :: ", Model);
        const Result = await Model.create(data);
        return Result;
    },
    findOne: async (tableName, query) => {
        console.log("login tableName  : =========> :: ",tableName);
        const Model = models[tableName];
        const Result = await Model.findOne(query);
        return Result;
    },    
}
module.exports = Respository;