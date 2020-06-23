import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardText, CardTitle, Modal, ModalHeader, ModalBody,Button,Col, Row, Label} from 'reactstrap';
import {Link} from 'react-router-dom';
import {Breadcrumb , BreadcrumbItem} from 'reactstrap';
import { Control ,LocalForm, Errors} from 'react-redux-form';

     function RenderDish ({dish}) {
            return (
                <div className='col-12 col-md-5 m-1'>
                    <Card>
                        <CardImg width="100%" src={dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
            );
        } 

   function RenderComments ({comments, postComment, dishId}) {
        if (comments != null) 
            return (
            <div className='col-12 col-md-5 m-1'>
                <h4> Comments </h4>
                <ul className='list-unstyled'>
                    {comments.map((comment)  => {
                        return (
                            <li key={comment.id}>
                                <p>{comment.comment}</p>
                                <p>-- {comment.author},
                                &nbsp;
                                {new Intl.DateTimeFormat('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: '2-digit'
                                }).format(new Date(Date.parse(comment.date)))}
                                </p>
                            </li>                            
                        );
                    })}
                </ul>
            <CommentForm dishId={dishId} postComment={postComment} />
        </div>
        );
        else
            return(
            <div></div>
        );
    
}
    const Dishdetail = (props) =>{
        if(props.dish!= null)
        return (
            <div class='container'>
                <div className='row'>
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className='col-12'>
                        <h3>{props.dish.name}</h3>
                        <hr/>
                    </div>
                </div>
                <div className='row'>
                    <RenderDish dish ={props.dish} />
                    <RenderComments comments = {props.comments} postComment={props.postComment} dishId={props.dish.id}/>
                </div>
            </div>
        );
        else
            return(
                <div></div>
            );
    }
    

export default Dishdetail;

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

export class CommentForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isModalOpen: false
        };

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal() {
        this.setState({ isModalOpen: !this.state.isModalOpen });
    }

    handleSubmit(values) {
        console.log("Current State is: " + JSON.stringify(values));
        alert("Current State is: " + JSON.stringify(values));
    }

    render() {
        return (
            <div>
                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-pencil fa-lg"> Submit comment</span>
                </Button>
                <div className="row row-content">
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>Submit comment</ModalHeader>
                        <ModalBody>
                        <div className="col-12">
                                <LocalForm onSubmit={(values) => this.handleSubmit(values)} >
                                    <Row className="form-group">
                                        <Label htmlFor="rating" md={4}>Rating</Label>
                                        <Col md={12}>
                                            <Control.select model=".rating" name="rating" className="form-control" >
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                            </Control.select>
                                        </Col>
                                    </Row>

                                    <Row className="form-group">
                                        <Label htmlFor="author" md={4}>Your name</Label>
                                        <Col  md={12}>
                                            <Control.text model=".author" id="author" name="author" placeholder="Author" className="form-control" validators={{ required, minLength: minLength(3), maxLength: maxLength(15) }} />
                                            <Errors className="text-danger" model=".author" show="touched" messages={{ required: 'Required', minLength: 'Must be greater than 3 characters', maxLength: 'Must be 15 charaters or less' }} />
                                        </Col>
                                    </Row>

                                    <Row className="form-group">
                                        <Label htmlFor="feedback" md={4}>Comment</Label>
                                        <Col  md={12}>
                                            <Control.textarea model=".comment" id="comment" name="comment" rows="6" className="form-control" validators={{ required }} />
                                            <Errors className="text-danger" model=".comment" show="touched" messages={{ required: 'Required' }} />
                                        </Col>
                                    </Row>

                                    <Button type="submit" value="submit" color="primary">Submit</Button>
                                </LocalForm>
                            </div>
                        </ModalBody>
                    </Modal>
                </div>
            </div>
        );
    }
}