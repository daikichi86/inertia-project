import { useForm } from "@inertiajs/react";
import { useState } from "react";

const UploadMusic = () => {
    const { data, setData, post, processing, progress, errors } = useForm({
        title: "",
        description: "",
        file: null,
        lengthSeconds: 0,
    });
    const [dragging, setDragging] = useState(false);

    const getAudioDuration = (file) => {
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = (event) => {
            const audioContext = new (window.AudioContext ||
                window.webkitAudioContext)();
            audioContext.decodeAudioData(event.target.result, (buffer) => {
                setData((data) => ({
                    ...data,
                    file: file,
                    lengthSeconds: Math.round(buffer.duration),
                }));
            });
        };
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragging(false);
        const files = e.dataTransfer.files;
        if (files.length > 0) getAudioDuration(files[0]);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((data) => ({
            ...data,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/song/store", {
            forceFormData: true,
            onSuccess: () => {
                alert("アップロード成功");
            },
            onError: (errors) => {
                console.error("アップロードエラー", errors);
                alert("アップロードエラーが発生しました");
            },
            onProgress: (event) => {
                console.log(`現在の進捗: ${event.percentage}%`);
            },
        });
    };

    return (
        <main className="main">
            <h2>Upload Your Own Music or Your Favorite Song</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        name="title"
                        value={data.title}
                        onChange={handleChange}
                        placeholder="title"
                    />
                    {errors.title && <span>{errors.title}</span>}
                </div>
                <div>
                    <textarea
                        name="description"
                        value={data.description}
                        onChange={handleChange}
                        placeholder="description"
                    />
                    {errors.description && <span>{errors.description}</span>}
                </div>
                <div
                    className={`file-upload-container ${
                        dragging ? "dragging" : ""
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    <img
                        src="/storage/image/notsmile.jpg"
                        alt="Upload Icon"
                        className="upload-icon"
                    />
                    <p className="title">Drag & Drop your MP3 file here</p>
                    {errors.file && <span>{errors.file}</span>}
                </div>
                {data.file && (
                    <div>
                        <p>File: {data.file.name}</p>
                        <p>Duration: {data.lengthSeconds} seconds</p>
                    </div>
                )}
                {progress && (
                    <progress value={progress.percentage} max="100">
                        {progress.percentage}%
                    </progress>
                )}
                <button type="submit" disabled={processing}>
                    Upload
                </button>
            </form>
        </main>
    );
};

export default UploadMusic;
