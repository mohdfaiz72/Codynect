import Notification from "../models/notification.model.js";

export const getNotifications = async (req, res) => {
  try {
    const notifs = await Notification.find({ recipient: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(notifs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
