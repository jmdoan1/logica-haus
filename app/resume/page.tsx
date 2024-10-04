export default function Page() {
  return (
    <section>
      <div style={{ textAlign: "center" }}>
        <a
          href="/assets/resume/Doan, Jay - Full Stack Engineer - LHN.pdf"
          download
        >
          <button
            style={{
              padding: "10px 20px",
              backgroundColor: "#0070f3",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              marginBottom: 10,
              marginTop: -20,
            }}
          >
            Download My Resume
          </button>
        </a>
        <iframe
          src="/assets/resume/Doan, Jay - Full Stack Engineer - LHN.pdf"
          width="100%"
          height="600px"
          //   height="100%"
          style={{ border: "1px solid #ccc" }}
        >
          This browser does not support PDFs. Please download the PDF to view
          it:
          <a href="/sample.pdf">Download PDF</a>.
        </iframe>
      </div>
    </section>
  );
}
