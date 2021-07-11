import React, { FC } from 'react';
import { Button, Form, Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import styles from './Login.module.scss';

const Login: FC = () => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const onSubmit = () => {
    setIsSubmitting((current) => !current);
    setTimeout(() => setIsSubmitting((current) => !current), 1000);
  };

  return (
    <div className={styles.container}>
      <span className={styles.banner}>moti</span>
      <div className={styles.loginForm}>
        <Form name="login" initialValues={{ remember: true }}>
          <Form.Item name="e-mail">
            <Input
              type="email"
              size="large"
              placeholder="E-mail"
              prefix={<UserOutlined />}
            />
          </Form.Item>
          <Form.Item name="password">
            <Input.Password
              size="large"
              placeholder="Password"
              prefix={<LockOutlined />}
            />
          </Form.Item>
          <Form.Item name="submit">
            <div className={styles.submitContainer}>
              <Button
                type="primary"
                htmlType="submit"
                loading={isSubmitting}
                onClick={onSubmit}
              >
                Login
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
