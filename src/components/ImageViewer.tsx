import React, { useState } from 'react';
import { ZoomIn, ZoomOut, Maximize2, Minimize2, ChevronLeft, ChevronRight, X, Image as ImageIcon } from 'lucide-react';

interface ImageItem {
  url: string;
  caption: string;
  highResUrl: string;
}

interface ImageViewerProps {
  images: ImageItem[];
}

export const ImageViewer: React.FC<ImageViewerProps> = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [zoom, setZoom] = useState(100);
  const [useHighRes, setUseHighRes] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (!images || images.length === 0) return null;

  const openLightbox = (index: number) => {
    setActiveIndex(index);
    setZoom(100);
    setUseHighRes(false);
    setIsFullscreen(false);
  };

  const closeLightbox = () => {
    setActiveIndex(null);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeIndex !== null) {
      setActiveIndex(prev => (prev !== null && prev > 0 ? prev - 1 : images.length - 1));
      setZoom(100);
      setUseHighRes(false);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeIndex !== null) {
      setActiveIndex(prev => (prev !== null && prev < images.length - 1 ? prev + 1 : 0));
      setZoom(100);
      setUseHighRes(false);
    }
  };

  const zoomIn = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoom(z => Math.min(z + 25, 200));
  };

  const zoomOut = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoom(z => Math.max(z - 25, 50));
  };

  const toggleHighRes = (e: React.MouseEvent) => {
    e.stopPropagation();
    setUseHighRes(!useHighRes);
  };

  const activeImage = activeIndex !== null ? images[activeIndex] : null;

  return (
    <div className="image-gallery-section">
      <h3 className="section-subtitle">
        <ImageIcon size={18} className="subtitle-icon" />
        <span>Interactive Image Gallery</span>
      </h3>
      
      <div className="images-grid">
        {images.map((img, idx) => (
          <div key={idx} className="image-card" onClick={() => openLightbox(idx)}>
            <div className="image-wrapper">
              <img src={img.url} alt={img.caption} className="gallery-thumbnail" />
              <div className="image-overlay">
                <Maximize2 size={20} className="overlay-icon" />
              </div>
            </div>
            <div className="image-caption">{img.caption}</div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activeIndex !== null && activeImage && (
        <div className={`lightbox-modal ${isFullscreen ? 'fullscreen' : ''}`}>
          <div className="lightbox-backdrop" onClick={closeLightbox} />
          
          <div className="lightbox-container">
            {/* Top Toolbar */}
            <div className="lightbox-toolbar">
              <span className="image-index-label">
                Image {activeIndex + 1} of {images.length}
              </span>
              
              <div className="lightbox-toolbar-right">
                <button 
                  className={`lightbox-btn hd-toggle ${useHighRes ? 'active' : ''}`}
                  onClick={toggleHighRes}
                  title="Toggle High Resolution"
                >
                  HD {useHighRes ? 'ON' : 'OFF'}
                </button>
                <button className="lightbox-btn" onClick={zoomOut} disabled={zoom <= 50}>
                  <ZoomOut size={16} />
                </button>
                <span className="lightbox-zoom-val">{zoom}%</span>
                <button className="lightbox-btn" onClick={zoomIn} disabled={zoom >= 200}>
                  <ZoomIn size={16} />
                </button>
                <button className="lightbox-btn" onClick={() => setIsFullscreen(!isFullscreen)}>
                  {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                </button>
                <button className="lightbox-btn close-btn" onClick={closeLightbox}>
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button className="lightbox-arrow arrow-left" onClick={handlePrev}>
              <ChevronLeft size={24} />
            </button>

            <div className="lightbox-image-wrapper">
              <img
                src={useHighRes ? activeImage.highResUrl : activeImage.url}
                alt={activeImage.caption}
                className="lightbox-image"
                style={{
                  transform: `scale(${zoom / 100})`,
                  maxWidth: '90%',
                  maxHeight: '75vh',
                  objectFit: 'contain',
                  transition: 'transform 0.1s ease-out'
                }}
              />
            </div>

            <button className="lightbox-arrow arrow-right" onClick={handleNext}>
              <ChevronRight size={24} />
            </button>

            {/* Footer Caption */}
            <div className="lightbox-caption">
              <p>{activeImage.caption}</p>
              {useHighRes && <span className="hd-badge">Loaded in High Resolution</span>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
