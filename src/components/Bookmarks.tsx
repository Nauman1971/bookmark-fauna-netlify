import React from 'react';
import axios from 'axios';

export default function Bookmarks({
    reloadBookmarks,
    bookmark,
    setEdit,
    edit,
    url,
    setUrl,
    title,
    setTitle,
}) {

    const handleSubmit = async event => {
        event.preventDefault();

        if (url === '' || title === '') return;
        await axios.post('/api/create-bookmark', { url, title });
        setUrl('');
        setTitle('');
        reloadBookmarks();
    }

    const handleEdited = (event) => {
        event.preventDefault();
        axios.post('/api/update-bookmark', {
            id: bookmark._id,
            url,
            title,
        }).then(reloadBookmarks);
        setUrl('');
        setTitle('');
        setEdit(false);
    }
    if (edit) {
        return (
            <div className="container is-max-desktop">
                <form className="box has-background-success" onSubmit={handleEdited}>
                    <div className="field">
                        <label htmlFor="url" className="label">URL</label>
                        <div className="control">
                            <input className="input"
                                type="text" required
                                defaultValue={bookmark.url}
                                onChange={(e) => setUrl(e.target.value)}
                                placeholder="Enter you URL" />
                        </div>
                    </div>

                    <div className="field">
                        <label htmlFor="title" className="label">Title</label>
                        <div className="control">
                            <input
                                defaultValue={bookmark.title}
                                className="input"
                                type="text" required
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter your title or mark to remember" />
                        </div>
                    </div>
                    <button className="button is-dark">Save Edited</button>
                </form>
            </div>
        )
    } else {
        return (
            <div className="container is-max-desktop">
                <form className="box has-background-success" onSubmit={handleSubmit}>
                    <div className="field">
                        <label htmlFor="url" className="label">URL</label>
                        <div className="control">
                            <input className="input"
                                type="text" required
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                placeholder="Enter you URL" />
                        </div>
                    </div>

                    <div className="field">
                        <label htmlFor="title" className="label">Title</label>
                        <div className="control">
                            <input className="input"
                                type="text" required
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter your title or mark to remember" />
                        </div>
                    </div>
                    <button className="button is-dark">Add Bookmark</button>
                </form>
            </div>
        )
    }
}