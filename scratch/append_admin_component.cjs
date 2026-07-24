const fs = require('fs');

const filePath = 'c:\\Users\\DELL\\ALL RBC PROJECT\\EDUCATION SYSTEM SOFTWARE\\src\\views\\ModuleScreen.tsx';
let content = fs.readFileSync(filePath, 'utf8');

if (!content.includes('const AdminVideoUpload: React.FC')) {
  console.log('AdminVideoUpload is missing in ModuleScreen.tsx. Appending...');
  
  const adminComponent = `

const AdminVideoUpload: React.FC<{
  lessonId: string;
  moduleId: string;
  title: string;
}> = ({ lessonId, moduleId, title }) => {
  const { syncCustomVideo, language } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [duration, setDuration] = useState<number>(120);
  const [isUploading, setIsUploading] = useState(false);
  const [progressText, setProgressText] = useState('');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoFile || !imageFile) {
      setMessage({ type: 'error', text: 'Please select both a video file and a thumbnail image.' });
      return;
    }

    setIsUploading(true);
    setMessage(null);
    setProgressText('Processing video and thumbnail files...');

    try {
      setProgressText('Converting video to Base64 data (high quality)...');
      const videoBase64 = await convertToBase64(videoFile);

      setProgressText('Converting thumbnail to Base64...');
      const imageBase64 = await convertToBase64(imageFile);

      setProgressText('Uploading payload to MongoDB database...');
      const res = await videosApi.upload({
        lessonId,
        moduleId,
        title,
        videoData: videoBase64,
        thumbnailData: imageBase64,
        duration
      });

      if (res.success) {
        setMessage({ type: 'success', text: 'Custom Video & Thumbnail uploaded to MongoDB successfully!' });
        setProgressText('Syncing new video player content...');
        await syncCustomVideo(lessonId);
        setVideoFile(null);
        setImageFile(null);
      } else {
        setMessage({ type: 'error', text: res.message || 'Upload failed.' });
      }
    } catch (err: any) {
      console.error(err);
      setMessage({ type: 'error', text: err.message || 'An error occurred during file conversion or upload.' });
    } finally {
      setIsUploading(false);
      setProgressText('');
    }
  };

  return (
    <div className="admin-video-upload-wrapper" style={{
      marginTop: '16px',
      border: '1px solid #cbd5e1',
      borderRadius: '12px',
      background: '#f8fafc',
      padding: '16px',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <button 
        type="button" 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'none',
          border: 'none',
          color: '#0f172a',
          fontWeight: 700,
          cursor: 'pointer',
          width: '100%',
          justifyContent: 'space-between',
          fontSize: '15px'
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Settings size={18} color="#0284c7" />
          {language === 'hi' ? 'एडमिन: कस्टम वीडियो और थंबनेल बदलें' : language === 'gu' ? 'એડમિન: વિડિઓ અને થંબનેલ અપલોડ કરો' : language === 'mr' ? 'अ‍ॅडमीन: व्हिडिओ आणि थंबनेल बदला' : 'Admin: Upload Custom Video & Thumbnail'}
        </span>
        <span style={{ fontSize: '12px', color: '#64748b' }}>{isOpen ? '▲ Collapse' : '▼ Expand'}</span>
      </button>

      {isOpen && (
        <form onSubmit={handleUpload} style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>
              Select High-Quality Video File:
            </label>
            <input 
              type="file" 
              accept="video/*" 
              onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
              required
              disabled={isUploading}
              style={{
                fontSize: '13px',
                border: '1px solid #cbd5e1',
                borderRadius: '6px',
                padding: '8px',
                background: '#ffffff'
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>
              Select Thumbnail Image:
            </label>
            <input 
              type="file" 
              accept="image/*" 
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              required
              disabled={isUploading}
              style={{
                fontSize: '13px',
                border: '1px solid #cbd5e1',
                borderRadius: '6px',
                padding: '8px',
                background: '#ffffff'
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>
              Video Duration (in seconds):
            </label>
            <input 
              type="number" 
              value={duration} 
              onChange={(e) => setDuration(parseInt(e.target.value) || 120)}
              required
              disabled={isUploading}
              style={{
                fontSize: '13px',
                border: '1px solid #cbd5e1',
                borderRadius: '6px',
                padding: '8px',
                background: '#ffffff',
                maxWidth: '120px'
              }}
            />
          </div>

          {progressText && (
            <div style={{ fontSize: '13px', color: '#0284c7', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="spinner" style={{
                width: '14px',
                height: '14px',
                border: '2px solid #0284c7',
                borderTopColor: 'transparent',
                borderRadius: '50%',
                display: 'inline-block',
                animation: 'spin 1s linear infinite'
              }}></span>
              <style>{\`@keyframes spin { to { transform: rotate(360deg); } }\`}</style>
              {progressText}
            </div>
          )}

          {message && (
            <div style={{
              fontSize: '13px',
              fontWeight: 600,
              padding: '10px',
              borderRadius: '6px',
              background: message.type === 'success' ? '#f0fdf4' : '#fef2f2',
              color: message.type === 'success' ? '#16a34a' : '#dc2626',
              border: \`1px solid \${message.type === 'success' ? '#dcfce7' : '#fee2e2'}\`
            }}>
              {message.text}
            </div>
          )}

          <button 
            type="submit" 
            disabled={isUploading || !videoFile || !imageFile}
            style={{
              background: '#0284c7',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              padding: '10px 16px',
              fontSize: '14px',
              fontWeight: 600,
              cursor: (isUploading || !videoFile || !imageFile) ? 'not-allowed' : 'pointer',
              opacity: (isUploading || !videoFile || !imageFile) ? 0.6 : 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'all 0.2s'
            }}
          >
            <Upload size={16} />
            {isUploading ? 'Uploading to MongoDB...' : 'Save to MongoDB'}
          </button>
        </form>
      )}
    </div>
  );
};
`;

  content += adminComponent;
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('SUCCESS: AdminVideoUpload component appended to ModuleScreen.tsx!');
} else {
  console.log('AdminVideoUpload is already present in ModuleScreen.tsx. Skipping append.');
}
