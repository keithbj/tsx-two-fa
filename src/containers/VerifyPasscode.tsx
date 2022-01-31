import React, { Component } from 'react';
import { Form, Col, Button, ButtonToolbar } from 'react-bootstrap';
import { RouteComponentProps } from 'react-router-dom';
import Joi from 'joi';
import API from '../api.js';
import Input from '../components/Input';
import './VerifyPasscode.scss';

interface Props {}

interface State {
  passcode: string;
  errorMsg: string;
  validated: boolean;
}

export default class SmsTelNumbers extends Component<RouteComponentProps<Props>, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      passcode: '',
      errorMsg: '',
      validated: false,
    };
  }

  schema = {
    passcode: Joi.string()
      .trim()
      .required()
      .regex(/^[0-9]{1,6}$/)
      .label('Passcode'),
  };

  handleChange = (event: any) => {
    const passcode = event.target.value;

    console.log('handleChange event.target.value: ' + passcode);
    this.setState({ passcode: passcode });

    this.validate(passcode);
  };

  validate = (passcode: string) => {
    console.log("validate passcode: '" + passcode + "'");

    const options = { abortEarly: false };
    var { error } = Joi.validate(passcode, this.schema.passcode, options);
    var errorMsg = '';

    console.log('validate error 1: ' + error);

    // Clean up error message because of regex use. Also empty string valid.
    if (error !== null && passcode !== '') {
      errorMsg = '"passcode" must be a 6 digit number.';
    } else {
      errorMsg = '';
    }

    if (errorMsg === '' && passcode.length === 6) {
      this.setState({ validated: true });
    } else {
      this.setState({ validated: false });
    }
    this.setState({ errorMsg: errorMsg });
  };

  handleSubmit = async (event: any) => {
    event.preventDefault();

    try {
      API.post(`/authentication/v1/sms-otp/session/validate`, {
        passcode: this.state.passcode,
      }).then((res) => {
        console.log(res);
        if (res.data.status === 'VALIDATED') {
          this.props.history.push({
            pathname: '/Message',
            state: { message: 'Return "Validation Success" status.' },
          });
        } else {
          this.props.history.push('/SystemError');
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  handleCancel = async (event: any) => {
    event.preventDefault();
    this.props.history.push({
      pathname: '/Message',
      state: { message: 'Return "Cancel" status.' },
    });
  };

  handleCantDoThis = async (event: any) => {
    event.preventDefault();
    this.props.history.push({
      pathname: '/Message',
      state: { message: 'Return "Can\'t do this" status.' },
    });
  };

  handleNewCode = async (event: any) => {
    event.preventDefault();
    this.props.history.push('/');
  };

  render() {
    return (
      <div className="VerifyPasscode container">
        <Form>
          <Form.Label className="title">We're sending you a text now</Form.Label>
          <Form.Label className="text1">Enter your 6-digit passcode below:</Form.Label>
          <Form.Group>
            <Form.Row>
              <Col sm={6}>
                <Input type="text" name="passcode" value={this.state.passcode} onChange={this.handleChange} autoComplete="off" error={this.state.errorMsg} />
              </Col>
              <Col sm={1}></Col>
              <Col sm={5}>
                <Button variant="link" type="submit" className="link btn-link" onClick={this.handleNewCode}>
                  Send a new code
                </Button>
              </Col>
            </Form.Row>
          </Form.Group>
          <Form.Label className="text2">It may take a few moments for your code to arrive.</Form.Label>

          <Form.Label className="text2">If your code hasn't arrived after a few moments, you should request a new one.</Form.Label>

          <Form.Group>
            <Button variant="link" type="submit" className="link btn-link" onClick={this.handleCantDoThis}>
              Can't do this?
            </Button>
          </Form.Group>

          <Form.Group>
            <hr></hr>
          </Form.Group>

          <Form.Group>
            <ButtonToolbar className="justify-content-between" aria-label="Toolbar with Button groups">
              <Button variant="link" type="submit" className="link btn-link" onClick={this.handleCancel}>
                Cancel
              </Button>
              <Button variant="info" type="submit" className="button" onClick={this.handleSubmit} disabled={!this.state.validated}>
                Continue
              </Button>
            </ButtonToolbar>
          </Form.Group>
        </Form>
      </div>
    );
  }
}
