const bcrypt = require("bcrypt");

const users = [];

module.exports = {
  login: (req, res) => {
    console.log("Logging In User");
    console.log(req.body);
    const { username, password } = req.body;
    for (let i = 0; i < users.length; i++) {
      const existingPass = bcrypt.compareSync(password, users[i].hashedPass);
      if (users[i].username === username && existingPass) {
        let secureUserObj = { ...users[i] };

        delete secureUserObj.hashedPass;
        res.status(200).send(secureUserObj);
        console.log("User logged in");
        return;
      }
    }
    console.log("User not found");
    res.status(400).send("User not found.");
  },
  register: (req, res) => {
    const { username, email, firstName, lastName, password } = req.body;
    const salt = bcrypt.genSaltSync(12);
    const hashedPass = bcrypt.hashSync(password, salt);

    let userObj = {
      username,
      email,
      firstName,
      lastName,
      hashedPass,
    };

    let secureUserObj = { ...userObj };

    delete secureUserObj.hashedPass;
    console.log("Registering User");
    users.push(userObj);
    console.log(secureUserObj);
    res.status(200).send(secureUserObj);
  },
};
