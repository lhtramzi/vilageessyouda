# استخدام نسخة رسمية خفيفة من Node.js
FROM node:18-alpine

# تعيين مجلد العمل داخل الحاوية
WORKDIR /app

# نسخ الملفات من مجلد backend إلى داخل الحاوية
COPY backend/ .

# تثبيت التبعيات
RUN npm install

# تعيين المنفذ الافتراضي (Render يستخدم PORT من env)
EXPOSE 3001

# أمر تشغيل الخادم
CMD ["node", "server.js"]
