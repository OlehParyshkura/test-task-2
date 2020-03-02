import React,{useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

function NoteForm(props) {
  
  const {input, onSubmit, onInput} = props;
  return (
<Form onSubmit={onSubmit} onInput={onInput}>
  <Form.Group as={Row} controlId="FirstName">
    <Form.Label column sm={2}>
        first Name
    </Form.Label>
    <Col sm={10}>
      <Form.Control required type="text" placeholder="Enter firstName" name ="firstName"  value={input.firstName} />
    </Col>
  </Form.Group>

  <Form.Group as={Row} controlId="LastName">
    <Form.Label column sm={2}>
        last name
    </Form.Label>
    <Col sm={10}>
      <Form.Control required type="text" placeholder="Enter lastName" name ="lastName" value={input.lastName} />
    </Col>
  </Form.Group>

  <Form.Group as={Row} controlId="Phone">
    <Form.Label column sm={2}>
        pnohe
    </Form.Label>
    <Col sm={10}>
      <Form.Control required type="number" placeholder="Enter phone" name = "phone" value={input.phone} />
    </Col>
  </Form.Group>

  <Form.Group as={Row} controlId="Gender">
    <Form.Label column sm={2}>
        gender
    </Form.Label>
    <Col sm={10}>
      <Form.Control required as="select" placeholder="Enter gender" value={input.gender} name="gender">
      <option value="true">Male</option>
      <option value="false">Female</option>
    </Form.Control>
    </Col>
  </Form.Group>

  <Form.Group as={Row} controlId="Age" >
    <Form.Label column sm={2}>
        age
    </Form.Label>
    <Col sm={10}>
      <Form.Control required type="number" placeholder="Enter age" name="age" value={input.age} />
    </Col>
  </Form.Group>
  <Form.Group as={Row}>
    <Col sm={{ span: 10, offset: 2 }}>
      <Button type="submit">Submit</Button>
    </Col>
  </Form.Group>
</Form>
  );
}

export default NoteForm;
