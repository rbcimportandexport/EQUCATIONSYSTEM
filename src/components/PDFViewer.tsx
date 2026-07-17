import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ZoomIn, ZoomOut, ChevronLeft, ChevronRight, Bookmark, 
  Search, Download, Check, Eye 
} from 'lucide-react';

interface PDFViewerProps {
  lessonId: string;
  pdfUrl: string;
  title: string;
  totalPages: number;
  mockPagesText: string[];
}

export const PDFViewer: React.FC<PDFViewerProps> = ({ 
  lessonId, pdfUrl, title, totalPages, mockPagesText 
}) => {
  const { 
    downloads, addDownload, removeDownload, 
    bookmarks, toggleBookmark 
  } = useApp();

  const [currentPage, setCurrentPage] = useState(1);
  const [zoom, setZoom] = useState(100);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<{ page: number; text: string }[]>([]);
  const [showSearch, setShowSearch] = useState(false);

  // Reset page on lesson change
  useEffect(() => {
    setCurrentPage(1);
    setSearchQuery('');
    setSearchResults([]);
    setShowSearch(false);
  }, [lessonId]);

  // Page navigate limits
  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  // Zoom logic
  const zoomIn = () => setZoom(z => Math.min(z + 25, 200));
  const zoomOut = () => setZoom(z => Math.max(z - 25, 50));

  // Search inside PDF simulation
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const matches: { page: number; text: string }[] = [];
    mockPagesText.forEach((text, index) => {
      if (text.toLowerCase().includes(searchQuery.toLowerCase())) {
        matches.push({
          page: index + 1,
          text: text
        });
      }
    });
    setSearchResults(matches);
  }, [searchQuery, mockPagesText]);

  // Bookmarking pages
  const isPageBookmarked = bookmarks.some(b => 
    b.lessonId === lessonId && 
    b.type === 'pdf' && 
    b.refData === currentPage.toString()
  );

  const handleBookmarkToggle = () => {
    toggleBookmark({
      type: 'pdf',
      title: `${title} (Page ${currentPage})`,
      courseId: 'course-1',
      lessonId,
      refData: currentPage.toString()
    });
  };

  // Downloads sync
  const isDownloaded = downloads.some(d => d.lessonId === lessonId && d.type === 'pdf');
  const handleDownloadToggle = () => {
    if (isDownloaded) {
      const match = downloads.find(d => d.lessonId === lessonId && d.type === 'pdf');
      if (match) removeDownload(match.id);
    } else {
      addDownload({
        type: 'pdf',
        title: `PDF Document: ${title}`,
        size: '1.8 MB',
        url: pdfUrl,
        lessonId
      });
    }
  };

  // Get matching text highlight
  const getHighlightedText = (text: string, query: string) => {
    if (!query.trim()) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return (
      <span>
        {parts.map((part, i) => 
          part.toLowerCase() === query.toLowerCase() 
            ? <mark key={i} className="pdf-search-highlight">{part}</mark> 
            : part
        )}
      </span>
    );
  };

  return (
    <div className="pdf-viewer">
      {/* Tool bar */}
      <div className="pdf-toolbar">
        <div className="toolbar-section doc-title">
          <Eye size={16} />
          <span>{title}</span>
        </div>

        <div className="toolbar-section page-controls">
          <button className="toolbar-btn" onClick={handlePrevPage} disabled={currentPage === 1}>
            <ChevronLeft size={16} />
          </button>
          <span className="page-indicator">
            Page {currentPage} of {totalPages}
          </span>
          <button className="toolbar-btn" onClick={handleNextPage} disabled={currentPage === totalPages}>
            <ChevronRight size={16} />
          </button>
        </div>

        <div className="toolbar-section zoom-controls">
          <button className="toolbar-btn" onClick={zoomOut} disabled={zoom <= 50}>
            <ZoomOut size={16} />
          </button>
          <span className="zoom-indicator">{zoom}%</span>
          <button className="toolbar-btn" onClick={zoomIn} disabled={zoom >= 200}>
            <ZoomIn size={16} />
          </button>
        </div>

        <div className="toolbar-section extra-controls">
          <button 
            className={`toolbar-btn search-toggle ${showSearch ? 'active' : ''}`}
            onClick={() => setShowSearch(!showSearch)}
            title="Search inside PDF text"
          >
            <Search size={16} />
          </button>

          <button 
            className={`toolbar-btn bookmark-toggle ${isPageBookmarked ? 'active' : ''}`}
            onClick={handleBookmarkToggle}
            title="Bookmark this page"
          >
            <Bookmark size={16} fill={isPageBookmarked ? "currentColor" : "none"} />
          </button>

          <button 
            className={`toolbar-btn download-toggle ${isDownloaded ? 'active' : ''}`}
            onClick={handleDownloadToggle}
            title={isDownloaded ? "Delete offline file" : "Download PDF offline"}
          >
            {isDownloaded ? <Check size={16} color="var(--md-sys-color-success)" /> : <Download size={16} />}
          </button>
        </div>
      </div>

      {/* Main container */}
      <div className="pdf-canvas-container">
        {showSearch && (
          <div className="pdf-search-sidebar">
            <div className="search-input-wrapper">
              <input
                type="text"
                placeholder="Search PDF text..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="input-field mini"
                autoFocus
              />
            </div>
            
            <div className="search-results-list">
              {searchQuery && searchResults.length === 0 && (
                <div className="no-results-label">No matches found.</div>
              )}
              {searchResults.map((result, idx) => (
                <button
                  key={idx}
                  className={`search-result-item ${currentPage === result.page ? 'active' : ''}`}
                  onClick={() => setCurrentPage(result.page)}
                >
                  <span className="result-page-num">Page {result.page}</span>
                  <span className="result-text-preview">
                    {result.text.substring(0, 60)}...
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="pdf-page-viewport">
          <div 
            className="pdf-page-sheet"
            style={{ 
              transform: `scale(${zoom / 100})`,
              transformOrigin: 'top center',
              width: '80%',
              maxWidth: '800px'
            }}
          >
            <div className="pdf-sheet-header">
              <span>{title}</span>
              <span>Page {currentPage}</span>
            </div>
            
            <div className="pdf-sheet-body">
              <p className="pdf-text-content">
                {getHighlightedText(mockPagesText[currentPage - 1] || 'No text found on this page.', searchQuery)}
              </p>
            </div>

            <div className="pdf-sheet-footer">
              <span>Simulated PDF document engine</span>
              <span>EducatePro Desktop</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
