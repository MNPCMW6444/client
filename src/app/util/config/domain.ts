export default process.env.NODE_ENV === "development"
  ? "http://localhost:6555/"
  : "https://server.f-ai-ler.com/";
