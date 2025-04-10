import React, { useRef, useState } from "react";

interface FileUploadProps {
    onFileSelect: (file: File | null) => void;
    disabled?: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect, disabled }) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [fileName, setFileName] = useState<string>("");

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        if (file) {
            setFileName(file.name); // Save file name for preview
        } else {
            setFileName("");
        }
        onFileSelect(file);
    };

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <div className="file-upload">
            <button
                type="button"
                className="
                    w-full 
                    p-4 
                    text-white 
                    text-center 
                    border-2 
                    border-dotted 
                    rounded-md 
                    border-neutral-700 
                    cursor-pointer 
                    hover:border-neutral-500
                "
                onClick={handleButtonClick}
                disabled={disabled}
            >
                Add Image/Video
            </button>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }}
                disabled={disabled}
            />
            {fileName ? (
                <p className="text-black">File loaded: {fileName}</p>
            ) : (
                <p className="text-black">Upload File</p>
            )}
        </div>
    );
};

export default FileUpload;