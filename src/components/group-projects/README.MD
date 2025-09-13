# Group Mood Detection Music Assistant - Human Approach & Team Breakdown

## 1. How *We Humans* Would Do It (Mental Model)

Imagine we're in a group: people talk, laugh, sometimes get serious, sometimes drift. If *we humans* were the "assistant DJ," here's what happens:

* We **listen** to the vibe of the conversation (are they excited? tired? stressed? calm?).
* We **make sense** of it ("they're joking a lot → playful mood" or "lots of sighing → low energy").
* We **decide** what song fits next (calm music, energetic beat, gentle background).
* We **play it**, maybe turn the volume down if they're focused, up if they're celebrating.
* We **adjust** as the vibe shifts — always listening, always adapting.

So the assistant is just a mirror of what *we humans* naturally do: sensing → interpreting → acting.

## 2. Program Scope (The Assistant's Role)

Now we turn that Mind into a **Machine Helper**. The program should be able to:

1. **Hear** (record audio chunks of conversation).
2. **Understand** (turn audio into text, and guess the mood).
3. **Decide** (choose the next 2–3 songs + volume).
4. **Play** (actually play music, like a DJ).
5. **Show** (display a simple player so everyone can see what's happening).

That's the whole program: *hear → understand → decide → play → show*. Everything else is just bricks to support those steps.

## 3. The Art of Breaking It Down (Lego Bricks 🧱)

Now — we don't build the whole castle at once. We split into **teams**, and each team only cares about *their* Lego brick. No one is responsible for "the whole castle."

Here's a playful breakdown:

### 🎵 Team 1 — Song Curators
* **Job**: Create mood playlists.
* Collect `.mp3` files into folders like `calm/`, `happy/`, `sad/`, `energetic/`.
* No coding needed — just good taste in music!
* **Output**: a neat folder structure or JSON list.

### 🎤 Team 2 — Recorders
* **Job**: Make sure we can capture sound.
* Write a simple Python script that records mic/speaker for 1 minute and saves as `.wav`.
* No need to understand moods — just: record → save.
* **Output**: audio files in a folder.

### 📝 Team 3 — Transcribers
* **Job**: Take `.wav` and turn it into text (use Whisper or online tool).
* No music, no mood — just plain text from audio.
* **Output**: text transcripts.

### 😃 Team 4 — Mood Detectors
* **Job**: Look at transcript and decide: "happy / sad / calm / stressed."
* Can start manually (read transcript, assign mood).
* Later, use a chatbot or sentiment analyzer.
* **Output**: mood labels.

### 🎧 Team 5 — DJs
* **Job**: Based on mood, pick next 2–3 songs from the mood playlist.
* Rule-based at first ("happy → pick from happy folder").
* **Output**: list of next songs + volume suggestion.

### ▶️ Team 6 — Players
* **Job**: Actually play the music.
* Write simple music player script (play, pause, skip, volume up/down).
* No moods, no recording — just reliable playback.
* **Output**: running player.

### 💻 Team 7 — Presenters
* **Job**: Build a fun interface (React web page that looks like a music player).
* Show: now playing, upcoming songs, current mood (with an emoji).
* **Output**: a playful dashboard everyone can see.

### 🌉 Team 8 — Integrators
* **Job**: Once all bricks are ready, connect them.
* Make Recorder feed Transcriber, Transcriber feed Mood Detector, Mood Detector feed DJ, DJ feed Player, Player show on Dashboard.
* **Output**: the *whole Assistant working together*.

## 4. The Art of Putting It Together 🎇

After each team builds their Lego piece:

* We meet for **Integration Day**.
* Like musicians in a band, each brings their instrument.
* First, we connect 2 instruments (Recorder + Transcriber).
* Then add Mood Detector.
* Then DJ, then Player, then Dashboard.
* At the end — the system comes alive: The Assistant listens, thinks, chooses, and plays music for us.

🌈 **Key takeaway for students:** No one has to carry the whole elephant 🐘. We chop it into fun little bricks. Each team trusts the others, focuses on their small world, and together we create something bigger than we could alone.