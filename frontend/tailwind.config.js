/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#f1f8f4',
                    100: '#dceee4',
                    200: '#b9ddc9',
                    300: '#8bc5a7',
                    400: '#5fa885',
                    500: '#2E7D32',
                    600: '#256428',
                    700: '#1d4d20',
                    800: '#163d19',
                    900: '#103215',
                },
                secondary: {
                    50: '#faf8f5',
                    100: '#f5f5dc',
                    200: '#ebe8d0',
                    300: '#d9d4b8',
                    400: '#c7c19f',
                    500: '#b5ae87',
                    600: '#a39b6f',
                    700: '#8a8460',
                    800: '#716d50',
                    900: '#585640',
                },
                civic: {
                    beige: '#F5F5DC',
                    green: '#2E7D32',
                    orange: '#FF9800',
                    red: '#D32F2F',
                }
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            animation: {
                'fade-in': 'fadeIn 0.3s ease-in',
                'slide-up': 'slideUp 0.4s ease-out',
                'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                pulseSoft: {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.7' },
                },
            },
        },
    },
    plugins: [],
}
