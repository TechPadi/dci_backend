const Admin = require("../models/admin/admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const User = require("../models/user/User");
const Dci = require("../models/index");

exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new Admin({
      fullname: req.body.fullname,
      email: req.body.email,
      phonenumber: req.body.phonenumber,
      residentialAddress: req.body.residentialAddress,
      nearestBusStop: req.body.nearestBusStop,
      town: req.body.town,
      State: req.body.State,
      country: req.body.country,
      DateOfBirth: req.body.DateOfBirth,
      idNumber: req.body.idNumber,
      idType: req.body.idType,
      AdminType: req.body.type,
      password: hash,
    });
    user
      .save()
      .then(() => {
        res.status(201).json({
          message: "Admin added successfully!",
          user,
        });
      })
      .catch((error) => {
        res.status(500).json({
          error: error,
        });
      });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  Admin.findOne({ email }, (err, user) => {
    if (err) {
      return res.status(500).json({
        message: "login error",
        status: false,
      });
    }
    if (!user) {
      return res.status(404).json({
        message: "admin does not exist",
        status: false,
      });
    }
    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      return res.status(403).json({
        message: "login invalid",
        status: false,
      });
    }
    const token = jwt.sign({ id: user._id }, SECRET_KEY, {
      expiresIn: "86400s",
    });
    res.status(200).json({
      user,
      message: "Authenticated",
      token,
    });
  });
};

exports.AdminDashboard = (req, res) => {
  Admin.findById({ _id: req.params.id }, (err, user) => {
    if (err) {
      res.status(400).json({
        message: "error occured or user not found",
        status: false,
      });
    } else {
      res.json({
        message: "successfully found user",
        status: true,
        user,
      });
    }
  });
};

exports.AllAdmins = (req, res) => {
  Admin.find({ AdminType: "admin" }).then((response) => {
    res.send(response);
  });
};
exports.Pending = (req, res) => {
  User.find({ requestinvestment: true }).then((response) => {
    res.send(response);
  });
};
function addMonths(date, months) {
  var d = date.getDate();
  date.setMonth(date.getMonth() + +months);
  if (date.getDate() != d) {
    date.setDate(0);
  }
  return date;
}
exports.verifyinvestor = (req, res) => {
  Admin.findById({ _id: req.body.id }, (err, admin) => {
    if (err) {
      res.status(400).json({
        message: "error occured or admin not found",
        status: false,
      });
    } else {
      admin.activityLogs.push(req.body);
      admin.save();
      const d = new Date();
      const year = d.getFullYear();
      const month = d.getMonth();
      const day = d.getDate();
      User.findById({ _id: req.params.id }, (err, user) => {
        let interval = 0;
        if (
          user.planDetails.dataName.split(" ")[0] === "AFI" ||
          user.planDetails.dataName.split(" ")[0] === "BFI"
        ) {
          interval = 12;
        } else if (
          user.planDetails.dataName.split(" ")[0] === "AMI" ||
          user.planDetails.dataName.split(" ")[0] === "BMI"
        ) {
          interval = 1;
        }
        (user.activeplan = true),
          (user.requestinvestment = false),
          (user.investmentReturnsBalance = 0),
          (user.investmentReturnsPercentage = 0),
          (user.investmentStartDate = new Date()),
          (user.investmentNextPayDate = addMonths(
            new Date(year, month, day),
            interval
          ).toString());
        Dci.findById({ _id: "5fdba26ebc903b00170202aa" }, (err, appdata) => {
          appdata.investmentBalance + parseInt(user.planDetails.planPrice);
          appdata.save();
        });

        user.save((err, data) => {
          if (err) res.send(err);
          res.send(data);
        });
      }).catch((err) => {
        res.send(err);
      });
    }
  });
};

exports.PendingLoaner = (req, res) => {
  User.find({ LoanRequest: true }).then((response) => {
    res.send(response);
  });
};
exports.verifyloaner = (req, res) => {
  User.findOneAndUpdate({ _id: req.params.id }, { LoanActive: true })
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      res.send(err);
    });
};
exports.PendingSaveAdd = (req, res) => {
  User.find({ AddSaveRequest: true }).then((response) => {
    res.send(response);
  });
};
exports.savingsIsActive = (req, res) => {
  User.find({ SavingsActive: true }).then((response) => {
    res.send(response);
  });
};
exports.verifysavings = (req, res) => {
  const { amount } = req.body;
  User.findOneAndUpdate(
    { _id: req.params.id },
    { SavingsActive: true, AddSaveRequest: false }
  )
    .then((response) => {
      response.savingBalance = response.savingBalance + amount;
      response.SavingsActive = true;
      user.save((response1) => {
        res.json({
          response,
          response1,
        });
      });
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.PayLoan = (req, res) => {
  User.find({ repayLoanRequest: true }).then((response) => {
    res.send(response);
  });
};
exports.verifypayloan = (req, res) => {
  const { amount, nextDate } = req.body;
  User.findById({ _id: req.params.id })
    .then((user) => {
      user.repayLoanRequest = true;
      user.amountToRepayBalance = user.amountToRepayBalance - parseInt(amount);
      user.save((response1) => {
        res.json({
          user,
          response1,
        });
      });
    })
    .catch((err) => {
      res.send(err);
    });
};
exports.stirequest = (req, res) => {
  User.find({ AddSaveRequest: true }).then((response) => {
    res.send(response);
  });
};
exports.verifysti = (req, res) => {
  const { amount } = req.body;
  User.findById({ _id: req.params.id })
    .then((user) => {
      user.AddSaveRequest = false;
      user.SavingsActive = false;
      user.savingBalance = user.savingBalance + parseInt(amount);
      user.save((response1) => {
        res.json({
          user,
          response1,
          amount,
        });
      });
    })
    .catch((err) => {
      res.send(err);
    });
};
