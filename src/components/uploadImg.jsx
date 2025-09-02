import React, { useState } from 'react';
import { Button, LinearProgress, FormLabel } from '@mui/material';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import app from '../firebase';
import { SyncLoader } from 'react-spinners';



const ImageUploader = ({onDownloadUrlChange}) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploading, setUploading] = useState(false)
    const [err,setErr] = useState('')

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleUpload = async (e) => {
        e.preventDefault()
        setUploading(true)
        setErr('')

        if (!selectedFile) return;

        const storage = getStorage(app);
        const storageRef = ref(storage, 'resipts/' + selectedFile.name);
        const uploadTask = uploadBytesResumable(storageRef, selectedFile);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setUploadProgress(progress);
            },
            (error) => {
                setErr('Error uploading file(only png,jpg,jpeg allowed):', error);
            },
            async () => {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                onDownloadUrlChange(downloadURL);
                setUploading(false)
            }
        );
        
    };

    return (
        <div className='h-[180px] flex flex-col w-[100%] justify-center'>
            <p className='text-[10px] italic ml-[20px]'>only .png,.jpg,.jpeg allowed</p>
            <input accept=".png, .jpg, .jpeg" type="file" onChange={handleFileChange} className='border-[2px] h-[30px] border-sky-700 rounded-[20px] truncate cursor-pointer mr-[10px] max-w-[100%] mb-[10px]'  disabled={uploadProgress>0}/>
            <div className='w-[100%] flex justify-center'>
                <Button variant="contained" color="primary" className='w-[100px]' onClick={handleUpload} disabled={uploading == true || selectedFile == null || uploadProgress > 0}>
                 {uploading ? <SyncLoader color="#36d7b7"/> : 'Upload'}
                </Button>
            </div>
            <div className='flex'>
               <LinearProgress variant="determinate" value={uploadProgress} className='mt-[10px] w-[90%]'/> 
               {uploadProgress > 0 && <FormLabel>{Math.round(uploadProgress)}%</FormLabel>}
            </div>
            {err !='' && <h1 className='text-[14px] text-red-700'>{err}</h1>}
            
        </div >
    );
};

export default ImageUploader;



