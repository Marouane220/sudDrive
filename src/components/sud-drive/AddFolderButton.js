import { Button, Form, Modal } from "react-bootstrap";
import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import { database } from '../../firebase'
import { useAuth } from '../../context/AuthContext'
import { ROOT_FOLDER } from '../../hooks/useFolder'

export default function AddFolderButton({ currentFolder }) {
    const [open, setOpen] = useState(false)
    const [name, setName] = useState('Nouveau Dossier')
    const { currentUser } = useAuth()

    function openModal(){
        setOpen(true)
    }

    function closeModal(){
        setOpen(false )
    }

    function handleSubmit(e){
        e.preventDefault()

        if(currentFolder == null) return
        const path = [...currentFolder.path]
        if (currentFolder !== ROOT_FOLDER){
            path.push({name: currentFolder.name, id: currentFolder.id})
        }
        // add to databse on fire store
        database.folders.add({
            name: name,
            parentId: currentFolder.id,
            userId: currentUser.uid,
            path: path,
            createdAt: database.getCurrentsTimestamp()
        })
        setName('Nouveau Dossier')
        closeModal()
    }
    return (
        <>
            <Button onClick={openModal} variant="outline-success" size="lg">
                <FontAwesomeIcon icon={faFolderPlus} />
            </Button>
            <Modal show={open} onHide={closeModal}>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label className="p-3 ">
                                <h3>Nom du dossier</h3>
                            </Form.Label>
                            <Form.Control type="text"
                                        value={name}
                                        onChange ={e => setName(e.target.value)} />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeModal}> Fermer </Button>
                        <Button variant="success" type="submit ">
                            Ajouter
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}