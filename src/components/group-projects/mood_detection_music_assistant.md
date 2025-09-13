# Group Mood Detection Music Assistant - Project Overview

## Project Vision

**Vision**: An intelligent music system that continuously monitors group conversations, analyzes collective mood/energy, and automatically curates music that enhances or complements the detected atmosphere.

**Key Innovation**: Real-time sentiment analysis driving adaptive music selection, creating a feedback loop between human interaction and musical ambiance.

## Task Breakdown & Difficulty Assessment

### Phase I: Audio Capture System ⭐⭐⭐⭐⭐
**Complexity: High Implementation, Low Concept**

Record conversation and save audio file (speakers output + self-microphone → TO .wav or .mp3)

- **Technical Requirements**: Simultaneous capture of room audio (microphone) and system audio (speaker output)
- **Challenges**: Audio mixing, noise isolation, continuous recording buffer management
- **Architecture Decision**: Circular buffer system to maintain rolling 10-minute windows
- **Hardware Considerations**: Quality microphone positioning, speaker feedback prevention
- **File Management**: Automated cleanup of processed audio segments

### Phase II: Music Database & Categorization ⭐⭐⭐
**Complexity: Medium - Content Curation Intensive**

Create Music Genres/Moods Lists, populate with songs each Genre/Mood (YouTube/Local .mp3s, OnlineFree Platform links)

#### Mood Taxonomy Development
- **Primary emotions**: Happy, Sad, Energetic, Calm, Focused, Social
- **Secondary modifiers**: Intensity levels, group size considerations
- **Contextual tags**: Meeting type, time of day, detected activity

#### Content Strategy
- **Local library advantages**: No internet dependency, copyright control, instant access
- **Metadata enrichment**: BPM, key, energy level, instrumental vs vocal
- **Playlist algorithms**: Smooth transitions, avoiding mood whiplash
- **Scalability Planning**: Database structure for easy expansion

### Phase III: Speech-to-Text Pipeline ⭐⭐⭐⭐
**Complexity: High - Accuracy Critical**

Get text from an audio file (.wav, .mp3 → to .txt transcript)

#### Technical Stack Considerations
- **Local processing**: Whisper, Vosk vs **Cloud APIs**: Google, Azure
- **Real-time vs batch processing** trade-offs
- **Multiple language support** planning

#### Quality Optimization
- **Audio preprocessing**: noise reduction, normalization
- **Confidence scoring** for transcript reliability
- **Handling overlapping speech**, background noise

### Phase IV: Context-Aware Listening Algorithm ⭐⭐⭐⭐⭐
**Complexity: Very High - Core Intelligence**

Main Script to send audio each ~10 minutes and handle context (context = already played songs, summary of the meeting so far for better grasp of vibe)

#### Context Management System
- **Historical Context**: Previously played songs, user feedback patterns
- **Session Context**: Meeting progression, energy curve tracking
- **Temporal Context**: Duration since last mood shift, time of day

#### Intelligent Scheduling
- **Adaptive polling intervals** based on conversation intensity
- **Smart triggering**: detect natural conversation breaks
- **Buffer management** for seamless analysis

### Phase V: Sentiment Analysis & Mood Detection ⭐⭐⭐⭐
**Complexity: Very High - AI/ML Core**

Send audio file to ChatBot and receive Transcript. Analyze Transcript

#### Multi-Model Approach
- **Primary**: LLM-based sentiment analysis (GPT/Claude API integration)
- **Secondary**: Traditional ML models for validation
- **Ensemble**: Weighted combination for robust predictions

#### Analysis Dimensions
- **Individual sentiment** extraction
- **Group consensus** detection
- **Energy level** assessment
- **Topic categorization** (work, social, creative)
- **Confidence Scoring**: Reliability metrics for each prediction

### Phase VI: Music Recommendation Engine ⭐⭐⭐
**Complexity: High - Decision Logic**

Inference: Receive next 3 songs to play and volume

#### Recommendation Algorithm
- **Mood-to-genre mapping** with confidence weighting
- **Transition smoothness** scoring
- **Repetition avoidance** logic
- **Volume adjustment algorithms** based on conversation intensity

#### Output Format
- **Primary recommendation** + 2 alternatives
- **Confidence scores** for each suggestion
- **Volume level** (0-100%) with reasoning
- **Transition timing** recommendations

### Phase VII: Music Player Engine ⭐⭐⭐⭐⭐⭐
**Complexity: Very High - Real-time Coordination**

Algorithm to Handle playing songs, upcoming songs received every round, handle volume and other signals from Task VI

#### Core Responsibilities
- **Queue Management**: Dynamic playlist updates, smooth transitions
- **Audio Control**: Volume ramping, crossfading capabilities
- **Interrupt Handling**: Pause/resume on detection of important conversations
- **Feedback Loop**: Track user manual overrides for learning

#### Technical Challenges
- **Multi-threaded audio processing**
- **Low-latency response** to mood changes
- **Graceful handling** of recommendation delays

### Phase VIII: User Interface & Experience ⭐⭐⭐⭐⭐⭐⭐
**Complexity: High - UX Design**

User Experience: Now show it all to the user as a Music Player-like vibe (showing upcoming songs, options to start/stop, etc)

#### Display Components
- **Now Playing**: Current track with mood reasoning
- **Upcoming Queue**: Next 3-5 songs with confidence indicators
- **Mood Indicator**: Visual representation of detected group sentiment
- **Manual Controls**: Override, skip, volume, pause/play

#### User Feedback Integration
- **Simple thumbs up/down** for recommendations
- **Manual mood correction** options
- **Session summary** and learning insights

## Implementation Strategy & Considerations

### Development Approach
- **Phase-Gate Methodology**: Each phase must demonstrate core functionality before advancing
- **MVP Strategy**: Start with basic mood detection → simple music mapping → gradually add intelligence
- **Testing Framework**: Controlled group sessions with varied scenarios

### Technical Architecture Decisions
- **Processing Balance**: Local vs cloud processing for privacy vs capability trade-offs
- **Data Storage**: User privacy considerations, conversation data handling
- **Scalability**: Design for multiple simultaneous users/rooms
- **Offline Capability**: Graceful degradation without internet connectivity

### Risk Mitigation
- **Privacy Concerns**: Clear data policies, local processing options
- **Accuracy Issues**: Fallback to manual control, confidence thresholds
- **Technical Failures**: Robust error handling, system recovery procedures
- **User Adoption**: Intuitive overrides, learning from corrections

## Success Metrics & Validation

### Quantitative Measures
- **Mood detection accuracy** compared to human assessment
- **User intervention frequency** (lower = better automation)
- **Session satisfaction ratings**
- **Music recommendation acceptance rates**

### Qualitative Goals
- **Seamless integration** into natural conversations
- **Enhanced meeting/gathering atmosphere**
- **Reduced friction** in music selection decisions
- **Positive user feedback** on "invisible" operation

## Project Scope & Requirements

### Hardware Requirements
- **Simple speaker + microphone setup** (no diarization libraries needed)
- **Processing capabilities** for real-time audio analysis
- **Storage capacity** for local music library and audio buffers

### Software Stack Considerations
- **Audio Processing**: Real-time capture and analysis
- **AI/ML Integration**: LLM APIs for sentiment analysis
- **Database Management**: Music metadata and user preferences
- **User Interface**: Modern, intuitive music player design

## Next Steps & Discussion Points

This project sits at the intersection of AI, audio processing, and human-computer interaction, offering rich opportunities for both technical innovation and user experience design. The modular approach allows for iterative development while building toward a sophisticated final system.

### Key Discussion Areas
1. **Privacy vs Functionality**: Local processing vs cloud capabilities trade-offs
2. **User Control vs Automation**: Balance between intelligent automation and user agency
3. **Technical Implementation**: Programming languages, frameworks, and tools selection
4. **Testing Methodology**: How to validate mood detection accuracy and user satisfaction
5. **Scalability Planning**: Single room vs multi-room vs multi-user considerations

---

*This document provides a comprehensive overview for the Group Mood Detection Music Assistant project. Each phase can be further detailed with specific technical specifications, code architecture, and implementation timelines as the project progresses.*