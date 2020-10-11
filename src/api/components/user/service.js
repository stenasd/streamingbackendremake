const models = require('../../../../db/models');
const userModel = models.userModel;
const videoModel = models.movieModel
//start()
exports.getRawUserId = async function (idParam) {
    const user = await userModel.findOne({ where: { id: idParam } });
    return user;
};
exports.getRawUserName = async function (nameparam) {
    const user = await userModel.findOne({ where: { name: nameparam } });
    return user;
};
exports.updateUserMovieData = async function (idParam, movieDataParam) {
    return await userModel.update({ moviedata: movieDataParam }, {
        where: {
            id: idParam
        }
    })

};
exports.getRawMovieFromId = async function (idParam) {
    const movie = await videoModel.findOne({ where: { id: idParam } });
    return movie;
};
async function start() {
    await userModel.sync({ force: true });
}