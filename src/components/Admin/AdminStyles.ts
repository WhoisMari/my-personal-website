import styled from "styled-components";

export const PageTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 32px;
  color: ${({ theme }) => theme.text};
`;

export const Card = styled.div`
  background: ${({ theme }) => theme.post_container};
  border: ${({ theme }) => theme.modal_border};
  border-radius: 12px;
  padding: 24px;
`;

export const FormGrid = styled.div`
  display: grid;
  gap: 20px;
`;

export const Field = styled.div`
  display: grid;
  gap: 6px;
`;

export const Label = styled.label`
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  opacity: 0.6;
`;

export const Input = styled.input`
  padding: 10px 14px;
  border: 1px solid ${({ theme }) => theme.box_shadow};
  border-radius: 8px;
  background: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  font-size: 0.9rem;
  &:focus { outline: 2px solid ${({ theme }) => theme.color1}; }
`;

export const Textarea = styled.textarea`
  padding: 10px 14px;
  border: 1px solid ${({ theme }) => theme.box_shadow};
  border-radius: 8px;
  background: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  font-size: 0.9rem;
  resize: vertical;
  min-height: 100px;
  &:focus { outline: 2px solid ${({ theme }) => theme.color1}; }
`;

export const PrimaryBtn = styled.button`
  padding: 10px 24px;
  background: ${({ theme }) => theme.color1};
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  &:hover { opacity: 0.88; }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`;

export const DangerBtn = styled.button`
  padding: 8px 16px;
  background: none;
  border: 1px solid #e05252;
  border-radius: 8px;
  color: #e05252;
  font-size: 0.85rem;
  cursor: pointer;
  &:hover { background: #fff0f0; }
`;

export const GhostBtn = styled.button`
  padding: 8px 16px;
  background: none;
  border: 1px solid ${({ theme }) => theme.box_shadow};
  border-radius: 8px;
  color: ${({ theme }) => theme.text};
  font-size: 0.85rem;
  cursor: pointer;
  &:hover { background: ${({ theme }) => theme.bg2}; }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
`;

export const Th = styled.th`
  text-align: left;
  padding: 10px 12px;
  border-bottom: 2px solid ${({ theme }) => theme.box_shadow};
  opacity: 0.55;
  font-weight: 600;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid ${({ theme }) => theme.box_shadow};
  vertical-align: middle;
`;

export const ActionRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`;

export const ErrorMsg = styled.p`
  color: #e05252;
  font-size: 0.85rem;
  margin: 0;
`;

export const SuccessMsg = styled.p`
  color: #2da44e;
  font-size: 0.85rem;
  margin: 0;
`;
