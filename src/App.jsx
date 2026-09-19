import { useEffect, useState } from "react";
import quokkaImage from "./quokka-new.png";

// 지금은 내 컴퓨터에서 실행 중인 백엔드에 연결합니다.
// 인터넷에 배포할 때 Render 주소로 연결하도록 바꿉니다.
const API_URL = "https://memo-backend-tlq1.onrender.com";

export default function App() {
  const [memos, setMemos] = useState([]);
  const [text, setText] = useState("");
  const [status, setStatus] = useState("서버 연결 확인 중...");
  const [busy, setBusy] = useState(false);

  async function loadMemos() {
    try {
      const response = await fetch(`${API_URL}/memos`);
      if (!response.ok) throw new Error("조회 실패");
      const data = await response.json();
      setMemos(data);
      setStatus("✅ 백엔드 연결 성공");
    } catch {
      setStatus("❌ 서버에 연결하지 못했어요. 백엔드 터미널을 확인해주세요.");
    }
  }

  useEffect(() => {
    loadMemos();
  }, []);

  async function addMemo(event) {
    event.preventDefault();
    if (!text.trim() || busy) return;

    setBusy(true);
    try {
      const response = await fetch(`${API_URL}/memos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: text.trim() }),
      });
      if (!response.ok) throw new Error("추가 실패");
      setText("");
      await loadMemos();
    } catch {
      setStatus("❌ 메모를 추가하지 못했어요. 다시 시도해주세요.");
    } finally {
      setBusy(false);
    }
  }

  async function deleteMemo(id) {
    setBusy(true);
    try {
      const response = await fetch(`${API_URL}/memos/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("삭제 실패");
      await loadMemos();
    } catch {
      setStatus("❌ 메모를 삭제하지 못했어요. 다시 시도해주세요.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main
      style={{
        maxWidth: 720,
        margin: "40px auto",
        padding: 28,
        fontFamily: "sans-serif",
        lineHeight: 1.8,
        textAlign: "left",
        background: "#fffaf0",
        color: "#263d32",
        borderRadius: 24,
      }}
    >
      <header>
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Jua&display=swap');

    body {
      margin: 0;
      background: #f3efff;
      color: #493c63;
      font-family: 'Jua', sans-serif;
    }

    #root {
      width: 100%;
    }

    main {
      box-sizing: border-box;
      background: #fcfaff !important;
      color: #493c63 !important;
      font-family: 'Jua', sans-serif !important;
      box-shadow: 0 12px 40px rgba(112, 87, 151, 0.1);
    }

    input, button {
      font-family: inherit;
    }

    .intro-title {
      font-size: clamp(30px, 5vw, 44px);
      font-weight: 400;
      line-height: 1.4;
      letter-spacing: -1px;
      color: #66508b;
    }

    .intro-name {
      display: inline-block;
      color: #bd5c82;
      transform: rotate(-3deg);
      border-bottom: 5px solid #f4cddd;
    }

    .running-quokka {
      display: block;
      width: 280px;
      max-width: 100%;
      height: auto;
      margin: 28px auto;
      border-radius: 28px;
      animation: quokka-bounce 0.9s ease-in-out infinite;
    }

    .hobby-tags {
      line-height: 2;
      color: #76578c;
    }

    @keyframes quokka-bounce {
      0%, 100% {
        transform: translateY(0) rotate(-2deg);
      }
      50% {
        transform: translateY(-10px) rotate(2deg);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .running-quokka {
        animation: none;
      }
    }
  `}</style>

  <p>ABOUT ME · 채재희</p>

  <h1 className="intro-title">
    안녕하세요,<br />
    <span className="intro-name">채재희</span>입니다! 👋
  </h1>

  <img
    className="running-quokka"
    src={quokkaImage}
    alt="살구색 러닝복과 리본을 착용하고 달리는 쿼카"
  />

  <p>
    KB국민카드에서 근무하고 있습니다.
    <br />
    취미는 러닝이며, 올해는 풀마라톤도 완주했어요!
    <br />
    저를 닮은 동물은 쿼카입니다.
    <br />
    저는 새로운 것을 접하고 배우는 것을 좋아해요!
  </p>

  <p className="hobby-tags">
    🏃‍♀️ 러닝 · 🏅 2026 풀마라톤 완주 · 🐾 쿼카 · 💻 코딩
  </p>
</header>
      <section
        id="memo"
        style={{
          marginTop: 36,
          paddingTop: 20,
          borderTop: "1px solid #ccd8cb",
        }}
      >
        <h2>📝 재희의 러닝 메모장</h2>
        <p>러닝 목표나 응원 메시지를 남겨보세요.</p>
       {status.startsWith("❌") && <p role="status">{status}</p>}

        <form
          onSubmit={addMemo}
          style={{ display: "flex", gap: 8, flexWrap: "wrap" }}
        >
          <input
            aria-label="메모 내용"
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="예: 이번 주에는 즐겁게 5km 달리기!"
            style={{
              flex: 1,
              minWidth: 180,
              padding: 12,
              borderRadius: 8,
              border: "1px solid #a9b9aa",
              background: "white",
              color: "#263d32",
            }}
          />
          <button type="submit" disabled={busy || !text.trim()}>
            추가
          </button>
        </form>

        {memos.length === 0 && <p>아직 표시할 메모가 없어요.</p>}

        <ul style={{ paddingLeft: 24 }}>
          {memos.map((memo) => (
            <li key={memo.id} style={{ margin: "12px 0" }}>
              <span style={{ overflowWrap: "anywhere" }}>
                {memo.content}
              </span>
              <button
                type="button"
                onClick={() => deleteMemo(memo.id)}
                disabled={busy}
                style={{ marginLeft: 12 }}
              >
                삭제
              </button>
            </li>
          ))}
        </ul>

        <p style={{ fontSize: 13 }}>
          실습용 메모는 서버 메모리에 저장되므로 서버가 재시작되면 사라집니다.
          개인정보는 입력하지 마세요.
        </p>
      </section>
    </main>
  );
}