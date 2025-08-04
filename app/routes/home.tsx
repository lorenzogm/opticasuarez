export function meta() {
  return [
    { title: "Hello World - Optica Suarez" },
    { name: "description", content: "Hello World from Optica Suarez!" },
  ];
}

export default function Home() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Hello World</h1>
      <p>Welcome to Optica Suarez!</p>
    </div>
  );
}