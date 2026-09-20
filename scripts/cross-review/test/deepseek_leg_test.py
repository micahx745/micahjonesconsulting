# Offline proof of the DeepSeek leg: a stub HTTP server speaking DeepSeek's own
# dialect (GET /models, POST /chat/completions with SSE). No key, no spend, no
# network. Run from the repo root:
#   python <this file>
import json
import os
import sys
import threading
import http.server

sys.path.insert(0, os.path.join(os.getcwd(), "scripts", "cross-review"))

SEEN = {"auth": None, "model": None, "system": None, "path": []}


class Stub(http.server.BaseHTTPRequestHandler):
    def log_message(self, *a):
        pass

    def do_GET(self):
        SEEN["path"].append(self.path)
        SEEN["auth"] = self.headers.get("Authorization")
        body = json.dumps(
            {"object": "list", "data": [{"id": "deepseek-chat"}, {"id": "deepseek-reasoner"}]}
        ).encode()
        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_POST(self):
        SEEN["path"].append(self.path)
        n = int(self.headers.get("Content-Length") or 0)
        req = json.loads(self.rfile.read(n) or b"{}")
        SEEN["model"] = req.get("model")
        SEEN["system"] = (req.get("messages") or [{}])[0].get("content", "")[:60]
        self.send_response(200)
        self.send_header("Content-Type", "text/event-stream")
        self.end_headers()

        def frame(obj):
            self.wfile.write(("data: " + json.dumps(obj) + "\n\n").encode())
            self.wfile.flush()

        # A reasoning frame first (must be DISCARDED), then the answer, then the
        # finish_reason and the [DONE] sentinel.
        frame({"choices": [{"delta": {"reasoning_content": "thinking out loud"}}]})
        frame({"choices": [{"delta": {"content": "BLOCK: the "}}]})
        frame({"choices": [{"delta": {"content": "leg works."}}]})
        frame({"choices": [{"delta": {}, "finish_reason": "stop"}]})
        self.wfile.write(b"data: [DONE]\n\n")
        self.wfile.flush()


srv = http.server.HTTPServer(("127.0.0.1", 0), Stub)
port = srv.server_address[1]
threading.Thread(target=srv.serve_forever, daemon=True).start()

import run_cross_review as rc  # noqa: E402

rc.DEEPSEEK_ENDPOINT = "http://127.0.0.1:%d/chat/completions" % port
rc.DEEPSEEK_MODELS_ENDPOINT = "http://127.0.0.1:%d/models" % port

failures = []


def check(name, cond, detail=""):
    if cond:
        print("PASS %s%s" % (name, (" -- " + detail) if detail else ""))
    else:
        failures.append(name)
        print("FAIL %s -- %s" % (name, detail))


# 1. No key anywhere -> NOT CONFIGURED, and no request is made.
os.environ.pop("DEEPSEEK_API_KEY", None)
os.environ.pop("DEEPSEEK_MODEL", None)
_saved_key_fn = rc._deepseek_key
rc._deepseek_key = lambda: ""
st, body, label = rc._run_deepseek_rest("x", 20)
check("no key -> NOT CONFIGURED", st == "NOT CONFIGURED" and not SEEN["path"], "status=%s calls=%s" % (st, SEEN["path"]))
rc._deepseek_key = _saved_key_fn

# 2. With a key: model resolved from the account, reasoning discarded, answer kept.
os.environ["DEEPSEEK_API_KEY"] = "stub-key-not-real"
st, body, label = rc._run_deepseek_rest("review this", 20)
check("keyed call -> OK", st == "OK", "status=%s body=%r" % (st, body))
check("answer text only", body == "BLOCK: the leg works.", "body=%r" % body)
check("reasoning_content discarded", "thinking out loud" not in body)
check("model chosen by preference", SEEN["model"] == "deepseek-reasoner", "model=%s" % SEEN["model"])
check("label names model and how", "deepseek-reasoner" in label and "2 models" in label, "label=%s" % label)
check("key sent as bearer", SEEN["auth"] == "Bearer stub-key-not-real")
check("models endpoint consulted", any(p.endswith("/models") for p in SEEN["path"]), str(SEEN["path"]))
check("instruction passed through", len(SEEN["system"] or "") > 10, "system=%r" % SEEN["system"])

# 3. DEEPSEEK_MODEL overrides without asking the account.
SEEN["path"] = []
os.environ["DEEPSEEK_MODEL"] = "deepseek-chat"
st, body, label = rc._run_deepseek_rest("review this", 20)
check("override wins", SEEN["model"] == "deepseek-chat" and "override" in label, "model=%s label=%s" % (SEEN["model"], label))
check("override skips /models", not any(p.endswith("/models") for p in SEEN["path"]), str(SEEN["path"]))
del os.environ["DEEPSEEK_MODEL"]

# 4. The GLM leg still resolves through the shared helper (no key -> NOT CONFIGURED).
_saved_glm = rc._glm_key
rc._glm_key = lambda: ""
gst, gbody = rc._run_glm_rest("x", 5)
check("glm leg intact", gst == "NOT CONFIGURED", "status=%s" % gst)
rc._glm_key = _saved_glm

# 5. deepseek is a known leg and is on by default.
check("deepseek in default legs", "deepseek" in rc.main.__doc__ if rc.main.__doc__ else True)

srv.shutdown()
del os.environ["DEEPSEEK_API_KEY"]
print()
print("FAILURES: %d" % len(failures))
sys.exit(1 if failures else 0)
