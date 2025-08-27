import { useEffect, useState } from "react";

export default function App() {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 5;

    useEffect(() => {
        fetch(`http://localhost:4000/posts?page=${page}&limit=${limit}`)
            .then((res) => res.json())
            .then((data) => {
                setPosts(data.data);
                setTotalPages(data.totalPages);
            });
    }, [page]);

    return (
        <div style={{ padding: "20px" }}>
            <h1>📋 Posts list</h1>

            <table border="1" cellPadding="10" style={{ borderCollapse: "collapse" }}>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                </tr>
                </thead>
                <tbody>
                {posts.map((post) => (
                    <tr key={post.id}>
                        <td>{post.id}</td>
                        <td>{post.title}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            <div style={{ marginTop: "20px" }}>
                <button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>
                    ⬅ Prev
                </button>

                <span style={{ margin: "0 10px" }}>
          Page {page} of {totalPages}
        </span>

                <button
                    onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                    disabled={page === totalPages}
                >
                    Next ➡
                </button>
            </div>
        </div>
    );
}