import axios from "axios";
window.axios = axios;

window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

// Simple route helper pour Inertia
window.route = function(name, params = {}) {
    const routes = {
        'login': '/login',
        'register': '/register',
        'password.request': '/forgot-password',
        'password.email': '/forgot-password',
        'password.reset': `/reset-password/${params.token || ''}`,
        'password.store': '/reset-password',
        'verification.notice': '/verify-email',
        'verification.verify': `/verify-email/${params.id}/${params.hash}`,
        'verification.send': '/email/verification-notification',
        'password.confirm': '/confirm-password',
        'password.update': '/password',
        'logout': '/logout',
        'home': '/',
        'dashboard': '/dashboard',
        'profile.edit': '/profile',
        'profile.update': '/profile',
        'profile.destroy': '/profile',
    };
    
    return routes[name] || `/${name}`;
};