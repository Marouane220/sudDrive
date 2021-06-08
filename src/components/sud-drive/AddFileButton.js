import { faFileUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { database, storage } from '../../firebase'
import { useAuth } from '../../context/AuthContext'
import { ROOT_FOLDER } from '../../hooks/useFolder'
import { v4 as uuidv4 } from 'uuid';
import { ProgressBar, Alert } from 'react-bootstrap';

export default function AddFileButton({ currentFolder }){

    const { currentUser } = useAuth()
    const [uploadError, setUploadError] = useState('')
    const [uploadSuccess, setUploadSuccess] = useState('')
    const [timeOut, setTimeOut] = useState(false)


    const timeId = setTimeout(() => {
          // After 3 seconds set the show value to false
        setTimeOut(true)
        setUploadError('')
        setUploadSuccess('')
    }, 3000)

    let [size, setSize] = useState()

    function handleUpload(e) {
        const file = e.target.files[0]
        if(currentFolder == null || file == null ) return
        
        const id = uuidv4()
        const filePath = currentFolder === ROOT_FOLDER ? `${currentFolder.path.join('/')}/${file.name}` 
                                                        : `${currentFolder.path.join('/')}/${currentFolder.name}/${file.name}`
        const uploadTask = storage.ref(`/files/${currentUser.uid}/${filePath}`).put(file)
        if(size + (file.size/1000000) > 100){
            setUploadError("Error de l'importation quota depassée")
            return
        }
        const fullFilePath = `files/${currentUser.uid}${filePath}`
        uploadTask.on("state_changed", snapshot => {}, () => {}, () => {
            uploadTask.snapshot.ref.getDownloadURL().then(url =>{
                database.files.add({
                    url: url,
                    path: fullFilePath,
                    name: file.name,
                    createdAt: database.getCurrentsTimestamp(),
                    folderId: currentFolder.id,
                    userId: currentUser.uid,
                    taille: file.size
                })
            })
        })
        setUploadSuccess('Fichier importé avec succer veuillez attendre')
    }

    function totalSize(){
        database.files
                .where('userId', '==', currentUser.uid)
                .get()
                .then((querySnapshot) => {
                    let c = 0
                    querySnapshot.forEach((file) => {
                        c = c + file.data().taille
                    });
                    setSize(c/1000000)
                })
    }

    return (
    <div>
        {totalSize()}
        <div>
            <label className="btn btn-outline-success btn-lg m-2 ">
                <FontAwesomeIcon icon={faFileUpload} />
                <input type="file" onChange={handleUpload} style={{ opacity: 0, position: 'absolute', left:'-9999px'}} />
            </label>
        </div>
        <div>
            <ProgressBar now={size} style={{position:"absolute", bottom:"3rem", right:"4rem", minWidth:"200px"}} />
        </div>
        <div>
        <p  style={{position:"absolute", bottom:"3.5rem", right:"2rem", minWidth:"200px"}}><small> total d'espace utilisé </small></p>
        {   
            <small className="text-muted"  style={{position:"absolute", bottom:"1rem", right:"3rem", minWidth:"200px"}}>Il vous reste {((100 - size)).toFixed(4)} Mo  </small>
        }
        { timeOut && uploadError && <Alert variant="danger" className="text-muted"  style={{position:"absolute", bottom:"5rem", right:"4rem", minWidth:"200px"}}>{uploadError}</Alert>}
        { timeOut && uploadSuccess && <Alert variant="success" className="text-muted"  style={{position:"absolute", bottom:"5rem", right:"4rem", minWidth:"200px"}}>{uploadSuccess}</Alert>}
        </div>
    </div>
    )
}