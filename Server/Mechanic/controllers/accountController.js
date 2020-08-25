const MemberModel = require("../model/memberModel");

exports.updateProfile = (req, res) => {
  const id = req.params.mechId;
  MemberModel.updateMany({ _id: id }, { $set: req.body })
    .exec()
    .then((response) => {
      console.log("Profile Updated Successfully: " + response);
      res.status(200).json({
        message: " Profile Updated Successfully",
        response,
      });
    })
    .catch((err) => {
      console.log("Profile Update error: " + err);
      res.status(500).json({ "Profile Update error ": err });
    });
};

exports.deleteProfile = (req, res) => {
  const id = req.params.mechId;
  MemberModel.deleteOne({ _id: id })
    .exec()
    .then((response) => {
      res.status(200).json({
        message: "Account Deleted",
      });
    })
    .catch((err) => {
      console.log("Account Delete error: " + err);
      res.status(500).json({ "Account Delete error ": err });
    });
};
