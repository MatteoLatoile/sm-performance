export default function Loading() {
  return (
    <main className="min-h-screen px-6 py-14" style={{ background: "#11151C" }}>
      <div className="mx-auto max-w-6xl">
        <div
          className="rounded-2xl border p-6"
          style={{ background: "#0D1014", borderColor: "#232A36" }}
        >
          <div
            className="h-6 w-48 rounded"
            style={{ background: "rgba(168,176,189,0.15)" }}
          />
          <div
            className="mt-3 h-4 w-96 rounded"
            style={{ background: "rgba(168,176,189,0.10)" }}
          />
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-4">
            <div
              className="h-[460px] rounded-2xl border"
              style={{ background: "#0D1014", borderColor: "#232A36" }}
            />
            <div
              className="h-[460px] rounded-2xl border"
              style={{ background: "#0D1014", borderColor: "#232A36" }}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
