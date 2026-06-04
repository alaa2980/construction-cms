import { usePage } from '@inertiajs/react';

export function useTrans() {
    const { props } = usePage();
    const locale = props.locale;

    const __ = (key) => {
        if (locale && locale.translations && locale.translations[key]) {
            return locale.translations[key];
        }
        return key;
    };

    // دالة ذكية جديدة: تقوم بإضافة بادئة اللغة الحالية لأي رابط في الموقع لمنع خطأ 404
    const localizeUrl = (path) => {
        const currentLocale = locale?.current || 'en';
        
        // تنظيف الرابط للتأكد من عدم تكرار السلاش
        const cleanPath = path.startsWith('/') ? path : `/${path}`;
        
        // إذا كان الرابط هو الصفحة الرئيسية فقط، نرجعه كـ /en أو /ar
        if (cleanPath === '/') {
            return `/${currentLocale}`;
        }
        
        // إرجاع الرابط مسبوقاً باللغة الحالية (مثال: /en/about)
        return `/${currentLocale}${cleanPath}`;
    };

    // دالة ذكية لتوليد رابط تبديل اللغة لنفس الصفحة الحالية
    const getSwitchLanguageUrl = (targetLocale) => {
        // جلب المسار الحالي بعد اسم النطاق (مثلاً: /en/about أو /en)
        const pathname = window.location.pathname;
        
        // استبدال بادئة اللغة الحالية بالبادئة الجديدة
        if (pathname.startsWith('/en')) {
            return pathname.replace('/en', `/${targetLocale}`);
        } else if (pathname.startsWith('/ar')) {
            return pathname.replace('/ar', `/${targetLocale}`);
        }
        
        // كحالة احتياطية إذا لم يبدأ بالبادئة
        return `/${targetLocale}`;
    };

    return {
        __,
        currentLocale: locale?.current || 'en',
        currentDir: locale?.dir || 'ltr',
        localizeUrl,          // تصدير الدالة الجديدة لتصبح جاهزة للاستخدام
        getSwitchLanguageUrl 
    };
}