const user = require("../models/user");

module.exports.renderSignupForm = (req, res) => {
    res.render("users/signup.ejs");
}


module.exports.signUp = async(req, res) => {
   try{
    let {username, email, password} = req.body;
    const newUser = new user({email, username});
   const registeredUser = await user.register(newUser, password);
   req.login(registeredUser, (err) => {
    if(err){ 
        return next(err);
    }
    req.flash("success", "welcome to wanderlust!");
    res.redirect("/listings");
   })
   
   }catch(e){
    req.flash("error", e.message);
    res.redirect("/signup");
   }
};


module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs");
};


module.exports.logIn = async (req, res) => {
    req.flash("success","Welcome back to wanderlust!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

module.exports.logOut = (req, res) => {
    req.logout((err) => {
        if(err){
            return next(err);
        }
        req.flash("success", "you are logged out!");
        res.redirect("/listings");
    })
};