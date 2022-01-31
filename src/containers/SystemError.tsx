import React, { Component } from "react";
import { Form, Button, ButtonToolbar } from "react-bootstrap";
import { RouteComponentProps } from "react-router-dom";

interface Props {}

export default class SystemError extends Component<RouteComponentProps<Props>> {
  handleError = async (event: any) => {
    event.preventDefault();
    this.props.history.push({
      pathname: "/Message",
      state: { message: 'Return "System Error" status.' }
    });
  };

  render() {
    return (
      <div className="VerifyPasscode pad-top container">
        <Form>
          <Form.Label className="text1">System Error</Form.Label>

          <Form.Group>
            <hr></hr>
          </Form.Group>

          <Form.Group>
            <ButtonToolbar
              className="float-right"
              aria-label="Toolbar with Button groups"
            >
              <Button
                variant="info"
                type="submit"
                className="button"
                onClick={this.handleError}
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
