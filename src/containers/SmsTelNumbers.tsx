import React, { Component } from 'react';
import { Form, Col, Button, ButtonToolbar } from 'react-bootstrap';
import { RouteComponentProps } from 'react-router-dom';
import axios from 'axios';
import Radio from '../components/Radio';
import Spinner from '../components/Spinner';
import API from '../api.js';
import './SmsTelNumbers.scss';

interface Props { }

interface PhoneNumber {
  id: string;
  type: string;
  number: string;
}

interface State {
  selNumber: string;
  isLoading: boolean;
  phoneNumbers: PhoneNumber[];
}

export default class SmsTelNumbers extends Component<
  RouteComponentProps<Props>,
  State
  > {
  cancelTokenSource = axios.CancelToken.source();

  constructor(props: any) {
    super(props);

    this.state = {
      selNumber: '',
      isLoading: true,
      phoneNumbers: []
    };
  }

  async componentDidMount() {
    API.get(`/authentication/v1/phone-numbers`, {
      cancelToken: this.cancelTokenSource.token
    })
      .then(res => {
        console.log(res);
        this.setState({ phoneNumbers: res.data.phoneNumbers });
        console.log(res.data.phoneNumbers);
        this.setState({ isLoading: false });

        // If only 1 number selected.
        if (res.data.phoneNumbers.length === 1) {
          this.setState({ selNumber: res.data.phoneNumbers[0].number });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentWillUnmount() {
    this.cancelTokenSource.cancel('Api is being canceled');
  }

  handleSubmit = async (event: any) => {
    event.preventDefault();

    API.post(`/authentication/v1/sms-otp/session`, {
      selNumber: this.state.selNumber
    })
      .then(res => {
        console.log(res);
        if (res.data.status === 'IN_PROGRESS') {
          this.props.history.push('/VerifyPasscode');
        } else {
          this.props.history.push('/SystemError');
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    console.log(event.currentTarget.value);
    this.setState({ selNumber: event.currentTarget.value });
  };

  handleCancel = async (event: any) => {
    event.preventDefault();
    this.props.history.push({
      pathname: '/Message',
      state: { message: 'Return "Cancel" status.' }
    });
  };

  handleCantDoThis = async (event: any) => {
    event.preventDefault();
    this.props.history.push({
      pathname: '/Message',
      state: { message: 'Return "Can\'t do this" status.' }
    });
  };

  renderPhoneList = () => {
    if (!this.state.isLoading) {
      // If only 1 number select it.
      let checked = false;
      if (this.state.phoneNumbers.length === 1) checked = true;

      return this.state.phoneNumbers.map(item => (
        <Form.Row key={item.id}>
          <Col xs={4} sm={2}>
            <Radio
              id={item.id}
              name="numbers"
              value={item.number}
              onChange={this.handleChange}
              checked={checked}
            />
          </Col>
          <Col xs={8} sm={10} className="text2">
            {item.number}
          </Col>
        </Form.Row>
      ));
    }
    return (
      <div className="NumbersSpinner">
        <Spinner />
      </div>
    );
  };

  render() {
    return (
      <div className="SmsTelNumbers container">
        <Form>
          <Form.Label className="title">
            Verify yourself with a passcode
          </Form.Label>
          <Form.Label className="text1">
            Make sure you have your mobile to hand. We'll send you a passcode by
            text.
          </Form.Label>
          <Form.Label className="text2">
            Which mobile number would you like us to send the text message to?
          </Form.Label>
          <Form.Group>{this.renderPhoneList()}</Form.Group>
          <Form.Group>
            <Button
              type="submit"
              variant="link"
              className="link btn-link"
              onClick={this.handleCantDoThis}
            >
              Cant do this?
            </Button>
          </Form.Group>
          <Form.Group>
            <hr></hr>
          </Form.Group>
          <Form.Group>
            <ButtonToolbar
              className="justify-content-between"
              aria-label="Toolbar with Button groups"
            >
              <Button
                type="submit"
                variant="link"
                className="link btn-link"
                onClick={this.handleCancel}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="info"
                className="button"
                onClick={this.handleSubmit}
                disabled={!this.state.selNumber}
              >
                Continue
              </Button>
            </ButtonToolbar>
          </Form.Group>
        </Form>
      </div>
    );
  }
}
