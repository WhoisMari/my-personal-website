import React from "react";
import styled from "styled-components";

const Wrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  height: 400px;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100%;
  padding: 12px;
  font-family: "Courier New", monospace;
  font-size: 0.875rem;
  border: 1px solid ${({ theme }) => theme.box_shadow};
  border-radius: 8px;
  background: ${({ theme }) => theme.post_container};
  color: ${({ theme }) => theme.text};
  resize: none;
  box-sizing: border-box;
  &:focus { outline: 2px solid ${({ theme }) => theme.color1}; }
`;

const Preview = styled.div`
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.box_shadow};
  border-radius: 8px;
  background: ${({ theme }) => theme.post_container};
  overflow-y: auto;
  font-size: 0.9rem;
  line-height: 1.7;

  h1, h2, h3 { color: ${({ theme }) => theme.color1}; margin-top: 0.5em; }
  p { margin: 0 0 0.75em; }
  code {
    background: ${({ theme }) => theme.bg1};
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 0.85em;
  }
  pre { background: ${({ theme }) => theme.bg1}; padding: 12px; border-radius: 6px; overflow-x: auto; }
  ul, ol { padding-left: 20px; }
  a { color: ${({ theme }) => theme.color1}; }
`;

function renderMarkdown(md: string): string {
  return md
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^# (.+)$/gm, "<h1>$1</h1>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>')
    .replace(/^- (.+)$/gm, "<li>$1</li>")
    .replace(/(<li>.*<\/li>\n?)+/g, (m) => `<ul>${m}</ul>`)
    .replace(/\n\n/g, "</p><p>")
    .replace(/^(?!<[h|u|o|l|p])(.+)$/gm, "<p>$1</p>");
}

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function MarkdownEditor({ value, onChange }: Props) {
  return (
    <Wrap>
      <TextArea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Write markdown here…"
        spellCheck={false}
      />
      <Preview dangerouslySetInnerHTML={{ __html: renderMarkdown(value) }} />
    </Wrap>
  );
}
