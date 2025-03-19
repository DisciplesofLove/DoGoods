// Date formatting
function formatDate(date) {
    try {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    } catch (error) {
        console.error('Date formatting error:', error);
        return date;
    }
}

// Time ago formatter
function timeAgo(date) {
    try {
        const seconds = Math.floor((new Date() - new Date(date)) / 1000);
        const intervals = {
            year: 31536000,
            month: 2592000,
            week: 604800,
            day: 86400,
            hour: 3600,
            minute: 60,
            second: 1
        };

        for (const [unit, secondsInUnit] of Object.entries(intervals)) {
            const interval = Math.floor(seconds / secondsInUnit);
            if (interval >= 1) {
                return `${interval} ${unit}${interval === 1 ? '' : 's'} ago`;
            }
        }
        return 'just now';
    } catch (error) {
        console.error('Time ago formatting error:', error);
        return 'unknown time ago';
    }
}

// File size formatter
function formatFileSize(bytes) {
    try {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
    } catch (error) {
        console.error('File size formatting error:', error);
        return 'unknown size';
    }
}

// Input validation
function validateEmail(email) {
    try {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    } catch (error) {
        console.error('Email validation error:', error);
        return false;
    }
}

function validatePhone(phone) {
    try {
        const re = /^\+?[\d\s-]{10,}$/;
        return re.test(phone);
    } catch (error) {
        console.error('Phone validation error:', error);
        return false;
    }
}

// Location distance calculator
function calculateDistance(lat1, lon1, lat2, lon2) {
    try {
        const R = 6371; // Earth's radius in km
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                 Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                 Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        const distance = R * c;
        return distance.toFixed(1);
    } catch (error) {
        console.error('Distance calculation error:', error);
        return null;
    }
}

// Food expiration status
function getExpirationStatus(expiryDate) {
    try {
        const now = new Date();
        const expiry = new Date(expiryDate);
        const daysUntilExpiry = Math.ceil((expiry - now) / (1000 * 60 * 60 * 24));

        if (daysUntilExpiry < 0) {
            return { status: 'expired', label: 'Expired', color: 'red' };
        } else if (daysUntilExpiry <= 2) {
            return { status: 'critical', label: 'Expiring Soon', color: 'red' };
        } else if (daysUntilExpiry <= 5) {
            return { status: 'warning', label: 'Use Soon', color: 'yellow' };
        } else {
            return { status: 'good', label: 'Fresh', color: 'green' };
        }
    } catch (error) {
        console.error('Expiration status error:', error);
        return { status: 'unknown', label: 'Unknown', color: 'gray' };
    }
}

// Local storage helpers
function setLocalStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (error) {
        console.error('Local storage set error:', error);
        return false;
    }
}

function getLocalStorage(key) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    } catch (error) {
        console.error('Local storage get error:', error);
        return null;
    }
}

// Search and filter helpers
function searchItems(items, searchTerm) {
    try {
        if (!searchTerm) return items;
        searchTerm = searchTerm.toLowerCase();
        return items.filter(item => 
            item.title?.toLowerCase().includes(searchTerm) ||
            item.description?.toLowerCase().includes(searchTerm) ||
            item.category?.toLowerCase().includes(searchTerm)
        );
    } catch (error) {
        console.error('Search items error:', error);
        return items;
    }
}

function filterByCategory(items, category) {
    try {
        if (!category || category === 'all') return items;
        return items.filter(item => item.category === category);
    } catch (error) {
        console.error('Filter by category error:', error);
        return items;
    }
}

function sortByDate(items, ascending = false) {
    try {
        return [...items].sort((a, b) => {
            const dateA = new Date(a.createdAt);
            const dateB = new Date(b.createdAt);
            return ascending ? dateA - dateB : dateB - dateA;
        });
    } catch (error) {
        console.error('Sort by date error:', error);
        return items;
    }
}
