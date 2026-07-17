import React, { useRef, useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Play, Pause, Volume2, RotateCcw, Download, CheckCircle, 
  Maximize, Minimize, Settings, Bookmark, Check 
} from 'lucide-react';

interface VideoPlayerProps {
  lessonId: string;
  videoUrl: string;
  thumbnail: string;
  duration: number; // in seconds
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ lessonId, videoUrl, thumbnail, duration }) => {
  const { 
    progress, 
    updateWatchTime, 
    markLessonComplete, 
    addDownload, 
    downloads, 
    removeDownload,
    toggleBookmark,
    bookmarks
  } = useApp();

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Resume watching logic on mount or lesson change
  useEffect(() => {
    const lessonProgress = progress[lessonId];
    if (videoRef.current && lessonProgress && lessonProgress.watchTime > 0) {
      // Seek to saved watch time
      const savedTime = Math.min(lessonProgress.watchTime, duration - 1);
      videoRef.current.currentTime = savedTime;
      setCurrentTime(savedTime);
    } else if (videoRef.current) {
      videoRef.current.currentTime = 0;
      setCurrentTime(0);
    }
    setIsPlaying(false);
    setSpeed(1);
  }, [lessonId, duration]);

  // Track video progress
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const time = videoRef.current.currentTime;
      setCurrentTime(time);
      
      // Throttled progress update (every integer second)
      if (Math.floor(time) !== Math.floor(currentTime)) {
        updateWatchTime(lessonId, Math.floor(time));
      }
    }
  };

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(err => console.log('Play blocked', err));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleScrub = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      updateWatchTime(lessonId, Math.floor(time));
    }
  };

  const handleSpeedChange = (newSpeed: number) => {
    setSpeed(newSpeed);
    setShowSpeedMenu(false);
    if (videoRef.current) {
      videoRef.current.playbackRate = newSpeed;
    }
  };

  const handleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreenNative = () => {
    const playerEl = videoRef.current?.parentElement;
    if (playerEl) {
      if (!document.fullscreenElement) {
        playerEl.requestFullscreen().catch(err => console.log(err));
        setIsFullscreen(true);
      } else {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  // Watch for ESC or fullscreen changes
  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Download logic
  const isDownloaded = downloads.some(d => d.lessonId === lessonId && d.type === 'video');
  const handleDownloadToggle = () => {
    if (isDownloaded) {
      const match = downloads.find(d => d.lessonId === lessonId && d.type === 'video');
      if (match) removeDownload(match.id);
    } else {
      addDownload({
        type: 'video',
        title: `Lecture Video: Lesson ${lessonId}`,
        size: '42.8 MB',
        url: videoUrl,
        lessonId
      });
    }
  };

  // Bookmark video timestamp logic
  const isVideoBookmarked = bookmarks.some(b => b.lessonId === lessonId && b.type === 'video' && b.refData === Math.floor(currentTime).toString());
  const handleBookmarkTimestamp = () => {
    toggleBookmark({
      type: 'video',
      title: `Video Timestamp (${formatTime(currentTime)})`,
      courseId: 'course-1', // Default
      lessonId,
      refData: Math.floor(currentTime).toString()
    });
  };

  const isCompleted = progress[lessonId]?.completed || false;

  return (
    <div className="custom-video-player">
      <video
        ref={videoRef}
        src={videoUrl}
        poster={thumbnail}
        onTimeUpdate={handleTimeUpdate}
        onClick={handlePlayPause}
        className="video-element"
      />

      {/* Control overlay */}
      <div className="video-controls">
        <div className="scrub-container">
          <input
            type="range"
            min={0}
            max={duration || 100}
            step={0.1}
            value={currentTime}
            onChange={handleScrub}
            className="video-scrubber"
          />
        </div>

        <div className="controls-row">
          <div className="controls-left">
            <button className="control-btn" onClick={handlePlayPause} title={isPlaying ? "Pause" : "Play"}>
              {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
            </button>

            <button className="control-btn" onClick={() => {
              if (videoRef.current) {
                videoRef.current.currentTime = 0;
                setCurrentTime(0);
                updateWatchTime(lessonId, 0);
              }
            }} title="Restart">
              <RotateCcw size={18} />
            </button>

            <button className="control-btn" onClick={handleMute} title={isMuted ? "Unmute" : "Mute"}>
              <Volume2 size={18} style={{ opacity: isMuted ? 0.5 : 1 }} />
            </button>

            <span className="time-display">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          <div className="controls-right">
            <button 
              className={`control-btn bookmark-btn ${isVideoBookmarked ? 'active' : ''}`} 
              onClick={handleBookmarkTimestamp} 
              title="Bookmark current timestamp"
            >
              <Bookmark size={18} fill={isVideoBookmarked ? "currentColor" : "none"} />
            </button>

            {/* Playback speed selector */}
            <div className="speed-selector-wrapper">
              <button 
                className="control-btn speed-btn" 
                onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                title="Playback Speed"
              >
                <Settings size={18} />
                <span className="speed-label">{speed}x</span>
              </button>
              {showSpeedMenu && (
                <div className="speed-dropdown">
                  {[0.5, 1, 1.25, 1.5, 2].map(s => (
                    <button 
                      key={s} 
                      className={`speed-option ${speed === s ? 'active' : ''}`}
                      onClick={() => handleSpeedChange(s)}
                    >
                      {s}x
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button 
              className={`control-btn download-btn ${isDownloaded ? 'downloaded' : ''}`}
              onClick={handleDownloadToggle}
              title={isDownloaded ? "Remove downloaded video" : "Download video for offline use"}
            >
              {isDownloaded ? <Check size={18} color="var(--md-sys-color-success)" /> : <Download size={18} />}
            </button>

            <button 
              className={`control-btn complete-toggle-btn ${isCompleted ? 'completed' : ''}`}
              onClick={() => markLessonComplete(lessonId, !isCompleted)}
              title={isCompleted ? "Mark as Incomplete" : "Mark as Completed"}
            >
              <CheckCircle size={18} fill={isCompleted ? "currentColor" : "none"} />
            </button>

            <button className="control-btn" onClick={toggleFullscreenNative} title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}>
              {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
