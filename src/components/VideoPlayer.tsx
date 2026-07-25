import React, { useRef, useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Play, Pause, Volume2, RotateCcw, CheckCircle, 
  Maximize, Minimize, Settings, Bookmark
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
    toggleBookmark,
    bookmarks,
    currentUser
  } = useApp();

  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showCover, setShowCover] = useState(true);
  const [videoDuration, setVideoDuration] = useState(duration);

  // Sync videoDuration state when duration prop updates
  useEffect(() => {
    if (duration) {
      setVideoDuration(duration);
    }
  }, [duration]);

  // Resume watching logic on mount or lesson change
  useEffect(() => {
    const lessonProgress = progress[lessonId];
    if (videoRef.current && lessonProgress && lessonProgress.watchTime > 0) {
      const savedTime = Math.min(lessonProgress.watchTime, videoDuration - 1);
      videoRef.current.currentTime = savedTime;
      setCurrentTime(savedTime);
      setShowCover(false);
    } else if (videoRef.current) {
      videoRef.current.currentTime = 0;
      setCurrentTime(0);
      setShowCover(true);
    }
    setIsPlaying(false);
    setSpeed(1);
  }, [lessonId, videoDuration]);

  // ── Screen recording & capture protection ──────────────────────────────────
  useEffect(() => {
    // Block right-click context menu on the player
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();

    // Block keyboard screenshot shortcuts: PrtScr, Ctrl+P, Ctrl+Shift+S, Win+PrtScr, Alt+PrtScr
    const handleKeyDown = (e: KeyboardEvent) => {
      const blocked =
        e.key === 'PrintScreen' ||
        (e.ctrlKey && e.key === 'p') ||
        (e.ctrlKey && e.shiftKey && e.key === 's') ||
        (e.metaKey && e.shiftKey && e.key === '3') ||
        (e.metaKey && e.shiftKey && e.key === '4') ||
        (e.metaKey && e.shiftKey && e.key === '5');
      if (blocked) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    const playerEl = playerRef.current;
    if (playerEl) {
      playerEl.addEventListener('contextmenu', handleContextMenu);
    }
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      if (playerEl) playerEl.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // ── Video progress tracking ────────────────────────────────────────────────
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const time = videoRef.current.currentTime;
      setCurrentTime(time);
      if (Math.floor(time) !== Math.floor(currentTime)) {
        updateWatchTime(lessonId, Math.floor(time));
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current && videoRef.current.duration && !isNaN(videoRef.current.duration)) {
      setVideoDuration(videoRef.current.duration);
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
    const playerEl = playerRef.current;
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

  // Bookmark timestamp logic
  const isVideoBookmarked = bookmarks.some(
    b => b.lessonId === lessonId && b.type === 'video' && b.refData === Math.floor(currentTime).toString()
  );
  const handleBookmarkTimestamp = () => {
    toggleBookmark({
      type: 'video',
      title: `Video Timestamp (${formatTime(currentTime)})`,
      courseId: 'course-1',
      lessonId,
      refData: Math.floor(currentTime).toString()
    });
  };

  const isCompleted = progress[lessonId]?.completed || false;

  const youtubeRegex = /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/ ]{11})/;
  const ytMatch = videoUrl?.match(youtubeRegex);
  const isYouTube = !!(ytMatch && ytMatch[1]);
  const ytVideoId = ytMatch ? ytMatch[1] : '';

  const driveRegex = /(?:https?:\/\/)?(?:docs|drive)\.google\.com\/(?:file\/d\/|open\?id=)([^/&?#\s]+)/;
  const driveMatch = videoUrl?.match(driveRegex);
  const isDrive = !!(driveMatch && driveMatch[1]);
  const driveFileId = driveMatch ? driveMatch[1] : '';

  if (isYouTube || isDrive) {
    const embedUrl = isYouTube 
      ? `https://www.youtube-nocookie.com/embed/${ytVideoId}?autoplay=0&rel=0`
      : `https://drive.google.com/file/d/${driveFileId}/preview`;
    
    return (
      <div className="custom-video-player" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%', borderRadius: '12px', overflow: 'hidden', border: '1.5px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <iframe
            src={embedUrl}
            title="Video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
          />
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: '#ffffff', borderRadius: '10px', border: '1.5px solid #e2e8f0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#475569' }}>
              Study Controls
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={() => markLessonComplete(lessonId, !isCompleted)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                borderRadius: '8px',
                border: 'none',
                background: isCompleted ? '#f0fdf4' : 'linear-gradient(135deg, #ea580c, #c2410c)',
                color: isCompleted ? '#16a34a' : '#ffffff',
                fontWeight: 700,
                fontSize: '13px',
                cursor: 'pointer',
                boxShadow: isCompleted ? 'none' : '0 2px 6px rgba(234, 88, 12, 0.25)',
                transition: 'all 0.15s ease'
              }}
            >
              <CheckCircle size={15} fill={isCompleted ? 'currentColor' : 'none'} />
              <span>{isCompleted ? 'Completed ✓' : 'Mark Completed'}</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={playerRef}
      className="custom-video-player"
      style={{ position: 'relative', userSelect: 'none' }}
    >

      {/* ── Dynamic Identity Watermark ─────────────────────────────────────
           Shows the logged-in user's name+email on the video.
           Any screenshot will contain their identity — deters sharing.
      */}
      {isPlaying && currentUser && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 6,
            pointerEvents: 'none',
            overflow: 'hidden'
          }}
        >
          {/* 4 diagonal watermark tiles at different positions */}
          {[
            { top: '12%',  left: '5%'  },
            { top: '38%',  left: '40%' },
            { top: '65%',  left: '8%'  },
            { top: '78%',  left: '55%' },
          ].map((pos, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                top: pos.top,
                left: pos.left,
                transform: 'rotate(-20deg)',
                color: 'rgba(255,255,255,0.18)',
                fontSize: '11px',
                fontWeight: 700,
                fontFamily: 'system-ui, monospace',
                whiteSpace: 'nowrap',
                letterSpacing: '0.5px',
                pointerEvents: 'none',
                lineHeight: 1.4,
                textShadow: '0 1px 2px rgba(0,0,0,0.5)'
              }}
            >
              {currentUser.name}<br/>{currentUser.email}
            </div>
          ))}
        </div>
      )}

      {/* Actual video element – controlsList blocks native browser download/PiP */}

      <video
        ref={videoRef}
        src={videoUrl}
        poster={thumbnail}
        preload="auto"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onClick={handlePlayPause}
        className="video-element"
        controlsList="nodownload nofullscreen noremoteplayback"
        disablePictureInPicture
        playsInline
      />

      {/* Thumbnail cover overlay */}
      {showCover && thumbnail && (
        <div
          className="video-cover-overlay"
          onClick={() => {
            setShowCover(false);
            handlePlayPause();
          }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `url("${thumbnail}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10,
            borderRadius: 'inherit'
          }}
        >
          <div
            style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.25)',
              backdropFilter: 'blur(10px)',
              border: '2px solid rgba(255, 255, 255, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
              transition: 'all 0.3s ease',
              color: '#ffffff'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.1)';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.35)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
            }}
          >
            <Play size={32} fill="currentColor" style={{ marginLeft: '4px' }} />
          </div>
        </div>
      )}

      {/* ── Control bar ────────────────────────────────────────────────────── */}
      <div className="video-controls">
        <div className="scrub-container">
          <input
            type="range"
            min={0}
            max={videoDuration || 100}
            step={0.1}
            value={currentTime}
            onChange={handleScrub}
            className="video-scrubber"
          />
        </div>

        <div className="controls-row">
          <div className="controls-left">
            <button className="control-btn" onClick={handlePlayPause} title={isPlaying ? 'Pause' : 'Play'}>
              {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
            </button>

            <button
              className="control-btn"
              onClick={() => {
                if (videoRef.current) {
                  videoRef.current.currentTime = 0;
                  setCurrentTime(0);
                  updateWatchTime(lessonId, 0);
                }
              }}
              title="Restart"
            >
              <RotateCcw size={18} />
            </button>

            <button className="control-btn" onClick={handleMute} title={isMuted ? 'Unmute' : 'Mute'}>
              <Volume2 size={18} style={{ opacity: isMuted ? 0.5 : 1 }} />
            </button>

            <span className="time-display">
              {formatTime(currentTime)} / {formatTime(videoDuration)}
            </span>
          </div>

          <div className="controls-right">
            <button
              className={`control-btn bookmark-btn ${isVideoBookmarked ? 'active' : ''}`}
              onClick={handleBookmarkTimestamp}
              title="Bookmark current timestamp"
            >
              <Bookmark size={18} fill={isVideoBookmarked ? 'currentColor' : 'none'} />
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

            {/* Mark complete */}
            <button
              className={`control-btn complete-toggle-btn ${isCompleted ? 'completed' : ''}`}
              onClick={() => markLessonComplete(lessonId, !isCompleted)}
              title={isCompleted ? 'Mark as Incomplete' : 'Mark as Completed'}
            >
              <CheckCircle size={18} fill={isCompleted ? 'currentColor' : 'none'} />
            </button>

            {/* Fullscreen */}
            <button className="control-btn" onClick={toggleFullscreenNative} title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}>
              {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
