# Portfolio Backend — Node.js / Express / MongoDB

باك اند كامل لموقع البورتفوليو (React + Vite) الموجود لديك. مبني بحيث يطابق تماماً الـ endpoints
اللي كان الفرونت اند يتوقعها في `src/services/portfolioService.js` و`README.md` الخاص به.

## 🚀 التقنيات

- **Node.js + Express** — REST API
- **MongoDB + Mongoose** — قاعدة البيانات
- **JWT + bcryptjs** — تسجيل دخول الأدمن وحماية المسارات
- **express-validator** — التحقق من صحة المدخلات
- **helmet / cors / express-rate-limit / express-mongo-sanitize** — أمان
- **nodemailer** *(اختياري)* — إرسال إيميل عند وصول رسالة تواصل

## 📁 هيكلة المشروع

```
portfolio-backend/
├── server.js                 # نقطة الدخول
├── .env.example
└── src/
    ├── app.js                # إعداد Express (middleware + routes)
    ├── config/db.js          # اتصال MongoDB
    ├── models/                # Profile, Skill, Project, Experience, Education, Certificate, Contact, Admin
    ├── controllers/           # منطق كل مسار
    ├── routes/                 # تعريف الـ endpoints
    ├── middleware/             # auth (JWT), errorHandler, notFound, validate
    ├── utils/                  # asyncHandler, generateToken, ApiError
    └── seed/                   # بيانات ابتدائية + سكربت seed
```

## 🏗️ التشغيل

```bash
cd portfolio-backend
npm install

cp .env.example .env
# عدّل .env: MONGO_URI, JWT_SECRET, ADMIN_USERNAME/PASSWORD, CLIENT_URL...

# تشغيل MongoDB محلياً (أو استخدم MongoDB Atlas)
# ثم عبّي قاعدة البيانات ببيانات ابتدائية + مستخدم أدمن:
npm run seed

# تشغيل السيرفر في وضع التطوير (nodemon):
npm run dev

# أو تشغيل عادي:
npm start
```

السيرفر يعمل افتراضياً على `http://localhost:5000`، والـ API على `http://localhost:5000/api`.

## 🔌 ربطه بالفرونت اند

في مشروع الـ React، عدّل `.env`:

```
VITE_USE_MOCK=false
VITE_API_BASE_URL=http://localhost:5000/api
```

بعدها `portfolioService.js` سيستخدم تلقائياً هذا الـ backend بدل الـ mock data.

## 🔑 تسجيل دخول الأدمن

بعد تشغيل `npm run seed`، بيانات الدخول الافتراضية هي القيم اللي حطيتها بـ `.env`
(`ADMIN_USERNAME` / `ADMIN_PASSWORD`، والافتراضي `admin` / `admin123`). **غيّرها فوراً في بيئة الإنتاج.**

```
POST /api/auth/login
Body: { "username": "admin", "password": "admin123" }
Response: { success, data: { id, username, email, token } }
```

استخدم الـ `token` في هيدر كل طلب محمي:

```
Authorization: Bearer <token>
```

## 📚 مرجع الـ API

جميع الردود بصيغة: `{ success: boolean, data?, message? }`

### Public (بدون توكن)

| Method | Endpoint | الوصف |
|---|---|---|
| GET | `/api/profile` | بيانات البروفايل |
| GET | `/api/skills` | كل فئات المهارات |
| GET | `/api/projects?category=&technology=` | كل المشاريع (مع فلترة اختيارية) |
| GET | `/api/projects/:id` | مشروع واحد |
| GET | `/api/experience` | الخبرات العملية |
| GET | `/api/education` | التعليم |
| GET | `/api/certificates` | الشهادات |
| POST | `/api/contact` | إرسال رسالة تواصل (محدود بـ 5 طلبات/15 دقيقة) |
| GET | `/api/health` | فحص حالة السيرفر |

### Auth

| Method | Endpoint | الوصف |
|---|---|---|
| POST | `/api/auth/login` | تسجيل دخول الأدمن → JWT |
| GET | `/api/auth/me` 🔒 | بيانات الأدمن الحالي |
| PUT | `/api/auth/change-password` 🔒 | تغيير كلمة المرور |

### Admin (تتطلب `Authorization: Bearer <token>`) 🔒

| Resource | Create | Update | Delete |
|---|---|---|---|
| Profile | — | `PUT /api/profile` | — |
| Skills | `POST /api/skills` | `PUT /api/skills/:id` | `DELETE /api/skills/:id` |
| Projects | `POST /api/projects` | `PUT /api/projects/:id` | `DELETE /api/projects/:id` |
| Experience | `POST /api/experience` | `PUT /api/experience/:id` | `DELETE /api/experience/:id` |
| Education | `POST /api/education` | `PUT /api/education/:id` | `DELETE /api/education/:id` |
| Certificates | `POST /api/certificates` | `PUT /api/certificates/:id` | `DELETE /api/certificates/:id` |
| Contact messages | — | `PUT /api/contact/:id/read` | `DELETE /api/contact/:id` |
|  | `GET /api/contact` 🔒 (عرض كل الرسائل) | | |

## ✉️ إيميل نموذج التواصل (اختياري)

لو عبّيت متغيرات `SMTP_*` و`CONTACT_RECEIVER_EMAIL` في `.env`، بيرسل إيميل تلقائي بكل رسالة
جديدة. لو تركتها فاضية، الرسالة تُحفظ في قاعدة البيانات فقط (تقدر تشوفها من `GET /api/contact`).

## 🛡️ ملاحظات أمان قبل النشر (Production)

- غيّر `JWT_SECRET` لقيمة عشوائية طويلة.
- غيّر بيانات الأدمن الافتراضية (`ADMIN_USERNAME` / `ADMIN_PASSWORD`).
- حدّد `CLIENT_URL` بدومين الفرونت اند الحقيقي فقط.
- استخدم HTTPS و MongoDB Atlas (أو خادم مؤمّن) في الإنتاج.
