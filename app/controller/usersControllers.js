import * as Services from "../services/usersServices.js";

export const UserRegistration = async (req, res) => {
  let Result = await Services.UserRegistrationService(req);
  res.status(200).json(Result);
};

export const UserLogin = async (req, res) => {
  let Result = await Services.UserLoginService(req);
  if (Result["status"] === "Success") {
    let cookieOpt = {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      httpOnly: false,
    };
    res.cookie("token", Result["token"], cookieOpt);
  } else {
    res.status(401).json({
      status: "Fail",
      Message: "User Login Failed",
    });
  }
  res.status(200).json(Result);
};

export const ReadProfile = async (req, res) => {
  let Result = await Services.ReadProfileService(req);
  res.status(200).json(Result);
};

export const ReadAllProfile = async (req, res) => {
  let Result = await Services.ReadAllProfileService(req);
  res.status(200).json(Result);
};

export const UpdateProfile = async (req, res) => {
  let Result = await Services.UpdateProfileService(req);
  res.status(200).json(Result);
};

export const UserDelete = async (req, res) => {
  let Result = await Services.UserDeleteService(req);
  res.status(200).json(Result);
};
