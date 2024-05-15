import UserModels from "../models/User.model.js";

const Createuser = async (req, res) => {
  try {
    const { name, fathername, email, phone } = req.body;

    const NewUSer = new UserModels({
      name,
      fathername,
      email,
      phone,
    });

    await NewUSer.save();

    res.status(200).json({
      status: "success",
      data: NewUSer,
      message: "User Created Successfully",
      error: false,
    });
  } catch (error) {
    console.log("error", error);

    res.status(500).json({
      status: "error",
      message: "Something went wrong",
      error: true,
    });
  }
};

// ..........................................................read api

const getUser = async (req, res) => {
  try {
    const user = await UserModels.find();
    if (!user) {
      res.status(404).json({
        status: "error",
        message: "User not found",
        error: true,
        success: false,
      });
    }

    res.status(200).json({
      status: "success",
      data: user,
      message: "User found",
      error: false,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({
      status: "error",
      message: "Something went wrong",
      error: true,
    });
  }
};

//................................................update user

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedUser = await UserModels.findByIdAndUpdate(userId, req.body, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
        error: true,
      });
    }
    res.status(200).json({
      status: "success",
      data: updatedUser,
      message: "User updated successfully",
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({
      status: "error",
      message: "Something went wrong",
      error: true,
    });
  }
};

// ...................................................deleteUser

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await UserModels.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
        error: true,
      });
    }

    return res.status(200).json({
      status: "success",
      message: "User deleted successfully",
    })
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      status: "error",
      message: "Something went wrong",
      });
  }
};
export { Createuser, getUser, updateUser, deleteUser };
