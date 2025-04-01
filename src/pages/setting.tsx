import React, { useState } from 'react';
import { cn } from "../libs/utils"; // Giả sử bạn có hàm tiện ích cn
import { InputForm } from "../components/elements/input-form"; // Import input component của bạn
import { useNavigate } from 'react-router-dom'; // Import hook để đăng xuất

// Placeholder cho dữ liệu người dùng - bạn cần lấy từ state hoặc API
const initialUserData = {
    avatarUrl: "https://via.placeholder.com/150/FFB6C1/FFFFFF?text=FN", // URL ảnh avatar mẫu
    displayName: "Fluffy User",
    username: "fluffy_user", // Thường không đổi được username
    bio: "Just floating on my fluffy cloud ☁️ Sharing thoughts and sparkles ✨",
    email: "user@fluffynet.site" // Có thể hiển thị nhưng không cho sửa trực tiếp ở đây
};

// Interface cho dữ liệu người dùng (tùy chỉnh theo cấu trúc của bạn)
interface UserData {
    avatarUrl: string;
    displayName: string;
    username: string;
    bio: string;
    email: string;
}

export const Setting = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState<UserData>(initialUserData);
    const [displayName, setDisplayName] = useState(userData.displayName);
    const [bio, setBio] = useState(userData.bio);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState({ text: '', type: 'error' }); // Lưu message và loại (error/success)

    // State cho cài đặt thông báo (ví dụ)
    const [notiLikes, setNotiLikes] = useState(true);
    const [notiComments, setNotiComments] = useState(true);
    const [notiFollows, setNotiFollows] = useState(true);

    const handleProfileSave = (e: React.FormEvent) => {
        e.preventDefault();
        setMessage({ text: '', type: 'error' }); // Clear message
        console.log("Saving profile:", { displayName, bio });
        // --- TODO: Gọi API để lưu thay đổi hồ sơ ---
        // Giả lập thành công:
        setUserData(prev => ({ ...prev, displayName, bio }));
        setMessage({ text: 'Profile updated successfully! ✨', type: 'success' });
        setTimeout(() => setMessage({ text: '', type: 'error' }), 3000); // Xóa message sau 3s
    };

    const handlePasswordChange = (e: React.FormEvent) => {
        e.preventDefault();
        setMessage({ text: '', type: 'error' }); // Clear message
        if (newPassword !== confirmPassword) {
            setMessage({ text: "New passwords don't match!", type: 'error' });
            return;
        }
        if (!currentPassword || !newPassword) {
            setMessage({ text: "Please fill in all password fields!", type: 'error' });
            return;
        }
        console.log("Changing password...");
        // --- TODO: Gọi API để đổi mật khẩu ---
        // Truyền currentPassword, newPassword
        // Xử lý kết quả thành công hoặc thất bại
        // Giả lập thành công:
        setMessage({ text: 'Password changed successfully! 🔒', type: 'success' });
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setTimeout(() => setMessage({ text: '', type: 'error' }), 3000);
    };

     const handleLogout = () => {
         // --- TODO: Thực hiện logic đăng xuất ---
         // Ví dụ: Xóa token trong localStorage
         Object.keys(localStorage).forEach((key) => {
            if (key.startsWith("jwt:")) {
                localStorage.removeItem(key);
            }
        });
         // Chuyển hướng về trang login
         navigate('/login');
     };

    // Component Section Title cho đồng bộ
    const SectionTitle = ({ children }: { children: React.ReactNode }) => (
        <h2 className="text-2xl font-semibold text-pink-500 mb-4 pb-2 border-b border-pink-200">
            {children}
        </h2>
    );

     // Component Toggle Switch cho cài đặt thông báo
    const ToggleSwitch = ({ label, checked, onChange }: { label: string, checked: boolean, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => (
        <label className="flex items-center justify-between cursor-pointer py-2">
            <span className="text-gray-700">{label}</span>
            <div className="relative">
                <input type="checkbox" className="sr-only peer" checked={checked} onChange={onChange} />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-400"></div>
            </div>
        </label>
    );

    return (
        // Layout chính, thêm padding và làm nền trắng/hồng nhạt
        <div className="min-h-screen bg-pink-50 p-4 md:p-8 flex justify-center">
            <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-6 md:p-10">
                <h1 className="text-3xl md:text-4xl font-bold text-center text-pink-500 mb-8 font-serif">
                    Fluffy Settings <span className="text-2xl">⚙️</span>
                </h1>

                {/* --- Phần Edit Profile --- */}
                <section className="mb-10">
                    <SectionTitle>Profile Fluffiness <span className="text-xl">🐾</span></SectionTitle>
                    <form onSubmit={handleProfileSave} className="space-y-5">
                        <div className="flex flex-col items-center space-y-3">
                            <img
                                src={userData.avatarUrl}
                                alt="Avatar"
                                className="w-24 h-24 rounded-full object-cover border-4 border-pink-200 shadow-md"
                            />
                            <button type="button" className="text-sm text-pink-500 hover:text-pink-700 font-medium">Change Avatar</button>
                             {/* TODO: Xử lý upload ảnh */}
                        </div>
                        {/* Sử dụng InputForm component của bạn */}
                         <InputForm
                             name="displayName"
                             icon="person" // Chọn icon phù hợp
                             placeholder="Display Name"
                             value={displayName}
                             onChange={(e) => setDisplayName(e.target.value)}
                         />
                         <div>
                             <label className="block text-sm font-medium text-gray-500 mb-1">About You (Bio)</label>
                            <textarea
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                placeholder="Tell us about your fluffiness..."
                                rows={3}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-pink-300 focus:border-pink-300 placeholder-gray-400"
                            />
                        </div>
                         <InputForm
                            name="username"
                            icon="alternate_email" // Icon phù hợp
                            placeholder="Username"
                            value={userData.username}
                         />
                         <InputForm
                            name="email"
                            icon="mail" // Icon phù hợp
                            placeholder="Email"
                            value={userData.email}
                        />

                         <div className="text-center">
                            <button
                                type="submit"
                                className="px-6 py-2 bg-pink-400 text-white font-semibold rounded-full shadow hover:bg-pink-500 transition duration-200"
                             >
                                Save Profile Changes
                            </button>
                        </div>
                    </form>
                </section>

                 {/* Hiển thị thông báo */}
                 {message.text && (
                    <p className={`text-center my-4 p-2 rounded-md text-sm ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {message.text}
                    </p>
                 )}


                {/* --- Phần Change Password --- */}
                 <section className="mb-10">
                     <SectionTitle>Password Security <span className="text-xl">🔒</span></SectionTitle>
                     <form onSubmit={handlePasswordChange} className="space-y-4">
                        <InputForm
                             name="currentPassword"
                            icon="lock_person"
                             type="password"
                            placeholder="Current Password"
                            value={currentPassword}
                             onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                         <InputForm
                             name="newPassword"
                            icon="lock_reset"
                             type="password"
                             placeholder="New Password"
                            value={newPassword}
                             onChange={(e) => setNewPassword(e.target.value)}
                         />
                         <InputForm
                             name="confirmPassword"
                            icon="enhanced_encryption"
                             type="password"
                            placeholder="Confirm New Password"
                             value={confirmPassword}
                             onChange={(e) => setConfirmPassword(e.target.value)}
                         />
                         <div className="text-center">
                             <button
                                 type="submit"
                                className="px-6 py-2 bg-pink-400 text-white font-semibold rounded-full shadow hover:bg-pink-500 transition duration-200"
                            >
                                Change Password
                             </button>
                         </div>
                     </form>
                 </section>

                {/* --- Phần Notification Settings --- */}
                 <section className="mb-10">
                    <SectionTitle>Notification Sprinkles <span className="text-xl">🔔</span></SectionTitle>
                     <div className="space-y-1 max-w-sm mx-auto">
                         <ToggleSwitch label="Likes on your posts" checked={notiLikes} onChange={(e) => setNotiLikes(e.target.checked)} />
                         <ToggleSwitch label="Comments on your posts" checked={notiComments} onChange={(e) => setNotiComments(e.target.checked)} />
                        <ToggleSwitch label="New followers" checked={notiFollows} onChange={(e) => setNotiFollows(e.target.checked)} />
                         {/* Thêm các cài đặt thông báo khác nếu cần */}
                     </div>
                     {/* Nút lưu cho thông báo có thể không cần nếu thay đổi được áp dụng ngay lập tức
                         <div className="text-center mt-4">
                            <button className="px-6 py-2 bg-pink-400 text-white font-semibold rounded-full shadow hover:bg-pink-500 transition duration-200">
                                Save Notification Settings
                            </button>
                        </div>
                     */}
                </section>

                 {/* --- Phần Logout --- */}
                <section className="text-center mt-10 pt-6 border-t border-pink-100">
                     <button
                        onClick={handleLogout}
                         className="px-8 py-3 bg-red-100 text-red-600 font-semibold rounded-full shadow hover:bg-red-200 hover:text-red-700 transition duration-200"
                    >
                         Log Out <span className="ml-1">🚪</span>
                     </button>
                </section>

            </div>
        </div>
    );
};