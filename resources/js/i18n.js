import { usePage } from '@inertiajs/react';

const dictionary = {
    ar: {
        app_name: 'رمال',
        nav: {
            dashboard: 'لوحة التحكم',
            users: 'المستخدمون',
            activities: 'الأنشطة',
            packages: 'الباقات السياحية',
            offers: 'العروض',
            bookings: 'الحجوزات',
            support_tickets: 'الدعم الفني',
            searches: 'سجل البحث',
            settings: 'الإعدادات',
        },
        ui: {
            login: 'تسجيل الدخول',
            logout: 'تسجيل الخروج',
            email: 'البريد الإلكتروني',
            password: 'كلمة المرور',
            remember: 'تذكرني',
            search: 'بحث...',
            create: 'إضافة',
            edit: 'تعديل',
            delete: 'حذف',
            save: 'حفظ',
            cancel: 'إلغاء',
            back: 'رجوع',
            actions: 'إجراءات',
            all: 'الكل',
            yes: 'نعم',
            no: 'لا',
            confirm_delete: 'هل أنت متأكد من الحذف؟',
            no_records: 'لا توجد بيانات',
            reset: 'إعادة تعيين',
            filters: 'الفلاتر',
            current_image: 'الصورة الحالية',
            add: 'إضافة',
            welcome_back: 'مرحباً بعودتك',
            login_subtitle: 'سجّل الدخول للوصول إلى لوحة التحكم',
        },
        dashboard: {
            title: 'لوحة التحكم',
            users: 'المستخدمون',
            users_desc: 'إجمالي المسجلين',
            bookings: 'الحجوزات',
            bookings_desc: 'إجمالي الحجوزات',
            confirmed_bookings: 'الحجوزات المؤكدة',
            confirmed_bookings_desc: 'حجوزات مؤكدة',
            open_tickets: 'تذاكر دعم مفتوحة',
            open_tickets_desc: 'تحتاج إلى رد',
            packages: 'الباقات',
            offers: 'العروض',
            recent_bookings: 'أحدث الحجوزات',
        },
        resources: {
            users: 'المستخدمون',
            activities: 'الأنشطة',
            packages: 'الباقات السياحية',
            offers: 'العروض',
            bookings: 'الحجوزات',
            support_tickets: 'الدعم الفني',
            searches: 'سجل البحث',
            settings: 'الإعدادات',
        },
        fields: {
            name: 'الاسم', email: 'البريد الإلكتروني', phone: 'رقم الهاتف', password: 'كلمة المرور',
            is_active: 'نشط', is_admin: 'مدير', phone_verified: 'الهاتف مفعّل', nationality: 'الجنسية',
            passport_number: 'رقم الجواز', passport_expiry: 'تاريخ انتهاء الجواز', birth_date: 'تاريخ الميلاد',
            gender: 'الجنس', title: 'العنوان', description: 'الوصف', location: 'الموقع', price: 'السعر',
            image: 'الصورة', sort_order: 'الترتيب', trip_type: 'نوع الرحلة', nights_count: 'عدد الليالي',
            status: 'الحالة', subject: 'الموضوع', message: 'الرسالة', admin_reply: 'رد الإدارة', type: 'النوع',
            expires_at: 'تاريخ الانتهاء', discount_percentage: 'نسبة الخصم', original_price: 'السعر الأصلي',
            discounted_price: 'السعر بعد الخصم', created_at: 'تاريخ الإنشاء', user: 'المستخدم',
            is_current: 'حجز حالي', notes: 'ملاحظات', city: 'المدينة', nights: 'الليالي', activity_name: 'اسم النشاط',
            replied: 'تم الرد',
            app_name: 'اسم التطبيق', currency: 'العملة', support_phone: 'هاتف الدعم', support_email: 'بريد الدعم',
            tax_percent: 'نسبة الضريبة %', booking_enabled: 'الحجز مُفعّل', payload: 'بيانات البحث',
        },
        values: {
            male: 'ذكر', female: 'أنثى', local: 'رحلة محلية', international: 'رحلة دولية', flight: 'طيران',
            hotel: 'فندق', package: 'باقة', activity: 'نشاط', pending: 'قيد الانتظار', booked: 'محجوز',
            cancelled: 'ملغي', open: 'مفتوح', in_progress: 'قيد المعالجة', closed: 'مغلق', trip: 'رحلة مخصصة',
        },
        sections: {
            package_details: 'بيانات الباقة', route_cities: 'مسار الرحلة (المدن)', activities: 'الأنشطة',
            basic_info: 'البيانات الأساسية', passport_details: 'بيانات الجواز',
            add_city: 'إضافة مدينة', add_activity: 'إضافة نشاط',
            password_hint: 'اتركها فارغة للإبقاء على كلمة المرور الحالية',
        },
    },
    en: {
        app_name: 'Remal',
        nav: {
            dashboard: 'Dashboard',
            users: 'Users',
            activities: 'Activities',
            packages: 'Tour Packages',
            offers: 'Offers',
            bookings: 'Bookings',
            support_tickets: 'Support Tickets',
            searches: 'Search Log',
            settings: 'Settings',
        },
        ui: {
            login: 'Sign in',
            logout: 'Logout',
            email: 'Email',
            password: 'Password',
            remember: 'Remember me',
            search: 'Search...',
            create: 'Create',
            edit: 'Edit',
            delete: 'Delete',
            save: 'Save',
            cancel: 'Cancel',
            back: 'Back',
            actions: 'Actions',
            all: 'All',
            yes: 'Yes',
            no: 'No',
            confirm_delete: 'Are you sure you want to delete?',
            no_records: 'No records found',
            reset: 'Reset',
            filters: 'Filters',
            current_image: 'Current image',
            add: 'Add',
            welcome_back: 'Welcome back',
            login_subtitle: 'Sign in to access the admin panel',
        },
        dashboard: {
            title: 'Dashboard',
            users: 'Users',
            users_desc: 'Total registered users',
            bookings: 'Bookings',
            bookings_desc: 'Total bookings',
            confirmed_bookings: 'Confirmed Bookings',
            confirmed_bookings_desc: 'Confirmed bookings',
            open_tickets: 'Open Support Tickets',
            open_tickets_desc: 'Needs a reply',
            packages: 'Packages',
            offers: 'Offers',
            recent_bookings: 'Recent Bookings',
        },
        resources: {
            users: 'Users',
            activities: 'Activities',
            packages: 'Tour Packages',
            offers: 'Offers',
            bookings: 'Bookings',
            support_tickets: 'Support Tickets',
            searches: 'Search Log',
            settings: 'Settings',
        },
        fields: {
            name: 'Name', email: 'Email', phone: 'Phone', password: 'Password',
            is_active: 'Active', is_admin: 'Admin', phone_verified: 'Phone Verified', nationality: 'Nationality',
            passport_number: 'Passport Number', passport_expiry: 'Passport Expiry', birth_date: 'Birth Date',
            gender: 'Gender', title: 'Title', description: 'Description', location: 'Location', price: 'Price',
            image: 'Image', sort_order: 'Sort Order', trip_type: 'Trip Type', nights_count: 'Nights Count',
            status: 'Status', subject: 'Subject', message: 'Message', admin_reply: 'Admin Reply', type: 'Type',
            expires_at: 'Expires At', discount_percentage: 'Discount %', original_price: 'Original Price',
            discounted_price: 'Discounted Price', created_at: 'Created At', user: 'User',
            is_current: 'Is Current', notes: 'Notes', city: 'City', nights: 'Nights', activity_name: 'Activity Name',
            replied: 'Replied',
            app_name: 'App Name', currency: 'Currency', support_phone: 'Support Phone', support_email: 'Support Email',
            tax_percent: 'Tax %', booking_enabled: 'Booking Enabled', payload: 'Search Data',
        },
        values: {
            male: 'Male', female: 'Female', local: 'Local Trip', international: 'International Trip', flight: 'Flight',
            hotel: 'Hotel', package: 'Package', activity: 'Activity', pending: 'Pending', booked: 'Booked',
            cancelled: 'Cancelled', open: 'Open', in_progress: 'In Progress', closed: 'Closed', trip: 'Custom Trip',
        },
        sections: {
            package_details: 'Package Details', route_cities: 'Route (Cities)', activities: 'Activities',
            basic_info: 'Basic Information', passport_details: 'Passport Details',
            add_city: 'Add City', add_activity: 'Add Activity',
            password_hint: 'Leave empty to keep the current password',
        },
    },
};

function resolve(obj, path) {
    return path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
}

export function useT() {
    const { locale } = usePage().props;
    const lang = locale === 'ar' ? 'ar' : 'en';

    const t = (key) => {
        const value = resolve(dictionary[lang], key);
        return value !== undefined ? value : key;
    };

    return { t, locale: lang, isRtl: lang === 'ar' };
}

export function storageUrl(path) {
    if (!path) return null;
    if (path.startsWith('http')) return path;
    return `/storage/${path}`;
}
