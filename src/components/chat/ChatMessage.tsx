export default function ChatMessage({ text }: { text: string }) {
  return <article className="chat-message">{text}</article>;
}
