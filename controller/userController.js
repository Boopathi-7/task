import { createUser, getUser, getAllUsers } from "../model/userModel.js";

// Render registration page
export const registration = (req, res) => {
  res.render("main");
};

// Handle registration process
export const registrationProcess = async (req, res) => {
  try {
    const { name, mail, password } = req.body;

    console.log(name, mail, password);
     

       // Email validation (basic format check)
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(mail)) {
      return res.status(400).render('main', { message: "Invalid email format",error:"error",name,mail,password });
    }
 
     // Validate Password
     if (password.trim().length < 6) {
       return res.status(400).render('main',{message:"Password must be at least 6 characters long.",error:"error",name,mail,password});
     }

    // Validate inputs
    if (!name || !mail || !password) {
      return res.status(400).render('main',{message:"All fields are required",error:"error",name,mail,password})
    }
    

    // Check if user already exists
    const existingUser = await getUser(mail);
    if (existingUser) {
      return res.status(409).render('main',{message:"Email already registered",name,mail,password}); 
    }

    // Save user to database
    const newUser = await createUser({ name, mail, password });
    res.status(200).render('main',{message: "Registration successful"});
  } catch (err) {
    res.status(500).json({ message: "Registration failed", error: err.message });
  }
};

// Render login page
export const login = (req, res) => {
  res.render("login");
};

// Handle login process
export const loginProcess = async (req, res) => {
  try {
    const { mail, password } = req.body;
      
    // Validate inputs
    if (!mail || !password) {
      return res.status(400).render('login',{message:"All fields are required",error:"error",mail,password});
    }

    // Check if user exists and password matches
    const user = await getUser(mail);
    if (!user){
      return res.status(404).render('login',{message:"User not found",error:"error",mail,password});
    } else if (user && user.password !== password) {
      return res.status(401).render('login', { message: "Invalid email or password",error:"error",mail,password }); // Use render instead of json({ message: "Invalid email or password" });
    }

    res.status(200).render('welcome',{message: "welcome",user:user.name});
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};

// Controller code
export const showAllUsers = async (req, res) => {
  try {
    const users = await getAllUsers();

    // Ensure each user has own properties 'name' and 'mail'
    const filteredUsers = users.map(user => ({
      name: user.name ,
      mail: user.mail 
    }));

    console.log(filteredUsers); // Log to check the output in the terminal

    res.status(200).render('users', { users: filteredUsers });
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve users', error: err.message });
  }
};





