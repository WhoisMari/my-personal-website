import React, { useState, FormEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../../context/AuthContext";
import { PrimaryBtn, ErrorMsg } from "../../../components/Admin/AdminStyles";

const Page = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.body};
`;

const Box = styled.div`
  width: 100%;
  max-width: 380px;
  padding: 40px;
  background: ${({ theme }) => theme.post_container};
  border: ${({ theme }) => theme.modal_border};
  border-radius: 16px;
  box-shadow: 0 4px 24px -4px ${({ theme }) => theme.box_shadow};
`;

const Title = styled.h1`
  font-size: 1.3rem;
  font-weight: 700;
  margin: 0 0 8px;
  color: ${({ theme }) => theme.color1};
`;

const Sub = styled.p`
  font-size: 0.85rem;
  opacity: 0.55;
  margin: 0 0 28px;
`;

const Field = styled.div`
  display: grid;
  gap: 6px;
  margin-bottom: 16px;
`;

const Label = styled.label`
  font-size: 0.78rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  opacity: 0.6;
`;

const Input = styled.input`
  padding: 10px 14px;
  border: 1px solid ${({ theme }) => theme.box_shadow};
  border-radius: 8px;
  background: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  font-size: 0.9rem;
  &:focus { outline: 2px solid ${({ theme }) => theme.color1}; }
`;

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: Location })?.from?.pathname ?? "/admin";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const err = await login(username, password);
    setLoading(false);
    if (err) {
      setError(err);
    } else {
      navigate(from, { replace: true });
    }
  }

  return (
    <Page>
      <Box>
        <Title>Admin</Title>
        <Sub>whoismari.dev — sign in to continue</Sub>
        <form onSubmit={handleSubmit}>
          <Field>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Field>
          <Field>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Field>
          {error && <ErrorMsg style={{ marginBottom: 12 }}>{error}</ErrorMsg>}
          <PrimaryBtn type="submit" disabled={loading} style={{ width: "100%", marginTop: 8 }}>
            {loading ? "Signing in…" : "Sign in"}
          </PrimaryBtn>
        </form>
      </Box>
    </Page>
  );
}
