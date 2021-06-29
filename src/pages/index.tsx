import React, { useEffect, useState } from "react"
import axios from 'axios';
import Bookmarks from "../components/Bookmarks";
import Card from "../components/Cards";
import Loader from "../components/Loader";

export default function Home() {
  const [status, setStatus] = useState('loading');
  const [bookmarks, setBookmarks] = useState(null);
  const [bookmark, setBookmark] = useState({});
  const [edit, setEdit] = useState(false);
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');

  useEffect(() => {
    let canceled = false;

    if (status !== 'loading') return;

    axios('/api/get-all-bookmarks').then(result => {
      if (canceled === true) return;

      if (result.status !== 200) {
        console.error('Error loading bookmarks!');
        console.error(result);
        return;
      }
      setBookmarks(result.data.bookmarks);
      setStatus('loaded');
    });

    return () => {
      canceled = true
    }
  }, [status])

  const reloadBookmarks = () => setStatus('loading');

  return (

    <div className="container is-max-desktop">
      <h1 className="title is-2 has-text-centered mt-5">
        Bookmark Your Favorites
      </h1>
      <Bookmarks
        reloadBookmarks={reloadBookmarks}
        bookmark={bookmark}
        setEdit={setEdit}
        edit={edit}
        url={url}
        setUrl={setUrl}
        title={title}
        setTitle={setTitle}
      />
      {bookmarks ? (
        <ul>{bookmarks.data.map((bookmark => (
          <li key={bookmark._id}>
            <Card
              reloadBookmarks={reloadBookmarks}
              bookmark={bookmark}
              setEdit={setEdit}
              setUrl={setUrl}
              setTitle={setTitle}
              setBookmark={setBookmark}
            />
          </li>
        )))}</ul>
      ) : (
        <Loader loading={status === 'loading'} />
      )
      }
    </div>
  )
}
