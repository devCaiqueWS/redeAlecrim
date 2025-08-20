import React from 'react';

const CanvaPresentation: React.FC = () => {
  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '70vh'}}>
      <div style={{width: '100%', maxWidth: 900, margin: '0 auto'}}>
        <div style={{position: 'relative', width: '100%', height: 0, paddingTop: '56.25%', boxShadow: '0 2px 8px 0 rgba(63,69,81,0.16)', overflow: 'hidden', borderRadius: 8, willChange: 'transform'}}>
          <iframe
            loading="lazy"
            style={{position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, border: 'none', padding: 0, margin: 0}}
            src="https://www.canva.com/design/DAGv4hV5C2g/IyDpdPAizb0ryMKBjThJUQ/view?embed"
            allowFullScreen
            allow="fullscreen"
            title="Apresentação Primeiro Semestre 2025 Rede Alecrim"
          ></iframe>
        </div>
        <a
          href="https://www.canva.com/design/DAGv4hV5C2g/IyDpdPAizb0ryMKBjThJUQ/view?utm_content=DAGv4hV5C2g&utm_campaign=designshare&utm_medium=embeds&utm_source=link"
          target="_blank"
          rel="noopener noreferrer"
          style={{display: 'block', marginTop: 8, color: '#007C7C', fontWeight: 500, textAlign: 'center'}}
        >
          Apresentação Primeiro Semestre 2025 Rede Alecrim
        </a>
      </div>
    </div>
  );
};

export default CanvaPresentation;
