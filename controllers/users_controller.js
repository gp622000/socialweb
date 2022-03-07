const User = require('../models/user');

module.exports.profile = function(req,res){
  res.render('user_profile',{
                    title : 'User',
                }
            )          
  
}


//render the sign up page
module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up',{
        title : 'SocialWeb | Sign Up'
    })
}

//render the sign in page 
module.exports.signIn = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in',{
        title : "SocialWeb | Sign In"
    })
}

// get the sign up data
module.exports.create = function(req,res){
   
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back')
    }
    User.findOne({email : req.body.email},function(err,user){
        if(err){console.log('error in finding user in signing up'); return}

        if(!user){
            User.create(req.body,function(err,user){
                if(err) {console.log('error in creating use rwhile signing up:');return}

                return res.redirect('/users/sign-in')
            })
        }else{
            return res.redirect('back');
        }
    });

}

//sign in and create a session for the user
// Manual authentication 
/*
module.exports.createSession = function(req,res){
    
    // steps to authenticate
    // find the user
    console.log(User.password);
    User.findOne({email : req.body.email},function(err,user){
        if(err){console.log('error in finding user in signing in'); return}
        //handle user found
        if(user){
            // handle password which doesn't match
            if(user.password != req.body.password){
                return res.redirect('back');
            }
            // handle session creation
            res.cookie('user_id',user.id);
            res.redirect('/users/profile');

        }else{
            //handle user not found
            return res.redirect('back');
        }
    });
    

}
*/
// sign in and create a session for the user using passport js
module.exports.createSession = function(req,res){
    return res.redirect('/');
}

module.exports.destroySession = function(req,res){
    req.logout();

    return res.redirect('/');
}

