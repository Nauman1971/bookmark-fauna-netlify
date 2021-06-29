import axios from 'axios';
import React from 'react';

export default function Card({
    reloadBookmarks,
    bookmark,
    setEdit,
    setUrl,
    setTitle,
    setBookmark
}) {
    const handleDelete = () => {
        axios.post('/api/delete-bookmark', { id: bookmark._id }).then(reloadBookmarks)
    }

    const handleEdit = () => {
        setTitle(bookmark.title);
        setUrl(bookmark.url);
        setEdit(true);
        setBookmark(bookmark);
    }
    return (
        <div className="container is-max-desktop mt-6 mb-6">
            <div className="card">
                <header className="card-header">
                    <p className="card-header-title">
                        {bookmark.title}
                    </p>
                </header>
                <div className="card-content">
                    <div className="content">
                        <a href={`${bookmark.url}`}>{bookmark.url}</a>
                        <br />
                    </div>
                </div>
                <footer className="card-footer">
                    <button onClick={handleEdit} className="card-footer-item button is-link">Edit</button>
                    <button onClick={handleDelete} className="card-footer-item button is-danger">Delete</button>
                </footer>
            </div>
        </div>
    )
}