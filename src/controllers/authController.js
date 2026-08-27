const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const generateToken = require('../utils/generateToken');
const Admin = require('../models/Admin');

// @desc    Login admin & get token
// @route   POST /api/auth/login
// @access  Public
const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new ApiError(400, 'الرجاء إدخال اسم المستخدم وكلمة المرور');
  }

  const admin = await Admin.findOne({ username }).select('+password');

  if (!admin || !(await admin.matchPassword(password))) {
    throw new ApiError(401, 'بيانات الدخول غير صحيحة');
  }

  res.json({
    success: true,
    data: {
      id: admin._id,
      username: admin.username,
      email: admin.email,
      token: generateToken(admin._id),
    },
  });
});

// @desc    Get currently logged-in admin
// @route   GET /api/auth/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  res.json({
    success: true,
    data: {
      id: req.admin._id,
      username: req.admin.username,
      email: req.admin.email,
    },
  });
});

// @desc    Change password
// @route   PUT /api/auth/change-password
// @access  Private
const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    throw new ApiError(400, 'الرجاء إدخال كلمة المرور الحالية والجديدة');
  }
  if (newPassword.length < 6) {
    throw new ApiError(400, 'كلمة المرور الجديدة يجب أن تكون 6 أحرف على الأقل');
  }

  const admin = await Admin.findById(req.admin._id).select('+password');
  if (!(await admin.matchPassword(currentPassword))) {
    throw new ApiError(401, 'كلمة المرور الحالية غير صحيحة');
  }

  admin.password = newPassword;
  await admin.save();

  res.json({ success: true, message: 'تم تغيير كلمة المرور بنجاح' });
});

// @desc    Change username (requires current password as confirmation)
// @route   PUT /api/auth/update-username
// @access  Private
const updateUsername = asyncHandler(async (req, res) => {
  const { newUsername, currentPassword } = req.body;

  if (!newUsername || !currentPassword) {
    throw new ApiError(400, 'الرجاء إدخال اسم المستخدم الجديد وكلمة المرور الحالية');
  }
  if (newUsername.trim().length < 3) {
    throw new ApiError(400, 'اسم المستخدم يجب أن يكون 3 أحرف على الأقل');
  }

  const admin = await Admin.findById(req.admin._id).select('+password');
  if (!(await admin.matchPassword(currentPassword))) {
    throw new ApiError(401, 'كلمة المرور الحالية غير صحيحة');
  }

  admin.username = newUsername.trim();
  await admin.save();

  res.json({
    success: true,
    data: { id: admin._id, username: admin.username, email: admin.email },
    message: 'تم تغيير اسم المستخدم بنجاح',
  });
});

module.exports = { login, getMe, changePassword, updateUsername };