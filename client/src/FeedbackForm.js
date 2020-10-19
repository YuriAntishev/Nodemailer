import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Button } from 'antd';
import axios from 'axios';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const validateMessages = {
  required: '${label} - this is required field!',
  types: {
    email: 'Please, enter correct ${label}!',
    number: '${label} is not a validate number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

export default class FeedbackForm extends Component {

  formRef = React.createRef();

  state = {
    name: '',
    surname: '',
    email: '',
    message: '',
    sent: false,
    buttonText: 'Send Message'
  }

  onFinish = values => {
    console.log(values);
  };

  // inputs 

  takeName = (e) => {
    this.setState({
      name: e.target.value
    })
  }

  takeSurname = (e) => {
    this.setState({
      surname: e.target.value
    })
  }

  takeEmail = (e) => {
    this.setState({
      email: e.target.value
    })
  }

  takeMessage = (e) => {
    this.setState({
      message: e.target.value
    })
  }

  // end of handle inputs

  formSubmit = (e) => {

    let data = {
      name: this.state.name,
      surname: this.state.surname,
      email: this.state.email,
      message: this.state.message
    }

    axios.post('/api/feedback', data)
      .then(res => {
        this.setState({
          sent: true,
        }, this.onReset())
      })
      .catch(() => {
        console.log('message not send');
      })
  }

  // for reseting the form data

  onReset = () => {
    this.formRef.current.resetFields();

    setTimeout(() => {
      this.setState({
        sent: false,
      })
    }, 3500)
  };

  render() {
    return (
      <div className="container">
        <Form
          {...layout}
          ref={this.formRef}
          name="nest-messages"
          onFinish={this.formSubmit}
          validateMessages={validateMessages}
        >
          <Form.Item
            name={["user", "name"]}
            label="Name"
            rules={[
              {
                required: true
              }
            ]}
          >
            <Input
              type="text"
              name="name"
              className="name"
              autoComplete="off"
              value={this.state.name}
              onChange={this.takeName}
              placeholder="Your Name..."
            />
          </Form.Item>
          <Form.Item
            name={["user", "surname"]}
            label="Surname"
            rules={[
              {
                required: true
              }
            ]}
          >
            <Input
              type="text"
              name="surname"
              className="surname"
              autoComplete="off"
              value={this.state.surname}
              onChange={this.takeSurname}
              placeholder="Your Surname..."
            />
          </Form.Item>
          <Form.Item
            name={["user", "email"]}
            label="Email"
            rules={[
              {
                required: true,
                type: "email"
              }
            ]}
          >
            <Input
              type="email"
              name="email"
              className="email"
              autoComplete="off"
              value={this.state.email}
              onChange={this.takeEmail}
              placeholder="Your email..."
            />
          </Form.Item>
          <Form.Item
            name={["user", "Message"]}
            label="Message"
          >
            <Input.TextArea
              name="message"
              value={this.state.message}
              id=""
              cols="30"
              rows="5"
              placeholder="Your message..."
              onChange={this.takeMessage}
            />
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <div className={this.state.sent ? 'msg msgAppear' : 'msg'}>
            Your message was sent successfully
          </div>
            <Button type="primary" htmlType="submit">
              Send Message
        </Button>
          </Form.Item>
        </Form>

      </div>
    )
  }
}
