import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CodeBlockR } from "@/components/CodeBlockR";

declare global {
  interface Window {
    thebelab: any;
  }
}

const THEBE_JS = "/vendor/thebe/index.js";
const THEBE_CSS = "/vendor/thebe/thebe.css";
const BINDER_REPO = "RaresKeY/thebe-binder-react-vite-test";
const BINDER_REF = "main";
const KERNEL_NAME = "python3";

export function BinderRun({
  children,
  language = "python",
}: {
  children: string;
  language?: string;
}) {
  const [running, setRunning] = useState(false);
  const [output, setOutput] = useState("");
  const [kernel, setKernel] = useState<any>(null);
  const booted = useRef(false);

  /** Load Thebe assets once */
  useEffect(() => {
    if (!document.querySelector('link[data-thebe-css]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = THEBE_CSS;
      link.setAttribute("data-thebe-css", "");
      document.head.appendChild(link);
    }

    if (!document.querySelector('script[data-thebe-local]')) {
      const script = document.createElement("script");
      script.src = THEBE_JS;
      script.async = true;
      script.defer = true;
      script.setAttribute("data-thebe-local", "");
      document.body.appendChild(script);
    }

    // clear old sessions
    Object.keys(localStorage).forEach((k) => {
      if (/thebe|binder|jupyter/i.test(k)) localStorage.removeItem(k);
    });
  }, []);

  /** Bootstrap Binder and return kernel */
  const connectKernel = async () => {
    if (kernel) return kernel;
    if (booted.current) throw new Error("Already bootstrapped");
    booted.current = true;

    console.log("🔄 Waiting for Thebe to load...");
    await new Promise<void>((resolve, reject) => {
      const start = Date.now();
      const wait = () => {
        if (window.thebelab?.bootstrap) return resolve();
        if (Date.now() - start > 30000)
          return reject(new Error("Timeout loading Thebe"));
        setTimeout(wait, 250);
      };
      wait();
    });

    console.log("⚙️ Bootstrapping Thebe...");
    const mgr = await window.thebelab.bootstrap({
      binderOptions: {
        repo: BINDER_REPO,
        ref: BINDER_REF,
        binderUrl: "https://gesis.mybinder.org",
        repoProvider: "github",
      },
      kernelOptions: { name: KERNEL_NAME },
      requestKernel: true,
      mountActivateWidget: false,
    });

    const k =
      mgr.kernel ||
      mgr.session?.kernel ||
      mgr.sessions?.[0]?.kernel ||
      mgr.notebook?.session?.kernel;

    if (!k) {
      console.error("❌ No kernel found in Thebe manager:", mgr);
      throw new Error("No kernel found");
    }

    console.info("✅ Connected to Binder kernel:", k.id);
    setKernel(k);
    return k;
  };

  /** Execute code */
const handleRun = async () => {
  try {
    setRunning(true);
    setOutput("");

    const k = await connectKernel();

    console.log("▶️ Executing code:", children);
    const future = k.requestExecute({ code: children });

    future.onIOPub = (msg: any) => {
      console.log("📩 Kernel message:", msg);

      const t = msg.header?.msg_type;
      const c = msg.content;

      if (t === "stream" && c?.text) {
        setOutput((prev) => prev + c.text);
      } 
      else if (t === "execute_result" && c?.data) {
        const txt = c.data["text/plain"] ?? c.data["text/html"];
        if (txt) setOutput((prev) => prev + txt + "\n");
      } 
      else if (t === "display_data" && c?.data) {
        const txt = c.data["text/plain"] ?? c.data["text/html"];
        if (txt) setOutput((prev) => prev + txt + "\n");
      } 
      else if (t === "error" && c) {
        const err =
          c.evalue ||
          (c.traceback && c.traceback.join("\n")) ||
          "Unknown execution error";
        setOutput((prev) => prev + "\n❌ " + err + "\n");
      }
    };

    // Capture shell reply too
    future.onReply = (reply: any) => {
      console.log("💬 Execution reply:", reply);
    };

    // Capture when execution is done
    future.onDone = () => {
      console.log("✅ Execution complete");
    };

  } catch (err) {
    console.error("Run error:", err);
    setOutput("Error connecting to Binder kernel.");
    booted.current = false;
    setKernel(null);
  } finally {
    setRunning(false);
  }
};

  return (
    <div className="my-4">
      <CodeBlockR>{children}</CodeBlockR>

      <pre className="mt-2 rounded bg-zinc-900 text-zinc-100 p-3 text-sm font-mono min-h-[1.5rem] whitespace-pre-wrap">
        {output || ""}
      </pre>

      <Button
        onClick={handleRun}
        disabled={running}
        className="mt-2 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
      >
        <Play className="w-4 h-4" />
        {running ? "Running..." : "Run Python"}
      </Button>
    </div>
  );
}
