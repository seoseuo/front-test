import React, { useEffect, useState } from 'react';
import { marked } from 'marked';

const renderer = {
    heading({ depth, tokens }) {
        const text = tokens.map(t => t.raw).join('');
        if (depth > 3) {
            return `<h${depth}>${text}</h${depth}>`;
        }
        const slug = text.toLowerCase().replace(/[^\w가-힣]+/g, '-');
        return `<h${depth} id="${slug}">
              <a href="#${slug}">🔗</a> ${text}
            </h${depth}>`;
    },

    blockquote({ tokens }) {
        const text = tokens.map(t => t.raw).join('');
        return `<blockquote class="copy-quote">${text}</blockquote>`;
    }
};

marked.use({ renderer });

const MarkedRenderer = () => {
    const [markdown, setMarkdown] = useState(``);

    const [html, setHtml] = useState('');

    useEffect(() => {
        setHtml(marked.parse(markdown));
    }, [markdown]);

    useEffect(() => {
        const handleClick = (e) => {
            const blockquote = e.target.closest('.copy-quote');
            if (blockquote) {
                navigator.clipboard.writeText(blockquote.innerText)
                    .then(() => alert('인용문이 복사되었습니다!'));
            }
        };
        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, []);

    return (
        <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>


            <div style={{ display: 'flex', gap: '10px' }}>


                <div>
                    <h2>📝 마크다운 입력</h2>
                    <textarea
                        value={markdown}
                        onChange={(e) => setMarkdown(e.target.value)}
                        style={{
                            width: '400px',
                            height: '800px',
                            padding: '10px',
                            fontSize: '16px',
                            boxSizing: 'border-box',
                            resize: 'none',
                        }}
                    />
                </div>


                <div>
                    <h2>📄 미리보기</h2>
                    <div
                        id="preview"
                        dangerouslySetInnerHTML={{ __html: html }}
                        style={{
                            width: '400px',
                            height: '800px',
                            padding: '10px',
                            backgroundColor: '#fff',
                            overflowY: 'auto',
                            boxSizing: 'border-box',
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default MarkedRenderer;
