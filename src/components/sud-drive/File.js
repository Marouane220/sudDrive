import { faFile } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState }  from 'react'
import { Link } from 'react-router-dom'
import { Button, Dropdown, Form, Modal } from 'react-bootstrap'
import CopyToClipboard from 'react-copy-to-clipboard'
import { database, storage } from '../../firebase'

export default function File( {file }) {
    const [openDelete, setOpenDelete] = useState(false)

    function openModalDelete(){
        setOpenDelete(true)
    }

    function closeModalDelete(){
        setOpenDelete(false )
    }

    function folderDelete(e){
        e.preventDefault()
        storage.ref().child(file.path).delete()
            .then(database.files.doc(file.id).delete())
        setOpenDelete(false)

    }
    return (
    <>
        <Dropdown>
            <Dropdown.Toggle variant="outline-primary" className="text-truncate w-100"  id="dropdown-basic">
                <FontAwesomeIcon icon={faFile}/>
                 <span className="m-2" >{file.name}</span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item href={file.url} target="_blank" >Ouvrire</Dropdown.Item>
                <CopyToClipboard text={file.url}>
                    <Dropdown.Item >Copier le lien</Dropdown.Item>
                </CopyToClipboard>
                <Dropdown.Divider />
                <Dropdown.Item onClick={openModalDelete}> Supprimer</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
        <Modal show={openDelete} onHide={closeModalDelete}>
            <Modal.Body className="m-2 text-center">
                <h4>Vous êtes sûre ?</h4>
            </Modal.Body>
            <Modal.Footer className="justify-content-center">
                <Button variant="light" className="m-2" onClick={closeModalDelete}>annuler</Button>
                <Button variant="danger" className="m-2" onClick={folderDelete}>supprimer</Button>
            </Modal.Footer>
        </Modal>
        </>
    )
}