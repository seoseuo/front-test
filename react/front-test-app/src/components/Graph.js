import React, { useState } from 'react';

function findEulerPath(edges) {
    const graph = new Map();
    const edgeCount = new Map();

    function addEdge(u, v) {
        if (!graph.has(u)) graph.set(u, []);
        if (!graph.has(v)) graph.set(v, []);
        graph.get(u).push(v);
        graph.get(v).push(u);
        const key = u < v ? u + v : v + u;
        edgeCount.set(key, (edgeCount.get(key) || 0) + 1);
    }

    for (const [u, v] of edges) {
        addEdge(u, v);
    }

    const oddNodes = [];
    for (const [node, neighbors] of graph.entries()) {
        if (neighbors.length % 2 !== 0) oddNodes.push(node);
    }
    if (oddNodes.length !== 0 && oddNodes.length !== 2) return null;

    const start = oddNodes.length === 2 ? oddNodes[0] : graph.keys().next().value;

    const stack = [start];
    const path = [];

    while (stack.length > 0) {
        const u = stack[stack.length - 1];
        const neighbors = graph.get(u);

        while (neighbors && neighbors.length > 0) {
            const v = neighbors.pop();
            const key = u < v ? u + v : v + u;
            if (edgeCount.get(key) > 0) {
                edgeCount.set(key, edgeCount.get(key) - 1);
                const oppNeighbors = graph.get(v);
                const idx = oppNeighbors.indexOf(u);
                if (idx !== -1) oppNeighbors.splice(idx, 1);
                stack.push(v);
                break;
            }
        }
        if (u === stack[stack.length - 1]) {
            path.push(stack.pop());
        }
    }

    if (path.length !== edges.length + 1) return null;
    return path.reverse();
}

export default function Graph() {
    const [inputText, setInputText] = useState(
        ''
    );
    const [outputPath, setOutputPath] = useState(null);
    const [error, setError] = useState(null);

    // 입력 텍스트를 파싱해서 edges 배열로 변환
    const parseInput = (text) => {

        try {
            const fixedText = text.replace(/'/g, '"');
            const parsed = JSON.parse(fixedText);
            // 유효성 체크: 2차원 배열이고 각 원소는 길이 2 배열이어야 함
            if (
                !Array.isArray(parsed) ||
                !parsed.every(
                    (edge) =>
                        Array.isArray(edge) &&
                        edge.length === 2 &&
                        typeof edge[0] === 'string' &&
                        typeof edge[1] === 'string'
                )
            ) {
                throw new Error('실패했습니다..');
            }
            return parsed;
        } catch {
            throw new Error('입력값을 확인해주세요.');
        }
    };

    const handleFindPath = () => {
        setError(null);
        setOutputPath(null);
        try {
            const edges = parseInput(inputText);
            const path = findEulerPath(edges);
            if (path === null) {
                setError('No Euler path found for the given graph.');
            } else {
                setOutputPath(path);
            }
        } catch (e) {
            setError(e.message);
        }
    };

    return (
        <div className="box">
            <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: 600, margin: 'auto' }}>
                <h2>모든 간선을 한 번만 지나는 경로</h2>
                <p>아래 형태로 입력하세요.</p>
                <pre style={{ background: '#f0f0f0', padding: 10 }}>
                    [['A', 'B'], ['B', 'C'], ['B', 'D'], ['C', 'D']]

                </pre>
                <textarea
                    rows={6}
                    style={{ width: '100%', fontSize: 16 }}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                />
                <button onClick={handleFindPath}>
                    찾기
                </button>

                {error && <p style={{ color: 'red' }}>{error}</p>}

                {outputPath && (
                    <div style={{ marginTop: 20 }}>
                        <h3>경로:</h3>
                        <pre style={{ background: '#f0f0f0', padding: 10 }}>
                            <p>{outputPath.join(' → ')}</p>
                        </pre>

                    </div>
                )}
            </div>
        </div>
    );
}
