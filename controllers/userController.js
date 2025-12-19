const User = require("../models/User");
const calculateDistance = require("../utils/index");

const DAY_MAP = {
  0: "sunday",
  1: "monday",
  2: "tuesday",
  3: "wednesday",
  4: "thursday",
  5: "friday",
  6: "saturday",
};
// Status Toggler
exports.toggleAllUsersStatus = async (req, res) => {
  try {
    const users = await User.find({}, { status: 1 });

    if (!users.length) {
      return res.status(404).json({
        status_code: 404,
        message: "No users found",
      });
    }

    const bulkOps = users.map((user) => ({
      updateOne: {
        filter: { _id: user._id },
        update: {
          status: user.status === "active" ? "inactive" : "active",
        },
      },
    }));

    await User.bulkWrite(bulkOps);

    return res.status(200).json({
      status_code: 200,
      message: "All users status toggled successfully",
      total_users_updated: users.length,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status_code: 500,
      message: "Internal server error",
    });
  }
};

// pass lat,long in querry
exports.getDistanceFromDestination = async (req, res) => {
  try {
    const { destLat, destLng } = req.query;

    if (!destLat || !destLng) {
      return res.status(400).json({
        status_code: 400,
        message: "destLat and destLng query parameters are required",
      });
    }

    // user id from token
    const user = await User.findById(req.user.id);

    if (!user || user.latitude == null || user.longitude == null) {
      return res.status(404).json({
        status_code: 404,
        message: "User location not found",
      });
    }

    const distance = calculateDistance(
      user.latitude,
      user.longitude,
      Number(destLat),
      Number(destLng)
    );

    return res.status(200).json({
      status_code: 200,
      message: "Distance calculated successfully",
      distance: `${distance.toFixed(2)} km`,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status_code: 500,
      message: "Internal server error",
    });
  }
};

exports.getUsersByDays = async (req, res) => {
  try {
    const { days } = req.query;

    if (!days) {
      return res.status(400).json({
        status_code: 400,
        message: "days query param is required. Example: ?days=1,3,4",
      });
    }

    const dayNums = days.split(",").map((d) => Number(d));

    // validate
    if (dayNums.some((d) => isNaN(d) || d < 0 || d > 6)) {
      return res.status(400).json({
        status_code: 400,
        message: "Days must be numbers between 0 and 6",
      });
    }

    const result = await User.aggregate([
      { $match: { registeredDay: { $in: dayNums } } },
      {
        $project: {
          name: 1,
          email: 1,
          registeredDay: 1,
          _id: 0,
        },
      },
      {
        $group: {
          _id: "$registeredDay",
          users: { $push: { name: "$name", email: "$email" } },
        },
      },
    ]);

    const data = {};
    result.forEach((item) => {
      const dayName = DAY_MAP[item._id];
      data[dayName] = item.users;
    });

    return res.status(200).json({
      status_code: 200,
      message: "Users fetched successfully",
      data,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status_code: 500,
      message: "Internal server error",
    });
  }
};
