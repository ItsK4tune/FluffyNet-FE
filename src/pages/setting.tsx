import React, { useState } from 'react';
import { cn } from "../libs/utils";
import { InputForm } from "../components/elements/input-form";
import { useNavigate } from 'react-router-dom';
// --- IMPORT FUNCTIONS ---
import { logout } from '../services/authen/logout';
import { bindEmail } from '../services/authen/bind-email';
import { useAuthStore } from '../stores/auth-store';

// Placeholder - nên lấy từ API hoặc context/store khi có
const initialUserData = {
    avatarUrl: "https://via.placeholder.com/150/FFB6C1/FFFFFF?text=FN",
    displayName: "Fluffy User",
    username: "fluffy_user",
    bio: "Just floating on my fluffy cloud ☁️ Sharing thoughts and sparkles ✨",
    // Giả sử email ban đầu có thể là null hoặc chưa xác thực
    email: null // Hoặc "user@unverified.site"
};

interface UserData {
    avatarUrl: string;
    displayName: string;
    username: string;
    bio: string;
    email: string | null; // Email có thể null
}

export const Setting = () => {
    const navigate = useNavigate();
    // --- STATE ---
    const [userData, setUserData] = useState<UserData>(initialUserData); // TODO: Load real data
    const [displayName, setDisplayName] = useState(userData.displayName);
    const [bio, setBio] = useState(userData.bio);
    const [bindEmailInput, setBindEmailInput] = useState(''); // State cho input email mới
    const [message, setMessage] = useState({ text: '', type: 'error' });
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [isBindingEmail, setIsBindingEmail] = useState(false); // State loading cho bind email

    // State cho cài đặt thông báo
    const [notiLikes, setNotiLikes] = useState(true);
    const [notiComments, setNotiComments] = useState(true);
    const [notiFollows, setNotiFollows] = useState(true);

    // --- HANDLERS ---

    const handleProfileSave = (e: React.FormEvent) => {
        e.preventDefault();
        setMessage({ text: '', type: 'error' });
        console.log("Saving profile:", { displayName, bio });
        // --- TODO: Gọi API để lưu thay đổi hồ sơ (displayName, bio, avatar) ---
        setUserData(prev => ({ ...prev, displayName, bio })); // Cập nhật UI tạm thời
        setMessage({ text: 'Profile updated successfully! ✨', type: 'success' });
        setTimeout(() => setMessage({ text: '', type: 'error' }), 3000);
    };

    // --- Handler mới cho Bind Email ---
    const handleBindEmailSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Quan trọng nếu dùng trong form
        if (isBindingEmail) return;

        setIsBindingEmail(true);
        setMessage({ text: '', type: 'error' });

        // Validate email input cơ bản
        if (!bindEmailInput || !/\S+@\S+\.\S+/.test(bindEmailInput)) {
            setMessage({ text: 'Please enter a valid email address.', type: 'error' });
            setIsBindingEmail(false);
            return;
        }

        const token = useAuthStore.getState().accessToken; 
        if (!token) {
            setMessage({ text: 'Authentication token not found. Please log in again.', type: 'error' });
            setIsBindingEmail(false);
             // Có thể redirect về login ở đây
             // navigate('/login');
            return;
        }

        try {
            console.log(`Attempting to bind email: ${bindEmailInput}`);
            // Gọi API bind email
            await bindEmail(token, bindEmailInput);
             console.log("Bind email request successful.");
             setMessage({
                text: `Verification link sent to ${bindEmailInput}! Please check your inbox. 📧`,
                 type: 'success'
            });
            setBindEmailInput(''); // Xóa input sau khi thành công
        } catch (error: any) {
             console.error("Bind email failed:", error);
            setMessage({
                 text: `Failed to bind email: ${error?.response?.data?.message || error?.message || 'Please try again.'}`,
                 type: 'error'
             });
        } finally {
             setIsBindingEmail(false);
         }
    };

    // Handler Logout (giữ nguyên)
    const handleLogout = async () => {
        if (isLoggingOut) return;
        setIsLoggingOut(true);
        setMessage({ text: '', type: 'error' });
        try {
            console.log("Attempting logout...");
            await logout();
            console.log("Logout successful, navigating to login.");
            setMessage({ text: 'Logged out successfully! See you next time! 👋', type: 'success' });
            await new Promise(resolve => setTimeout(resolve, 5000));
            navigate('/login', { replace: true });
        } catch (error: any) {
            console.error("Logout failed:", error);
            setMessage({
                text: `Logout failed: ${error?.response?.data?.message || error?.message || 'Please try again.'}`,
                type: 'error'
            });
        } finally {
            setIsLoggingOut(false);
        }
    };

    // --- COMPONENTS CON ---
    const SectionTitle = ({ children }: { children: React.ReactNode }) => (
        <h2 className="text-2xl font-semibold text-pink-500 mb-4 pb-2 border-b border-pink-200">
            {children}
        </h2>
    );

    const ToggleSwitch = ({ label, checked, onChange }: { label: string, checked: boolean, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => (
        <label className="flex items-center justify-between cursor-pointer py-2">
            <span className="text-gray-700">{label}</span>
            <div className="relative">
                <input type="checkbox" className="sr-only peer" checked={checked} onChange={onChange} />
                 <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-400"></div>
            </div>
        </label>
    );

    // --- RENDER ---
    return (
        <div className="min-h-screen bg-pink-50 p-4 md:p-8 flex justify-center">
            <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-6 md:p-10">
                <h1 className="text-3xl md:text-4xl font-bold text-center text-pink-500 mb-8 font-serif">
                    Fluffy Settings <span className="text-2xl">⚙️</span>
                </h1>

                {/* --- Phần Edit Profile --- */}
                <section className="mb-10">
                    <SectionTitle>Profile Fluffiness <span className="text-xl">🐾</span></SectionTitle>
                    <form onSubmit={handleProfileSave} className="space-y-5">
                        {/* Avatar */}
                        <div className="flex flex-col items-center space-y-3">
                             <img src={userData.avatarUrl} alt="Avatar" className="w-24 h-24 rounded-full object-cover border-4 border-pink-200 shadow-md" />
                             <button type="button" className="text-sm text-pink-500 hover:text-pink-700 font-medium">Change Avatar</button> {/* TODO: Add avatar upload */}
                         </div>
                         {/* Display Name */}
                         <InputForm name="displayName" icon="person" placeholder="Display Name" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
                         {/* Bio */}
                         <div>
                             <label className="block text-sm font-medium text-gray-500 mb-1">About You (Bio)</label>
                             <textarea value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Tell us about your fluffiness..." rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-pink-300 focus:border-pink-300 placeholder-gray-400" />
                         </div>
                         {/* Username (Read Only) */}
                         <InputForm name="username" icon="alternate_email" placeholder="Username" value={userData.username} />
                         {/* Current Email (Read Only - Shows bound/verified email) */}
                        <InputForm name="email" icon="mail" placeholder="Email" value={userData.email ?? 'Not set'} /> {/* Hiển thị email hiện tại */}
                        {/* Save Profile Button */}
                        <div className="text-center">
                             <button type="submit" className="px-6 py-2 bg-pink-400 text-white font-semibold rounded-full shadow hover:bg-pink-500 transition duration-200">Save Profile Changes</button>
                         </div>
                    </form>
                </section>

                 {/* Hiển thị thông báo (chung cho các hành động) */}
                {message.text && (
                    <p className={cn(
                        "text-center my-4 p-2 rounded-md text-sm transition-opacity duration-300",
                         message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700',
                         !message.text ? 'opacity-0' : 'opacity-100'
                    )}>
                         {message.text}
                     </p>
                 )}

                {/* --- Phần Bind Email (Mới) --- */}
                 <section className="mb-10">
                     <SectionTitle>Bind Your Email <span className="text-xl">✉️</span></SectionTitle>
                     <form onSubmit={handleBindEmailSubmit} className="space-y-4">
                        <InputForm
                            name="bindEmailInput"
                             icon="add_link" // Hoặc 'link' / 'email'
                            type="email" // Set type là email
                             placeholder="Enter email address to bind/verify"
                             value={bindEmailInput}
                             onChange={(e) => setBindEmailInput(e.target.value)}
                        />
                         <div className="text-center">
                             <button
                                 type="submit"
                                 disabled={isBindingEmail || !bindEmailInput} // Disable khi đang xử lý hoặc chưa nhập email
                                 className={cn(
                                     "px-6 py-2 text-white font-semibold rounded-full shadow transition duration-200",
                                     isBindingEmail || !bindEmailInput
                                         ? "bg-gray-300 cursor-not-allowed"
                                         : "bg-pink-500 hover:bg-blue-600" // Màu khác cho hành động này
                                 )}
                            >
                                {isBindingEmail ? 'Sending...' : 'Send Verification Email'}
                            </button>
                         </div>
                         <p className="text-xs text-gray-500 text-center px-4">
                             A verification link will be sent to the email address you provide. Click the link to complete the process.
                         </p>
                     </form>
                </section>

                {/* --- Phần Notification Settings (Giữ nguyên) --- */}
                 <section className="mb-10">
                     <SectionTitle>Notification Sprinkles <span className="text-xl">🔔</span></SectionTitle>
                     <div className="space-y-1 max-w-sm mx-auto">
                         <ToggleSwitch label="Likes on your posts" checked={notiLikes} onChange={(e) => setNotiLikes(e.target.checked)} />
                        <ToggleSwitch label="Comments on your posts" checked={notiComments} onChange={(e) => setNotiComments(e.target.checked)} />
                        <ToggleSwitch label="New followers" checked={notiFollows} onChange={(e) => setNotiFollows(e.target.checked)} />
                     </div>
                </section>

                {/* --- Phần Logout (Giữ nguyên) --- */}
                 <section className="text-center mt-10 pt-6 border-t border-pink-100">
                     <button onClick={handleLogout} disabled={isLoggingOut} className={cn(
                            "px-8 py-3 text-red-600 font-semibold rounded-full shadow transition duration-200",
                            isLoggingOut ? "bg-gray-200 cursor-not-allowed" : "bg-red-100 hover:bg-red-200 hover:text-red-700"
                         )}>
                         {isLoggingOut ? 'Logging Out...' : 'Log Out'} <span className="ml-1">🚪</span>
                     </button>
                 </section>

            </div>
        </div>
    );
};