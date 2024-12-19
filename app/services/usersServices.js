import UserModel from "../models/usersModel.js";
import { TokenEncode } from "../utility/tokenUtility.js";

export const UserRegistrationService = async (req) => {
  try {
    let reqBody = req.body;
    let email = req.body.email;
    let email_find = await UserModel.findOne({ email: email });
    if (email_find === null) {
      await UserModel.create(reqBody);
    } else {
      return {
        status: "Fail",
        Message: "User Exists with this email",
      };
    }
    return {
      status: "success",
      Message: "User Registered successfully",
    };
  } catch (error) {
    return { Status: "Fail", Data: error }.toString();
  }
};

export const UserLoginService = async (req) => {
  try {
    let email = req.body.email;
    let password = req.body.password;
    let data = await UserModel.findOne({ email: email, password: password });
    if (data === null) {
      return { status: "Fail", Message: "User Not Found" };
    } else {
      let Token = TokenEncode(data["email"], data["_id"].toString());
      return {
        status: "Success",
        token: Token,
        Message: "User Login Successfully",
      };
    }
  } catch (error) {
    return { Status: "Fail", Data: error }.toString();
  }
};

export const ReadProfileService = async (req) => {
  try {
    let user_id = req.headers.user_id;
    let data = await UserModel.find({ _id: user_id });

    if (data.length === 0) {
      return {
        status: "Fail",
        Message: "No Profile Data Found",
      };
    }
    return {
      status: "success",
      Message: "Read Profile Successfully",
      Data: data,
    };
  } catch (error) {
    return { Status: "Fail", Data: error }.toString();
  }
};

export const ReadAllProfileService = async (req) => {
  try {
    let data = await UserModel.find({});
    if (data.length === 0) {
      return {
        status: "Fail",
        Message: "No Profile Data Found",
      };
    }
    return {
      status: "success",
      Message: "Read All Profiles Successfully",
      Data: data,
    };
  } catch (error) {
    return { Status: "Fail", Data: error }.toString();
  }
};

export const UpdateProfileService = async (req) => {
  try {
    let user_id = req.headers.user_id;
    let email = req.headers.email;
    let reqBody = req.body;
    let data = await UserModel.find({ _id: user_id });
    req.body.email = email;
    req.body.password = data["password"];

    await UserModel.updateOne({ _id: user_id }, { $set: reqBody });

    return {
      status: "success",
      Message: "Profile Created/Updated Successfully",
    };
  } catch (error) {
    return { Status: "Fail", Data: error }.toString();
  }
};

export const UserDeleteService = async (req) => {
  try {
    let reqBody = req.body;
    let email = req.body.email;
    let email_find = await UserModel.findOne({ email: email });
    if (reqBody !== null && email_find !== null) {
      await UserModel.deleteOne(reqBody);
    } else {
      return {
        status: "Fail",
        Message: "User Not Exists with this email",
      };
    }
    return {
      status: "success",
      Message: "User deleted successfully",
    };
  } catch (error) {
    return { Status: "Fail", Data: error }.toString();
  }
};
