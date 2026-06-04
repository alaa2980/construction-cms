import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                // Set Cairo as the primary sans-serif font
                sans: ['Cairo', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                // Custom Charcoal (Dark Gray) palette
                charcoal: {
                    DEFAULT: '#1F2937', 
                    light: '#374151',
                    dark: '#111827',
                },
                // Custom Gold palette for primary accents
                gold: {
                    DEFAULT: '#D4AF37', 
                    light: '#F3E5AB',
                    dark: '#AA8C2C',
                },
                // Light background color for section contrast
                accent: '#F3F4F6', 
            }
        },
    },

    plugins: [forms],
};