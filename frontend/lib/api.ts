export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const registerUser = async (data: any) => {
    const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || 'Registration failed');
    return result;
};

export const resolveReferralCode = async (code: string) => {
    const res = await fetch(`${API_URL}/auth/resolve-referral`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
    });
    return res.json();
};

export const checkAvailability = async (field: 'username' | 'email' | 'phoneNumber' | 'walletAddress', value: string) => {
    const res = await fetch(`${API_URL}/auth/check`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ field, value }),
    });
    return res.json();
};

export const loginUser = async (data: any) => {
    const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || 'Login failed');
    return result;
};

export const fetchProfile = async (token: string) => {
    const res = await fetch(`${API_URL}/auth/profile`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || 'Failed to fetch profile');
    return result;
};

export const updateProfile = async (token: string, data: any) => {
    const res = await fetch(`${API_URL}/auth/profile`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || 'Failed to update profile');
    return result;
};

// Ecosystem Endpoints
export const fetchMintStatus = async () => {
    const res = await fetch(`${API_URL}/mint-status`);
    return res.json();
};

export const fetchDashboardData = async (userId: string) => {
    const res = await fetch(`${API_URL}/user/dashboard/${userId}`);
    if (!res.ok) throw new Error('Failed to fetch dashboard data');
    return res.json();
};

export const mineCoins = async (token: string) => {
    const res = await fetch(`${API_URL}/mining/mine`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || 'Mining failed');
    return result;
};

// Admin API
export const fetchAllUsers = async (token: string) => {
    const res = await fetch(`${API_URL}/admin/users`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || 'Failed to fetch users');
    return result;
};

export const toggleUserStatus = async (token: string, userId: string) => {
    const res = await fetch(`${API_URL}/admin/users/${userId}/status`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` }
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || 'Failed to update status');
    return result;
};

// Password Reset API
export const forgotPassword = async (email: string) => {
    const res = await fetch(`${API_URL}/password/forgot`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || 'Failed to send reset email');
    return result;
};

export const verifyResetToken = async (token: string) => {
    const res = await fetch(`${API_URL}/password/verify-token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
    });
    return res.json();
};

export const resetPassword = async (token: string, password: string) => {
    const res = await fetch(`${API_URL}/password/reset`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || 'Failed to reset password');
    return result;
};
