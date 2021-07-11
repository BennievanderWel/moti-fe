import React, { FC } from 'react';
import { Button, Form, Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import styles from './Login.module.scss';

interface Props {
  login: (email: string, password: string) => Promise<void>;
}

const Login: FC<Props> = ({ login }) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [email, setEmail] = React.useState('bennie@test.nl');
  const [password, setPassword] = React.useState('test');

  const onSubmit = async () => {
    setIsSubmitting((current) => !current);
    try {
      await login(email, password);
    } catch (err) {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <span className={styles.banner}>moti</span>
      <div className={styles.loginForm}>
        <Form name="login" initialValues={{ remember: true, email, password }}>
          <Form.Item name="email">
            <Input
              type="email"
              size="large"
              placeholder="E-mail"
              prefix={<UserOutlined />}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>
          <Form.Item name="password">
            <Input.Password
              size="large"
              placeholder="Password"
              prefix={<LockOutlined />}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>
          <Form.Item name="submit">
            <div className={styles.submitContainer}>
              <Button
                type="primary"
                htmlType="submit"
                loading={isSubmitting}
                disabled={!email || !password}
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
