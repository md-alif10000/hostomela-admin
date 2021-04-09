import React from 'react'
import { Container, Row ,Col,Modal,Button} from 'react-bootstrap'

function MODAL (props) {
    return (
        <Modal size={props.size} show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {props.children}
            
        </Modal.Body>
        <Modal.Footer>
          {props.buttons ? props.buttons.map((btn,index)=>
            <Button key={index} onClick={btn.onClick} variant={btn.color}>{btn.label}</Button>): null}
      
        </Modal.Footer>
      </Modal>

        
    )
}

export default MODAL
