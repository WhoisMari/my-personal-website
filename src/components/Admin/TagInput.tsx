import React, { useState, KeyboardEvent } from "react";
import styled from "styled-components";

const Wrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding: 8px 10px;
  border: 1px solid ${({ theme }) => theme.box_shadow};
  border-radius: 8px;
  background: ${({ theme }) => theme.body};
  min-height: 42px;
  align-items: center;
  cursor: text;
`;

const Chip = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 3px 10px;
  border-radius: 20px;
  background: rgba(180, 19, 76, 0.12);
  color: ${({ theme }) => theme.color1};
  font-size: 0.78rem;
  font-weight: 500;
`;

const RemoveBtn = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: inherit;
  opacity: 0.6;
  font-size: 0.75rem;
  line-height: 1;
  &:hover { opacity: 1; }
`;

const TagTextInput = styled.input`
  border: none;
  outline: none;
  background: none;
  color: ${({ theme }) => theme.text};
  font-size: 0.85rem;
  min-width: 80px;
  flex: 1;
`;

interface TagInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
}

export default function TagInput({ value, onChange, placeholder = "Add tag, press Enter…" }: TagInputProps) {
  const [input, setInput] = useState("");

  function addTag(raw: string) {
    const tag = raw.trim();
    if (!tag || value.includes(tag)) return;
    onChange([...value, tag]);
    setInput("");
  }

  function handleKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(input);
    } else if (e.key === "Backspace" && input === "" && value.length > 0) {
      onChange(value.slice(0, -1));
    }
  }

  return (
    <Wrap onClick={() => document.getElementById("tag-input-" + placeholder)?.focus()}>
      {value.map((tag) => (
        <Chip key={tag}>
          {tag}
          <RemoveBtn type="button" onClick={() => onChange(value.filter((t) => t !== tag))}>
            ✕
          </RemoveBtn>
        </Chip>
      ))}
      <TagTextInput
        id={"tag-input-" + placeholder}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKey}
        onBlur={() => addTag(input)}
        placeholder={value.length === 0 ? placeholder : ""}
      />
    </Wrap>
  );
}
