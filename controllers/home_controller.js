module.exports.home = function(req,res){
    return res.send("<h1> my app is ready to code </h1>");
}

module.exports.about = function(req,res){
    return res.send('<h1> About controller call back function</h1>');
}