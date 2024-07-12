"use client"
import { getDownloadURL, getStorage, ref, TaskState, uploadBytes, uploadBytesResumable, UploadTask } from "firebase/storage";
import { useRef, useState } from "react";

const UploadFilePage = () => {
    const progressRef = useRef<HTMLProgressElement>(null as any)
    const uploadTaskRef = useRef<UploadTask>(null as any)
    const [status, setStatus] = useState<TaskState>("running")
    const storage = getStorage();

    const handleUpload = async (files: FileList | null) => {
        if (!files) {
            return
        }
        console.log("files", files);
        const singleFile = files[0]

        const storageRef = ref(storage, 'users/' + new Date().getTime() + singleFile.name);

        uploadTaskRef.current = uploadBytesResumable(storageRef, singleFile)
        uploadTaskRef.current.on("state_changed", (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            progressRef.current.value = progress
            setStatus(snapshot.state)
            switch (snapshot.state) {
                case 'paused':
                    console.log('Upload is paused');
                    break;
                case 'running':
                    console.log('Upload is running');
                    break;
            }
        }, (err) => {
            console.log("error", err);

        }, () => {
            getDownloadURL(uploadTaskRef.current.snapshot.ref).then((downloadURL) => {
                console.log('File available at', downloadURL);
                window.open(downloadURL)
            }).catch((error) => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                    case 'storage/object-not-found':
                        // File doesn't exist
                        break;
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        console.log("self storage/unauthorized");

                        break;
                    case 'storage/canceled':
                        // User canceled the upload
                        break;

                    // ...

                    case 'storage/unknown':
                        // Unknown error occurred, inspect the server response
                        break;
                }
            })
        }
        )
    }

    return <div>
        <input type="file" accept="image/*" onChange={(e) => handleUpload(e.target.files)} />
        <br />
        <progress ref={progressRef} value="0" max="100"></progress>
        <br />
        <p>{status}</p>
        <button onClick={() => uploadTaskRef.current.pause()}>Pause</button>&nbsp;
        <button onClick={() => uploadTaskRef.current.resume()}>Play</button>&nbsp;
        <button onClick={() => uploadTaskRef.current.cancel()}>Cancel</button>

    </div>

}

export default UploadFilePage