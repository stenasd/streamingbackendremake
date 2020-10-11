const service = require('./service');
exports.findById = function (id, cb) {
    process.nextTick(async function () {
        var idx = await service.getRawUserId(id)

        if (idx) {
            cb(null, idx);
        } else {
            cb(new Error('User ' + id + ' does not exist'));
        }
    });
}
//if find atleast 1 in database return userobject
exports.findByUsername = function (username, cb) {
    process.nextTick(async function () {
        let a = await service.getRawUserName(username)
        return cb(null, a);

    });
}
exports.getMovieFromId = async function (id) {
    return await service.getRawMovieFromId(id)
}

exports.getUserFromId = async function (id) {
    return await service.getRawUserId(id)
}

exports.UpdateMovieData = function (id, movieData) {
    movieData = JSON.stringify(movieData)
    service.updateUserMovieData(id, movieData)
}
exports.jsonpostformater = function (reqbody, usermoviearray) {
    var idcheck = parseInt(reqbody.id)
    var timecheck = parseInt(reqbody.time)
    if (!idcheck) {
        console.log("notnum");
        return (usermoviearray)
    }
    if (!timecheck) {
        console.log("notnum");
        return (usermoviearray)
    }
    if (typeof usermoviearray.movarr[0].id !== 'undefined') {
        if (usermoviearray.movarr[0].id == reqbody.id) {
            usermoviearray.movarr[0].time = reqbody.time
            return (usermoviearray)
        }
    }


    let currentindex
    usermoviearray.movarr.forEach(userelement => {
        //if already on watch move to front and update to latest time
        if (userelement.id == reqbody.id) {
            usermoviearray[currentindex].time = reqbody.time
            usermoviearray.unshift(usermoviearray.splice(currentindex, 1)[0])
            console.log("inforeach");
            return (usermoviearray)
        }
        currentindex++;
    });
    usermoviearray.movarr.unshift(reqbody)
    return (usermoviearray)
}
