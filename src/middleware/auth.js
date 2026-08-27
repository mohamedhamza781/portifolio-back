const jwt = require('jsonwebtoken');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const Admin = require('../models/Admin');

// Protects routes: requires a valid `Authorization: Bearer <token>` header.
const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    throw new ApiError(401, 'غير مصرح — الرجاء تسجيل الدخول');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.id);
    if (!admin) {
      throw new ApiError(401, 'الحساب غير موجود، الرجاء تسجيل الدخول مجدداً');
    }
    req.admin = admin;
    next();
  } catch (err) {
    throw new ApiError(401, 'رمز الدخول غير صالح أو منتهي الصلاحية');
  }
});

module.exports = { protect };
