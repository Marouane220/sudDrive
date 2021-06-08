import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { Button, Dropdown, Form, Modal } from 'react-bootstrap'
import CopyToClipboard from 'react-copy-to-clipboard'
import { database } from '../../firebase'

export default function Folder({ folder }){
    const [openRename, setOpenRename] = useState(false)
    const [name, setName] = useState(folder.name)

    function openModalRename(){
        setOpenRename(true)
    }

    function closeModalRename(){
        setOpenRename(false )
    }

    function folderRename(e){
        e.preventDefault()
        database.folders.doc(folder.id).update({
            name: name
        })
        setOpenRename(false)
    }
    // async function folderRename(e){
    //     const folderId = folder.id
    //     const folderName = folder.name
    //     console.log(folderId)
    //     e.preventDefault()
    //     database.folders
    //             .get()
    //             .then((querySnapshot) => {
    //                 database.folders.doc(folder.id).update({
    //                     name: name
    //                 })
    //                 querySnapshot.forEach((folders) => {
    //                     folders.data().path.forEach((item) =>{
    //                         console.log(item.id)
    //                         database.folders.doc(item.id).update({
    //                             path: {name, }
    //                         })
    //                     })
    //                     })
    //                 });
    // }

    return(
        <>
        <Dropdown>
            <Dropdown.Toggle variant="outline-dark" className="text-truncate w-100"  id="dropdown-basic">
                <FontAwesomeIcon icon={faFolder}/>
                 <span className="m-2" >{folder.name}</span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item as = {Link} to={{
                                pathname: `/folder/${folder.id}`,
                                state: { folder: folder }
                     }}>Ouvrire</Dropdown.Item>
                <CopyToClipboard text={`${window.location.hostname}/folder/${folder.id}`}>
                    <Dropdown.Item >Copier le lien</Dropdown.Item>
                </CopyToClipboard>
                <Dropdown.Divider />
                <Dropdown.Item onClick={openModalRename}> Renommer </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
        <Modal show={openRename} onHide={closeModalRename}>
            <Form onSubmit={folderRename}>
            <Modal.Body className="m-3 text-center">
                <h4 className="m-3 mb-4"> Renommer votre dossier </h4>
                <Form.Group>
                    <Form.Control type="text" value={name} onChange ={e => setName(e.target.value)} />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer className="justify-content-center">
                <Button variant="light" className="m-2" onClick={closeModalRename}>annuler</Button>
                <Button variant="success" className="m-2" type="submit">rennomer</Button>
            </Modal.Footer>
            </Form>
        </Modal>
        </>
    )
}